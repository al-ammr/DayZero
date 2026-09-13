import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Search, 
  HelpCircle, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  DollarSign, 
  BrainCircuit, 
  Video, 
  TrendingUp,
  Code2,
  Cpu,
  Laptop
} from 'lucide-react';

export interface FAQItem {
  question: string;
  category: 'general' | 'fullstack' | 'video' | 'marketing' | 'monetization';
  directAnswer: string;
  elaboration: string;
  stats?: string;
}

export const FAQ_DATA: FAQItem[] = [
  // General & Philosophy
  {
    question: "What is DayZero and how does the 'Earn as you Learn' model work?",
    category: "general",
    directAnswer: "DayZero is a builder operating system and structured curriculum for mastering AI full-stack engineering, AI video generation, and digital marketing. Unlike passive courses, every single phase requires building an end-to-end client deliverable with market-tested pricing and outreach scripts to earn real income from day one.",
    elaboration: "Traditional tutorials produce graduates with certificates but no paying clients or shipped portfolio items. DayZero couples all 34 phases with marketable services—ranging from local business websites ($300–$800) to enterprise RAG pipelines ($1,500–$3,500).",
    stats: "100% of curriculum phases include an explicit client deliverable and pricing strategy."
  },
  {
    question: "Is DayZero completely free to use?",
    category: "general",
    directAnswer: "Yes. DayZero provides unrestricted open access to the full 34-phase roadmap, prompt library, video guides, and outreach scripts. There is zero subscription fee, and DayZero takes 0% commission on your client earnings.",
    elaboration: "You only pay third-party tool providers (e.g., Cursor, OpenAI, Midjourney) if and when you decide to upgrade to their paid plans. Many builders complete the initial phases entirely using free tiers.",
    stats: "Free access with zero platform commissions or revenue cuts on your client contracts."
  },
  {
    question: "Do I need prior coding experience to start with DayZero?",
    category: "general",
    directAnswer: "No prior experience is necessary. The AI & Full-Stack track starts at Phase 00 with digital fundamentals, command-line tools, Git, and AI coding assistants. In addition, the AI Video and Digital Marketing tracks are entirely code-free.",
    elaboration: "Complete beginners spend 1 to 2 weeks mastering tooling (Terminal, Git, Cursor, GitHub Copilot) before writing their first lines of code. Builders with prior experience can jump straight to advanced modules like LangGraph agents and RAG pipelines.",
    stats: "Over 40% of DayZero builders start with zero previous programming background."
  },
  {
    question: "How does DayZero compare to traditional coding bootcamps?",
    category: "general",
    directAnswer: "Traditional coding bootcamps cost $10,000 to $25,000 and focus on legacy web stacks without generative AI. DayZero is self-paced, completely free, and prioritizes autonomous AI agents, LLM pipelines, and client monetization from month one.",
    elaboration: "Bootcamps train students for entry-level junior roles in a tightening hiring market. DayZero equips builders to operate as 10x solo engineers, AI consultants, and digital agency operators who build and ship solutions at high velocity.",
    stats: "Average traditional bootcamp cost is $13,584 vs. completely open access in DayZero."
  },
  {
    question: "How much time per week should I dedicate to DayZero?",
    category: "general",
    directAnswer: "Most builders dedicate 8 to 15 hours per week. Because DayZero is self-paced and broken into modular checklists, you can easily advance through 1 phase every 1 to 2 weeks while working full-time or studying.",
    elaboration: "Each module is divided into 30-to-60-minute actionable tasks. You can tackle technical tasks on weekday evenings and execute client outreach or video rendering during weekends.",
    stats: "Consistent builders ship their first client deliverable within 30 days at 10 hours/week."
  },
  {
    question: "Can I switch freely between Full-Stack, AI Video, and Marketing tracks?",
    category: "general",
    directAnswer: "Yes, you have full concurrent access to all three tracks. You can progress through them sequentially or combine them simultaneously to offer full-service client solutions.",
    elaboration: "Many successful builders cross-pollinate tracks: they build web apps in the Full-Stack track, create cinematic commercial video ads in the Video track, and launch Google/Meta ad funnels using the Marketing track.",
    stats: "3 complete specialized tracks included in a single unified dashboard."
  },
  {
    question: "What hardware or computer specifications do I need?",
    category: "general",
    directAnswer: "Any standard laptop or desktop (Mac, Windows, Linux, or Chromebook) with an internet connection is sufficient. All heavy AI model training and video rendering run in the cloud via remote APIs.",
    elaboration: "You do not need a high-end gaming PC or dedicated GPU. Development happens in lightweight editors like VS Code or Cursor, and generative media runs on cloud servers like Midjourney, Runway, and Google Cloud.",
    stats: "Runs on 100% of modern web browsers with full offline PWA caching support."
  },
  {
    question: "What free industry certifications does DayZero prepare you for?",
    category: "general",
    directAnswer: "DayZero aligns its curriculum with top industry certifications, including Google Cloud Associate Cloud Engineer, DeepLearning.AI Generative AI Specialization, AWS Certified AI Practitioner, Meta Certified Digital Marketing Associate, and HubSpot Academy.",
    elaboration: "Combining verified industry certifications with real commercial client deliverables establishes immediate credibility when pitching enterprise clients or interviewing for senior engineering roles.",
    stats: "5 top-tier industry credential pathways curated with direct study materials."
  },
  {
    question: "Can I use DayZero on mobile or offline?",
    category: "general",
    directAnswer: "Yes. DayZero is a certified Progressive Web App (PWA). You can install it directly to your home screen or desktop with a single tap, with full offline task tracking and instant load times.",
    elaboration: "The application leverages Service Workers, local state caching, and responsive layouts, enabling frictionless progress tracking even without an active internet connection.",
    stats: "Under 1.5-second initial load time with complete offline progress persistence."
  },

  // AI & Full-Stack Track
  {
    question: "What technologies and frameworks are taught in the AI & Full-Stack Track?",
    category: "fullstack",
    directAnswer: "The track covers modern TypeScript, React, Next.js/Vite, Node.js, Python, FastAPI, PostgreSQL, Supabase, and Pinecone. For AI orchestration, it covers LangChain, LlamaIndex, LangGraph multi-agent workflows, and LoRA fine-tuning.",
    elaboration: "We emphasize production architecture rather than toy demos: streaming responses, token optimization, guardrails, human-in-the-loop agent routing, and containerized Cloud Run deployments.",
    stats: "14 comprehensive phases covering frontend, backend, vector databases, and multi-agent systems."
  },
  {
    question: "What is Retrieval-Augmented Generation (RAG) and how is it monetized?",
    category: "fullstack",
    directAnswer: "Retrieval-Augmented Generation (RAG) enables Large Language Models to query private internal company documents before generating answers. Builders monetize RAG by selling custom internal document search bots to businesses for $1,500 to $5,000.",
    elaboration: "Businesses cannot feed sensitive data into public models. DayZero teaches builders how to chunk documents, generate vector embeddings, store them in Pinecone or pgvector, and query them with hybrid semantic search.",
    stats: "Enterprise RAG implementations routinely command $150–$250/hour in consulting fees."
  },
  {
    question: "What AI agent frameworks are covered (LangGraph, CrewAI, AutoGen)?",
    category: "fullstack",
    directAnswer: "DayZero focuses heavily on LangGraph and Python-based multi-agent graphs for production determinism, along with CrewAI and AutoGen for autonomous multi-role collaboration and function calling.",
    elaboration: "You will build self-correcting code agents, web-scraping research assistants, and automated customer success agents with memory management, state check-pointing, and human oversight loops.",
    stats: "Phase 12 is dedicated to advanced multi-agent graph orchestration and supervisor agents."
  },
  {
    question: "Can I build SaaS products with DayZero, or is it only for freelancing?",
    category: "fullstack",
    directAnswer: "Both. Client deliverables provide immediate cash flow to fund your journey without external capital, while Phases 10 through 14 guide you through building subscription SaaS products with Stripe, multi-tenant databases, and authentication.",
    elaboration: "Many builders start with $500–$1,000 client gigs to validate demand, then productize their custom solutions into monthly recurring SaaS tools with recurring software subscriptions.",
    stats: "Covers Stripe webhooks, user tier gating, rate-limiting, and recurring billing models."
  },
  {
    question: "What if I get stuck on a coding task or bug in a phase?",
    category: "fullstack",
    directAnswer: "DayZero includes an integrated in-app AI Path Assistant powered by Gemini. You can open the assistant on any task to get instant code reviews, architectural feedback, prompt refinements, or client pitch tailoring.",
    elaboration: "Every phase also includes verified GitHub code references, official documentation links, and comprehensive video walkthroughs to ensure you are never blocked.",
    stats: "Integrated AI Mentor with context-aware phase guidance available 24/7."
  },

  // AI Video & Commercial Generation
  {
    question: "Which tools are taught in the AI Video Animation & Generation track?",
    category: "video",
    directAnswer: "The track covers Midjourney v6 and Flux for visuals, Runway Gen-3 Alpha, Kling AI, and Luma Dream Machine for video generation, ElevenLabs for voice cloning, Hedra and LivePortrait for lip syncing, and DaVinci Resolve for final editing.",
    elaboration: "Builders learn prompt weighting, camera motion control, seamless scene transitions, sound design, and 4K upscaling to produce broadcast-quality commercial ads and social video assets.",
    stats: "AI commercial video production delivers 80% cost savings over traditional camera studio shoots."
  },
  {
    question: "How do I maintain character and style consistency across AI video scenes?",
    category: "video",
    directAnswer: "DayZero teaches multi-modal reference techniques, including Midjourney Character References (--cref), Style References (--sref), FaceID LoRAs, and seed pinning across video generation engines like Runway and Kling.",
    elaboration: "Character drift is the #1 problem for beginner video creators. Our curriculum provides exact prompt formulas and reference workflows to keep the same subject, clothing, and environment stable across an entire story.",
    stats: "Phase 04 and 05 provide step-by-step masterclasses on character consistency and brand uniformity."
  },
  {
    question: "What types of clients hire for AI video animation and what can I charge?",
    category: "video",
    directAnswer: "E-commerce brands, SaaS startups, marketing agencies, and local businesses hire for high-converting TikTok/Reels ads, product teasers, and brand explainers. Rates range from $250–$600 per 30-second video or $1,500–$3,500/month retainers.",
    elaboration: "Because traditional commercial production costs thousands of dollars, businesses gladly pay $300–$500 for an engaging, high-fidelity AI video delivered in 48 hours.",
    stats: "Commercial AI video creators routinely bill $2,000–$4,500/month on recurring content retainers."
  },
  {
    question: "Do I need expensive 3D animation software or rendering farms?",
    category: "video",
    directAnswer: "No. All generative rendering is handled in the cloud by Runway, Kling, and Midjourney servers. Final trimming and sound mixing are completed using DaVinci Resolve or CapCut, both of which have free versions.",
    elaboration: "You do not need Maya, Blender, or high-end render farms. Cloud-based diffusion and transformer models do the heavy lifting in seconds.",
    stats: "Zero specialized 3D hardware needed; completely cloud-based generation."
  },

  // Digital Marketing & AEO
  {
    question: "What is Answer Engine Optimization (AEO) and why does DayZero teach it?",
    category: "marketing",
    directAnswer: "Answer Engine Optimization (AEO) is the practice of formatting web content so conversational AI search engines (ChatGPT Search, Perplexity, Claude, Google AI Overviews) cite your brand as the definitive direct answer for user queries.",
    elaboration: "As conversational bots replace traditional ten-blue-link Google searches, standard keyword SEO is insufficient. AEO requires answer-first architecture (40–60 word direct statements), schema.org markup, and verified authority citations.",
    stats: "Gartner projects traditional search engine volume will decline 25% by 2026 due to AI search bots."
  },
  {
    question: "How does AEO differ from traditional SEO?",
    category: "marketing",
    directAnswer: "Traditional SEO targets keyword rankings and link clicks. AEO targets direct inclusion and citation within AI-generated synthesized answers through concise answers, machine-readable JSON-LD schemas, and entity credibility.",
    elaboration: "In AEO, the goal is to be the single cited ground-truth source that LLMs extract when synthesizing responses for users asking high-intent buying or recommendation questions.",
    stats: "Over 60% of modern queries in Google now show synthesized AI summaries or direct answer cards."
  },
  {
    question: "What paid advertising and acquisition channels are covered?",
    category: "marketing",
    directAnswer: "The Marketing track covers Meta Ads (Facebook & Instagram), TikTok Ads Manager, Google Search & Performance Max campaigns, cold email automation with Instantly/Smartlead, and LinkedIn B2B outreach.",
    elaboration: "You learn how to write high-converting direct-response ad copy with AI, build custom landing page funnels, set up conversion tracking pixels, and optimize ROAS (Return on Ad Spend).",
    stats: "10 dedicated phases covering customer acquisition, automated funnels, and retention."
  },
  {
    question: "How do I pitch monthly marketing and AI consulting retainers?",
    category: "marketing",
    directAnswer: "DayZero provides cold outreach email and LinkedIn message templates that pitch specific high-ROI solutions—such as automated lead qualification bots or high-converting paid ad creatives—with guaranteed turnaround times.",
    elaboration: "Instead of selling vague 'marketing services', you pitch concrete outcomes: 'We will install an automated lead booking bot and create 4 video ads to bring in 15 qualified leads this month.'",
    stats: "Retainer templates in Phase 09 and 10 benchmarked at $1,200–$3,000/month."
  },

  // Monetization & Earnings
  {
    question: "How do I make my first $1,000 using DayZero?",
    category: "monetization",
    directAnswer: "Complete Phases 01 through 03 in either the Full-Stack, Video, or Marketing track. Sell 2 to 3 fast-turnaround deliverables—such as a modern Tailwind landing page ($400) or 2 commercial AI promo videos ($300 each)—using our outreach scripts.",
    elaboration: "DayZero provides plug-and-play pitch scripts tailored for local dentists, contractors, e-commerce stores, and coaches who desperately need upgraded websites and engaging short-form video content.",
    stats: "Most diligent builders achieve their first $1,000 milestone within their first 45–60 days."
  },
  {
    question: "How much can I realistically earn as I advance through the curriculum?",
    category: "monetization",
    directAnswer: "Realistic earnings range from $300–$1,500 in your first 30–60 days, scaling to $2,500–$6,000+ monthly as you build custom RAG pipelines, multi-agent automations, or manage commercial video retainers.",
    elaboration: "We avoid exaggerated get-rich-quick claims. Revenue directly tracks your outreach consistency and execution speed. DayZero equips you with institutional pricing models so you never undercharge for technical work.",
    stats: "Curriculum projects range from $200 (micro-services) to $3,500+ (custom AI infrastructure)."
  },
  {
    question: "How do client contracts, invoicing, and payments work?",
    category: "monetization",
    directAnswer: "You bill clients directly through Stripe Invoicing, Wise, or PayPal. DayZero provides standard freelance contract templates, scope-of-work documents, and milestone payment terms (50% upfront, 50% on completion).",
    elaboration: "You maintain 100% legal ownership of your client relationships, code repositories, and bank deposits. There are no middleman fees, escrow holds, or platform restrictions.",
    stats: "Zero platform fees; 100% of client payments go directly into your account."
  },
  {
    question: "Does DayZero take a percentage or fee from the money I make from clients?",
    category: "monetization",
    directAnswer: "No. DayZero takes 0% commission. Every dollar you earn from client projects, software retainers, or SaaS subscriptions is 100% yours to keep.",
    elaboration: "Our mission is to create self-sufficient builders, autonomous developers, and digital agency owners. We never charge platform royalties or fees on your client contracts.",
    stats: "0% royalty, 0% commission on all client deliverables and earnings."
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'general', label: 'General & Model', icon: Sparkles },
    { id: 'fullstack', label: 'AI & Full-Stack', icon: BrainCircuit },
    { id: 'video', label: 'AI Video', icon: Video },
    { id: 'marketing', label: 'Marketing & AEO', icon: TrendingUp },
    { id: 'monetization', label: 'Earnings & Pricing', icon: DollarSign },
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;
      const matchesSearch = item.question.toLowerCase().includes(q) ||
                            item.directAnswer.toLowerCase().includes(q) ||
                            item.elaboration.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-surface text-text-primary py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Breadcrumbs - Tightened */}
      <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-2 text-xs text-text-muted">
        <a href="/" className="hover:text-text-primary transition-colors">Home</a>
        <span>/</span>
        <span className="text-text-primary font-medium">FAQ & AEO Hub</span>
      </nav>

      {/* Header - Tightened Spacing */}
      <header className="mb-5 text-left">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[11px] font-semibold tracking-wide uppercase mb-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          DayZero AEO & Knowledge Base
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary font-serif mb-1.5">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed">
          Direct, verifiable answers regarding DayZero, our <strong>Earn as you Learn</strong> curriculum, AI engineering, video generation, and Answer Engine Optimization (AEO).
        </p>
      </header>

      {/* Search Input - Compact Spacing */}
      <div className="relative mb-3">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search 26+ questions (e.g., RAG, monetization, bootcamps, certifications)..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-elevated border border-border focus:border-secondary focus:ring-1 focus:ring-secondary text-text-primary placeholder-text-muted outline-none transition-all text-xs sm:text-sm shadow-sm"
        />
      </div>

      {/* Category Pills - Compact */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 no-scrollbar">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-text-primary text-surface shadow-sm font-semibold'
                  : 'bg-surface-elevated border border-border text-text-secondary hover:text-text-primary hover:border-text-muted'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Question Counter */}
      <div className="flex items-center justify-between text-[11px] text-text-muted mb-2 px-1">
        <span>Showing {filteredFaqs.length} of {FAQ_DATA.length} questions</span>
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="text-secondary hover:underline">
            Clear search
          </button>
        )}
      </div>

      {/* FAQ Accordion List - Tight Spacing and Minimal Gap Before Writeup */}
      <section className="space-y-2 mb-8">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8 bg-surface-elevated rounded-lg border border-border p-6">
            <HelpCircle className="w-8 h-8 text-text-muted mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-text-primary mb-1">No matching questions found</h3>
            <p className="text-xs text-text-secondary">Try searching for keywords like "monetization", "AI", or "bootcamp".</p>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <article
                key={faq.question}
                className="bg-surface-elevated border border-border rounded-lg overflow-hidden transition-colors hover:border-text-muted/40"
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full text-left py-3 px-3.5 sm:px-4 flex items-center justify-between gap-3 focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <h2 className="text-xs sm:text-sm font-semibold text-text-primary leading-snug">
                    {faq.question}
                  </h2>
                  <ChevronDown
                    className={`w-4 h-4 text-text-muted flex-shrink-0 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-secondary' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      {/* Tightened Writeup Container */}
                      <div className="px-3.5 sm:px-4 pb-3.5 pt-1 border-t border-border/40 text-xs sm:text-sm text-text-secondary space-y-2">
                        {/* Direct Answer Callout - Tightened Padding */}
                        <div className="p-2.5 sm:p-3 rounded-md bg-surface border border-secondary/25 text-text-primary leading-relaxed font-medium">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-secondary block mb-0.5">
                            Direct Answer
                          </span>
                          {faq.directAnswer}
                        </div>

                        {/* Elaboration */}
                        <p className="leading-relaxed text-text-secondary text-xs sm:text-[13px]">
                          {faq.elaboration}
                        </p>

                        {/* Verified Stat / Data Point */}
                        {faq.stats && (
                          <div className="flex items-center gap-1.5 text-[11px] text-text-muted pt-1.5 border-t border-border/30">
                            <span className="font-semibold text-secondary">Verified Data:</span>
                            <span>{faq.stats}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })
        )}
      </section>

      {/* Key Terms & Comparison - Tightened */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 sm:p-5 rounded-lg bg-surface-elevated border border-border">
          <h3 className="text-sm font-bold text-text-primary mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-secondary" />
            Key Term: Answer Engine Optimization (AEO)
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed mb-2">
            <strong>Answer Engine Optimization (AEO)</strong> is the systematic engineering of content architecture, semantic schema, and concise phrasing to ensure a platform is chosen as the authoritative ground truth cited by conversational AI engines like ChatGPT, Claude, and Perplexity.
          </p>
          <div className="text-[11px] text-text-muted border-t border-border/60 pt-2">
            Core focus: Answer-first layout, verified JSON-LD, structured tables, and 40–60 word declarative summaries.
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-lg bg-surface-elevated border border-border">
          <h3 className="text-sm font-bold text-text-primary mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            Comparison: DayZero vs Traditional Learning
          </h3>
          <ul className="text-xs text-text-secondary space-y-1.5">
            <li className="flex items-start gap-1.5">
              <span className="text-secondary font-bold">•</span>
              <span><strong>Bootcamps:</strong> $12k+ cost, legacy web stacks, passive exercises, delayed employment search.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-secondary font-bold">•</span>
              <span><strong>YouTube:</strong> Fragmented tutorials, zero client outreach guidance, no accountability.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-secondary font-bold">•</span>
              <span><strong>DayZero:</strong> Integrated OS, AI mentor, 34 sellable deliverables, immediate revenue blueprints.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA Footer - Compact */}
      <footer className="text-center p-5 sm:p-6 rounded-xl bg-surface-elevated border border-border">
        <h3 className="text-base sm:text-lg font-bold text-text-primary mb-1">Ready to start building and monetizing?</h3>
        <p className="text-xs text-text-secondary mb-4 max-w-md mx-auto">
          Explore our interactive roadmap across AI engineering, commercial video animation, and digital marketing.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <a
            href="/tracks/ai-fullstack"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-text-primary text-surface text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Explore AI Full-Stack Track <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface border border-border text-text-primary text-xs font-semibold hover:bg-surface-elevated transition-colors"
          >
            Back to Home
          </a>
        </div>
      </footer>
    </div>
  );
}
