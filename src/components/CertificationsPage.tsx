import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';

const DATA: Record<string, any> = {
"track-01": {
  name: "Full-Stack AI Mastery",
  phases: [
    { id:"Phase 00", title:"Digital Fundamentals", resources:[
      {type:"certification", provider:"Google", name:"Google Digital Garage", desc:"A comprehensive foundational certification by Google covering the fundamentals of digital marketing, online presence, and basic digital strategy essential for any modern tech professional."},
      {type:"course", provider:"Google", name:"Google Cloud Skills Boost", desc:"In-depth guide covering core methodologies, practical workflows, and definitive standards."}
    ]},
    { id:"Phase 01", title:"Generative AI and Prompt Engineering", resources:[
      {type:"guide", provider:"Anthropic", name:"Anthropic Prompt Engineering Guide", desc:"An in-depth, authoritative guide by Anthropic on constructing, refining, and optimizing prompts specifically tailored for complex reasoning and advanced LLM behavior."},
      {type:"guide", provider:"OpenAI", name:"OpenAI Prompt Engineering Guide", desc:"In-depth guide covering core methodologies, practical workflows, and definitive standards."},
      {type:"course", provider:"DeepLearning.AI", name:"ChatGPT Prompt Engineering for Developers", desc:"DeepLearning.AI course on using LLM APIs to build applications and automate tasks."}
    ]},
    { id:"Phase 02", title:"No-Code Web Development", resources:[
      {type:"certification", provider:"Webflow", name:"Webflow Expert Certification", desc:"An industry-recognized credential proving advanced proficiency in building responsive, scalable, and visually complex websites visually without writing code."},
      {type:"course", provider:"WordPress", name:"WordPress Learn", desc:"In-depth guide covering core methodologies, practical workflows, and definitive standards."},
      {type:"certification", provider:"Google", name:"Google UX Design Certificate", desc:"In-depth guide covering core methodologies, practical workflows, and definitive standards."}
    ]},
    { id:"Phase 2.5", title:"Vibe Coding and AI Assisted Designs", resources:[
      {type:"tool", provider:"Vercel", name:"v0 by Vercel", desc:"In-depth guide covering core methodologies, practical workflows, and definitive standards."},
      {type:"tool", provider:"Google", name:"Google AI Studio", desc:"In-depth guide covering core methodologies, practical workflows, and definitive standards."}
    ]},
    { id:"Phase 03", title:"AI Embedded Website and Development", resources:[
      {type:"guide", provider:"Anthropic", name:"Anthropic Claude API", desc:"In-depth guide covering core methodologies, practical workflows, and definitive standards."},
      {type:"guide", provider:"OpenAI", name:"OpenAI API", desc:"In-depth guide covering core methodologies, practical workflows, and definitive standards."}
    ]},
    { id:"Phase 04", title:"Automation, Task Scheduling and AI Tools Deployment", resources:[
      {type:"certification", provider:"n8n", name:"n8n Academy", desc:"In-depth guide covering core methodologies, practical workflows, and definitive standards."},
      {type:"certification", provider:"Make", name:"Make Academy", desc:"A deep dive into visual workflow automation, teaching you how to connect disparate APIs and services to build powerful, automated backend processes."}
    ]},
    { id:"Phase 05", title:"Agentic AI and Uses", resources:[
      {type:"guide", provider:"LangChain", name:"LangChain Documentation", desc:"The definitive resource for integrating large language models with external data sources, memory, and tools to build robust, agentic AI applications."},
      {type:"guide", provider:"CrewAI", name:"CrewAI Documentation", desc:"Detailed instructions on designing and orchestrating autonomous AI agents that collaborate and execute complex multi-step tasks independently."}
    ]},
    { id:"Phase 06", title:"Git and GitHub Full Courses", resources:[
      {type:"certification", provider:"GitHub", name:"GitHub Skills", desc:"Interactive, hands-on tutorials hosted directly on GitHub that teach version control, collaborative workflows, and CI/CD pipelines using GitHub Actions."}
    ]},
    { id:"Phase 6.5", title:"Run AI Models from GitHub and HuggingFace", resources:[
      {type:"course", provider:"Hugging Face", name:"Hugging Face Course", desc:"An intensive, practical course on natural language processing, transformer models, and deploying open-source machine learning models using the Hugging Face ecosystem."}
    ]},
    { id:"Phase 07", title:"3D Web Development (No Code)", resources:[
      {type:"guide", provider:"Spline", name:"Spline Community Tutorials", desc:"A comprehensive library of guides for creating immersive 3D web experiences, interactive scenes, and animations directly in the browser."}
    ]},
    { id:"Phase 08", title:"HTML, CSS, JS", resources:[
      {type:"certification", provider:"freeCodeCamp", name:"Responsive Web Design", desc:"A rigorous certification from freeCodeCamp covering HTML, CSS, Flexbox, and CSS Grid to ensure applications are mobile-friendly and perfectly responsive."},
      {type:"certification", provider:"freeCodeCamp", name:"JavaScript Algorithms", desc:"An essential credential verifying a deep understanding of JavaScript fundamentals, complex data structures, and algorithmic problem-solving techniques."}
    ]},
    { id:"Phase 8.5", title:"3D Web Development (Code)", resources:[
      {type:"course", provider:"Bruno Simon", name:"Three.js Journey (Free)", desc:"A curated selection of lessons by Bruno Simon detailing the fundamentals of WebGL and creating stunning 3D graphics and particles with Three.js."}
    ]},
    { id:"Phase 09", title:"Backend Development (Code)", resources:[
      {type:"certification", provider:"freeCodeCamp", name:"Back End Development", desc:"A practical certification focused on writing robust server-side code, building RESTful APIs, and managing databases using Node.js and Express."}
    ]},
    { id:"Phase 9.5", title:"Backend Development (Code) - Advanced", resources:[
      {type:"guide", provider:"Community", name:"Node.js Best Practices", desc:"A comprehensive, community-driven repository detailing architectural patterns, security guidelines, and performance optimization strategies for enterprise Node.js applications."}
    ]},
    { id:"Phase 10", title:"Micro SaaS Building (No Code)", resources:[
      {type:"course", provider:"Y Combinator", name:"Startup School", desc:"Y Combinator's authoritative curriculum covering product-market fit, user acquisition, metrics, and the fundamentals of scaling a technology startup."}
    ]},
    { id:"Phase 10.5", title:"Create and Deploy AI Tools for Businesses", resources:[
      {type:"guide", provider:"OpenAI", name:"OpenAI Cookbook", desc:"A highly technical repository of code examples, architectural patterns, and best practices for integrating OpenAI's APIs into production applications."}
    ]},
    { id:"Phase 11", title:"SEO and AEO in 2026", resources:[
      {type:"guide", provider:"Google", name:"Google Search Central", desc:"The official documentation from Google on SEO best practices, site indexing, and maximizing visibility in search engine results pages."}
    ]},
    { id:"Phase 11.5", title:"Digital Setups for Selling and Marketing Tech Products", resources:[
      {type:"certification", provider:"HubSpot", name:"HubSpot Sales Software Cert", desc:"A professional certification covering inbound sales methodologies, CRM management, and automating the sales pipeline to maximize conversion rates."}
    ]},
    { id:"Phase 12", title:"Full SaaS (No Code)", resources:[
      {type:"course", provider:"Bubble", name:"Bubble Academy", desc:"Extensive tutorials and courses teaching you how to architect complex logic, databases, and responsive interfaces using the Bubble no-code platform."}
    ]}
  ]
},
"track-02": {
  name: "AI Video Animation",
  phases: [
    { id:"Phase 01", title:"Foundations of AI Video Creation", resources:[
      {type:"course", provider:"Microsoft", name:"Microsoft Generative AI for Beginners", desc:"Covers the fundamentals of Generative AI, LLMs, and prompt engineering from Microsoft."},
      {type:"guide", provider:"Microsoft", name:"Microsoft companion GitHub lessons", desc:"Practical repository with code examples and notebooks for the Microsoft Generative AI course."},
      {type:"course", provider:"Google", name:"Google Skills: Introduction to Generative AI", desc:"Google's introductory guide covering AI basics, large language models, and responsible AI."},
      {type:"course", provider:"IBM", name:"IBM SkillsBuild: AI Fundamentals", desc:"Learn the basics of AI, machine learning, deep learning, and neural networks with IBM."},
      {type:"guide", provider:"C2PA", name:"C2PA Content Credentials spec", desc:"The official standard for digital provenance, deepfake labeling, and media authenticity."},
      {type:"certification", provider:"IBM", name:"IBM SkillsBuild credentials", desc:"Earned badge demonstrating foundational understanding of artificial intelligence concepts."},
      {type:"certification", provider:"Google", name:"Google Cloud Skills Boost paths", desc:"Learning paths for cloud architecture, data engineering, and generative AI on Google Cloud."}
    ]},
    { id:"Phase 02", title:"Prompt Engineering for Video Generation", resources:[
      {type:"guide", provider:"Microsoft", name:"Microsoft prompt engineering fundamentals", desc:"Learn how to write effective prompts to get desired outcomes from AI models."},
      {type:"guide", provider:"Google", name:"Google Gemini prompting guide", desc:"Official documentation on how to craft optimal prompts for Google's Gemini models."},
      {type:"guide", provider:"OpenAI", name:"OpenAI prompt engineering guide", desc:"Best practices for writing prompts for GPT models, including tactics for better reasoning."},
      {type:"course", provider:"OpenAI", name:"ChatGPT Prompt Engineering for Developers", desc:"DeepLearning.AI course on using LLM APIs to build applications and automate tasks."},
      {type:"certification", provider:"IBM", name:"IBM SkillsBuild generative AI learning", desc:"Course covering how generative AI works, its applications, and ethical considerations."}
    ]},
    { id:"Phase 03", title:"Scriptwriting & Story Development", resources:[
      {type:"guide", provider:"Community", name:"StudioBinder screenwriting guide", desc:"Comprehensive guide on screenplay formatting, narrative structure, and storytelling."},
      {type:"guide", provider:"BBC", name:"BBC Academy writing skills", desc:"Expert advice on writing for television, radio, and digital media from the BBC."},
      {type:"guide", provider:"Community", name:"Storyboard That storyboarding guide", desc:"Learn the basics of storyboarding, shot composition, and visual storytelling."},
      {type:"guide", provider:"OpenAI", name:"OpenAI prompt engineering guide for assisted writing", desc:"Tips on using AI to brainstorm, outline, and refine creative writing and scripts."},
      {type:"certification", provider:"HubSpot", name:"HubSpot Content Marketing Certification", desc:"Certification covering content strategy, storytelling, content creation, and promotion."}
    ]},
    { id:"Phase 04", title:"Storyboarding & Visual Pre-Production", resources:[
      {type:"guide", provider:"Community", name:"StudioBinder storyboard guide", desc:"Detailed guide on creating professional storyboards, shot lists, and animatics."},
      {type:"tool", provider:"Community", name:"Wonder Unit Storyboarder", desc:"Free, open-source software for rapidly drawing storyboards and planning scenes."},
      {type:"tool", provider:"Canva", name:"Canva storyboard maker", desc:"Easy-to-use tool with templates for creating clean and professional storyboards."},
      {type:"guide", provider:"Adobe", name:"Adobe storyboard guide", desc:"Insights on translating scripts into visual sequences using Adobe's creative tools."},
      {type:"certification", provider:"Adobe", name:"Adobe Certified Professional info", desc:"Information on official Adobe certification for tools like Premiere Pro and After Effects."}
    ]},
    { id:"Phase 05", title:"Cinematic Video Generation", resources:[
      {type:"course", provider:"Runway", name:"Runway Academy", desc:"Tutorials and guides on using Runway's generative AI tools for video and audio creation."},
      {type:"course", provider:"Blackmagic", name:"DaVinci Resolve training", desc:"Official Blackmagic Design training for editing, color correction, and audio post-production."},
      {type:"guide", provider:"Adobe", name:"Adobe Premiere Pro video tutorials", desc:"Official tutorials covering everything from basic editing to advanced video effects."},
      {type:"guide", provider:"Google", name:"Google Veo documentation", desc:"Guides for using Google's state-of-the-art generative AI video model, Veo."},
      {type:"certification", provider:"Blackmagic", name:"Blackmagic Design training & certification", desc:"Details on becoming a certified DaVinci Resolve professional in various disciplines."}
    ]},
    { id:"Phase 06", title:"Animation & Cartoon Story Creation", resources:[
      {type:"course", provider:"Blender", name:"Blender Studio training", desc:"High-quality training materials for 3D modeling, rigging, and animation in Blender."},
      {type:"guide", provider:"Blender", name:"Blender animation and rigging manual", desc:"Official documentation covering the intricacies of character animation in Blender."},
      {type:"guide", provider:"Adobe", name:"Adobe Character Animator tutorials", desc:"Learn how to use motion capture to bring 2D characters to life in real-time."},
      {type:"guide", provider:"Community", name:"Krita animation manual", desc:"Guide to using Krita's powerful frame-by-frame 2D animation toolset."},
      {type:"course", provider:"Community", name:"Khan Academy: Pixar in a Box", desc:"Behind-the-scenes look at how Pixar uses math and science to create animations."}
    ]},
    { id:"Phase 07", title:"Realistic Video Generation & Deepfake Technology", resources:[
      {type:"guide", provider:"Microsoft", name:"Microsoft Responsible AI overview", desc:"Microsoft's principles and practices for developing and deploying AI safely."},
      {type:"guide", provider:"Community", name:"Partnership on AI: Responsible Practices", desc:"Guidelines for the ethical development and disclosure of synthetic media (deepfakes)."},
      {type:"guide", provider:"C2PA", name:"C2PA specifications", desc:"In-depth guide covering core methodologies, practical workflows, and definitive standards."},
      {type:"guide", provider:"Google", name:"YouTube altered content policy", desc:"YouTube's rules and disclosure requirements for synthetic, AI-generated, or altered media."},
      {type:"certification", provider:"IBM", name:"IBM SkillsBuild AI Fundamentals", desc:"In-depth guide covering core methodologies, practical workflows, and definitive standards."}
    ]},
    { id:"Phase 08", title:"UGC & Social Media Video Creation", resources:[
      {type:"course", provider:"Google", name:"YouTube Creator Academy", desc:"Official YouTube courses on channel growth, production, policies, and monetization."},
      {type:"course", provider:"Community", name:"Meta Blueprint", desc:"Official training on marketing and advertising across Facebook, Instagram, and WhatsApp."},
      {type:"course", provider:"Community", name:"TikTok Academy", desc:"Educational platform for learning how to succeed as a creator or brand on TikTok."},
      {type:"course", provider:"HubSpot", name:"HubSpot Social Media Marketing course", desc:"Learn how to build a social media strategy, create engaging content, and measure ROI."},
      {type:"certification", provider:"HubSpot", name:"HubSpot Social Media Certification", desc:"Certification validating skills in social media strategy, listening, and advertising."},
      {type:"certification", provider:"Google", name:"Google Skillshop", desc:"Training and certification for Google's professional tools like Google Ads and Analytics."}
    ]},
    { id:"Phase 09", title:"Audio, Music & Voice-Over Production", resources:[
      {type:"course", provider:"Blackmagic", name:"Blackmagic Fairlight audio training", desc:"Comprehensive training on audio post-production and sound design in DaVinci Resolve."},
      {type:"guide", provider:"Community", name:"Audacity support and tutorials", desc:"Official documentation for the free, open-source, cross-platform audio editor."},
      {type:"guide", provider:"BBC", name:"BBC Academy audio skills", desc:"Tips and techniques for recording, editing, and mixing high-quality audio."},
      {type:"tool", provider:"Community", name:"Freesound sound-effects library", desc:"A massive collaborative database of audio snippets, samples, and recordings."},
      {type:"certification", provider:"Blackmagic", name:"Blackmagic Design certification", desc:"Information on obtaining official DaVinci Resolve professional certification."}
    ]},
    { id:"Phase 10", title:"Post-Production & Editing", resources:[
      {type:"course", provider:"Blackmagic", name:"DaVinci Resolve training books and videos", desc:"In-depth resources for mastering the DaVinci Resolve post-production workflow."},
      {type:"guide", provider:"Adobe", name:"Adobe Premiere Pro tutorials", desc:"In-depth guide covering core methodologies, practical workflows, and definitive standards."},
      {type:"guide", provider:"Adobe", name:"Adobe After Effects tutorials", desc:"Official guides for motion graphics, visual effects, and compositing in After Effects."},
      {type:"guide", provider:"Community", name:"Descript learning resources", desc:"Tutorials on using Descript's text-based video and audio editing platform."},
      {type:"certification", provider:"Blackmagic", name:"Blackmagic Design certification", desc:"Information on obtaining official DaVinci Resolve professional certification."}
    ]},
    { id:"Phase 11", title:"Full Cinematic Story Production", resources:[
      {type:"guide", provider:"Community", name:"StudioBinder filmmaking guides", desc:"Comprehensive resources on all aspects of pre-production, production, and post-production."},
      {type:"course", provider:"Blackmagic", name:"Blackmagic cinematic training", desc:"Training focused on achieving professional, cinematic results using DaVinci Resolve."},
      {type:"course", provider:"Runway", name:"Runway Academy filmmaking lessons", desc:"Specific guides on integrating generative AI into professional filmmaking workflows."},
      {type:"guide", provider:"BBC", name:"BBC Academy production skills", desc:"Expert advice on camera work, lighting, directing, and overall video production."},
      {type:"certification", provider:"Blackmagic", name:"Blackmagic Design training & certification", desc:"Details on becoming a certified DaVinci Resolve professional in various disciplines."}
    ]}
  ]
  },
  "track-03": {
    name: "Digital Marketing and Commerce",
    phases: [
      { id:"Phase 01", title:"Digital Marketing Landscape & Brand Strategy", resources:[
        {type:"certification", provider:"HubSpot", name:"HubSpot Inbound Marketing Certification", desc:"Comprehensive foundation in digital marketing strategy, inbound marketing, and audience targeting."},
        {type:"certification", provider:"Google", name:"Fundamentals of Digital Marketing", desc:"Master the basics of digital marketing with interactive advertising and strategy modules."},
        {type:"course", provider:"Codecademy", name:"Intro to Digital Marketing", desc:"Learn how to build a digital marketing campaign and track key performance indicators."}
      ]},
      { id:"Phase 02", title:"Content Marketing & Social Media Strategy", resources:[
        {type:"certification", provider:"Meta", name:"Meta Social Media Marketing Professional Certificate", desc:"Learn to build a social media strategy, create content, and analyze campaigns."},
        {type:"certification", provider:"HubSpot", name:"HubSpot Content Marketing Certification", desc:"Master the art of storytelling, content creation, repurposing, and promotion."},
        {type:"guide", provider:"TikTok", name:"TikTok Creator Academy", desc:"Deep dive into TikTok's algorithm, short-form storytelling, and community building."}
      ]},
      { id:"Phase 03", title:"Search Engine Optimization (SEO) & AI Search", resources:[
        {type:"certification", provider:"Semrush", name:"Semrush SEO Crash Course", desc:"Learn the fundamentals of SEO, keyword research, and on-page optimization."},
        {type:"course", provider:"Ahrefs", name:"Ahrefs Academy: SEO Training Course", desc:"Actionable tutorials on link building, keyword research, and technical SEO audits."},
        {type:"guide", provider:"Google", name:"Google Search Console Training", desc:"Official Google video series on diagnosing and optimizing search performance."}
      ]},
      { id:"Phase 04", title:"Paid Advertising & AI Bidding", resources:[
        {type:"certification", provider:"Google", name:"Google Ads Search Certification", desc:"Validate your expertise in building and optimizing Google Search campaigns."},
        {type:"certification", provider:"Meta", name:"Meta Blueprint: Digital Marketing Associate", desc:"Core understanding of value-driven advertising on Facebook and Instagram."},
        {type:"guide", provider:"WordStream", name:"WordStream PPC University", desc:"Deep dive into cost-per-click bidding, Quality Score optimization, and ad copy."}
      ]},
      { id:"Phase 05", title:"E-commerce & Conversion Rate Optimization", resources:[
        {type:"certification", provider:"Shopify", name:"Shopify Partner Academy: Store Operations", desc:"Learn the fundamentals of managing, growing, and optimizing a Shopify storefront."},
        {type:"certification", provider:"Google", name:"Google Analytics 4 (GA4) for E-commerce", desc:"Master tracking monetization, user behavior, and funnel drop-offs in GA4."},
        {type:"guide", provider:"VWO", name:"VWO Conversion Optimization Guide", desc:"Extensive guide on A/B testing methodologies and psychological conversion triggers."}
      ]},
      { id:"Phase 06", title:"Email, SMS & Conversational Marketing", resources:[
        {type:"certification", provider:"Klaviyo", name:"Klaviyo Product Certificate", desc:"Master list growth, segmentation, and automated flow architecture in Klaviyo."},
        {type:"certification", provider:"HubSpot", name:"HubSpot Email Marketing Certification", desc:"Deep dive into email deliverability, A/B testing, and lifecycle marketing."},
        {type:"course", provider:"ManyChat", name:"ManyChat Course", desc:"Learn to build automated Instagram and Facebook Messenger conversational flows."}
      ]},
      { id:"Phase 07", title:"Data Analytics & Attribution", resources:[
        {type:"certification", provider:"Google", name:"Google Analytics Certification", desc:"Official certification for configuring GA4 properties, tracking events, and analyzing reports."},
        {type:"course", provider:"Google", name:"Google Tag Manager Fundamentals", desc:"Learn to deploy tags, triggers, and variables without hardcoding scripts on your site."},
        {type:"guide", provider:"Google", name:"Looker Studio Tutorials", desc:"Guides on connecting data sources and building interactive visual dashboards."}
      ]},
      { id:"Phase 08", title:"Advanced AI Marketing & Agentic AI", resources:[
        {type:"course", provider:"IBM", name:"IBM AI Foundations for Business", desc:"Understand how AI is transforming business operations, marketing, and decision-making."},
        {type:"course", provider:"Google", name:"Google Cloud Generative AI Learning Path", desc:"Deep dive into Large Language Models (LLMs) and generative AI applications."},
        {type:"guide", provider:"Zapier", name:"Zapier AI Automation Guide", desc:"Practical guides on connecting AI models (like OpenAI) to thousands of marketing apps."}
      ]},
      { id:"Phase 09", title:"Emerging Tech & Omnichannel", resources:[
        {type:"certification", provider:"Hootsuite", name:"Hootsuite Platform Certification", desc:"Validate your ability to manage complex, multi-channel social media strategies."},
        {type:"course", provider:"HubSpot", name:"HubSpot Frictionless Sales", desc:"Learn how to align marketing, sales, and service for a unified customer experience."},
        {type:"guide", provider:"Contentful", name:"Contentful Headless CMS Guide", desc:"Understand the architecture of decoupling content creation from multi-device presentation."}
      ]},
      { id:"Phase 10", title:"Creative Production & Design", resources:[
        {type:"course", provider:"Canva", name:"Canva Design School", desc:"Comprehensive tutorials on graphic design principles, branding, and rapid asset creation."},
        {type:"guide", provider:"Adobe", name:"Adobe Express Fundamentals", desc:"Official guides for creating stunning social graphics and short videos."},
        {type:"course", provider:"Figma", name:"Figma UI/UX Crash Course", desc:"Learn the basics of layout, typography, and interface design in Figma."}
      ]},
      { id:"Phase 11", title:"Marketing Infrastructure & Landing Pages", resources:[
        {type:"guide", provider:"Unbounce", name:"Unbounce Landing Page Course", desc:"Deep dive into landing page anatomy, copywriting formulas, and conversion psychology."},
        {type:"guide", provider:"Microsoft", name:"Microsoft Clarity Analytics Guide", desc:"Learn to use session recordings and heatmaps to analyze user behavior."},
        {type:"course", provider:"Webflow", name:"Webflow University 101", desc:"Learn to build professional, custom landing pages visually without writing code."}
      ]},
      { id:"Phase 12", title:"Scaling & Agency Building", resources:[
        {type:"certification", provider:"HubSpot", name:"HubSpot Agency Partner Certification", desc:"Learn methodologies for packaging services, acquiring clients, and scaling an agency."},
        {type:"guide", provider:"Google", name:"Google Partners Program Info", desc:"Information on becoming a certified Google Partner to build trust with agency clients."},
        {type:"course", provider:"Acquisition.com", name:"Alex Hormozi's $100M Offers", desc:"Master the psychology of crafting irresistible offers and high-ticket pricing models."}
      ]}
    ]
  }
};

export default function CertificationsPage() {
  const [activeTrack, setActiveTrack] = useState('track-01');
  const [activeType, setActiveType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const activeData = DATA[activeTrack] || DATA['track-01'];

  let totalShown = 0;
  
  const filteredPhases = useMemo(() => {
    if (!activeData?.phases) return [];
    return activeData.phases.map((phase: any) => {
      const filteredResources = (phase.resources || []).filter((r: any) => {
        const typeMatch = activeType === 'all' || r.type === activeType;
        const q = searchQuery.trim().toLowerCase();
        const textMatch = !q ||
          r.name.toLowerCase().includes(q) ||
          r.provider.toLowerCase().includes(q) ||
          r.desc.toLowerCase().includes(q) ||
          phase.title.toLowerCase().includes(q) ||
          phase.id.toLowerCase().includes(q);
        return typeMatch && textMatch;
      });
      return { ...phase, filteredResources };
    });
  }, [activeData, activeType, searchQuery]);

  filteredPhases.forEach((p: any) => {
    totalShown += p.filteredResources.length;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="cert-page-container w-full min-h-full"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');
        
        .cert-page-container {
          --bg-base:var(--surface);
          --bg-surface:var(--surface-container);
          --bg-elevated:var(--surface-container-high);
          --bg-card:var(--surface-container-low);
          --line:var(--outline-variant);
          --line-soft:var(--outline-variant);
          --gold:#d97706; /* darker for light mode, readable in dark */
          --mint:#059669;
          --peri:#4f46e5;
          --steel:#0284c7;
          --text-primary:var(--on-surface);
          --text-muted:var(--on-surface-variant);
          --text-faint:var(--on-surface-variant);
          --radius-sm:6px;
          --radius-md:10px;
          --max-w:1180px;

          background:var(--bg-base);
          color:var(--text-primary);
          font-family:'IBM Plex Sans', sans-serif;
          line-height:1.55;
          -webkit-font-smoothing:antialiased;
          min-height: 100%;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
        }

        .cert-page-container h1, .cert-page-container h2, .cert-page-container h3, .cert-page-container .display { 
          font-family:'Space Grotesk', sans-serif; font-weight:600; letter-spacing:-0.01em; margin:0; 
        }
        .cert-page-container .mono { font-family:'JetBrains Mono', monospace; }
        .cert-page-container a { color:inherit; text-decoration: none; }
        .cert-page-container :focus-visible { outline:2px solid var(--gold); outline-offset:3px; border-radius:4px; }
        .cert-page-container .wrap { max-width:var(--max-w); margin:0 auto; padding:0 28px; }

        .cert-page-container .hero { padding:56px 0 36px; }
        .cert-page-container .eyebrow-plain { font-size:0.9rem; color:var(--gold); font-weight:500; margin-bottom:14px; }
        .cert-page-container .hero h1 { font-size:clamp(2rem, 4.5vw, 3rem); line-height:1.1; max-width:760px; color: var(--text-primary); }
        .cert-page-container .hero p { margin-top:18px; max-width:660px; color:var(--text-muted); font-size:1.02rem; }

        .cert-page-container .controls {
          position:sticky; top:0; z-index:20;
          background:var(--bg-base); backdrop-filter:blur(10px);
          border-bottom:1px solid var(--line);
          padding:16px 0;
        }
        .cert-page-container .controls-row { display:flex; gap:14px; flex-wrap:wrap; align-items:center; }
        
        .cert-page-container .search-box { position:relative; flex:1 1 260px; min-width:220px; }
        .cert-page-container .search-box input {
          width:100%; background:var(--bg-surface); border:1px solid var(--line);
          border-radius:8px; padding:11px 14px 11px 38px; color:var(--text-primary);
          font-family:'IBM Plex Sans', sans-serif; font-size:0.94rem;
        }
        .cert-page-container .search-box input::placeholder { color:var(--text-faint); }
        .cert-page-container .search-box svg { position:absolute; left:12px; top:50%; transform:translateY(-50%); width:16px; height:16px; color:var(--text-faint); }

        .cert-page-container .track-tabs { display:flex; gap:6px; background:var(--bg-surface); border:1px solid var(--line); border-radius:8px; padding:4px; }
        .cert-page-container .track-tabs button {
          background:none; border:none; color:var(--text-muted); font-family:'IBM Plex Sans', sans-serif;
          font-size:0.87rem; font-weight:500; padding:8px 14px; border-radius:6px; cursor:pointer;
          transition:all 0.3s ease;
        }
        .cert-page-container .track-tabs button:hover:not(.active) { background:rgba(255, 255, 255, 0.05); color:var(--text-primary); }
        .cert-page-container .track-tabs button.active { background:var(--bg-elevated); color:var(--text-primary); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }

        .cert-page-container .type-chips { display:flex; gap:8px; flex-wrap:wrap; }
        .cert-page-container .chip {
          background:var(--bg-surface); border:1px solid var(--line); color:var(--text-muted);
          font-size:0.82rem; font-weight:500; padding:8px 14px; border-radius:999px; cursor:pointer;
          display:flex; align-items:center; gap:7px;
          transition:all 0.3s ease;
        }
        .cert-page-container .chip:hover:not(.active) {
          background:var(--bg-elevated); border-color:var(--text-muted); color:var(--text-primary); transform:scale(1.02);
        }
        .cert-page-container .chip .dot { width:7px; height:7px; border-radius:50%; }
        .cert-page-container .chip[data-type="certification"] .dot { background:var(--gold); }
        .cert-page-container .chip[data-type="course"] .dot { background:var(--mint); }
        .cert-page-container .chip[data-type="guide"] .dot { background:var(--peri); }
        .cert-page-container .chip[data-type="tool"] .dot { background:var(--steel); }
        .cert-page-container .chip[data-type="all"] .dot { background:var(--text-faint); }
        .cert-page-container .chip.active { border-color:var(--text-primary); color:var(--text-primary); background:rgba(255, 255, 255, 0.05); transform:scale(1.02); }

        .cert-page-container .result-count { font-size:0.83rem; color:var(--text-faint); padding-top:10px; }
        .cert-page-container .result-count strong { color:var(--text-muted); }

        .cert-page-container main { padding:36px 0 90px; }
        
        .cert-page-container .phase {
          border:1px solid var(--line); border-radius:var(--radius-md);
          background:var(--bg-surface); backdrop-filter:blur(10px); margin-bottom:14px; overflow:hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .cert-page-container .phase:hover {
          border-color:var(--text-faint); box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
        .cert-page-container .phase summary {
          list-style:none; cursor:pointer; padding:20px 24px;
          display:flex; align-items:center; justify-content:space-between; gap:16px;
          transition: background 0.3s ease;
        }
        .cert-page-container .phase summary:hover { background:rgba(255, 255, 255, 0.03); }
        .cert-page-container .phase summary::-webkit-details-marker { display:none; }
        
        .cert-page-container .phase-id { display:flex; align-items:center; gap:16px; }
        .cert-page-container .phase-id .num {
          font-size:0.78rem; font-weight:600; color:var(--gold);
          background:color-mix(in srgb, var(--gold) 15%, transparent); border:1px solid color-mix(in srgb, var(--gold) 30%, transparent);
          padding:5px 10px; border-radius:6px; white-space:nowrap;
        }
        .cert-page-container .phase-id h3 { font-size:1.05rem; font-weight:600; color: var(--text-primary); }
        .cert-page-container .phase-meta { display:flex; align-items:center; gap:14px; flex-shrink:0; }
        .cert-page-container .phase-count { font-size:0.8rem; color:var(--text-faint); }
        .cert-page-container .chev { width:16px; height:16px; color:var(--text-faint); transition:transform .2s ease; flex-shrink:0; }
        .cert-page-container .phase[open] .chev { transform:rotate(180deg); }

        .cert-page-container .resource-grid {
          display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));
          gap:12px; padding:0 24px 24px;
        }
        .cert-page-container .card {
          background:var(--bg-card); backdrop-filter:blur(8px); border:1px solid var(--line-soft); border-radius:var(--radius-sm);
          padding:18px; display:flex; flex-direction:column; gap:10px;
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease, background 0.3s ease;
        }
        .cert-page-container .card:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.1);
          border-color: var(--line);
          background: var(--bg-elevated);
        }
        .cert-page-container .card-top { display:flex; align-items:center; justify-content:space-between; gap:10px; }
        .cert-page-container .type-badge {
          font-size:0.7rem; font-weight:600; text-transform:uppercase; letter-spacing:0.03em;
          padding:4px 9px; border-radius:5px;
        }
        .cert-page-container .type-badge.certification { color:var(--gold); background:color-mix(in srgb, var(--gold) 15%, transparent); }
        .cert-page-container .type-badge.course { color:var(--mint); background:color-mix(in srgb, var(--mint) 15%, transparent); }
        .cert-page-container .type-badge.guide { color:var(--peri); background:color-mix(in srgb, var(--peri) 15%, transparent); }
        .cert-page-container .type-badge.tool { color:var(--steel); background:color-mix(in srgb, var(--steel) 15%, transparent); }
        .cert-page-container .provider { font-size:0.78rem; color:var(--text-faint); font-weight:500; }
        .cert-page-container .card h4 { font-size:0.98rem; font-weight:600; line-height:1.3; color: var(--text-primary); margin: 0; }
        .cert-page-container .card p { margin:0; font-size:0.85rem; color:var(--text-muted); line-height:1.5; flex-grow:1; }
        .cert-page-container .card a.access {
          margin-top:8px; display:inline-flex; align-items:center; justify-content:center; gap:6px;
          font-size:0.83rem; font-weight:600; color:var(--text-primary);
          text-decoration:none; padding:10px 16px; border:1px solid var(--line-soft);
          border-radius: 99px; background: rgba(255,255,255,0.03);
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .cert-page-container .card a.access svg { width:13px; height:13px; transition:transform .15s ease; }
        .cert-page-container .card a.access:hover { color:var(--gold); background: rgba(232, 176, 75, 0.1); border-color: rgba(232, 176, 75, 0.3); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(232, 176, 75, 0.15); }
        .cert-page-container .card a.access:hover svg { transform:translate(2px,-2px); }

        .cert-page-container .no-results {
          text-align:center; padding:60px 20px; color:var(--text-faint); font-size:0.95rem;
        }

        @media (max-width:640px){
          .cert-page-container .controls-row { flex-direction:column; align-items:stretch; }
          .cert-page-container .track-tabs { justify-content:stretch; }
          .cert-page-container .track-tabs button { flex:1; }
          .cert-page-container .resource-grid { grid-template-columns:1fr; }
          .cert-page-container .phase summary { flex-wrap:wrap; }
        }
      `}} />

      <div className="wrap pt-8">
        <header className="hero">
          <div className="eyebrow-plain">Certifications</div>
          <h1>The Complete Directory of Credentials</h1>
          <p>
            An intense, in-depth directory of every official certification, definitive guide, and professional resource
            taught across all tracks. Use this glossary to understand exactly what each credential covers and how it
            validates your expertise.
          </p>
        </header>
      </div>

      <div className="controls">
        <div className="wrap">
          <div className="controls-row">
            <div className="search-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
              <input 
                type="text" 
                placeholder="Search resources, providers, phases…" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="track-tabs">
              {Object.keys(DATA).map(trackKey => (
                <button 
                  key={trackKey}
                  className={activeTrack === trackKey ? 'active' : ''}
                  onClick={() => setActiveTrack(trackKey)}
                >
                  {DATA[trackKey].name}
                </button>
              ))}
            </div>
          </div>
          <div className="controls-row" style={{ marginTop: '12px' }}>
            <div className="type-chips">
              {[
                { id: 'all', label: 'All types' },
                { id: 'certification', label: 'Certification' },
                { id: 'course', label: 'Course' },
                { id: 'guide', label: 'Guide' },
                { id: 'tool', label: 'Tool' }
              ].map(type => (
                <div 
                  key={type.id}
                  className={`chip ${activeType === type.id ? 'active' : ''}`}
                  data-type={type.id}
                  onClick={() => setActiveType(type.id)}
                >
                  <span className="dot"></span>
                  {type.label}
                </div>
              ))}
            </div>
          </div>
          <div className="result-count">
            {searchQuery || activeType !== 'all' ? (
              <React.Fragment>
                <strong>{totalShown}</strong> resource{totalShown !== 1 ? 's' : ''} found
              </React.Fragment>
            ) : (
              <React.Fragment>
                <strong>{activeData.phases.reduce((a: any, p: any) => a + p.resources.length, 0)}</strong> resources across <strong>{activeData.phases.length}</strong> phases in {activeData.name}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>

      <div className="wrap">
        <main>
          {totalShown === 0 ? (
            <div className="no-results" style={{ display: 'block' }}>
              No resources match your search. Try a different keyword or type filter.
            </div>
          ) : (
            filteredPhases.map((phase: any, i: number) => {
              if (phase.filteredResources.length === 0) return null;
              
              const isFirstOrMatchesSearch = searchQuery ? true : i === 0;

              return (
                <details key={phase.id} className="phase" open={isFirstOrMatchesSearch}>
                  <summary>
                    <div className="phase-id">
                      <span className="num mono">{phase.id}</span>
                      <h3>{phase.title}</h3>
                    </div>
                    <div className="phase-meta">
                      <span className="phase-count">{phase.filteredResources.length} resource{phase.filteredResources.length !== 1 ? 's' : ''}</span>
                      <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </summary>
                  <div className="resource-grid">
                    {phase.filteredResources.map((r: any, j: number) => (
                      <div key={j} className="card">
                        <div className="card-top">
                          <span className={`type-badge ${r.type}`}>{r.type}</span>
                          <span className="provider">{r.provider}</span>
                        </div>
                        <h4>{r.name}</h4>
                        <p>{r.desc}</p>
                        <a className="access" href="#" target="_blank" rel="noopener noreferrer">
                          Access Resource 
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M7 17 17 7M9 7h8v8"/>
                          </svg>
                        </a>
                      </div>
                    ))}
                  </div>
                </details>
              );
            })
          )}
        </main>
      </div>
    </motion.div>
  );
}
