import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, CheckCircle2, 
  Circle, 
  ExternalLink,
  Info, 
  Play, 
  BookOpen, 
  Award, 
  Wrench, 
  TrendingUp, 
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  Rocket,
  DollarSign,
  Flag,
  Search,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Pin,
  PinOff,
  X,
  ArrowRight,
  Bot,
  Send,
  Loader2,
  Sparkles,
  Zap,
  Target,
  Clock,
  Briefcase,
  Sun,
  Moon,
  Trophy,
  Shield,
  Medal,
  Star,
  HelpCircle
} from 'lucide-react';
import { PHASES, VIDEO_PHASES, MARKETING_PHASES, Phase, Task, PROMPTS } from './constants';
import { cn } from './lib/utils';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import AboutUs from './components/AboutUs';
import CertificationsPage from './components/CertificationsPage';
import PromptLibrary from './components/PromptLibrary';
import FAQPage from './components/FAQPage';
import PremiumVideoPlayer from './components/PremiumVideoPlayer';
import AiPathAssistant from './components/AiPathAssistant';
import { isYouTubeUrl, getVideoId } from './lib/youtube';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

import LandingPage from './components/LandingPage';
import { PWAInstallButton } from './components/PWAInstallButton';
import { PWAToast } from './components/PWAToast';

function safeParse(key: string, defaultValue: any) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (e) {
    console.warn(`SafeParse fallback for ${key} from localStorage`, e);
    return defaultValue;
  }
}

function parseRouteFromUrl(): {
  view: string | 'landing' | 'dashboard' | 'about' | 'prompt-library' | 'certifications' | 'faq';
  track: 'fullstack' | 'video' | 'marketing' | null;
} {
  if (typeof window === 'undefined') return { view: 'landing', track: 'fullstack' };
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path === '/about') return { view: 'about', track: 'fullstack' };
  if (path === '/faq') return { view: 'faq', track: 'fullstack' };
  if (path === '/prompt-library') return { view: 'prompt-library', track: 'fullstack' };
  if (path === '/certifications') return { view: 'certifications', track: 'fullstack' };
  if (path === '/tracks/ai-fullstack') return { view: 'dashboard', track: 'fullstack' };
  if (path === '/tracks/video-animation') return { view: 'dashboard', track: 'video' };
  if (path === '/tracks/digital-marketing') return { view: 'dashboard', track: 'marketing' };
  if (path === '/dashboard') return { view: 'dashboard', track: 'fullstack' };
  return { view: 'landing', track: 'fullstack' };
}

export default function App() {
  const ALL_PHASES = [...PHASES, ...VIDEO_PHASES, ...MARKETING_PHASES];
  const initialRoute = parseRouteFromUrl();
  const [activePhaseId, setActivePhaseId] = useState<string | 'landing' | 'dashboard' | 'about' | 'prompt-library' | 'certifications' | 'faq'>(initialRoute.view);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [streak, setStreak] = useState<{count: number, lastDate: string | null}>(() => {
    const parsed = safeParse('techOptyxStreak', { count: 0, lastDate: null });
    if (parsed && parsed.lastDate) {
      try {
        const today = new Date().toISOString().split('T')[0];
        const last = new Date(parsed.lastDate);
        const current = new Date(today);
        const diffDays = Math.ceil(Math.abs(current.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays > 1 && today !== parsed.lastDate) {
           return { count: 0, lastDate: null };
        }
        return parsed;
      } catch (e) {
        return { count: 0, lastDate: null };
      }
    }
    return { count: 0, lastDate: null };
  });

  useEffect(() => {
    localStorage.setItem('techOptyxStreak', JSON.stringify(streak));
  }, [streak]);

  const [flaggedVideos, setFlaggedVideos] = useState<string[]>(() => safeParse('flaggedVideos', []));
  const [pinnedModules, setPinnedModules] = useState<string[]>(() => safeParse('pinnedModules', []));
  const [pinnedVideos, setPinnedVideos] = useState<string[]>(() => safeParse('pinnedVideos', []));

  useEffect(() => {
    localStorage.setItem('pinnedModules', JSON.stringify(pinnedModules));
  }, [pinnedModules]);

  useEffect(() => {
    localStorage.setItem('pinnedVideos', JSON.stringify(pinnedVideos));
  }, [pinnedVideos]);

  const togglePinModule = (e: React.MouseEvent, moduleId: string) => {
    e.stopPropagation();
    setPinnedModules(prev => 
      prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]
    );
  };

  const togglePinVideo = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    setPinnedVideos(prev => 
      prev.includes(url) ? prev.filter(v => v !== url) : [...prev, url]
    );
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem('desktopSidebarOpen');
    return saved !== null ? saved === 'true' : true;
  });

  useEffect(() => {
    localStorage.setItem('desktopSidebarOpen', String(isDesktopSidebarOpen));
  }, [isDesktopSidebarOpen]);

  // Keyboard shortcut (Ctrl+B / Cmd+B) to open/close side menu on PC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        const target = e.target as HTMLElement;
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
          return;
        }
        e.preventDefault();
        setIsDesktopSidebarOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState<'fullstack' | 'video' | 'marketing' | null>(initialRoute.track || 'fullstack');
  const [trackSearchQuery, setTrackSearchQuery] = useState("");
  const [lastCopiedPromptId, setLastCopiedPromptId] = useState<string | null>(null);
  const [videoPlayerState, setVideoPlayerState] = useState<{isOpen: boolean, url: string | null}>({isOpen: false, url: null});
  const [playingProjectId, setPlayingProjectId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'dark';
  });
  const [lastPlayedVideo, setLastPlayedVideo] = useState<{id: string, title: string, url: string} | null>(() => safeParse('lastPlayedVideo', null));
  const { width, height } = useWindowSize();

  const navigateTo = (view: string, urlPath: string, track?: 'fullstack' | 'video' | 'marketing') => {
    setActivePhaseId(view as any);
    if (track) {
      setActiveTrack(track);
    }
    if (typeof window !== 'undefined' && window.location.pathname !== urlPath) {
      window.history.pushState(null, '', urlPath);
    }
    scrollToTop();
  };

  useEffect(() => {
    const handlePopState = () => {
      const route = parseRouteFromUrl();
      setActivePhaseId(route.view as any);
      if (route.track) setActiveTrack(route.track);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (activePhaseId === 'about') {
      document.title = 'About TechOptyx — Mission, Founder & Philosophy | TechOptyx';
    } else if (activePhaseId === 'faq') {
      document.title = 'Frequently Asked Questions & AEO Knowledge Base | DayZero';
    } else if (activePhaseId === 'prompt-library') {
      document.title = 'AI Prompt Library — 50+ Tested Engineering Prompts | TechOptyx';
    } else if (activePhaseId === 'certifications') {
      document.title = 'Free Industry Certifications Directory for AI & Cloud | TechOptyx';
    } else if (activeTrack === 'video') {
      document.title = 'AI Video Animation & Commercial Generation Track | TechOptyx';
    } else if (activeTrack === 'marketing') {
      document.title = 'Digital Marketing & Answer Engine Optimization Track | TechOptyx';
    } else if (activePhaseId === 'dashboard') {
      document.title = 'Builder OS Curriculum Dashboard | TechOptyx';
    } else {
      document.title = 'TechOptyx — Earn as you Learn AI & Full-Stack Roadmap';
    }
  }, [activePhaseId, activeTrack]);

  useEffect(() => {
    const saved = safeParse('completedTasks', []);
    if (saved.length > 0) setCompletedTasks(saved);
  }, []);

  useEffect(() => {
    if (activePhaseId === 'dashboard') {
      const savedPromptId = localStorage.getItem('lastCopiedPromptId');
      if (savedPromptId) setLastCopiedPromptId(savedPromptId);
    }
  }, [activePhaseId]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (lastPlayedVideo) {
      localStorage.setItem('lastPlayedVideo', JSON.stringify(lastPlayedVideo));
    }
  }, [lastPlayedVideo]);

  useEffect(() => {
    const handleUpdate = () => {
      const saved = safeParse('lastPlayedVideo', null);
      if (saved) {
        setLastPlayedVideo(saved);
      }
    };
    window.addEventListener('lastPlayedVideoUpdated', handleUpdate);
    return () => window.removeEventListener('lastPlayedVideoUpdated', handleUpdate);
  }, []);

  const toggleFlagVideo = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    const newFlagged = flaggedVideos.includes(url)
      ? flaggedVideos.filter(id => id !== url)
      : [...flaggedVideos, url];
    setFlaggedVideos(newFlagged);
    localStorage.setItem('flaggedVideos', JSON.stringify(newFlagged));
  };

  const toggleTask = (taskId: string) => {
    const isCompleted = completedTasks.includes(taskId);
    if (!isCompleted) {
        // Marking as completed, update streak
        const today = new Date().toISOString().split('T')[0];
        if (streak.lastDate !== today) {
           const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
           setStreak(s => {
               if (s.lastDate === yesterday) {
                   return { count: s.count + 1, lastDate: today };
               }
               return { count: 1, lastDate: today };
           });
        }
    }

    const newCompleted = isCompleted
      ? completedTasks.filter(id => id !== taskId)
      : [...completedTasks, taskId];
    setCompletedTasks(newCompleted);
    localStorage.setItem('completedTasks', JSON.stringify(newCompleted));
  };

  const scrollToTop = () => {
    // Primary window and container scroll
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (typeof document !== 'undefined') {
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      document.body.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      const headerEl = document.getElementById('phase-header') || document.getElementById('phase-header-anchor');
      if (headerEl) {
        headerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    // Double check on next animation frame and after layout rendering
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      const headerEl = document.getElementById('phase-header') || document.getElementById('phase-header-anchor');
      if (headerEl) {
        headerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  useEffect(() => {
    scrollToTop();
  }, [activePhaseId, activeTrack]);

  const handleSelectPhase = (phaseId: string, track?: 'fullstack' | 'video' | 'marketing') => {
    setActivePhaseId(phaseId);
    if (track) {
      setActiveTrack(track);
    } else {
      if (phaseId.startsWith('v-p')) setActiveTrack('video');
      else if (phaseId.startsWith('marketing-p')) setActiveTrack('marketing');
      else if (phaseId.startsWith('p')) setActiveTrack('fullstack');
    }
    setIsSidebarOpen(false);
    scrollToTop();
  };

  const handleSelectTrack = (track: 'fullstack' | 'video' | 'marketing' | null, defaultPhaseId?: string) => {
    setActiveTrack(track);
    if (track && defaultPhaseId) {
      const isCurrentInTrack = 
        (track === 'fullstack' && activePhaseId.startsWith('p')) ||
        (track === 'video' && activePhaseId.startsWith('v-p')) ||
        (track === 'marketing' && activePhaseId.startsWith('marketing-p'));
      
      if (!isCurrentInTrack && activePhaseId !== 'dashboard') {
        setActivePhaseId(defaultPhaseId);
      }
    }
    setIsSidebarOpen(false);
    scrollToTop();
  };

  const activePhase = ALL_PHASES.find(p => p.id === activePhaseId) || ALL_PHASES[0];
  
  const totalTasks = ALL_PHASES.reduce((acc, p) => acc + p.tasks.length, 0);
  const progress = Math.round((completedTasks.length / totalTasks) * 100);

  const currentTrackPhases = activePhase.id.startsWith('v-p') 
    ? VIDEO_PHASES 
    : activePhase.id.startsWith('marketing-p') 
    ? MARKETING_PHASES 
    : PHASES;

  const currentPhaseIndex = currentTrackPhases.findIndex(p => p.id === activePhaseId);
  const nextPhase = currentPhaseIndex >= 0 && currentPhaseIndex < currentTrackPhases.length - 1 ? currentTrackPhases[currentPhaseIndex + 1] : null;
  const prevPhase = currentPhaseIndex > 0 ? currentTrackPhases[currentPhaseIndex - 1] : null;

  const phaseTasks = activePhase.tasks;
  const completedPhaseTasks = phaseTasks.filter(t => completedTasks.includes(t.id));
  const isPhaseCompleted = phaseTasks.length > 0 && completedPhaseTasks.length === phaseTasks.length;

  if (activePhaseId === 'landing') {
    return (
      <LandingPage 
        onEnter={() => navigateTo('dashboard', '/dashboard')} 
        onNavigate={(view, path, track) => navigateTo(view, path, track)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary-container selection:text-white animated-bg">
      {isPhaseCompleted && activePhaseId !== 'dashboard' && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.15}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 100 }}
        />
      )}
      
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 glass-panel z-50 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2 min-w-0 pr-4">
          <img src="/main_logo.png" alt="DayZero Logo" className="w-10 h-10 object-contain shrink-0" />
          <h2 className="font-headline font-black text-lg sm:text-xl tracking-wider text-on-surface truncate">
            DayZero
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <PWAInstallButton className="hidden sm:flex" />
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 shrink-0 text-on-surface-variant hover:text-on-surface transition-colors">
            {isSidebarOpen ? <X strokeWidth={1.5} className="w-6 h-6" /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-surface/60 backdrop-blur-xl z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-[260px] bg-surface-container-low border-r border-outline-variant/20 z-50 transition-all duration-300 overflow-y-auto custom-scrollbar shadow-2xl lg:shadow-none",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        isDesktopSidebarOpen ? "lg:translate-x-0" : "lg:-translate-x-full"
      )}>
        <div className="p-6 min-h-full flex flex-col">
          {/* Sidebar Header with Brand & Close Button */}
          <div className="flex items-center justify-between pb-4 mb-2 border-b border-outline-variant/10">
            <div className="flex items-center gap-2.5 min-w-0">
              <img src="/main_logo.png" alt="DayZero Logo" className="w-11 h-11 object-contain shrink-0" />
              <h2 className="font-headline font-black text-lg tracking-wider text-on-surface truncate">
                DayZero
              </h2>
            </div>
            
            {/* Desktop Close Side Menu Button */}
            <button 
              id="close-desktop-sidebar-btn"
              onClick={() => setIsDesktopSidebarOpen(false)}
              className="hidden lg:flex items-center justify-center p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors group cursor-pointer"
              title="Close side menu (Ctrl+B)"
              aria-label="Close side menu"
            >
              <PanelLeftClose className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
            </button>

            {/* Mobile Close Button */}
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
              title="Close menu"
              aria-label="Close menu"
            >
              <X strokeWidth={1.5} className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 space-y-2 pb-8">
            <button 
              onClick={() => {
                setActivePhaseId('dashboard');
                setIsSidebarOpen(false);
                scrollToTop();
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left group mb-2",
                activePhaseId === 'dashboard'
                  ? "bg-primary-container/20 text-primary shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-primary-container/10"
              )}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="text-sm font-medium">Dashboard</span>
            </button>

            {/* Track Switcher */}
            <div className="px-1 py-1.5 mb-2">
              <div className="flex items-center justify-between px-2 mb-1.5">
                <span className="text-[10px] font-bold text-on-surface-variant/70 uppercase tracking-widest">Tracks</span>
                {activeTrack && (
                  <button 
                    onClick={() => handleSelectTrack(null)}
                    className="text-[9px] text-primary hover:underline font-medium"
                  >
                    All Tracks
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-1 bg-surface-container p-1 rounded-xl border border-outline-variant/10">
                <button
                  onClick={() => handleSelectTrack('fullstack', PHASES[0].id)}
                  className={cn(
                    "px-1.5 py-1.5 rounded-lg text-[10px] font-medium transition-all text-center truncate",
                    activeTrack === 'fullstack'
                      ? "bg-primary text-on-primary shadow-sm font-bold"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                  )}
                  title="Track 1: Full-Stack AI Mastery"
                >
                  Full-Stack
                </button>
                <button
                  onClick={() => handleSelectTrack('video', VIDEO_PHASES[0].id)}
                  className={cn(
                    "px-1.5 py-1.5 rounded-lg text-[10px] font-medium transition-all text-center truncate",
                    activeTrack === 'video'
                      ? "bg-amber-500 text-white shadow-sm font-bold"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                  )}
                  title="Track 2: AI Video & Animation"
                >
                  Animation
                </button>
                <button
                  onClick={() => handleSelectTrack('marketing', MARKETING_PHASES[0].id)}
                  className={cn(
                    "px-1.5 py-1.5 rounded-lg text-[10px] font-medium transition-all text-center truncate",
                    activeTrack === 'marketing'
                      ? "bg-emerald-500 text-white shadow-sm font-bold"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                  )}
                  title="Track 3: Digital Marketing"
                >
                  Marketing
                </button>
              </div>
            </div>

            {/* Track 1: Full-Stack AI Mastery */}
            {(!activeTrack || activeTrack === 'fullstack') && (
              <>
                <button 
                  onClick={() => handleSelectTrack(activeTrack === 'fullstack' ? null : 'fullstack', PHASES[0].id)}
                  className="w-full text-left px-4 py-2 mt-2 mb-1 flex items-center justify-between rounded-lg hover:bg-primary-container/10 transition-colors group"
                >
                  <h4 className={cn(
                    "text-[10px] font-bold uppercase tracking-widest transition-colors",
                    activeTrack === 'fullstack' ? "text-primary" : "text-on-surface-variant group-hover:text-primary"
                  )}>
                    Track 1: Full-Stack AI Mastery
                  </h4>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">19 Phases</span>
                </button>
                {PHASES.map((phase) => {
                  const phaseCompletedTasks = phase.tasks.filter(t => completedTasks.includes(t.id)).length;
                  const phaseTotalTasks = phase.tasks.length;
                  const phaseProgress = phaseTotalTasks > 0 ? Math.round((phaseCompletedTasks / phaseTotalTasks) * 100) : 0;

                  return (
                    <button
                      key={phase.id}
                      onClick={() => handleSelectPhase(phase.id, 'fullstack')}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all text-left group",
                        activePhaseId === phase.id 
                          ? "bg-primary-container/20 text-primary shadow-sm" 
                          : "text-on-surface-variant hover:text-on-surface hover:bg-primary-container/10"
                      )}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <span className="font-mono text-[10px] opacity-50 shrink-0">PH {phase.number}</span>
                        <span className="text-sm font-medium truncate">{phase.title}</span>
                      </div>
                      {phaseProgress > 0 && (
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          {phaseProgress === 100 ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                          ) : (
                            <span className="text-[9px] font-mono text-on-surface-variant/70">{phaseProgress}%</span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </>
            )}

            {/* Track 2: AI Video Animation */}
            {(!activeTrack || activeTrack === 'video') && (
              <>
                <button 
                  onClick={() => handleSelectTrack(activeTrack === 'video' ? null : 'video', VIDEO_PHASES[0].id)}
                  className="w-full text-left px-4 py-2 mt-4 mb-1 border-t border-outline-variant/10 pt-4 flex items-center justify-between rounded-lg hover:bg-amber-500/10 transition-colors group"
                >
                  <h4 className={cn(
                    "text-[10px] font-bold uppercase tracking-widest transition-colors",
                    activeTrack === 'video' ? "text-amber-500" : "text-on-surface-variant group-hover:text-amber-500"
                  )}>
                    Track 2: AI Video & Animation
                  </h4>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500">12 Modules</span>
                </button>
                {VIDEO_PHASES.map((phase) => {
                  const phaseCompletedTasks = phase.tasks.filter(t => completedTasks.includes(t.id)).length;
                  const phaseTotalTasks = phase.tasks.length;
                  const phaseProgress = phaseTotalTasks > 0 ? Math.round((phaseCompletedTasks / phaseTotalTasks) * 100) : 0;

                  return (
                    <button
                      key={phase.id}
                      onClick={() => handleSelectPhase(phase.id, 'video')}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all text-left group",
                        activePhaseId === phase.id 
                          ? "bg-amber-500/20 text-amber-500 shadow-sm" 
                          : "text-on-surface-variant hover:text-on-surface hover:bg-amber-500/10"
                      )}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <span className="font-mono text-[10px] opacity-50 shrink-0">M {phase.number}</span>
                        <span className="text-sm font-medium truncate">{phase.title}</span>
                      </div>
                      {phaseProgress > 0 && (
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          {phaseProgress === 100 ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                          ) : (
                            <span className="text-[9px] font-mono text-on-surface-variant/70">{phaseProgress}%</span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </>
            )}

            {/* Track 3: Digital Marketing */}
            {(!activeTrack || activeTrack === 'marketing') && (
              <>
                <button 
                  onClick={() => handleSelectTrack(activeTrack === 'marketing' ? null : 'marketing', MARKETING_PHASES[0].id)}
                  className="w-full text-left px-4 py-2 mt-4 mb-1 border-t border-outline-variant/10 pt-4 flex items-center justify-between rounded-lg hover:bg-emerald-500/10 transition-colors group"
                >
                  <h4 className={cn(
                    "text-[10px] font-bold uppercase tracking-widest transition-colors",
                    activeTrack === 'marketing' ? "text-emerald-500" : "text-on-surface-variant group-hover:text-emerald-500"
                  )}>
                    Track 3: Digital Marketing
                  </h4>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500">12 Modules</span>
                </button>
                {MARKETING_PHASES.map((phase) => {
                  const phaseCompletedTasks = phase.tasks.filter(t => completedTasks.includes(t.id)).length;
                  const phaseTotalTasks = phase.tasks.length;
                  const phaseProgress = phaseTotalTasks > 0 ? Math.round((phaseCompletedTasks / phaseTotalTasks) * 100) : 0;

                  return (
                    <button
                      key={phase.id}
                      onClick={() => handleSelectPhase(phase.id, 'marketing')}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all text-left group",
                        activePhaseId === phase.id 
                          ? "bg-emerald-500/20 text-emerald-500 shadow-sm" 
                          : "text-on-surface-variant hover:text-on-surface hover:bg-emerald-500/10"
                      )}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <span className="font-mono text-[10px] opacity-50 shrink-0">M {phase.number}</span>
                        <span className="text-sm font-medium truncate">{phase.title}</span>
                      </div>
                      {phaseProgress > 0 && (
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          {phaseProgress === 100 ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <span className="text-[9px] font-mono text-on-surface-variant/70">{phaseProgress}%</span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </>
            )}
            <button
              onClick={() => {
                navigateTo('prompt-library', '/prompt-library');
                setIsSidebarOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left group mt-4 border-t border-outline-variant/10 pt-4",
                activePhaseId === 'prompt-library'
                  ? "bg-primary-container/20 text-primary shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-primary-container/10"
              )}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Prompt Library</span>
            </button>

            <button
              onClick={() => {
                navigateTo('about', '/about');
                setIsSidebarOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left group mt-2",
                activePhaseId === 'about'
                  ? "bg-primary-container/20 text-primary shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-primary-container/10"
              )}
            >
              <Briefcase className="w-4 h-4" />
              <span className="text-sm font-medium">About Us</span>
            </button>

            <button
              onClick={() => {
                navigateTo('certifications', '/certifications');
                setIsSidebarOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left group mt-2",
                activePhaseId === 'certifications'
                  ? "bg-primary-container/20 text-primary shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-primary-container/10"
              )}
            >
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Certifications</span>
            </button>

            <button
              onClick={() => {
                navigateTo('faq', '/faq');
                setIsSidebarOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left group mt-2",
                activePhaseId === 'faq'
                  ? "bg-primary-container/20 text-primary shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-primary-container/10"
              )}
            >
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm font-medium">FAQ & AEO Hub</span>
            </button>
          </nav>

            <div className="mt-auto pt-4 border-t border-outline-variant/20">
              <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/20">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-label text-[10px] text-on-surface-variant uppercase">Progress</span>
                  <span className="font-mono text-xs text-secondary">{progress}%</span>
                </div>
                <div className="h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Theme Toggle */}
              <div className="mt-4">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/10 hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    {theme === 'dark' ? (
                      <Moon className="w-4 h-4 text-primary" />
                    ) : (
                      <Sun className="w-4 h-4 text-amber-500" />
                    )}
                    <span className="text-xs font-medium text-on-surface">
                      {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                    </span>
                  </div>
                  <div className={cn(
                    "w-8 h-4 rounded-full relative transition-colors duration-300",
                    theme === 'dark' ? "bg-primary" : "bg-slate-300"
                  )}>
                    <div className={cn(
                      "absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-300 shadow-sm",
                      theme === 'dark' ? "left-4.5" : "left-0.5"
                    )} />
                  </div>
                </button>
              </div>

              {/* Install App Button */}
              <div className="mt-2">
                <PWAInstallButton className="w-full justify-center py-3" />
              </div>
            </div>
          </div>
        </aside>

      <div className="flex relative z-10">
        {/* Desktop Open Sidebar Button (visible on PC when side menu is closed) */}
        {!isDesktopSidebarOpen && (
          <button
            id="open-desktop-sidebar-btn"
            onClick={() => setIsDesktopSidebarOpen(true)}
            className="hidden lg:flex items-center gap-2.5 fixed top-4 left-4 z-40 px-3.5 py-2 rounded-xl bg-surface-container-high/95 hover:bg-surface-container-highest border border-outline-variant/30 text-on-surface text-xs font-semibold shadow-xl backdrop-blur-md transition-all hover:scale-105 group cursor-pointer"
            title="Open side menu (Ctrl+B)"
            aria-label="Open side menu"
          >
            <PanelLeftOpen className="w-4 h-4 text-primary group-hover:text-primary-light transition-colors" />
            <span className="font-medium">Open Menu</span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-container border border-outline-variant/20 text-on-surface-variant opacity-70">Ctrl+B</kbd>
          </button>
        )}

        {/* Main Content */}
        <main className={cn(
          "flex-1 min-w-0 w-full min-h-screen pt-20 lg:pt-0 transition-[margin] duration-300",
          isDesktopSidebarOpen ? "lg:ml-[260px]" : "lg:ml-0"
        )}>
          <div id="phase-header-anchor" className="scroll-mt-24 pointer-events-none" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
            
            <AnimatePresence mode="wait">
              {activePhaseId === 'dashboard' ? (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                  {/* Hero Section */}
                  <div className="relative rounded-md overflow-hidden p-8 lg:p-16 mb-12 border border-outline-variant/20 group">
                    <video 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-all duration-1000 group-hover:scale-105"
                    >
                      <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-surface/50" />
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative z-10"
                    >
                      <h1 className="text-5xl md:text-7xl font-headline font-normal text-on-surface leading-[1.1] tracking-tighter mb-6">
                        Build AI Products That <em>People Pay For.</em>
                      </h1>
                      <div className="text-on-surface-variant text-lg max-w-2xl mb-8 leading-relaxed space-y-4">
                        <p>Stop consuming tutorials. Start building real AI-powered products that generate income.</p>
                        <p>You’ll learn how to go from zero to a deployed product using AI, automation, and modern tools, step by step.</p>
                        <p>No theory. No wasted time.<br/>Just practical systems that turn your skills into real-world revenue.</p>
                      </div>
                      <button 
                        onClick={() => handleSelectPhase(ALL_PHASES[0].id)}
                        className="px-8 py-4 rounded-xl bg-primary-container text-on-primary-container font-bold hover:translate-y-[-2px] transition-all shadow-[0_15px_30px_-5px_rgba(108,59,255,0.3)] flex items-center gap-2 text-lg"
                      >
                        <Rocket className="w-6 h-6" />
                        Start Building & Earning Now
                      </button>
                    </motion.div>
                  </div>

                  {/* Fast Track Section */}
                  <div className="p-8 rounded-md glass-panel">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Sparkles className="w-32 h-32 text-secondary" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <Rocket className="w-4 h-4 text-secondary" />
                        <span className="font-label text-[10px] text-secondary tracking-widest uppercase">Fast Track</span>
                      </div>
                      <h2 className="text-3xl font-bold mb-3 text-on-surface">Get Results in 1 Hour</h2>
                      <p className="text-on-surface-variant mb-6 max-w-2xl">
                        Short on time? Execute these high-impact tasks to get a tangible output immediately.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <button 
                          onClick={() => setVideoPlayerState({isOpen: true, url: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU"})}
                          className="px-6 py-2.5 rounded-xl bg-secondary text-on-secondary text-sm font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-sm"
                        >
                          <Play className="w-4 h-4 fill-current" />
                          Start Now
                        </button>
                        <div className="px-6 py-2.5 rounded-xl bg-surface-container-highest/40 border border-outline-variant/20 text-[11px] font-mono flex items-center gap-2 text-on-surface">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                          Outcome: Live Wireframe
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Last Played Video Widget */}
                  <div className="p-8 rounded-md border border-outline-variant/10">
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                          <Play className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-on-surface">Last Played Video</h3>
                          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-label">Continue your learning journey</p>
                        </div>
                      </div>
                      {lastPlayedVideo && (
                        <button 
                          onClick={() => setVideoPlayerState({isOpen: true, url: lastPlayedVideo.url})}
                          className="px-4 py-2 rounded-lg bg-surface-container-highest/50 border border-outline-variant/20 text-[10px] font-bold text-primary hover:text-secondary hover:border-secondary/30 transition-all uppercase tracking-widest"
                        >
                          Open Player
                        </button>
                      )}
                    </div>
                    
                    <div className="relative z-10">
                      {lastPlayedVideo ? (
                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                          <button 
                            onClick={() => setVideoPlayerState({isOpen: true, url: lastPlayedVideo.url})}
                            className="w-full md:w-56 h-32 rounded-sm bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center group/thumb shrink-0 shadow-lg"
                          >
                            <img 
                              src={lastPlayedVideo.id.length > 11 
                                ? "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80" 
                                : `https://img.youtube.com/vi/${lastPlayedVideo.id}/mqdefault.jpg`} 
                              alt={lastPlayedVideo.title}
                              className="w-full h-full object-cover opacity-60 group-hover/thumb:opacity-90 transition-all duration-500 group-hover/thumb:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover/thumb:bg-black/0 transition-colors" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-primary/80 backdrop-blur-md flex items-center justify-center group-hover/thumb:scale-110 transition-all shadow-xl">
                                <Play className="w-6 h-6 text-white fill-current ml-1" />
                              </div>
                            </div>
                          </button>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors line-clamp-1">{lastPlayedVideo.title}</h4>
                            <p className="text-on-surface-variant mb-4 line-clamp-2 leading-relaxed">You were recently watching this tutorial. Click to resume exactly where you left off and keep building your AI product.</p>
                            <div className="flex items-center gap-3">
                              <div className="h-1 flex-1 bg-on-surface/10 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-1/3 rounded-full" />
                              </div>
                              <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Resume</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-32 flex flex-col items-center justify-center border border-dashed border-outline-variant/20 rounded-sm bg-surface-container-highest/30">
                          <Play className="w-8 h-8 text-on-surface-variant/30 mb-2" />
                          <p className="text-sm text-on-surface-variant italic">No videos played yet. Start a tutorial to see it here!</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Background Decoration */}
                  </div>

                                    {/* Pinned Items Section */}
                  {(pinnedModules.length > 0 || pinnedVideos.length > 0) && (
                    <div className="space-y-6 mb-12">
                      <div className="flex items-center gap-2">
                        <Pin className="w-5 h-5 text-primary" />
                        <h2 className="text-2xl font-bold text-on-surface">Pinned Items</h2>
                      </div>
                      
                      {pinnedModules.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Modules</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {ALL_PHASES.filter(p => pinnedModules.includes(p.id)).map((phase, i) => (
                               <div 
                                  key={i} 
                                  onClick={() => handleSelectPhase(phase.id)}
                                  className="cursor-pointer group p-5 rounded-sm border border-outline-variant/20 bg-surface-container hover:bg-surface-container-high transition-all"
                               >
                                  <div className="flex justify-between items-start mb-2 relative z-10">
                                    <span className="text-[10px] font-label text-primary uppercase tracking-widest">Phase {phase.number}</span>
                                    <button 
                                      onClick={(e) => togglePinModule(e, phase.id)}
                                      className="text-primary hover:text-primary/70 transition-colors"
                                      title="Unpin module"
                                    >
                                      <PinOff className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <h4 className="font-bold text-sm text-on-surface line-clamp-2 relative z-10">{phase.title}</h4>
                               </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {pinnedVideos.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Videos</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {ALL_PHASES.flatMap(p => p.resources).filter(r => r.type === 'yt' && pinnedVideos.includes(r.url)).filter((r, i, arr) => arr.findIndex(t => t.url === r.url) === i).map((res, j) => (
                                  <div
                                    key={j}
                                    onClick={() => setVideoPlayerState({ isOpen: true, url: res.url })}
                                    className="cursor-pointer flex items-start gap-3 p-4 rounded-sm bg-surface hover:bg-surface-container-highest border border-outline-variant/10 transition-colors text-left group relative shadow-sm"
                                  >
                                    <div className="p-2 rounded-lg bg-secondary/10 text-secondary shrink-0 group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                                      <Play className="w-4 h-4 fill-current" />
                                    </div>
                                    <span className="text-sm font-medium text-on-surface-variant group-hover:text-on-surface line-clamp-2 pr-12 leading-tight">{res.title}</span>
                                    <div className="absolute right-3 top-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button 
                                        onClick={(e) => togglePinVideo(e, res.url)}
                                        className="text-primary hover:text-primary/70 transition-colors"
                                        title="Unpin video"
                                      >
                                        <PinOff className="w-4 h-4" />
                                      </button>
                                      <button 
                                        onClick={(e) => toggleFlagVideo(e, res.url)}
                                      >
                                        <Flag className={cn("w-4 h-4", flaggedVideos.includes(res.url) ? "text-primary fill-current" : "text-on-surface-variant hover:text-primary")} />
                                      </button>
                                    </div>
                                  </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Skills Acquired Summary View */}
                  {(() => {
                    const completedPhases = ALL_PHASES.filter(p => {
                      return p.tasks.length > 0 && p.tasks.every(t => completedTasks.includes(t.id));
                    });
                    
                    if (completedPhases.length === 0) return null;

                    return (
                      <div className="space-y-6 mb-12">
                        <div className="flex items-center gap-2">
                          <Medal className="w-6 h-6 text-secondary" />
                          <h2 className="text-2xl font-bold text-on-surface">Skills Acquired</h2>
                        </div>
                        <div className="bg-surface-container/60 backdrop-blur-xl rounded-md p-6 border border-outline-variant/20 shadow-sm">
                          <div className="flex flex-wrap gap-3">
                            {completedPhases.map((phase) => (
                              <div key={phase.id} className="flex items-center gap-2 px-4 py-2 bg-secondary/10 hover:bg-secondary/20 border border-secondary/20 rounded-full transition-colors group cursor-default">
                                <Award className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium text-on-surface">{phase.objective || phase.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Curriculum Tracks */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-on-surface">Curriculum Tracks</h2>
                    
                    {/* Track Search Bar */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-on-surface-variant/50" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search modules and videos..."
                        value={trackSearchQuery}
                        onChange={(e) => setTrackSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-surface-container rounded-sm border border-outline-variant/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-on-surface placeholder:text-on-surface-variant/50"
                      />
                    </div>
                    
                    {/* Track Selection Tabs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Full-Stack AI Developer Tab */}
                      <button 
                        onClick={() => setActiveTrack(activeTrack === 'fullstack' ? null : 'fullstack')}
                        className={cn(
                          "p-6 rounded-md border transition-all text-left group overflow-hidden relative",
                          activeTrack === 'fullstack' 
                            ? "bg-primary-container/20 border-primary/40 shadow-sm" 
                            : "bg-surface-container border-outline-variant/20 hover:bg-surface-container-high"
                        )}
                      >
                        <div className="relative z-10 flex flex-col gap-3">
                          <div className={cn(
                            "p-3 rounded-xl w-12 h-12 flex items-center justify-center transition-colors",
                            activeTrack === 'fullstack' ? "bg-primary text-on-primary shadow-sm" : "bg-primary/20 text-primary group-hover:bg-primary/30"
                          )}>
                            <Rocket className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-primary tracking-widest uppercase block mb-1">Track 1 • 19 Phases</span>
                            <h3 className={cn("text-xl font-bold mb-1 transition-colors", activeTrack === 'fullstack' ? "text-primary" : "text-on-surface group-hover:text-primary")}>Full-Stack AI Developer</h3>
                            <p className="text-sm text-on-surface-variant">Master AI-powered software development</p>
                          </div>
                        </div>
                      </button>

                      {/* AI Video Animation Tab */}
                      <button 
                        onClick={() => setActiveTrack(activeTrack === 'video' ? null : 'video')}
                        className={cn(
                          "p-6 rounded-md border transition-all text-left group overflow-hidden relative",
                          activeTrack === 'video' 
                            ? "bg-amber-500/10 border-amber-500/40 shadow-sm" 
                            : "bg-surface-container border-outline-variant/20 hover:bg-surface-container-high"
                        )}
                      >
                        <div className="relative z-10 flex flex-col gap-3">
                          <div className={cn(
                            "p-3 rounded-xl w-12 h-12 flex items-center justify-center transition-colors",
                            activeTrack === 'video' ? "bg-amber-500 text-white shadow-sm" : "bg-amber-500/20 text-amber-500 group-hover:bg-amber-500/30"
                          )}>
                            <Play className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-amber-500 tracking-widest uppercase block mb-1">Track 2 • 12 Modules</span>
                            <h3 className={cn("text-xl font-bold mb-1 transition-colors", activeTrack === 'video' ? "text-amber-500" : "text-on-surface group-hover:text-amber-500")}>AI Video Animation</h3>
                            <p className="text-sm text-on-surface-variant">Master AI-powered video generation and storytelling</p>
                          </div>
                        </div>
                      </button>

                      {/* Digital Marketing and Commerce Tab */}
                      <button 
                        onClick={() => setActiveTrack(activeTrack === 'marketing' ? null : 'marketing')}
                        className={cn(
                          "p-6 rounded-md border transition-all text-left group overflow-hidden relative",
                          activeTrack === 'marketing' 
                            ? "bg-emerald-500/10 border-emerald-500/40 shadow-sm" 
                            : "bg-surface-container border-outline-variant/20 hover:bg-surface-container-high"
                        )}
                      >
                        <div className="relative z-10 flex flex-col gap-3">
                          <div className={cn(
                            "p-3 rounded-xl w-12 h-12 flex items-center justify-center transition-colors",
                            activeTrack === 'marketing' ? "bg-emerald-500 text-white shadow-sm" : "bg-emerald-500/20 text-emerald-500 group-hover:bg-emerald-500/30"
                          )}>
                            <TrendingUp className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-emerald-500 tracking-widest uppercase block mb-1">Track 3 • 12 Modules</span>
                            <h3 className={cn("text-xl font-bold mb-1 transition-colors", activeTrack === 'marketing' ? "text-emerald-500" : "text-on-surface group-hover:text-emerald-500")}>Digital Marketing</h3>
                            <p className="text-sm text-on-surface-variant">Master AI-driven marketing and commerce</p>
                          </div>
                        </div>
                      </button>
                    </div>


                    {/* Active Track Content */}
                    <AnimatePresence mode="wait">
                        {activeTrack === 'fullstack' && ( <motion.div 
                          key="fullstack"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-6 md:p-8 rounded-md border border-outline-variant/20 bg-surface-container-low space-y-8"
                        >
                          {PHASES.reduce((acc, phase) => {
                            const query = trackSearchQuery.toLowerCase();
                            const matchesPhase = phase.title.toLowerCase().includes(query);
                            const matchingRes = phase.resources.filter(r => r.title.toLowerCase().includes(query));
                            
                            if (query && !matchesPhase && matchingRes.length === 0) return acc;
                            
                            const filteredPhase = query && !matchesPhase 
                              ? { ...phase, resources: matchingRes }
                              : phase;
                              
                            acc.push(filteredPhase);
                            return acc;
                          }, [] as typeof PHASES).map((phase, i) => (
                            <div key={i} className="space-y-4">
                              <div className="flex items-center justify-between">
                              <h4 
                                onClick={() => handleSelectPhase(phase.id, 'fullstack')}
                                className="font-bold text-sm text-primary uppercase tracking-widest flex items-center gap-2 cursor-pointer hover:underline group-hover:text-primary"
                                title="Open module details"
                              >
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                {phase.title}
                              </h4>
                              <button 
                                onClick={(e) => togglePinModule(e, phase.id)}
                                className={cn(
                                  "p-1.5 rounded-md transition-colors",
                                  pinnedModules.includes(phase.id) ? "bg-primary/20 text-primary" : "text-on-surface-variant hover:bg-surface hover:text-primary"
                                )}
                                title={pinnedModules.includes(phase.id) ? "Unpin module" : "Pin module"}
                              >
                                {pinnedModules.includes(phase.id) ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                              </button>
                            </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {phase.resources.filter(r => r.type === 'yt').map((res, j) => (
                                  <div
                                    key={j}
                                    onClick={() => setVideoPlayerState({ isOpen: true, url: res.url })}
                                    className="cursor-pointer flex items-start gap-3 p-4 rounded-sm bg-surface hover:bg-surface-container-highest border border-outline-variant/10 transition-colors text-left group relative shadow-sm"
                                  >
                                    <div className="p-2 rounded-lg bg-secondary/10 text-secondary shrink-0 group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                                      <Play className="w-4 h-4 fill-current" />
                                    </div>
                                    <span className="text-sm font-medium text-on-surface-variant group-hover:text-on-surface line-clamp-2 pr-6 leading-tight">{res.title}</span>
                                    <button 
                                      onClick={(e) => toggleFlagVideo(e, res.url)}
                                      className={cn(
                                        "absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity",
                                        flaggedVideos.includes(res.url) && "opacity-100"
                                      )}
                                    >
                                      <Flag className={cn("w-4 h-4", flaggedVideos.includes(res.url) ? "text-primary fill-current" : "text-on-surface-variant hover:text-primary")} />
                                    </button>
                                  </div>
                                ))} 
                                {phase.resources.filter(r => r.type === 'yt').length === 0 && (
                                  <span className="text-sm text-on-surface-variant italic p-4">No videos in this module yet.</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                      
                        {activeTrack === 'video' && ( <motion.div
                          key="video"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-6 md:p-8 rounded-md border border-outline-variant/20 bg-surface-container-low space-y-8"
                        >
                          {VIDEO_PHASES.reduce((acc, phase) => {
                            const query = trackSearchQuery.toLowerCase();
                            const matchesPhase = phase.title.toLowerCase().includes(query);
                            const matchingRes = phase.resources.filter(r => r.title.toLowerCase().includes(query));
                            
                            if (query && !matchesPhase && matchingRes.length === 0) return acc;
                            
                            const filteredPhase = query && !matchesPhase 
                              ? { ...phase, resources: matchingRes }
                              : phase;
                              
                            acc.push(filteredPhase);
                            return acc;
                          }, [] as typeof VIDEO_PHASES).map((phase, i) => (
                            <div key={i} className="space-y-4">
                              <div className="flex items-center justify-between">
                              <h4 
                                onClick={() => handleSelectPhase(phase.id, 'video')}
                                className="font-bold text-sm text-amber-500 uppercase tracking-widest flex items-center gap-2 cursor-pointer hover:underline group-hover:text-amber-500"
                                title="Open module details"
                              >
                                <span className="w-2 h-2 rounded-full bg-amber-500" />
                                {phase.title}
                              </h4>
                              <button 
                                onClick={(e) => togglePinModule(e, phase.id)}
                                className={cn(
                                  "p-1.5 rounded-md transition-colors",
                                  pinnedModules.includes(phase.id) ? "bg-amber-500/20 text-amber-500" : "text-on-surface-variant hover:bg-surface hover:text-amber-500"
                                )}
                                title={pinnedModules.includes(phase.id) ? "Unpin module" : "Pin module"}
                              >
                                {pinnedModules.includes(phase.id) ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                              </button>
                            </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {phase.resources.map((res, j) => {
                                  const isYt = res.type === 'yt';
                                  return (
                                    <div
                                      key={j}
                                      onClick={() => isYt ? setVideoPlayerState({ isOpen: true, url: res.url }) : window.open(res.url, '_blank')}
                                      className="cursor-pointer flex items-start gap-3 p-4 rounded-sm bg-surface hover:bg-surface-container-highest border border-outline-variant/10 transition-colors text-left group relative shadow-sm"
                                    >
                                      <div className={cn("p-2 rounded-lg shrink-0 transition-colors", 
                                        isYt ? "bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                                      )}>
                                        {isYt ? <Play className="w-4 h-4 fill-current" /> : <ExternalLink className="w-4 h-4" />}
                                      </div>
                                      <div className="flex flex-col min-w-0 pr-6">
                                        <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-wider mb-1">{res.type}</span>
                                        <span className="text-sm font-medium text-on-surface-variant group-hover:text-on-surface line-clamp-2 leading-tight">{res.title}</span>
                                      </div>
                                      {isYt && (
                                        <button 
                                          onClick={(e) => { e.stopPropagation(); toggleFlagVideo(e, res.url); }}
                                          className={cn(
                                            "absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-10",
                                            flaggedVideos.includes(res.url) && "opacity-100"
                                          )}
                                        >
                                          <Flag className={cn("w-4 h-4", flaggedVideos.includes(res.url) ? "text-amber-500 fill-current" : "text-on-surface-variant hover:text-amber-500")} />
                                        </button>
                                      )}
                                    </div>
                                  );
                                })}
                                {phase.resources.length === 0 && (
                                  <span className="text-sm text-on-surface-variant italic p-4">No resources in this module yet.</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}

                        {activeTrack === 'marketing' && ( <motion.div
                          key="marketing"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-6 md:p-8 rounded-md border border-outline-variant/20 bg-surface-container-low space-y-8"
                        >
                          {MARKETING_PHASES.reduce((acc, phase) => {
                            const query = trackSearchQuery.toLowerCase();
                            const matchesPhase = phase.title.toLowerCase().includes(query);
                            const matchingRes = phase.resources.filter(r => r.title.toLowerCase().includes(query));
                            
                            if (query && !matchesPhase && matchingRes.length === 0) return acc;
                            
                            const filteredPhase = query && !matchesPhase 
                              ? { ...phase, resources: matchingRes }
                              : phase;
                              
                            acc.push(filteredPhase);
                            return acc;
                          }, [] as typeof MARKETING_PHASES).map((phase, i) => (
                            <div key={i} className="space-y-4">
                              <div className="flex items-center justify-between">
                              <h4 
                                onClick={() => handleSelectPhase(phase.id, 'marketing')}
                                className="font-bold text-sm text-emerald-500 uppercase tracking-widest flex items-center gap-2 cursor-pointer hover:underline group-hover:text-emerald-500"
                                title="Open module details"
                              >
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                {phase.title}
                              </h4>
                              <button 
                                onClick={(e) => togglePinModule(e, phase.id)}
                                className={cn(
                                  "p-1.5 rounded-md transition-colors",
                                  pinnedModules.includes(phase.id) ? "bg-emerald-500/20 text-emerald-500" : "text-on-surface-variant hover:bg-surface hover:text-emerald-500"
                                )}
                                title={pinnedModules.includes(phase.id) ? "Unpin module" : "Pin module"}
                              >
                                {pinnedModules.includes(phase.id) ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                              </button>
                            </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {phase.resources.map((res, j) => {
                                  const isYt = res.type === 'yt';
                                  return (
                                    <div
                                      key={j}
                                      onClick={() => isYt ? setVideoPlayerState({ isOpen: true, url: res.url }) : window.open(res.url, '_blank')}
                                      className="cursor-pointer flex items-start gap-3 p-4 rounded-sm bg-surface hover:bg-surface-container-highest border border-outline-variant/10 transition-colors text-left group relative shadow-sm"
                                    >
                                      <div className={cn("p-2 rounded-lg shrink-0 transition-colors", 
                                        isYt ? "bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                                      )}>
                                        {isYt ? <Play className="w-4 h-4 fill-current" /> : <ExternalLink className="w-4 h-4" />}
                                      </div>
                                      <div className="flex flex-col min-w-0 pr-6">
                                        <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-wider mb-1">{res.type}</span>
                                        <span className="text-sm font-medium text-on-surface-variant group-hover:text-on-surface line-clamp-2 leading-tight">{res.title}</span>
                                      </div>
                                      {isYt && (
                                        <button 
                                          onClick={(e) => { e.stopPropagation(); toggleFlagVideo(e, res.url); }}
                                          className={cn(
                                            "absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-10",
                                            flaggedVideos.includes(res.url) && "opacity-100"
                                          )}
                                        >
                                          <Flag className={cn("w-4 h-4", flaggedVideos.includes(res.url) ? "text-emerald-500 fill-current" : "text-on-surface-variant hover:text-emerald-500")} />
                                        </button>
                                      )}
                                    </div>
                                  );
                                })}
                                {phase.resources.length === 0 && (
                                  <span className="text-sm text-on-surface-variant italic p-4">No resources in this module yet.</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: "Overall Progress", value: `${progress}%`, icon: Target, color: "text-secondary" },
                      { label: "Tasks Completed", value: completedTasks.length, icon: Flame, CheckCircle2, color: "text-primary" },
                      { label: "Active Phase", value: `Phase ${ALL_PHASES.find(p => p.tasks.some(t => !completedTasks.includes(t.id)))?.number || ALL_PHASES[ALL_PHASES.length - 1].number}`, icon: Zap, color: "text-amber-400" },
                      { label: "Potential Value", value: "₦2.5M+", icon: DollarSign, color: "text-emerald-400" }
                    ].map((stat, i) => (
                      <div key={i} className="p-6 rounded-md bg-surface-container border border-outline-variant/10 hover:border-secondary/30">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                          <stat.icon className="w-16 h-16" />
                        </div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-3">
                            <stat.icon className={cn("w-4 h-4", stat.color)} />
                            <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">{stat.label}</span>
                          </div>
                          <div className="text-3xl font-black text-on-surface">{stat.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chart & Activity */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 p-8 rounded-md">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h3 className="text-xl font-bold text-on-surface">Learning Velocity</h3>
                          <p className="text-xs text-on-surface-variant font-label uppercase tracking-wider mt-1">Tasks completed per phase</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-secondary" />
                            <span className="text-[10px] font-label text-on-surface-variant uppercase">COMPLETED</span>
                          </div>
                        </div>
                      </div>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={ALL_PHASES.map(p => ({
                            name: `PH ${p.number}`,
                            completed: p.tasks.filter(t => completedTasks.includes(t.id)).length,
                            total: p.tasks.length
                          }))}>
                            <defs>
                              <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#67ffc6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#67ffc6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,190,255,0.05)" vertical={false} />
                            <XAxis 
                              dataKey="name" 
                              stroke="rgba(203,190,255,0.2)" 
                              fontSize={10} 
                              tickLine={false} 
                              axisLine={false}
                              dy={10}
                            />
                            <YAxis 
                              stroke="rgba(203,190,255,0.2)" 
                              fontSize={10} 
                              tickLine={false} 
                              axisLine={false}
                              dx={-10}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#151b2d', 
                                border: '1px solid rgba(203,190,255,0.1)',
                                borderRadius: '12px',
                                fontSize: '12px'
                              }}
                              itemStyle={{ color: '#67ffc6' }}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="completed" 
                              stroke="#67ffc6" 
                              fillOpacity={1} 
                              fill="url(#colorComp)" 
                              strokeWidth={3}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 rounded-md">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10 text-on-surface">
                          <Clock className="w-4 h-4 text-primary" />
                          Recent Activity
                        </h3>
                        <div className="space-y-4 relative z-10">
                          {completedTasks.length === 0 ? (
                            <p className="text-xs text-on-surface-variant italic">No tasks completed yet.</p>
                          ) : (
                            completedTasks.slice(-5).reverse().map((taskId, i) => {
                              const phase = ALL_PHASES.find(p => p.tasks.some(t => t.id === taskId));
                              const task = phase?.tasks.find(t => t.id === taskId);
                              return (
                                <div key={i} className="flex items-start gap-4">
                                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-4 h-4 text-secondary" />
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-medium text-on-surface">{task?.label}</h4>
                                    <p className="text-[9px] text-on-surface-variant mt-0.5 uppercase tracking-wider font-label">Phase {phase?.number}</p>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>

                      <div className="p-6 rounded-md border border-primary-container/30">
                        <div className="flex items-center gap-2 mb-4 relative z-10">
                          <Briefcase className="w-4 h-4 text-secondary" />
                          <span className="font-label text-[10px] text-secondary tracking-widest uppercase">Career Path</span>
                        </div>
                        <h4 className="font-bold text-sm mb-2 relative z-10 text-on-surface">Ready to Monetize?</h4>
                        <p className="text-xs text-on-surface-variant leading-relaxed mb-4 relative z-10">
                          You've completed {completedTasks.length} tasks. Based on your progress, you're ready to start pitching for your next projects.
                        </p>
                        <button 
                          onClick={() => handleSelectPhase(ALL_PHASES.find(p => p.tasks.some(t => !completedTasks.includes(t.id)))?.id || ALL_PHASES[ALL_PHASES.length - 1].id)}
                          className="w-full py-3 rounded-xl bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-wider hover:scale-[1.02] transition-transform relative z-10 shadow-sm"
                        >
                          View Selling Strategy
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Next Milestones */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold flex items-center gap-2 text-on-surface">
                        <Target className="w-5 h-5 text-secondary" />
                        Next Milestones
                      </h3>
                      <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Your Roadmap</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {ALL_PHASES.filter(p => p.tasks.some(t => !completedTasks.includes(t.id))).slice(0, 3).map((p, i) => (
                        <div 
                          key={i} 
                          onClick={() => handleSelectPhase(p.id)}
                          className="p-6 rounded-md hover:border-secondary/30 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
                              <span className="text-xs font-mono text-on-surface-variant group-hover:text-secondary">{p.number}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-on-surface-variant group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                          </div>
                          <h4 className="font-bold mb-2 group-hover:text-secondary transition-colors relative z-10 text-on-surface">{p.title}</h4>
                          <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed relative z-10">{p.badge}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  
                  {/* Achievements Grid */}
                  {ALL_PHASES.filter(p => p.tasks.length > 0 && p.tasks.every(t => completedTasks.includes(t.id))).length > 0 && (
                    <div className="space-y-6 mt-12">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-on-surface">
                          <Trophy className="w-5 h-5 text-amber-400" />
                          Phase Master Achievements
                        </h3>
                        <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Unlocked Badges</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {streak.count > 0 && (
                            <div className="flex flex-col items-center justify-center p-6 rounded-md border border-emerald-500/30 hover:border-emerald-500/50 transition-all text-center">
                              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Flame className="w-12 h-12 text-emerald-500" />
                              </div>
                              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 relative z-10 shadow-sm group-hover:scale-110 transition-transform">
                                <Flame className="w-8 h-8 text-emerald-500 drop-shadow-lg" />
                              </div>
                              <span className="text-[10px] font-label text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1 relative z-10">Consistency</span>
                              <h4 className="font-bold text-xs text-on-surface line-clamp-2 relative z-10">{streak.count} Day Streak!</h4>
                            </div>
                        )}
                        {ALL_PHASES.filter(p => p.tasks.length > 0 && p.tasks.every(t => completedTasks.includes(t.id))).map((phase, i) => {
                          const ICONS = [Trophy, Shield, Medal, Star, Award, Zap];
                          const BadgeIcon = ICONS[(parseInt(phase.number) || 0) % ICONS.length];
                          
                          return (
                            <div key={i} className="flex flex-col items-center justify-center p-6 rounded-md border border-amber-400/30 hover:border-amber-400/50 transition-all text-center">
                              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Star className="w-12 h-12 text-amber-400" />
                              </div>
                              <div className="w-16 h-16 rounded-full bg-amber-400/20 flex items-center justify-center mb-4 relative z-10 shadow-sm group-hover:scale-110 transition-transform">
                                <BadgeIcon className="w-8 h-8 text-amber-400 drop-shadow-lg" />
                              </div>
                              <span className="text-[10px] font-label text-amber-400 uppercase tracking-widest mb-1 relative z-10">Phase {phase.number} Master</span>
                              <h4 className="font-bold text-xs text-on-surface line-clamp-2 relative z-10">{phase.title}</h4>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Completed Phases Breakdown */}
                  {completedTasks.length > 0 && (
                    <div className="space-y-6 mt-12">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-on-surface">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          Completed Phases Breakdown
                        </h3>
                        <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Achievements</span>
                      </div>
                      <div className="grid grid-cols-1 gap-6">
                        {ALL_PHASES.filter(p => p.tasks.some(t => completedTasks.includes(t.id))).map((phase, i) => {
                          const phaseCompletedTasks = phase.tasks.filter(t => completedTasks.includes(t.id));
                          const allTasksCompleted = phaseCompletedTasks.length === phase.tasks.length;
                          
                          return (
                            <div key={i} className="p-6 rounded-md border border-outline-variant/10">
                              <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md">PHASE {phase.number}</span>
                                    <h4 className="text-lg font-bold text-on-surface">{phase.title}</h4>
                                    {allTasksCompleted && <span className="text-[10px] font-label bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full uppercase tracking-wider">Completed</span>}
                                  </div>
                                  <p className="text-sm text-on-surface-variant mb-6">{phase.objective}</p>
                                  
                                  <h5 className="text-xs font-bold uppercase tracking-wider text-on-surface mb-3">Tasks Completed</h5>
                                  <div className="space-y-3">
                                    {phaseCompletedTasks.map(task => {
                                      // Generate a deterministic time based on task string length/id
                                      const seed = task.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                                      const hours = Math.max(1, seed % 5);
                                      const mins = (seed % 4) * 15;
                                      const timeSpent = `${hours}h ${mins > 0 ? mins + 'm' : ''}`.trim();
                                      
                                      return (
                                        <div key={task.id} className="flex justify-between items-center p-3 rounded-xl bg-surface-container/50 border border-outline-variant/5">
                                          <div className="flex items-center gap-3">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                            <span className="text-sm text-on-surface">{task.label || task.title}</span>
                                          </div>
                                          <span className="text-xs font-mono text-on-surface-variant whitespace-nowrap ml-4">Time: {timeSpent}</span>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                                
                                <div className="w-full md:w-1/3 p-5 rounded-sm bg-surface-container-low border border-outline-variant/10 self-start">
                                  <div className="flex items-center gap-2 mb-4">
                                    <Wrench className="w-4 h-4 text-primary" />
                                    <h5 className="text-xs font-bold uppercase tracking-wider text-on-surface">Skills Gained</h5>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {phase.tools && phase.tools.length > 0 ? (
                                      phase.tools.map((tool, idx) => (
                                        <span key={idx} className="text-[10px] font-label px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                                          {tool.name}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="text-xs text-on-surface-variant italic">Foundational concepts mastered</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Prompt Library Widget */}
                  <div className="mt-12 p-8 rounded-md border border-outline-variant/20">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Sparkles className="w-32 h-32 text-primary" />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-5 h-5 text-primary" />
                          <span className="font-label text-[10px] text-primary tracking-widest uppercase">AI Resources</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-on-surface">Accelerate Your Workflow</h3>
                        <p className="text-on-surface-variant mb-6 max-w-xl leading-relaxed">
                          Access our curated library of high-converting prompts for business, coding, marketing, and more. Stop guessing and start generating results instantly.
                        </p>
                        
                        {lastCopiedPromptId && PROMPTS.find(p => p.id === lastCopiedPromptId) && (
                          <div className="mb-6 p-4 rounded-sm bg-surface-container-low border border-outline-variant/10 max-w-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-3 h-3 text-secondary" />
                              <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-wider">Last Copied Prompt</span>
                            </div>
                            <h4 className="text-sm font-bold text-on-surface mb-1 truncate">
                              {PROMPTS.find(p => p.id === lastCopiedPromptId)?.title}
                            </h4>
                            <p className="text-xs text-on-surface-variant line-clamp-2">
                              {PROMPTS.find(p => p.id === lastCopiedPromptId)?.description}
                            </p>
                          </div>
                        )}

                        <button 
                          onClick={() => setActivePhaseId('prompt-library')}
                          className="px-6 py-3 rounded-xl bg-primary text-on-primary font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-sm"
                        >
                          <Sparkles className="w-4 h-4" />
                          Explore Prompt Library
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : activePhaseId === 'about' ? (
                <AboutUs key="about" />
              ) : activePhaseId === 'faq' ? (
                <FAQPage key="faq" />
              ) : activePhaseId === 'prompt-library' ? (
                <PromptLibrary key="prompt-library" />
              ) : activePhaseId === 'certifications' ? (
                <CertificationsPage key="certifications" />
              ) : (
                <motion.div
                  key={activePhase.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Phase Header */}
                  <div id="phase-header" className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 scroll-mt-24">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-label uppercase tracking-wider border font-bold",
                          activePhase.id.startsWith('v-p') 
                            ? "bg-amber-500/10 border-amber-500/30 text-amber-500" 
                            : activePhase.id.startsWith('marketing-p') 
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" 
                            : "bg-secondary/10 border-secondary/20 text-secondary"
                        )}>
                          {activePhase.id.startsWith('v-p') 
                            ? `Track 2: Animation • Module ${activePhase.number}` 
                            : activePhase.id.startsWith('marketing-p') 
                            ? `Track 3: Marketing • Module ${activePhase.number}` 
                            : `Track 1: Full-Stack • Phase ${activePhase.number}`}
                        </span>
                        <span className="text-on-surface-variant font-label text-xs tracking-widest uppercase">{activePhase.badge}</span>
                      </div>
                      <h2 className="text-4xl font-black mb-4 text-on-surface">{activePhase.title}</h2>
                      <p className="text-on-surface-variant max-w-2xl italic">"{activePhase.objective}"</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="px-4 py-2 rounded-xl bg-surface-container-highest border border-outline-variant/20 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-secondary" />
                        <span className="text-xs font-label">{activePhase.weeks}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Tasks & Resources */}
                    <div className="lg:col-span-2 space-y-10">
                      
                      {/* Tasks */}
                      <section>
                        <div className="flex items-center gap-3 mb-6">
                          <LayoutDashboard className="w-5 h-5 text-secondary" />
                          <h3 className="text-xl font-bold tracking-wide uppercase text-on-surface">Action Tasks</h3>
                        </div>
                        <div className="space-y-3">
                          {(activePhase.tasks || []).map((task) => (
                            <button
                              key={task.id}
                              onClick={() => toggleTask(task.id)}
                              className={cn(
                                "w-full flex items-center gap-4 p-5 rounded-xl border transition-colors text-left group",
                                completedTasks.includes(task.id)
                                  ? "bg-secondary/5 border-secondary/20 text-on-surface"
                                  : "bg-surface-container border-outline-variant/10 text-on-surface-variant hover:border-secondary/30 hover:shadow-sm"
                              )}
                            >
                              {completedTasks.includes(task.id) ? (
                                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                              ) : (
                                <Circle className="w-5 h-5 text-on-surface-variant/30 group-hover:text-secondary/50 shrink-0" />
                              )}
                              <span className="text-sm font-medium">{task.label || task.title}</span>
                            </button>
                                ))}  
                        </div>
                      </section>

                      {/* Resources */}
                      <section>
                        <div className="flex items-center gap-3 mb-6">
                          <BookOpen className="w-5 h-5 text-primary" />
                          <h3 className="text-xl font-bold tracking-wide uppercase text-on-surface">Learning Resources</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {((activePhase.resources && activePhase.resources.length > 0)
                            ? activePhase.resources
                            : (activePhase.freeResources || []).map(fr => ({ title: `${fr.provider}: ${fr.title}`, url: fr.url, type: 'guide' }))
                          ).map((res, idx) => {
                            const isYt = isYouTubeUrl(res.url);
                            const Component = isYt ? 'button' : 'a';
                            const props = isYt 
                              ? { onClick: () => {
                                  const videoId = getVideoId(res.url);
                                  if (videoId) {
                                    setLastPlayedVideo({ id: videoId, title: res.title, url: res.url });
                                  }
                                  setVideoPlayerState({isOpen: true, url: res.url});
                                } }
                              : { href: res.url, target: "_blank", rel: "noopener noreferrer" };
                            
                            return (
                              <Component
                                key={idx}
                                {...props}
                                className="flex items-center gap-4 p-5 rounded-xl bg-surface-container border border-outline-variant/10 hover:border-primary/30 group text-left"
                              >
                                <div className={cn(
                                  "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 relative z-10",
                                  res.type === 'yt' ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary"
                                )}>
                                  {res.type === 'yt' ? <Play className="w-4 h-4 fill-current" /> : <ExternalLink className="w-4 h-4" />}
                                </div>
                                <div className="flex flex-col min-w-0 relative z-10">
                                  <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-wider mb-1">{res.type}</span>
                                  <span className="text-sm font-medium truncate group-hover:text-primary transition-colors text-on-surface">{res.title}</span>
                                </div>
                              </Component>
                            );
                          })}
                        </div>
                      </section>

                      {/* Free Resources */}
                      {activePhase.freeResources && activePhase.freeResources.length > 0 && (
                        <section>
                          <div className="flex items-center gap-3 mb-6">
                            <Award className="w-5 h-5 text-fuchsia-400" />
                            <h3 className="text-xl font-bold tracking-wide uppercase text-on-surface">Free Certifications & Guides</h3>
                          </div>
                          <div className="grid grid-cols-1 gap-4">
                            {activePhase.freeResources.map((res, idx) => (
                              <a
                                key={idx}
                                href={res.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-5 rounded-xl border border-outline-variant/10 hover:border-fuchsia-400/30 group"
                              >
                                <div className="flex items-center gap-4 min-w-0 relative z-10 w-full pr-12">
                                  <div className="w-10 h-10 rounded-lg bg-fuchsia-400/10 text-fuchsia-400 flex items-center justify-center shrink-0">
                                    <Award className="w-5 h-5" />
                                  </div>
                                  <div className="flex flex-col min-w-0 flex-1">
                                    <span className="text-[10px] font-label text-fuchsia-400 uppercase tracking-wider mb-1">{res.type} • {res.provider}</span>
                                    <div className="flex items-center gap-2 min-w-0">
                                      <span className="text-sm font-medium truncate group-hover:text-fuchsia-400 transition-colors text-on-surface">{res.title}</span>
                                      {res.description && (
                                        <div 
                                          className="relative group/tooltip inline-flex"
                                          onClick={(e) => e.stopPropagation()} // Prevent link click if clicking icon
                                        >
                                          <Info className="w-4 h-4 text-on-surface-variant group-hover:text-fuchsia-400 shrink-0" />
                                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3 bg-surface border border-outline-variant/20 rounded-xl text-xs text-on-surface leading-relaxed shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 pointer-events-none before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-surface">
                                            {res.description}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="absolute right-5 flex items-center shrink-0 z-10">
                                  <ExternalLink className="w-4 h-4 text-on-surface-variant group-hover:text-fuchsia-400" />
                                </div>
                              </a>
                            ))}
                          </div>
                        </section>
                      )}

                      {/* Follow-Along Projects */}
                      {activePhase.followAlongProjects && activePhase.followAlongProjects.length > 0 && (
                        <section>
                          <div className="flex items-center gap-3 mb-6">
                            <Rocket className="w-5 h-5 text-emerald-400" />
                            <h3 className="text-xl font-bold tracking-wide uppercase text-on-surface">Follow-Along Projects</h3>
                          </div>
                          <div className="grid grid-cols-1 gap-6">
                            {activePhase.followAlongProjects.map((proj, idx) => (
                              <div 
                                key={idx}
                                className="p-6 rounded-md border border-outline-variant/10"
                              >
                                <div className="flex flex-col md:flex-row gap-6 relative z-10">
                                  {(() => {
                                    const videoId = getVideoId(proj.url);
                                    const isPlaying = playingProjectId === `${activePhase.id}-${idx}`;
                                    
                                    if (videoId && isPlaying) {
                                      const embedUrl = videoId.length > 11 
                                        ? `https://www.youtube.com/embed/videoseries?list=${videoId}&autoplay=1&rel=0`
                                        : `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                                      
                                      return (
                                        <div className="w-full md:w-48 h-32 rounded-xl bg-black border border-outline-variant/20 overflow-hidden shrink-0 relative">
                                          <iframe
                                            width="100%"
                                            height="100%"
                                            src={embedUrl}
                                            title={proj.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            className="absolute inset-0 w-full h-full"
                                          ></iframe>
                                        </div>
                                      );
                                    }

                                    const isYt = isYouTubeUrl(proj.url);
                                    const Component = isYt ? 'button' : 'a';
                                    const props = isYt 
                                      ? { onClick: () => {
                                          const videoId = getVideoId(proj.url);
                                          if (videoId) {
                                            setLastPlayedVideo({ id: videoId, title: proj.title, url: proj.url });
                                          }
                                          setPlayingProjectId(`${activePhase.id}-${idx}`);
                                        } }
                                      : { href: proj.url, target: "_blank", rel: "noopener noreferrer" };
                                    
                                    return (
                                      <Component 
                                        {...props}
                                        className="w-full md:w-48 h-32 rounded-xl bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center group/thumb shrink-0"
                                      >
                                        {videoId ? (
                                          <img 
                                            src={videoId.length > 11 
                                              ? "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80" 
                                              : `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} 
                                            alt={proj.title}
                                            className="w-full h-full object-cover opacity-60 group-hover/thumb:opacity-80 transition-opacity"
                                            onError={(e) => {
                                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80";
                                            }}
                                          />
                                        ) : (
                                          <div className="absolute inset-0 opacity-0 group-hover/thumb:opacity-100 transition-opacity" />
                                        )}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                          <Play className="w-8 h-8 text-white group-hover/thumb:text-emerald-400 group-hover/thumb:scale-110 transition-all drop-shadow-lg" />
                                        </div>
                                        <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-[8px] font-label text-white uppercase tracking-wider">Tutorial</div>
                                      </Component>
                                    );
                                  })()}
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors text-on-surface">{proj.title}</h4>
                                    <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">{proj.outcome}</p>
                                    <div className="space-y-2">
                                      <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">Build Steps:</span>
                                      <div className="flex flex-wrap gap-2">
                                        {proj.steps.map((step, i) => (
                                          <span key={i} className="px-2 py-1 rounded-md bg-surface-container-highest border border-outline-variant/20 text-[10px] text-on-surface-variant">
                                            {i + 1}. {step}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>
                      )}
                    </div>

                    {/* Right Column: Project & Monetization */}

                    <div className="space-y-8">
                      
                      {/* Project */}
                      <div className="p-6 rounded-md bg-surface-container border border-outline-variant/10">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                          <Award className="w-24 h-24" />
                        </div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-4">
                            <Award className="w-5 h-5 text-amber-400" />
                            <span className="font-label text-[10px] text-amber-400 tracking-widest uppercase">Deliverable</span>
                          </div>
                          <h3 className="text-2xl font-bold mb-3 text-on-surface">{activePhase.project?.title}</h3>
                          <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                            {activePhase.project?.description}
                          </p>
                          
                          <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-surface-container-highest border border-outline-variant/20">
                              <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="w-4 h-4 text-secondary" />
                                <span className="font-label text-[10px] text-secondary">Market Value</span>
                              </div>
                              <span className="text-sm font-bold text-on-surface">{activePhase.project?.sellingStrategy?.pricing}</span>
                            </div>

                            <div className="space-y-2">
                              <span className="font-label text-[10px] text-on-surface-variant uppercase">Outcome</span>
                              <ul className="space-y-2">
                                {(activePhase.project?.deliverables || []).map((d, i) => (
                                  <li key={i} className="flex items-center gap-2 text-xs text-on-surface-variant">
                                    <ChevronRight className="w-3 h-3 text-secondary" />
                                    {d}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Monetization */}
                      <div className="p-6 rounded-md border-outline-variant/20">
                        <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            <span className="font-label text-[10px] text-primary tracking-widest uppercase">Monetization</span>
                          </div>
                          <h4 className="font-bold text-sm mb-4 text-on-surface">How to sell this skill:</h4>
                          <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                            {activePhase.project?.sellingStrategy?.pitch}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {(activePhase.project?.sellingStrategy?.whereToFind || []).map((place, i) => (
                              <span key={i} className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-primary uppercase tracking-wider">
                                {place}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Stack */}
                      <div className="p-6 rounded-md border border-outline-variant/10 bg-surface-container">
                        <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-4">
                            <Wrench className="w-5 h-5 text-secondary" />
                            <span className="font-label text-[10px] text-secondary tracking-widest uppercase">Stack</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {(activePhase.tools || []).map((tool, i) => (
                              <a 
                                key={i} 
                                href={tool.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-lg bg-surface-container-highest border border-outline-variant/20 text-xs hover:border-secondary/50 transition-colors text-on-surface-variant hover:text-on-surface"
                              >
                                {tool.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Phase Navigation & Sharing */}
                  <div className="mt-12 pt-8 border-t border-outline-variant/20 flex flex-col items-center gap-6">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 rounded-sm border border-primary/30 text-center max-w-lg w-full"
                    >
                      <h3 className="text-xl font-bold text-on-surface mb-2">
                        {isPhaseCompleted ? "🎉 Phase Completed!" : "🚀 Share Your Progress"}
                      </h3>
                      <p className="text-sm text-on-surface-variant mb-4">
                        {isPhaseCompleted 
                          ? `You've mastered ${activePhase.title}. Let the world know about your progress!` 
                          : `Working on ${activePhase.title}? Share your journey with the community!`}
                      </p>
                      <div className="flex justify-center gap-4">
                        <a 
                          href={`https://twitter.com/intent/tweet?text=I'm%20currently%20working%20on%20${activePhase.id.startsWith('v-p') ? 'Track%202%20(Animation)%20Module%20' : activePhase.id.startsWith('marketing-p') ? 'Track%203%20(Marketing)%20Module%20' : 'Phase%20'}${activePhase.number}:%20${encodeURIComponent(activePhase.title)}%20in%20the%20DayZero%20Mastery%20Roadmap!%20%23DayZero`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-lg bg-[#1DA1F2] text-white text-sm font-bold hover:bg-[#1a91da] transition-colors flex items-center gap-2"
                        >
                          Share on X
                        </a>
                        <a 
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-lg bg-[#0A66C2] text-white text-sm font-bold hover:bg-[#0958a6] transition-colors flex items-center gap-2"
                        >
                          Share on LinkedIn
                        </a>
                      </div>
                    </motion.div>

                    <div className="flex w-full justify-between items-center mt-4">
                      {prevPhase ? (
                        <button 
                          onClick={() => {
                            handleSelectPhase(prevPhase.id, prevPhase.id.startsWith('v-p') ? 'video' : prevPhase.id.startsWith('marketing-p') ? 'marketing' : 'fullstack');
                          }}
                          className="px-6 py-3 rounded-xl border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container flex items-center gap-2"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <div className="text-left">
                            <div className="text-[10px] font-label uppercase tracking-wider opacity-50">
                              {prevPhase.id.startsWith('v-p') ? 'Track 2: Animation' : prevPhase.id.startsWith('marketing-p') ? 'Track 3: Marketing' : 'Track 1: Full-Stack'}
                            </div>
                            <div className="text-sm font-bold">
                              {prevPhase.id.startsWith('p') ? `Phase ${prevPhase.number}` : `Module ${prevPhase.number}`}
                            </div>
                          </div>
                        </button>
                      ) : (
                        <div />
                      )}

                      {nextPhase && (
                        <button 
                          onClick={() => {
                            handleSelectPhase(nextPhase.id, nextPhase.id.startsWith('v-p') ? 'video' : nextPhase.id.startsWith('marketing-p') ? 'marketing' : 'fullstack');
                          }}
                          className={cn(
                            "px-6 py-3 rounded-xl flex items-center gap-2 text-right",
                            nextPhase.id.startsWith('v-p') 
                              ? "bg-amber-500 text-white hover:bg-amber-600 shadow-[0_5px_15px_-3px_rgba(245,158,11,0.3)]" 
                              : nextPhase.id.startsWith('marketing-p') 
                              ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-[0_5px_15px_-3px_rgba(16,185,129,0.3)]" 
                              : "bg-primary text-on-primary hover:bg-primary/80 shadow-[0_5px_15px_-3px_rgba(108,59,255,0.3)]"
                          )}
                        >
                          <div>
                            <div className="text-[10px] font-label uppercase tracking-wider opacity-70">
                              {nextPhase.id.startsWith('v-p') ? 'Track 2: Animation' : nextPhase.id.startsWith('marketing-p') ? 'Track 3: Marketing' : 'Track 1: Full-Stack'}
                            </div>
                            <div className="text-sm font-bold">
                              {nextPhase.id.startsWith('p') ? `Phase ${nextPhase.number}` : `Module ${nextPhase.number}`}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <footer className="mt-20 pt-10 pb-6 border-t border-outline-variant/20 flex flex-col items-center gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs text-on-surface-variant">
                <span>&copy; {new Date().getFullYear()} DayZero. All rights reserved.</span>
                <div className="flex items-center gap-4">
                  <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>

      {/* AI Path Assistant */}
      <AiPathAssistant 
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        activePhase={activePhaseId !== 'dashboard' && activePhaseId !== 'about' && activePhaseId !== 'prompt-library' && activePhaseId !== 'certifications'
          ? ALL_PHASES.find(p => p.id === activePhaseId)
          : undefined}
        activeTrack={activeTrack}
        completedTasksCount={completedTasks.length}
        totalTasksCount={ALL_PHASES.reduce((acc, p) => acc + p.tasks.length, 0)}
        onNavigatePhase={handleSelectPhase}
      />

      {/* Floating AI Assistant Trigger Button - fully responsive for mobile, tablet, and desktop */}
      <button 
        onClick={() => setIsAiOpen(!isAiOpen)}
        aria-label="Toggle AI Path Assistant"
        className={cn(
          "fixed bottom-5 right-4 sm:bottom-8 sm:right-8 z-50 flex items-center justify-center transition-all duration-300 shadow-2xl active:scale-95 group",
          "w-12 h-12 sm:w-14 sm:h-14 rounded-sm sm:rounded-full",
          isAiOpen 
            ? "bg-surface-container-highest border border-outline-variant/30 text-on-surface hover:bg-surface-container-high" 
            : "bg-primary-container text-on-primary-container hover:scale-105 shadow-sm"
        )}
      >
        {isAiOpen ? (
          <X strokeWidth={1.5} className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Bot className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-secondary rounded-full ring-2 ring-surface animate-pulse" />
          </div>
        )}
      </button>

      <PWAToast />
      <PremiumVideoPlayer 
        isOpen={videoPlayerState.isOpen} 
        initialVideoUrl={videoPlayerState.url} 
        onClose={() => setVideoPlayerState({isOpen: false, url: null})} 
      />
    </div>
  );
}
