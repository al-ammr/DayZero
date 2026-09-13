import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { getSEOData, generateSitemapXml } from "./seo/prerender";
import { generateCurriculumGuidance } from "./services/curriculumAssistant";
import { env } from "./config/env";

const app = express();
const PORT = env.PORT;

// Trust reverse proxy for rate limiting (Cloud Run / AI Studio infrastructure)
app.set('trust proxy', 1);

app.use(helmet({
  contentSecurityPolicy: false,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
}));

// Ensure search and AI crawlers do not index internal API endpoints
app.use('/api', (_req, res, next) => {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  next();
});

const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." }
});

app.use(express.json());

// Lazy-initialize Gemini client with dynamic key re-check
let genAIClient: GoogleGenAI | null = null;
let lastUsedApiKey = "";

function getGenAI(): GoogleGenAI | null {
  const apiKey = (env.GEMINI_API_KEY || "").trim();
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.length < 10) {
    return null;
  }

  if (!genAIClient || lastUsedApiKey !== apiKey) {
    lastUsedApiKey = apiKey;
    genAIClient = new GoogleGenAI({ 
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Path Assistant chat endpoint
app.post("/api/chat", chatLimiter, async (req, res) => {
  try {
    const { message, phaseInfo, history } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "A message string is required." });
    }

    if (history !== undefined && !Array.isArray(history)) {
      return res.status(400).json({ error: "History must be an array." });
    }

    const sanitizedHistory = (history || []).filter(
      (m: any) => m && typeof m.role === "string" && typeof m.text === "string"
    );

    const ai = getGenAI();
    let replyText = "";
    let isFallback = false;

    if (ai) {
      // Construct high-context prompt
      let systemInstruction = `You are the expert AI Path Assistant for DayZero (The Builder Operating System for AI, Video Animation, and Digital Marketing).
Your mission is to guide builders with concrete, battle-tested, actionable advice on building, launching, and monetizing projects.
Tone: Direct, encouraging, technical yet approachable, focused on execution, real revenue, and shipped deliverables. No fluff or repetitive pleasantries. Format answers cleanly with markdown headings, bullet points, and code/prompt blocks where appropriate.`;

      if (phaseInfo) {
        systemInstruction += `\n\nCURRENT USER CONTEXT:
- Track: ${phaseInfo.track || "General"}
- Current Phase/Module: ${phaseInfo.number ? `Phase/Module ${phaseInfo.number}: ${phaseInfo.title}` : phaseInfo.title}
- Objective: ${phaseInfo.objective || "Not specified"}
- Total Tasks in Phase: ${phaseInfo.totalTasks || 0}
- Overall Progress: ${phaseInfo.completedCount || 0} tasks completed`;
      }

      // Format chat conversation
      const prompt = `${systemInstruction}

${sanitizedHistory.length > 0 
  ? "PREVIOUS CONVERSATION:\n" + sanitizedHistory.slice(-6).map((m: any) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join("\n\n") + "\n\n"
  : ""}
User Query: ${message}

Actionable Assistant Response:`;

      // Attempt generation with high-speed models
      const candidateModels = ["gemini-2.5-flash", "gemini-3.1-flash-lite", "gemini-3.8-flash"];

      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
          });
          if (response.text) {
            replyText = response.text;
            break;
          }
        } catch (modelErr: any) {
          const errMsg = modelErr?.message?.toLowerCase() || "";
          if (errMsg.includes("api key not valid") || errMsg.includes("api_key_invalid") || errMsg.includes("unauthenticated")) {
            // Log as warning rather than error to avoid false positive error monitoring
            console.warn("[AI Assistant] Live Gemini key rejected or unavailable. Serving curriculum intelligence response.");
            break;
          }
        }
      }
    }

    if (!replyText) {
      isFallback = true;
      replyText = generateCurriculumGuidance(message, phaseInfo, sanitizedHistory);
    }

    return res.json({ 
      text: replyText, 
      source: isFallback ? 'curriculum' : 'gemini',
      isFallback 
    });
  } catch (error: any) {
    // Provide a resilient fallback response so users never experience a broken chat
    console.warn("Recovered smoothly from /api/chat error using curriculum fallback:", error?.message || error);
    const fallbackText = generateCurriculumGuidance(
      req.body?.message || "Guidance",
      req.body?.phaseInfo,
      req.body?.history
    );
    return res.json({ 
      text: fallbackText, 
      source: 'curriculum', 
      isFallback: true 
    });
  }
});

function renderHtmlPage(template: string, urlPath: string): string {
  const seo = getSEOData(urlPath);
  let html = template;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${seo.title}</title>`);

  // Meta Description
  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description".*?>/i, `<meta name="description" content="${seo.description}" />`);
  } else {
    html = html.replace('</head>', `  <meta name="description" content="${seo.description}" />\n</head>`);
  }

  // Canonical tag & OpenGraph / Twitter / JSON-LD tags to inject
  const metaTags = `
    <link rel="canonical" href="${seo.canonicalUrl}" />
    <meta property="og:title" content="${seo.title}" />
    <meta property="og:description" content="${seo.description}" />
    <meta property="og:url" content="${seo.canonicalUrl}" />
    <meta property="og:image" content="${seo.ogImage}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${seo.title}" />
    <meta name="twitter:description" content="${seo.description}" />
    <meta name="twitter:image" content="${seo.ogImage}" />
    <script type="application/ld+json">
${JSON.stringify(seo.jsonLd, null, 2)}
    </script>
  `;

  html = html.replace('</head>', `${metaTags}\n  </head>`);

  // Inject Pre-rendered Semantic Content into <div id="root"> for crawlers
  if (seo.semanticHtml) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"><noscript>${seo.semanticHtml}</noscript></div>`
    );
  }

  return html;
}

// -------------------------------------------------------------
// SEO & AEO Public Static Routes
// -------------------------------------------------------------
app.get("/robots.txt", (_req, res) => {
  const robotsPath = path.join(process.cwd(), "public", "robots.txt");
  if (fs.existsSync(robotsPath)) {
    res.type("text/plain").sendFile(robotsPath);
  } else {
    res.type("text/plain").send("User-agent: *\nAllow: /\n");
  }
});

app.get("/sitemap.xml", (_req, res) => {
  res.type("application/xml").send(generateSitemapXml());
});

app.get("/llms.txt", (_req, res) => {
  const llmsPath = path.join(process.cwd(), "public", "llms.txt");
  if (fs.existsSync(llmsPath)) {
    res.type("text/plain; charset=utf-8").sendFile(llmsPath);
  } else {
    res.status(404).send("Not found");
  }
});

app.get("/llms-full.txt", (_req, res) => {
  const llmsFullPath = path.join(process.cwd(), "public", "llms-full.txt");
  if (fs.existsSync(llmsFullPath)) {
    res.type("text/plain; charset=utf-8").sendFile(llmsFullPath);
  } else {
    res.status(404).send("Not found");
  }
});

async function startServer() {
  if (env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    // Prerender HTML for search engines and direct route visits
    app.use(async (req, res, next) => {
      const url = req.originalUrl;
      if (
        url.startsWith("/api") ||
        url.startsWith("/@") ||
        url.startsWith("/src") ||
        url.startsWith("/node_modules") ||
        url.includes(".")
      ) {
        return next();
      }

      try {
        const templatePath = path.resolve(process.cwd(), "index.html");
        let template = fs.readFileSync(templatePath, "utf-8");
        template = await vite.transformIndexHtml(url, template);
        const rendered = renderHtmlPage(template, url);
        res.status(200).set({ "Content-Type": "text/html" }).end(rendered);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { index: false }));
    app.get("*", (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith("/api") || url.includes(".")) {
        return next();
      }
      try {
        const templatePath = path.join(distPath, "index.html");
        const template = fs.readFileSync(templatePath, "utf-8");
        const rendered = renderHtmlPage(template, url);
        res.status(200).set({ "Content-Type": "text/html" }).end(rendered);
      } catch (e) {
        next(e);
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
