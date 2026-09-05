import React from 'react';
import { motion } from 'motion/react';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  Video, 
  TrendingUp, 
  BookOpen, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Users, 
  CheckCircle2, 
  Quote, 
  ExternalLink,
  Code2,
  Workflow,
  Target
} from 'lucide-react';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.001-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.9 2.9c-.3-.2-.7-.3-1.2-.1L2.4 10.4c-.6.2-.6.6-.5.9.1.3.3.5.7.6l4.7 1.5 1.8 5.8c.1.4.4.6.7.6.2 0 .4-.1.6-.3l2.6-2.5 4.6 3.4c.2.2.5.2.8.1.3-.1.5-.4.5-.7L22.5 3.9c0-.4-.2-.8-.6-1zM8.6 13l9-5.6-7.3 6.9-.3 3-1.4-4.3z"/>
  </svg>
);

export default function AboutUs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="text-on-surface font-sans space-y-12"
    >
      {/* Hero Banner Card */}
      <div className="relative rounded-3xl overflow-hidden border border-outline-variant/20 bg-surface-container/70 backdrop-blur-xl p-8 sm:p-12 lg:p-16 shadow-lg">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          {/* Eyebrow & Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/15 text-primary text-xs font-mono font-medium border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              BUILDER OPERATING SYSTEM
            </span>
            <span className="text-xs font-mono text-on-surface-variant/70">
              EST. DAYZERO
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-on-surface leading-[1.15] mb-6">
            Turning knowledge into shipped, <span className="text-primary">monetizable products</span>.
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-on-surface-variant leading-relaxed max-w-3xl mb-10 font-normal">
            DayZero (a product from the parent company TechOptyx) isn't another passive tutorial repository. It is a rigorous, structured execution framework engineered for builders who want to create, deploy, and monetize AI-driven software, cinematic animation, and commerce infrastructure.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="#community" 
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary/90 text-white text-sm font-semibold hover:bg-primary hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] active:scale-95 transition-all shadow-md backdrop-blur-md border border-primary/20"
            >
              Join the Builder Community
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#operating-system" 
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 bg-white/5 text-on-surface text-sm font-semibold hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-95 backdrop-blur-md transition-all shadow-sm"
            >
              Explore the Architecture
            </a>
          </div>
        </div>

        {/* Highlight Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-outline-variant/15 relative z-10">
          <div className="p-4 rounded-2xl bg-surface-container-low/50 border border-outline-variant/10">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-primary mb-1">03</div>
            <div className="text-xs font-medium text-on-surface-variant">Specialized Tracks</div>
          </div>
          <div className="p-4 rounded-2xl bg-surface-container-low/50 border border-outline-variant/10">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-500 mb-1">43+</div>
            <div className="text-xs font-medium text-on-surface-variant">Execution Modules</div>
          </div>
          <div className="p-4 rounded-2xl bg-surface-container-low/50 border border-outline-variant/10">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-secondary mb-1">100%</div>
            <div className="text-xs font-medium text-on-surface-variant">Practical Build Workflows</div>
          </div>
          <div className="p-4 rounded-2xl bg-surface-container-low/50 border border-outline-variant/10">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-500 mb-1">$0 &rarr; Rev</div>
            <div className="text-xs font-medium text-on-surface-variant">Monetization Focus</div>
          </div>
        </div>
      </div>

      {/* The Vision & Manifesto */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 rounded-3xl p-8 sm:p-10 bg-surface-container/60 hover:bg-surface-container/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-xl border border-outline-variant/20 flex flex-col justify-between group">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold uppercase tracking-wider mb-4">
              <Target className="w-4 h-4" />
              The Mission Manifesto
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mb-6 leading-snug">
              Bridging the gap between information consumption and real-world execution.
            </h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed text-sm sm:text-base">
              <p>
                In an era where technology evolves faster than traditional education can adapt, the majority of aspiring technologists spend years trapped in passive learning loops — consuming endless videos, reading documentation, but never deploying revenue-generating assets.
              </p>
              <p>
                DayZero was conceived to break that inertia. Every single module and phase has one non-negotiable objective: producing autonomous builders who understand fundamentals, leverage advanced AI models, assemble modular systems, and launch live products.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-outline-variant/15 flex items-center gap-3 text-xs text-on-surface-variant font-mono">
            <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
            Zero filler theory • Production code • Commercial viability
          </div>
        </div>

        {/* Vision Quote Card */}
        <div className="lg:col-span-5 rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-surface-container-high/60 to-surface-container/60 hover:from-surface-container-high/80 hover:to-surface-container/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-xl border border-outline-variant/20 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity text-primary pointer-events-none">
            <Quote className="w-24 h-24" />
          </div>

          <div className="relative z-10">
            <span className="text-xs font-mono text-amber-500 font-semibold uppercase tracking-wider block mb-4">
              Guiding Principle
            </span>
            <blockquote className="text-xl sm:text-2xl font-medium text-on-surface leading-snug tracking-tight mb-6">
              "To empower individuals by transforming passive learning into active creation, providing the structured framework needed to build, deploy, and monetize AI-driven digital products."
            </blockquote>
          </div>

          <div className="relative z-10 pt-4 border-t border-outline-variant/15">
            <p className="text-xs font-mono text-on-surface-variant uppercase tracking-wider">The DayZero Standard</p>
          </div>
        </div>
      </div>

      {/* Operating System & 3 Tracks */}
      <div id="operating-system" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-primary font-semibold uppercase tracking-wider mb-2">
              Curriculum Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
              Three Tracks. One Complete Builder Operating System.
            </h2>
          </div>
          <p className="text-sm text-on-surface-variant max-w-md">
            Engineered modularly so you can specialize deeply or combine tracks into an unstoppable agency-grade skill stack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Track 1 */}
          <div className="rounded-3xl p-7 bg-surface-container/60 hover:bg-surface-container/90 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 backdrop-blur-xl border border-outline-variant/20 hover:border-primary/40 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <Code2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                  PH 00 &rarr; PH 12
                </span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2 tracking-tight group-hover:text-primary transition-colors">
                Full-Stack AI Mastery
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                From foundational digital tools to generative prompt engineering, no-code web architectures, autonomous agentic AI (n8n, Make, LangChain), Git workflows, modern backend design, and full Micro SaaS deployment.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant/15 flex items-center justify-between text-xs font-mono text-on-surface-variant">
              <span>19 Comprehensive Phases</span>
              <span className="text-primary font-semibold">Live Systems &rarr;</span>
            </div>
          </div>

          {/* Track 2 */}
          <div className="rounded-3xl p-7 bg-surface-container/60 hover:bg-surface-container/90 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 backdrop-blur-xl border border-outline-variant/20 hover:border-amber-500/40 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-105 transition-transform">
                  <Video className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 font-medium">
                  M 01 &rarr; M 12
                </span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2 tracking-tight group-hover:text-amber-500 transition-colors">
                AI Video Animation
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                End-to-end cinematic generation: multi-model benchmarking (Midjourney, Runway, Kling, Luma), scriptwriting, consistent character seeds, UGC viral ads, AI voice dubbing, DaVinci Resolve color grading, and showreels.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant/15 flex items-center justify-between text-xs font-mono text-on-surface-variant">
              <span>12 Directed Modules</span>
              <span className="text-amber-500 font-semibold">Cinema Grade &rarr;</span>
            </div>
          </div>

          {/* Track 3 */}
          <div className="rounded-3xl p-7 bg-surface-container/60 hover:bg-surface-container/90 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 backdrop-blur-xl border border-outline-variant/20 hover:border-emerald-500/40 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium">
                  M 01 &rarr; M 12
                </span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2 tracking-tight group-hover:text-emerald-500 transition-colors">
                Digital Marketing & Commerce
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Full-funnel customer acquisition: strategic brand positioning, programmatic SEO clusters, Meta & Google ad campaigns, Shopify conversion rate optimization, automated Klaviyo flows, GA4 attribution, and scaling an agency.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant/15 flex items-center justify-between text-xs font-mono text-on-surface-variant">
              <span>12 High-Yield Modules</span>
              <span className="text-emerald-500 font-semibold">Revenue Funnels &rarr;</span>
            </div>
          </div>
        </div>
      </div>

      {/* Founder & Lead Architect Section */}
      <div className="rounded-3xl p-8 sm:p-12 bg-surface-container/70 border border-outline-variant/20 relative overflow-hidden">
        <div className="max-w-4xl">
          <div className="text-xs font-mono text-primary font-semibold uppercase tracking-wider mb-6 flex items-center gap-2">
            <Workflow className="w-4 h-4" />
            Leadership & Systems Architecture
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar Badge */}
            <div className="shrink-0 flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-primary via-primary-container to-secondary p-[2px] shadow-lg">
                <div className="w-full h-full rounded-[14px] bg-surface flex items-center justify-center font-mono font-bold text-2xl text-on-surface overflow-hidden">
                  <img src="/founder's_image.png" alt="Amr Suleiman" className="w-full h-full object-cover" />
                </div>
              </div>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                Founder
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mb-1">
                  Amr Suleiman
                </h3>
                <p className="text-xs font-mono text-on-surface-variant uppercase tracking-wider">
                  Founder & Chief Systems Architect, DayZero
                </p>
              </div>

              <div className="space-y-4 text-on-surface-variant leading-relaxed text-sm sm:text-base">
                <p>
                  Amr Suleiman is the founder of DayZero (a product from the parent company TechOptyx) and the principal architect behind its structured curriculum. His background spans applied software engineering, digital automation systems, and pragmatic AI execution.
                </p>
                <p>
                  Rejecting conventional academic models that emphasize memorization over deployment, Amr focuses relentlessly on eliminating friction between theory and production. The entire DayZero platform was designed to give builders an actionable roadmap to engineer, validate, and scale monetizable software and content assets.
                </p>
              </div>

              {/* Founder Quote */}
              <div className="p-5 rounded-2xl bg-surface-container-high/50 border border-outline-variant/15">
                <p className="text-base sm:text-lg font-medium text-on-surface italic">
                  "Build quickly, validate in the real world, and scale through systems rather than effort."
                </p>
                <span className="text-xs font-mono text-primary mt-2 block font-medium">
                  — Amr Suleiman
                </span>
              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <div className="text-xs font-mono text-on-surface-variant/70 uppercase tracking-wider mb-3">
                  Connect with Amr
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <a 
                    href="https://www.linkedin.com/in/al-ammr?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container-high border border-outline-variant/20 text-xs font-medium text-on-surface hover:text-primary hover:border-primary/30 transition-all"
                  >
                    <Linkedin className="w-4 h-4 text-[#0077B5]" />
                    LinkedIn
                  </a>
                  <a 
                    href="https://x.com/Ammr_Suleiman?t=TX3PBhKjkGYf7lZC0sCU_w&s=09" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container-high border border-outline-variant/20 text-xs font-medium text-on-surface hover:text-primary hover:border-primary/30 transition-all"
                  >
                    <XIcon className="w-3.5 h-3.5" />
                    X / Twitter
                  </a>
                  <a 
                    href="https://www.instagram.com/al.ammr.tech?igsh=anJhaHRidmpiNHV3" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container-high border border-outline-variant/20 text-xs font-medium text-on-surface hover:text-primary hover:border-primary/30 transition-all"
                  >
                    <Instagram className="w-4 h-4 text-[#E4405F]" />
                    Instagram
                  </a>
                  <a 
                    href="https://www.tiktok.com/@al.ammr.tech?_r=1&_t=ZS-95K32EpYxRx" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container-high border border-outline-variant/20 text-xs font-medium text-on-surface hover:text-primary hover:border-primary/30 transition-all"
                  >
                    <TikTokIcon className="w-3.5 h-3.5" />
                    TikTok
                  </a>
                  <a 
                    href="https://www.facebook.com/al.ammr.tech" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container-high border border-outline-variant/20 text-xs font-medium text-on-surface hover:text-primary hover:border-primary/30 transition-all"
                  >
                    <Facebook className="w-4 h-4 text-[#1877F2]" />
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DayZero Official Media & Channels */}
      <div className="rounded-3xl p-8 sm:p-10 bg-surface-container/60 hover:bg-surface-container/80 transition-all duration-300 backdrop-blur-xl border border-outline-variant/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono text-primary font-semibold uppercase tracking-wider mb-1">
              Network & Media
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
              Follow Official DayZero Channels
            </h3>
          </div>
          <span className="text-xs text-on-surface-variant font-mono">Daily Updates & Drop Announcements</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <a 
            href="https://youtube.com/@techoptyx" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-4 rounded-2xl bg-surface-container-low/40 backdrop-blur-md border border-outline-variant/20 hover:border-red-500/40 hover:bg-surface-container/80 hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Youtube className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-on-surface">YouTube</span>
            <span className="text-[10px] text-on-surface-variant font-mono mt-0.5">@techoptyx</span>
          </a>

          <a 
            href="https://x.com/techoptyx" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-4 rounded-2xl bg-surface-container-low/40 backdrop-blur-md border border-outline-variant/20 hover:border-primary/40 hover:bg-surface-container/80 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-surface-container-highest text-on-surface flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <XIcon className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-on-surface">X / Twitter</span>
            <span className="text-[10px] text-on-surface-variant font-mono mt-0.5">@techoptyx</span>
          </a>

          <a 
            href="https://www.instagram.com/techoptyx" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-4 rounded-2xl bg-surface-container-low/40 backdrop-blur-md border border-outline-variant/20 hover:border-pink-500/40 hover:bg-surface-container/80 hover:shadow-lg hover:shadow-pink-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Instagram className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-on-surface">Instagram</span>
            <span className="text-[10px] text-on-surface-variant font-mono mt-0.5">@techoptyx</span>
          </a>

          <a 
            href="https://www.tiktok.com/@techoptyx" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-4 rounded-2xl bg-surface-container-low/40 backdrop-blur-md border border-outline-variant/20 hover:border-cyan-500/40 hover:bg-surface-container/80 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <TikTokIcon className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-on-surface">TikTok</span>
            <span className="text-[10px] text-on-surface-variant font-mono mt-0.5">@techoptyx</span>
          </a>

          <a 
            href="https://www.facebook.com/techoptyx" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-4 rounded-2xl bg-surface-container-low/40 backdrop-blur-md border border-outline-variant/20 hover:border-blue-500/40 hover:bg-surface-container/80 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Facebook className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-on-surface">Facebook</span>
            <span className="text-[10px] text-on-surface-variant font-mono mt-0.5">techoptyx</span>
          </a>
        </div>
      </div>

      {/* Community Section */}
      <div id="community" className="rounded-3xl p-8 sm:p-12 bg-surface-container/60 border border-outline-variant/20 text-center relative overflow-hidden backdrop-blur-xl hover:shadow-2xl hover:border-outline-variant/40 transition-all duration-300">
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-mono font-medium border border-secondary/20">
            <Users className="w-3.5 h-3.5" />
            GLOBAL BUILDER COLLECTIVE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
            Build alongside other ambitious builders.
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-normal">
            DayZero works best in motion. Join private community channels to exchange prompts, receive feedback on live deployments, solve technical roadblocks, and discover client opportunities together.
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <a 
              href="#" 
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#5865F2]/90 hover:bg-[#5865F2] text-white text-sm font-semibold transition-all shadow-lg shadow-[#5865F2]/20 hover:shadow-[#5865F2]/40 hover:scale-[1.02] active:scale-95 backdrop-blur-md border border-[#5865F2]/30"
            >
              <DiscordIcon className="w-5 h-5" />
              Join Discord Server
            </a>
            <a 
              href="#" 
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#24A1DE]/90 hover:bg-[#24A1DE] text-white text-sm font-semibold transition-all shadow-lg shadow-[#24A1DE]/20 hover:shadow-[#24A1DE]/40 hover:scale-[1.02] active:scale-95 backdrop-blur-md border border-[#24A1DE]/30"
            >
              <TelegramIcon className="w-5 h-5" />
              Join Telegram Channel
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
