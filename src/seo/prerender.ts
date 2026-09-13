import { PHASES, VIDEO_PHASES, MARKETING_PHASES, PROMPTS } from '../constants';
import { FAQ_DATA } from '../components/FAQPage';

interface RouteSEO {
  path: string;
  title: string;
  description: string;
  h1: string;
  breadcrumb: string;
  schemaType: string;
  semanticHtml: string;
}

const BASE_URL = process.env.APP_URL || 'https://ais-pre-lbq5lkbylbppscqlpr6ota-504961274447.europe-west2.run.app';

export function getSEOData(urlPath: string): {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  jsonLd: object[];
  semanticHtml: string;
} {
  const normalizedPath = urlPath.split('?')[0].replace(/\/$/, '') || '/';
  const canonicalUrl = `${BASE_URL}${normalizedPath === '/' ? '' : normalizedPath}`;
  const ogImage = `${BASE_URL}/main_logo.png`;

  // Base Organization Schema (DayZero)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DayZero",
    "url": BASE_URL,
    "logo": `${BASE_URL}/main_logo.png`,
    "description": "DayZero is the builder operating system for mastering AI full-stack development, commercial video generation, and digital marketing."
  };

  // Base WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DayZero",
    "url": BASE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${BASE_URL}/prompt-library?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  let title = "DayZero - Earn as you Learn Roadmap";
  let description = "A comprehensive roadmap and operating system for mastering AI full-stack development, commercial video generation, and digital marketing retainers.";
  let h1 = "DayZero: Earn as you Learn Builder Operating System";
  let jsonLd: object[] = [organizationSchema, websiteSchema];
  let semanticHtml = "";

  if (normalizedPath === '/about') {
    title = "About TechOptyx — Mission, Founder & Philosophy | TechOptyx";
    description = "Learn how TechOptyx empowers creators and developers worldwide through project-based AI engineering, client retainers, and transparent monetization models.";
    h1 = "About TechOptyx & Our Mission";
    
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "mainEntity": {
        "@type": "Organization",
        "name": "TechOptyx",
        "founder": {
          "@type": "Person",
          "name": "Amr Suleiman",
          "jobTitle": "Lead AI Engineer & Founder",
          "email": "amrsuleiman777@gmail.com"
        }
      }
    });

    semanticHtml = `
      <main class="seo-content" style="max-width: 900px; margin: 0 auto; padding: 40px 20px; font-family: system-ui, sans-serif; line-height: 1.6;">
        <nav aria-label="Breadcrumbs"><p><a href="/">Home</a> &gt; <strong>About TechOptyx</strong></p></nav>
        <h1>${h1}</h1>
        <p class="lead" style="font-size: 1.2rem; font-weight: 500;">
          TechOptyx was founded to solve a fundamental crisis in technical education: students spending months watching passive video tutorials while accumulating zero client revenue or practical engineering authority.
        </p>
        <section>
          <h2>The 'Earn as you Learn' Operating Principle</h2>
          <p>
            Every phase of our 34-module roadmap is coupled with a concrete client deliverable. Whether launching a local business landing page ($300–$800), orchestrating an enterprise RAG knowledge base ($1,500–$3,500), or crafting viral generative video commercials, builders learn by shipping and monetizing.
          </p>
        </section>
        <section>
          <h2>Leadership & Technical Pedigree</h2>
          <p>
            Founded by <strong>Amr Suleiman</strong>, TechOptyx combines production engineering with accessible, practical instruction across Google Cloud, LangChain, OpenAI, Claude, Runway, and Meta advertising platforms.
          </p>
          <p>Contact: <a href="mailto:amrsuleiman777@gmail.com">amrsuleiman777@gmail.com</a></p>
        </section>
      </main>
    `;
  } else if (normalizedPath === '/faq') {
    title = "Frequently Asked Questions & AEO Knowledge Base | DayZero";
    description = "Direct answers to common questions about DayZero, AI full-stack development, monetization strategies, certifications, and Answer Engine Optimization (AEO).";
    h1 = "Frequently Asked Questions (FAQ & AEO Hub)";

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_DATA.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${item.directAnswer} ${item.elaboration}`
        }
      }))
    };
    jsonLd.push(faqSchema);

    semanticHtml = `
      <main class="seo-content" style="max-width: 900px; margin: 0 auto; padding: 40px 20px; font-family: system-ui, sans-serif; line-height: 1.6;">
        <nav aria-label="Breadcrumbs"><p><a href="/">Home</a> &gt; <strong>FAQ</strong></p></nav>
        <h1>${h1}</h1>
        <p class="lead" style="font-size: 1.2rem; font-weight: 500;">
          Direct, concise, and verifiable answers to frequently asked questions about DayZero and Answer Engine Optimization (AEO).
        </p>
        <section>
          ${FAQ_DATA.map(item => `
            <article style="margin-bottom: 24px; border-bottom: 1px solid #e5e7eb; padding-bottom: 16px;">
              <h2>${item.question}</h2>
              <p><strong>Direct Answer:</strong> ${item.directAnswer}</p>
              <p>${item.elaboration}</p>
              ${item.stats ? `<p><small><em>Verified Data: ${item.stats}</em></small></p>` : ''}
            </article>
          `).join('')}
        </section>
      </main>
    `;
  } else if (normalizedPath === '/tracks/ai-fullstack') {
    title = "AI & Full-Stack Engineering Roadmap (14 Phases) | TechOptyx";
    description = "Step-by-step full-stack AI roadmap. Master TypeScript, Python, React, LangChain, RAG pipelines, and multi-agent systems with client monetization projects.";
    h1 = "Track 1: AI & Full-Stack Software Engineering Curriculum";

    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "AI & Full-Stack Development Master Track",
      "description": "Comprehensive 14-phase curriculum teaching TypeScript, Python, React, LangChain, RAG, and multi-agent AI systems with client deliverables.",
      "provider": {
        "@type": "Organization",
        "name": "TechOptyx",
        "sameAs": BASE_URL
      },
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "Online",
        "courseWorkload": "PT14W"
      }
    });

    semanticHtml = `
      <main class="seo-content" style="max-width: 900px; margin: 0 auto; padding: 40px 20px; font-family: system-ui, sans-serif; line-height: 1.6;">
        <nav aria-label="Breadcrumbs"><p><a href="/">Home</a> &gt; <a href="/dashboard">Curriculum</a> &gt; <strong>AI & Full-Stack Track</strong></p></nav>
        <h1>${h1}</h1>
        <p class="lead" style="font-size: 1.2rem; font-weight: 500;">
          14 progressive, battle-tested engineering phases designed to take builders from digital literacy to production-ready multi-agent AI architectures.
        </p>
        <section>
          <h2>Curriculum Modules & Sellable Deliverables</h2>
          <ol style="padding-left: 20px;">
            ${PHASES.map(p => `
              <li style="margin-bottom: 16px;">
                <h3>Phase ${p.number}: ${p.title} (${p.weeks})</h3>
                <p><strong>Objective:</strong> ${p.objective}</p>
                <p><strong>Client Deliverable:</strong> ${p.project.title} — ${p.project.description}</p>
                <p><strong>Target Pricing:</strong> ${p.project.sellingStrategy.pricing}</p>
              </li>
            `).join('')}
          </ol>
        </section>
      </main>
    `;
  } else if (normalizedPath === '/tracks/video-animation') {
    title = "AI Video Animation & Commercial Generation Track | TechOptyx";
    description = "Master Midjourney, Runway Gen-3, Kling, ElevenLabs, and LivePortrait. Build and sell commercial cinematic video ads, avatars, and retainers.";
    h1 = "Track 2: AI Video Animation & Commercial Generation";

    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "AI Video Animation & Generation Track",
      "description": "10-module masterclass in Midjourney, Runway Gen-3, Kling AI, ElevenLabs voice cloning, and commercial client monetization.",
      "provider": {
        "@type": "Organization",
        "name": "TechOptyx",
        "sameAs": BASE_URL
      }
    });

    semanticHtml = `
      <main class="seo-content" style="max-width: 900px; margin: 0 auto; padding: 40px 20px; font-family: system-ui, sans-serif; line-height: 1.6;">
        <nav aria-label="Breadcrumbs"><p><a href="/">Home</a> &gt; <a href="/dashboard">Curriculum</a> &gt; <strong>AI Video Animation Track</strong></p></nav>
        <h1>${h1}</h1>
        <p class="lead" style="font-size: 1.2rem; font-weight: 500;">
          10 modules teaching cinematic storytelling, generative AI video engines, character consistency, and commercial client retainers.
        </p>
        <section>
          <h2>Curriculum Modules & Video Deliverables</h2>
          <ol style="padding-left: 20px;">
            ${VIDEO_PHASES.map(p => `
              <li style="margin-bottom: 16px;">
                <h3>Phase ${p.number}: ${p.title} (${p.weeks})</h3>
                <p><strong>Objective:</strong> ${p.objective}</p>
                <p><strong>Deliverable:</strong> ${p.project.title} — ${p.project.description}</p>
                <p><strong>Pricing:</strong> ${p.project.sellingStrategy.pricing}</p>
              </li>
            `).join('')}
          </ol>
        </section>
      </main>
    `;
  } else if (normalizedPath === '/tracks/digital-marketing') {
    title = "Digital Marketing & Answer Engine Optimization Track | TechOptyx";
    description = "Learn modern digital marketing, SEO, AEO, Meta/TikTok ads, email automation, and client retainers ($2k-$5k/mo) with hands-on deliverables.";
    h1 = "Track 3: Digital Marketing, SEO & Growth Systems";

    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Digital Marketing & Answer Engine Optimization Track",
      "description": "10-phase execution roadmap covering SEO, AEO, paid social advertising, high-converting landing pages, and marketing agency retainers.",
      "provider": {
        "@type": "Organization",
        "name": "TechOptyx",
        "sameAs": BASE_URL
      }
    });

    semanticHtml = `
      <main class="seo-content" style="max-width: 900px; margin: 0 auto; padding: 40px 20px; font-family: system-ui, sans-serif; line-height: 1.6;">
        <nav aria-label="Breadcrumbs"><p><a href="/">Home</a> &gt; <a href="/dashboard">Curriculum</a> &gt; <strong>Digital Marketing Track</strong></p></nav>
        <h1>${h1}</h1>
        <p class="lead" style="font-size: 1.2rem; font-weight: 500;">
          10 comprehensive execution phases in customer acquisition, organic search authority, Answer Engine Optimization (AEO), and client retainer contracts.
        </p>
        <section>
          <h2>Curriculum Modules & Growth Deliverables</h2>
          <ol style="padding-left: 20px;">
            ${MARKETING_PHASES.map(p => `
              <li style="margin-bottom: 16px;">
                <h3>Phase ${p.number}: ${p.title} (${p.weeks})</h3>
                <p><strong>Objective:</strong> ${p.objective}</p>
                <p><strong>Deliverable:</strong> ${p.project.title} — ${p.project.description}</p>
                <p><strong>Pricing:</strong> ${p.project.sellingStrategy.pricing}</p>
              </li>
            `).join('')}
          </ol>
        </section>
      </main>
    `;
  } else if (normalizedPath === '/prompt-library') {
    title = "AI Prompt Library — 50+ Tested Engineering Prompts | TechOptyx";
    description = "Browse tested, production-grade prompts for SaaS idea validation, React refactoring, copywriting, Midjourney art, and marketing automation.";
    h1 = "Curated AI Prompt Engineering Library";

    semanticHtml = `
      <main class="seo-content" style="max-width: 900px; margin: 0 auto; padding: 40px 20px; font-family: system-ui, sans-serif; line-height: 1.6;">
        <nav aria-label="Breadcrumbs"><p><a href="/">Home</a> &gt; <strong>Prompt Library</strong></p></nav>
        <h1>${h1}</h1>
        <p class="lead" style="font-size: 1.2rem; font-weight: 500;">
          50+ battle-tested, high-performance prompts categorized across software development, SaaS strategy, image synthesis, and copy generation.
        </p>
        <section>
          <h2>Featured Prompts</h2>
          ${PROMPTS.slice(0, 15).map(pr => `
            <article style="margin-bottom: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;">
              <h3>${pr.title} (${pr.category.toUpperCase()} • ${pr.difficulty})</h3>
              <p>${pr.description}</p>
              <pre style="background: #f3f4f6; padding: 12px; border-radius: 6px; overflow-x: auto;"><code>${pr.prompt}</code></pre>
            </article>
          `).join('')}
        </section>
      </main>
    `;
  } else if (normalizedPath === '/certifications') {
    title = "Free Industry Certifications Directory for AI & Cloud | TechOptyx";
    description = "Curated direct pathways to recognized, resume-building certifications from Google Cloud, DeepLearning.AI, AWS, Meta, and HubSpot.";
    h1 = "Recognized Industry Certifications Directory";

    semanticHtml = `
      <main class="seo-content" style="max-width: 900px; margin: 0 auto; padding: 40px 20px; font-family: system-ui, sans-serif; line-height: 1.6;">
        <nav aria-label="Breadcrumbs"><p><a href="/">Home</a> &gt; <strong>Certifications</strong></p></nav>
        <h1>${h1}</h1>
        <p class="lead" style="font-size: 1.2rem; font-weight: 500;">
          Curated directory of top-tier, verifiable industry credentials to validate technical mastery alongside your portfolio.
        </p>
        <section>
          <h2>Featured Credential Pathways</h2>
          <ul>
            <li><strong>Google Cloud:</strong> Associate Cloud Engineer & Professional Machine Learning Engineer</li>
            <li><strong>DeepLearning.AI:</strong> Generative AI with Large Language Models (Coursera)</li>
            <li><strong>Amazon Web Services (AWS):</strong> AWS Certified AI Practitioner & Solutions Architect</li>
            <li><strong>Meta:</strong> Meta Certified Digital Marketing Associate</li>
            <li><strong>HubSpot Academy:</strong> Inbound Marketing, Content Marketing & SEO Certifications</li>
          </ul>
        </section>
      </main>
    `;
  } else {
    // Default / Homepage
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "TechOptyx Builder OS",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web, iOS, Android, macOS, Windows",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    });

    semanticHtml = `
      <main class="seo-content" style="max-width: 900px; margin: 0 auto; padding: 40px 20px; font-family: system-ui, sans-serif; line-height: 1.6;">
        <header>
          <h1>${h1}</h1>
          <p class="lead" style="font-size: 1.25rem; font-weight: 500;">
            A results-driven, interactive curriculum and operating system for mastering modern AI engineering, commercial video animation, and digital marketing retainers.
          </p>
        </header>

        <section>
          <h2>Three Industry-Aligned Career Tracks</h2>
          <div style="display: grid; grid-template-columns: 1fr; gap: 20px; margin-top: 16px;">
            <article style="border: 1px solid #e5e7eb; padding: 16px; border-radius: 8px;">
              <h3><a href="/tracks/ai-fullstack">Track 1: AI & Full-Stack Development (14 Phases)</a></h3>
              <p>From command-line fundamentals and TypeScript to building LLM apps with LangChain, LangGraph, RAG pipelines, fine-tuning, and multi-agent systems.</p>
            </article>
            <article style="border: 1px solid #e5e7eb; padding: 16px; border-radius: 8px;">
              <h3><a href="/tracks/video-animation">Track 2: AI Video Animation & Generation (10 Phases)</a></h3>
              <p>Master Midjourney, Runway Gen-3, Kling, ElevenLabs, and character consistency to deliver commercial video projects for paying clients.</p>
            </article>
            <article style="border: 1px solid #e5e7eb; padding: 16px; border-radius: 8px;">
              <h3><a href="/tracks/digital-marketing">Track 3: Digital Marketing & AEO Growth (10 Phases)</a></h3>
              <p>Learn Answer Engine Optimization (AEO), high-converting funnel design, paid ads (Meta & TikTok), and scaling monthly client retainers ($2k–$5k/mo).</p>
            </article>
          </div>
        </section>

        <section style="margin-top: 32px;">
          <h2>Quick Navigation & Resources</h2>
          <ul>
            <li><a href="/faq">Frequently Asked Questions (FAQ & AEO Guide)</a></li>
            <li><a href="/prompt-library">Tested AI Prompt Library (50+ Prompts)</a></li>
            <li><a href="/certifications">Curated Free Industry Certifications Directory</a></li>
          </ul>
        </section>
      </main>
    `;
  }

  // Breadcrumb Schema
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL
      },
      ...(normalizedPath !== '/' ? [{
        "@type": "ListItem",
        "position": 2,
        "name": title.split('—')[0].split('|')[0].trim(),
        "item": canonicalUrl
      }] : [])
    ]
  };
  jsonLd.push(breadcrumbsSchema);

  return {
    title,
    description,
    canonicalUrl,
    ogImage,
    jsonLd,
    semanticHtml
  };
}

export function generateSitemapXml(): string {
  const publicRoutes = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/tracks/ai-fullstack', priority: '0.9', changefreq: 'weekly' },
    { path: '/tracks/video-animation', priority: '0.9', changefreq: 'weekly' },
    { path: '/tracks/digital-marketing', priority: '0.9', changefreq: 'weekly' },
    { path: '/faq', priority: '0.9', changefreq: 'weekly' },
    { path: '/prompt-library', priority: '0.8', changefreq: 'weekly' },
    { path: '/certifications', priority: '0.8', changefreq: 'weekly' },
    { path: '/about', priority: '0.7', changefreq: 'monthly' }
  ];

  const currentDate = new Date().toISOString().split('T')[0];

  const xmlEntries = publicRoutes.map(r => `  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
}
