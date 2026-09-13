import { motion } from 'motion/react';
import { ArrowRight, Code, Zap, Globe, Sparkles, MonitorPlay, Video, Megaphone, Twitter, Linkedin, Github, Apple, Play } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
  onNavigate?: (view: string, path: string, track?: 'fullstack' | 'video' | 'marketing') => void;
}

export default function LandingPage({ onEnter, onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-secondary selection:text-white font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-surface/80 border-b border-outline-variant/30">
        <div className="flex items-center gap-3">
          <img src="/main_logo.png" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="font-headline font-black text-xl tracking-wide">DayZero</span>
        </div>

        {/* Desktop Semantic Nav Links (Crawled by Search Engines) */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
          <a
            href="/tracks/ai-fullstack"
            onClick={(e) => { e.preventDefault(); onNavigate ? onNavigate('dashboard', '/tracks/ai-fullstack', 'fullstack') : onEnter(); }}
            className="hover:text-primary transition-colors"
          >
            AI Full-Stack
          </a>
          <a
            href="/tracks/video-animation"
            onClick={(e) => { e.preventDefault(); onNavigate ? onNavigate('dashboard', '/tracks/video-animation', 'video') : onEnter(); }}
            className="hover:text-primary transition-colors"
          >
            AI Video
          </a>
          <a
            href="/tracks/digital-marketing"
            onClick={(e) => { e.preventDefault(); onNavigate ? onNavigate('dashboard', '/tracks/digital-marketing', 'marketing') : onEnter(); }}
            className="hover:text-primary transition-colors"
          >
            Marketing
          </a>
          <a
            href="/faq"
            onClick={(e) => { e.preventDefault(); onNavigate ? onNavigate('faq', '/faq') : onEnter(); }}
            className="hover:text-primary transition-colors"
          >
            FAQ & AEO
          </a>
          <a
            href="/prompt-library"
            onClick={(e) => { e.preventDefault(); onNavigate ? onNavigate('prompt-library', '/prompt-library') : onEnter(); }}
            className="hover:text-primary transition-colors"
          >
            Prompts
          </a>
          <a
            href="/certifications"
            onClick={(e) => { e.preventDefault(); onNavigate ? onNavigate('certifications', '/certifications') : onEnter(); }}
            className="hover:text-primary transition-colors"
          >
            Certifications
          </a>
        </div>

        <button 
          onClick={onEnter}
          className="px-4 py-2 md:px-6 md:py-2.5 rounded-full bg-primary text-on-primary font-label text-[10px] md:text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-md"
        >
          Enter Platform
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-start pt-32 md:pt-40 pb-10 px-6 overflow-hidden">
        {/* Background Image with Low Opacity */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none mix-blend-luminosity" 
          style={{ 
            backgroundImage: 'url(/app_look.png)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center top' 
          }} 
        />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <motion.h1 
              initial={{ opacity: 0, rotateX: 45, y: 30 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-headline font-normal leading-[1.1] md:leading-[1] tracking-tighter text-on-surface mb-6 md:mb-8"
              style={{ perspective: 1000 }}
            >
              Where Logic <br />
              <em className="text-secondary italic">Meets Execution.</em>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mx-auto text-base md:text-xl text-on-surface-variant leading-relaxed mb-10 md:mb-12 px-2"
            >
              Stop consuming endless tutorials. Start building production-ready AI applications. 
              A highly curated, structured pathway to mastery designed for those who want to launch SaaS products, automate agencies, and engineer the future.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <button 
                onClick={onEnter}
                className="px-6 py-3 md:px-8 md:py-4 rounded-full bg-primary text-on-primary font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg text-sm md:text-base w-full sm:w-auto justify-center"
              >
                Start Building Now
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button 
                onClick={onEnter}
                className="px-6 py-3 md:px-8 md:py-4 rounded-full bg-surface-container border border-outline-variant text-on-surface hover:border-secondary/50 transition-all font-bold text-sm md:text-base w-full sm:w-auto justify-center"
              >
                Explore Modules
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 md:mt-8 relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-outline-variant/30 shadow-md bg-surface-container-high"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10 pointer-events-none" />
            <img src="/hero.png" alt="DayZero Platform Preview" className="w-full h-auto object-contain relative z-0" />
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div 
          animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          animate={{ y: [0, 40, 0], rotate: [0, -15, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>

      {/* Methodology Section */}
      <section className="pt-2 pb-12 md:pt-4 md:pb-16 px-6 bg-surface border-t border-outline-variant/30 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-10 md:mb-12 flex justify-center">
              <motion.button 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                onClick={onEnter}
                className="px-8 py-3 md:px-10 md:py-4 rounded-full bg-primary text-on-primary font-bold text-sm md:text-base flex items-center gap-2 border border-primary/20 hover:scale-105 transition-transform"
              >
                <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                Claim Your Spot
              </motion.button>
            </div>
            <h2 className="text-2xl md:text-4xl font-headline mb-4 md:mb-6">
              Beyond Traditional Learning.
            </h2>
            <p className="text-on-surface-variant text-base md:text-xl leading-relaxed px-2">
              The landscape of technology is shifting faster than traditional education can adapt. DayZero is built on a singular premise: the best way to learn is by deploying real products to real users. We bridge the gap between theoretical knowledge and practical execution, equipping you with the exact frameworks used by top-tier engineers and digital entrepreneurs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-12 md:py-16 px-6 bg-surface-container border-t border-outline-variant/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center md:text-left"
            >
              <h2 className="text-3xl md:text-5xl font-headline leading-tight mb-4 md:mb-6">
                The Science <br className="hidden md:block" /> of <em className="text-secondary italic">Building</em>.
              </h2>
              <p className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-8 px-2 md:px-0">
                We've decoded the process of moving from an idea to a deployed, scalable AI product. 
                Our adaptive learning environment focuses on high-contrast execution rather than passive reading. By focusing strictly on what moves the needle, you eliminate noise and accelerate your path to revenue.
              </p>
              <ul className="space-y-6">
                {[
                  { icon: Code, title: "Modern Tech Stack", desc: "Master React, Tailwind, Node.js, and integrate bleeding-edge AI models directly into your workflow." },
                  { icon: Zap, title: "Rapid Iteration", desc: "Learn to build fast, break things cleanly, and deploy instantly. Speed of execution is your ultimate competitive advantage." },
                  { icon: Globe, title: "Production Ready", desc: "Every project is designed to handle real users, real data, and real-world scale from day one." }
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 border border-outline-variant">
                      <item.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-on-surface mb-1">{item.title}</h4>
                      <p className="text-sm text-on-surface-variant">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              whileHover={{ rotateY: 5, rotateX: 5, scale: 1.02 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden border border-outline-variant p-2 shadow-md bg-surface-container-high"
              style={{ perspective: 1000 }}
            >
              <div className="w-full h-full rounded-xl overflow-hidden relative flex items-center justify-center">
                <img 
                  src="/app_look.png" 
                  alt="Platform Interface" 
                  className="w-full h-auto object-contain grayscale opacity-80 mix-blend-luminosity hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-12 md:py-16 px-6 bg-surface border-t border-outline-variant/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-10"
          >
            <h2 className="text-3xl md:text-5xl font-headline mb-4">
              Execution <em className="text-secondary italic">Metrics</em>.
            </h2>
            <p className="text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto px-2">
              Our curriculum is measured by tangible outcomes, not hours watched. 
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 max-w-5xl mx-auto">
            {[
              { label: "Production Blueprints", value: "10+", percentage: "10%" },
              { label: "Real-World Projects", value: "30+", percentage: "30%" },
              { label: "Hours of Focused Execution", value: "60+", percentage: "60%" },
              { label: "Deployment Success Rate", value: "100%", percentage: "100%" }
            ].map((metric, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-end justify-between">
                  <span className="text-on-surface-variant font-bold text-sm md:text-base uppercase tracking-wider">{metric.label}</span>
                  <span className="text-4xl md:text-5xl font-headline font-normal tracking-tighter text-on-surface leading-none">{metric.value}</span>
                </div>
                {/* Metric Bar */}
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: metric.percentage }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                    className="h-full bg-secondary rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracks Section */}
      <section className="py-12 md:py-16 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-10"
          >
            <h2 className="text-3xl md:text-5xl font-headline mb-4 md:mb-6">
              Our <em className="text-secondary italic">Curated</em> Tracks.
            </h2>
            <p className="text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto px-2">
              Choose your path to mastery. Each track is meticulously designed with real-world applications, production-ready templates, and actionable roadmaps that take you from zero to deployment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8" style={{ perspective: '2000px' }}>
            {/* Track 1 */}
            <motion.div 
              whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02, z: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass-card rounded-2xl overflow-hidden group shadow-lg"
            >
              <div className="aspect-[4/3] bg-surface-container-high relative overflow-hidden">
                <img 
                  src="/track1.png" 
                  alt="Full-Stack AI Mastery"
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                  <MonitorPlay className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="text-2xl font-headline font-bold mb-3">Full-Stack AI Mastery</h3>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                  Build complete, scalable AI SaaS products. From database architecture to front-end execution and AI model integration.
                </p>
                <button onClick={onEnter} className="text-xs font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors flex items-center gap-2">
                  Explore Track <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Track 2 */}
            <motion.div 
              whileHover={{ rotateX: 5, rotateY: 0, scale: 1.02, z: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass-card rounded-2xl overflow-hidden group shadow-lg"
            >
              <div className="aspect-[4/3] bg-surface-container-high relative overflow-hidden">
                <img 
                  src="/track2.png" 
                  alt="AI Video Animation"
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                  <Video className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="text-2xl font-headline font-bold mb-3">AI Video Animation</h3>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                  Master programmatic video generation. Create viral faceless channels and automate content production pipelines at scale.
                </p>
                <button onClick={onEnter} className="text-xs font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors flex items-center gap-2">
                  Explore Track <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Track 3 */}
            <motion.div 
              whileHover={{ rotateX: 5, rotateY: 5, scale: 1.02, z: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass-card rounded-2xl overflow-hidden group shadow-lg"
            >
              <div className="aspect-[4/3] bg-surface-container-high relative overflow-hidden">
                <img 
                  src="/track3.png" 
                  alt="Digital Marketing and Ecommerce"
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                  <Megaphone className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="text-2xl font-headline font-bold mb-3">Digital Marketing and Ecommerce</h3>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                  Leverage AI to run highly targeted campaigns. Build automated outreach systems, generate copy, and scale agency operations.
                </p>
                <button onClick={onEnter} className="text-xs font-bold uppercase tracking-widest text-primary hover:text-secondary transition-colors flex items-center gap-2">
                  Explore Track <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-12 md:py-16 px-6 bg-surface-container border-t border-outline-variant/30 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-10"
          >
            <h2 className="text-3xl md:text-5xl font-headline mb-4 md:mb-6">
              Success <em className="text-secondary italic">Stories</em>.
            </h2>
            <p className="text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto px-2">
              Hear directly from engineers and founders who have shipped their products to the real world.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8" style={{ perspective: '2000px' }}>
            {[
              {
                name: "Marcus T.",
                track: "Full-Stack AI Mastery",
                image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop"
              },
              {
                name: "Sarah L.",
                track: "Digital Marketing",
                image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1769&auto=format&fit=crop"
              },
              {
                name: "David K.",
                track: "AI Video Animation",
                image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2064&auto=format&fit=crop"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ rotateX: 5, rotateY: i % 2 === 0 ? 5 : -5, scale: 1.02, z: 20 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative aspect-[9/16] md:aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer shadow-lg"
              >
                <img 
                  src={testimonial.image} 
                  alt={`${testimonial.name} Testimonial`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>

                {/* Text Information */}
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h4 className="text-xl font-bold text-white mb-1">{testimonial.name}</h4>
                  <p className="text-sm font-label uppercase tracking-widest text-secondary">{testimonial.track}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Apps Notice Section */}
      <section className="py-12 md:py-16 px-6 bg-surface-container-low border-t border-outline-variant/30 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <h2 className="text-2xl md:text-4xl font-headline mb-8 md:mb-10">
            Take <em className="text-secondary italic">DayZero</em> With You.
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-10 md:mb-12 w-full sm:w-auto">
             {/* Apple App Store Button */}
             <button className="flex items-center gap-3 px-4 py-2.5 md:px-6 md:py-3 bg-black text-white rounded-xl hover:scale-[1.02] transition-transform border border-white/10 shadow-lg min-w-[180px] md:min-w-[200px] justify-center">
               <Apple className="w-6 h-6 md:w-8 md:h-8" />
               <div className="text-left flex flex-col justify-center">
                 <span className="text-[9px] md:text-[10px] leading-none text-white/70 mb-1 uppercase tracking-wider">Download on the</span>
                 <span className="text-lg md:text-xl font-bold leading-none tracking-tight">App Store</span>
               </div>
             </button>

             {/* Google Play Button */}
             <button className="flex items-center gap-3 px-4 py-2.5 md:px-6 md:py-3 bg-black text-white rounded-xl hover:scale-[1.02] transition-transform border border-white/10 shadow-lg min-w-[180px] md:min-w-[200px] justify-center">
               <Play className="w-5 h-5 md:w-7 md:h-7 ml-1" />
               <div className="text-left flex flex-col justify-center">
                 <span className="text-[9px] md:text-[10px] leading-none text-white/70 mb-1 uppercase tracking-wider">GET IT ON</span>
                 <span className="text-lg md:text-xl font-bold leading-none tracking-tight">Google Play</span>
               </div>
             </button>
          </div>

          <div className="inline-block px-4 py-2 md:px-6 md:py-2.5 rounded-full border border-secondary/50 bg-secondary/10 text-secondary font-label text-xs md:text-sm uppercase tracking-widest cursor-default mb-6 md:mb-8 shadow-sm">
            In Development
          </div>

          <p className="text-on-surface-variant text-sm md:text-base max-w-lg mx-auto uppercase tracking-widest font-label leading-relaxed">
            V1 is under development. <br className="hidden md:block" />This is our V0 product.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-surface-container border-t border-outline-variant">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-outline-variant/50">
            {/* Brand column */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img src="/main_logo.png" alt="DayZero Logo" className="w-8 h-8 object-contain" />
                <span className="font-headline font-black text-xl tracking-wide">DayZero</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                The builder operating system for mastering AI full-stack development, commercial video generation, and digital marketing retainers.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://twitter.com/al-ammr" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile" className="w-8 h-8 rounded-full bg-surface border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a href="https://linkedin.com/in/al-ammr" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="w-8 h-8 rounded-full bg-surface border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a href="https://www.github.com/al-ammr/ai-fullstack-developer" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" className="w-8 h-8 rounded-full bg-surface border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                  <Github className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Curriculum Tracks */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface mb-4">Curriculum Tracks</h4>
              <ul className="space-y-2 text-xs text-on-surface-variant">
                <li>
                  <a href="/tracks/ai-fullstack" onClick={(e) => { e.preventDefault(); onNavigate ? onNavigate('dashboard', '/tracks/ai-fullstack', 'fullstack') : onEnter(); }} className="hover:text-primary transition-colors">
                    AI & Full-Stack (14 Phases)
                  </a>
                </li>
                <li>
                  <a href="/tracks/video-animation" onClick={(e) => { e.preventDefault(); onNavigate ? onNavigate('dashboard', '/tracks/video-animation', 'video') : onEnter(); }} className="hover:text-primary transition-colors">
                    AI Video Generation (10 Modules)
                  </a>
                </li>
                <li>
                  <a href="/tracks/digital-marketing" onClick={(e) => { e.preventDefault(); onNavigate ? onNavigate('dashboard', '/tracks/digital-marketing', 'marketing') : onEnter(); }} className="hover:text-primary transition-colors">
                    Digital Marketing & Growth (10 Phases)
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources & Guides */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface mb-4">Resources & Guides</h4>
              <ul className="space-y-2 text-xs text-on-surface-variant">
                <li>
                  <a href="/faq" onClick={(e) => { e.preventDefault(); onNavigate ? onNavigate('faq', '/faq') : onEnter(); }} className="hover:text-primary transition-colors">
                    Frequently Asked Questions (FAQ & AEO)
                  </a>
                </li>
                <li>
                  <a href="/prompt-library" onClick={(e) => { e.preventDefault(); onNavigate ? onNavigate('prompt-library', '/prompt-library') : onEnter(); }} className="hover:text-primary transition-colors">
                    AI Prompt Library (50+ Prompts)
                  </a>
                </li>
                <li>
                  <a href="/certifications" onClick={(e) => { e.preventDefault(); onNavigate ? onNavigate('certifications', '/certifications') : onEnter(); }} className="hover:text-primary transition-colors">
                    Industry Certifications Directory
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
            <p>&copy; {new Date().getFullYear()} DayZero Platform. All Rights Reserved.</p>
            <p className="font-mono text-[11px] text-text-muted">Built for Builders & AI Discoverability</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
