import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
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
app.post("/api/chat", async (req, res) => {
  try {
    const { message, phaseInfo, history } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "A message string is required." });
    }

    const ai = getGenAI();

    // Construct high-context prompt
    let systemInstruction = `You are the expert AI Path Assistant for TechOptyx (The Builder Operating System for AI, Video Animation, and Digital Marketing).
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

${history && Array.isArray(history) && history.length > 0 
  ? "PREVIOUS CONVERSATION:\n" + history.slice(-6).map((m: { role: string; text: string }) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join("\n\n") + "\n\n"
  : ""}
User Query: ${message}

Actionable Assistant Response:`;

    // Attempt generation with high-speed, highly-available models (gemini-2.5-flash, gemini-3.1-flash-lite, gemini-3.8-flash)
    const candidateModels = ["gemini-2.5-flash", "gemini-3.1-flash-lite", "gemini-3.8-flash"];
    let replyText = "";
    let lastError: any = null;

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
        lastError = modelErr;
      }
    }

    if (!replyText && lastError) {
      console.error("All AI candidate models failed:", lastError);
      throw lastError;
    }

    return res.json({ text: replyText });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    return res.status(500).json({ 
      error: error?.message || "Failed to generate AI response. Please try again." 
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
