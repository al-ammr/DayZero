import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Maximize, X, Volume2, VolumeX, ListVideo, ChevronRight, ChevronDown, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '../lib/utils';
import { PHASES, VIDEO_PHASES, MARKETING_PHASES } from '../constants';
import { getVideoId } from '../lib/youtube';

interface VideoItem {
  uid: string;
  id: string;
  title: string;
  url: string;
  phaseId: string;
  phaseTitle: string;
  track: 'fullstack' | 'video' | 'marketing';
  type: 'resource' | 'project';
}

interface PremiumVideoPlayerProps {
  isOpen: boolean;
  initialVideoUrl: string | null;
  onClose: () => void;
}

// Global type for YT
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function PremiumVideoPlayer({ isOpen, initialVideoUrl, onClose }: PremiumVideoPlayerProps) {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<'all' | 'fullstack' | 'video' | 'marketing'>('all');

  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const shouldPlayOnReady = useRef(false);

  // Keyboard shortcut (Ctrl+B / Cmd+B) to toggle Course Content on PC
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsSidebarOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  useEffect(() => {
    // Extract all videos from all phase tracks
    const allVideos: VideoItem[] = [];
    const allPhaseTracks = [...PHASES, ...VIDEO_PHASES, ...MARKETING_PHASES];
    allPhaseTracks.forEach(phase => {
      const track: 'fullstack' | 'video' | 'marketing' = 
        phase.id.startsWith('v-p') ? 'video' : 
        phase.id.startsWith('marketing-p') ? 'marketing' : 'fullstack';

      phase.resources.forEach((res, idx) => {
        const ytId = getVideoId(res.url);
        if (res.type === 'yt' && ytId) {
          allVideos.push({
            uid: `res-${phase.id}-${idx}-${ytId}`,
            id: ytId,
            title: res.title,
            url: res.url,
            phaseId: phase.id,
            phaseTitle: phase.title,
            track,
            type: 'resource'
          });
        }
      });
      if (phase.followAlongProjects) {
        phase.followAlongProjects.forEach((proj, idx) => {
          const ytId = getVideoId(proj.url);
          if (ytId) {
            allVideos.push({
              uid: `proj-${phase.id}-${idx}-${ytId}`,
              id: ytId,
              title: proj.title,
              url: proj.url,
              phaseId: phase.id,
              phaseTitle: phase.title,
              track,
              type: 'project'
            });
          }
        });
      }
    });
    setVideos(allVideos);

    if (initialVideoUrl) {
      const initialId = getVideoId(initialVideoUrl);
      const found = allVideos.find(v => v.url === initialVideoUrl);
      if (found) {
        setCurrentVideo(found);
        setExpandedPhases({ [found.phaseId]: true });
        setSelectedTrackFilter(found.track);
      } else if (initialId) {
        setCurrentVideo({
          uid: `custom-${initialId}`,
          id: initialId,
          title: 'Video',
          url: initialVideoUrl,
          phaseId: 'custom',
          phaseTitle: 'Custom',
          track: 'fullstack',
          type: 'resource'
        });
      }
    } else if (allVideos.length > 0) {
      setCurrentVideo(allVideos[0]);
      setExpandedPhases({ [allVideos[0].phaseId]: true });
      setSelectedTrackFilter(allVideos[0].track);
    }
  }, [initialVideoUrl]);

  useEffect(() => {
    if (!isOpen) {
      if (playerRef.current) {
        if (typeof playerRef.current.destroy === 'function') {
          try {
            playerRef.current.destroy();
          } catch (e) {
            console.error(e);
          }
        }
        playerRef.current = null;
      }
      return;
    }

    // Load YouTube API
    if (!window.YT || !window.YT.Player) {
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }

      // If onYouTubeIframeAPIReady is already assigned, we might overwrite it,
      // but usually it's fine for a single player instance.
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prev) prev();
        initPlayer();
      };
    } else if (!playerRef.current) {
      initPlayer();
    } else if (currentVideo) {
      setShowThumbnail(true);
      initPlayer();
    }

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isOpen, currentVideo]);

  const initPlayer = () => {
    if (!currentVideo) return;
    if (!window.YT || !window.YT.Player) return;
    
    if (playerRef.current && playerRef.current.cueVideoById) {
      if (currentVideo.id.length > 11 && typeof playerRef.current.cuePlaylist === 'function') {
        playerRef.current.cuePlaylist({list: currentVideo.id});
      } else {
        playerRef.current.cueVideoById(currentVideo.id);
      }
      return;
    }

    if (playerRef.current && typeof playerRef.current.destroy === 'function') {
      try {
        playerRef.current.destroy();
      } catch (e) {
        console.error(e);
      }
    }

    // Ensure the yt-player div exists before initializing
    let playerDiv = document.getElementById('yt-player');
    if (!playerDiv) {
      playerDiv = document.createElement('div');
      playerDiv.id = 'yt-player';
      playerDiv.className = 'w-full h-full';
      const wrapper = document.getElementById('yt-player-wrapper');
      if (wrapper) {
        wrapper.appendChild(playerDiv);
      }
    }

    const playerOptions: any = {
      playerVars: {
        autoplay: 0,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        disablekb: 1,
        fs: 0,
        enablejsapi: 1,
        origin: window.location.origin
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    };

    if (currentVideo.id.length > 11) {
      playerOptions.playerVars.listType = 'playlist';
      playerOptions.playerVars.list = currentVideo.id;
    } else {
      playerOptions.videoId = currentVideo.id;
    }

    playerRef.current = new window.YT.Player('yt-player', playerOptions);
  };

  const onPlayerReady = (event: any) => {
    setDuration(event.target.getDuration());
    if (!showThumbnail || shouldPlayOnReady.current) {
      event.target.playVideo();
      shouldPlayOnReady.current = false;
    }
  };

  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      setDuration(playerRef.current.getDuration());
      startProgressInterval();
    } else {
      setIsPlaying(false);
      stopProgressInterval();
    }
  };

  const startProgressInterval = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    progressInterval.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const time = playerRef.current.getCurrentTime();
        setCurrentTime(time);
        const dur = playerRef.current.getDuration();
        if (dur > 0) {
          setProgress((time / dur) * 100);
        }
      }
    }, 1000);
  };

  const stopProgressInterval = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
  };

  const handlePlayPause = () => {
    if (!playerRef.current || !playerRef.current.playVideo) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleSeek = (seconds: number) => {
    if (!playerRef.current || !playerRef.current.seekTo) return;
    const newTime = currentTime + seconds;
    playerRef.current.seekTo(newTime, true);
    setCurrentTime(newTime);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!playerRef.current || !playerRef.current.seekTo) return;
    const newProgress = parseFloat(e.target.value);
    const newTime = (newProgress / 100) * duration;
    playerRef.current.seekTo(newTime, true);
    setProgress(newProgress);
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleThumbnailClick = () => {
    setShowThumbnail(false);
    if (playerRef.current && currentVideo) {
      try {
        if (currentVideo.id.length > 11 && typeof playerRef.current.loadPlaylist === 'function') {
          playerRef.current.loadPlaylist({list: currentVideo.id});
        } else if (typeof playerRef.current.loadVideoById === 'function') {
          playerRef.current.loadVideoById(currentVideo.id);
        }
      } catch (e) {
        console.error("Error playing video:", e);
      }
    } else {
      shouldPlayOnReady.current = true;
    }
  };

  const selectVideo = (video: VideoItem) => {
    if (currentVideo?.uid === video.uid) return;
    setCurrentVideo(video);
    setShowThumbnail(true);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    
    // Auto-close sidebar on mobile after selecting a video
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
    
    // Track last played video
    localStorage.setItem('lastPlayedVideo', JSON.stringify({
      id: video.id,
      title: video.title,
      url: video.url
    }));
    
    // Dispatch custom event to notify App.tsx
    window.dispatchEvent(new Event('lastPlayedVideoUpdated'));
  };

  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!isOpen) return null;

  // Filter videos by selected track
  const filteredVideos = selectedTrackFilter === 'all' 
    ? videos 
    : videos.filter(v => v.track === selectedTrackFilter);

  // Group videos by phase
  const groupedVideos: Record<string, { title: string, track: 'fullstack' | 'video' | 'marketing', items: VideoItem[] }> = {};
  filteredVideos.forEach(v => {
    if (!groupedVideos[v.phaseId]) {
      groupedVideos[v.phaseId] = { title: v.phaseTitle, track: v.track, items: [] };
    }
    groupedVideos[v.phaseId].items.push(v);
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#0B0B0F] flex flex-row overflow-hidden font-sans text-white"
      >
        {/* Course Content Sidebar */}
        <motion.div 
          initial={false}
          animate={{ 
            width: isSidebarOpen ? (typeof window !== 'undefined' && window.innerWidth < 768 ? '100%' : '320px') : 0, 
            opacity: isSidebarOpen ? 1 : 0 
          }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={cn(
            "absolute md:relative left-0 top-0 z-50 h-full bg-[#111118] border-r border-white/10 flex flex-col shrink-0 overflow-hidden transition-[border-color]",
            !isSidebarOpen && "border-r-0 pointer-events-none"
          )}
        >
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#111118] z-10 shrink-0">
            <h2 className="text-lg font-bold flex items-center gap-2 text-white">
              <ListVideo className="w-5 h-5 text-[#7C3AED]" />
              Course Content
            </h2>
            {/* Close button works on both PC (desktop) and mobile */}
            <button 
              id="close-course-content-btn"
              onClick={() => setIsSidebarOpen(false)} 
              className="p-1.5 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors flex items-center gap-1 cursor-pointer group"
              title="Close Course Content (Ctrl+B)"
              aria-label="Close Course Content"
            >
              <PanelLeftClose className="w-5 h-5 hidden md:block group-hover:text-[#A78BFA] transition-colors" />
              <X strokeWidth={1.5} className="w-5 h-5 md:hidden" />
            </button>
          </div>

          {/* Track Filter Tabs */}
          <div className="p-2 border-b border-white/10 grid grid-cols-4 gap-1 bg-[#0b0b10]">
            <button
              onClick={() => setSelectedTrackFilter('all')}
              className={cn(
                "py-1 px-1 rounded text-[10px] font-semibold transition-all text-center truncate",
                selectedTrackFilter === 'all'
                  ? "bg-white/20 text-white font-bold"
                  : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
              )}
            >
              All
            </button>
            <button
              onClick={() => setSelectedTrackFilter('fullstack')}
              className={cn(
                "py-1 px-1 rounded text-[10px] font-semibold transition-all text-center truncate",
                selectedTrackFilter === 'fullstack'
                  ? "bg-[#7C3AED] text-white font-bold shadow-sm"
                  : "text-[#A1A1AA] hover:text-[#7C3AED] hover:bg-white/5"
              )}
              title="Track 1: Full-Stack AI Mastery"
            >
              Full-Stack
            </button>
            <button
              onClick={() => setSelectedTrackFilter('video')}
              className={cn(
                "py-1 px-1 rounded text-[10px] font-semibold transition-all text-center truncate",
                selectedTrackFilter === 'video'
                  ? "bg-amber-500 text-white font-bold shadow-sm"
                  : "text-[#A1A1AA] hover:text-amber-400 hover:bg-white/5"
              )}
              title="Track 2: AI Video & Animation"
            >
              Animation
            </button>
            <button
              onClick={() => setSelectedTrackFilter('marketing')}
              className={cn(
                "py-1 px-1 rounded text-[10px] font-semibold transition-all text-center truncate",
                selectedTrackFilter === 'marketing'
                  ? "bg-emerald-500 text-white font-bold shadow-sm"
                  : "text-[#A1A1AA] hover:text-emerald-400 hover:bg-white/5"
              )}
              title="Track 3: Digital Marketing"
            >
              Marketing
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
            {Object.entries(groupedVideos).map(([phaseId, group]) => (
              <div key={phaseId} className="mb-2">
                <button
                  onClick={() => togglePhase(phaseId)}
                  className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors text-left"
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full shrink-0",
                      group.track === 'video' ? "bg-amber-500" : group.track === 'marketing' ? "bg-emerald-500" : "bg-[#7C3AED]"
                    )} />
                    <span className="font-semibold text-sm text-[#A1A1AA] truncate">{group.title}</span>
                  </div>
                  {expandedPhases[phaseId] ? <ChevronDown className="w-4 h-4 shrink-0 text-[#A1A1AA]" /> : <ChevronRight className="w-4 h-4 shrink-0 text-[#A1A1AA]" />}
                </button>
                <AnimatePresence>
                  {expandedPhases[phaseId] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-2 pr-1 py-1 space-y-1">
                        {group.items.map(video => (
                          <button
                            key={video.uid}
                            onClick={() => selectVideo(video)}
                            className={cn(
                              "w-full text-left p-3 rounded-lg text-sm transition-all flex items-start gap-3 group",
                              currentVideo?.uid === video.uid 
                                ? group.track === 'video'
                                  ? "bg-amber-500/20 text-white border border-amber-500/40"
                                  : group.track === 'marketing'
                                  ? "bg-emerald-500/20 text-white border border-emerald-500/40"
                                  : "bg-[#7C3AED]/20 text-white border border-[#7C3AED]/30" 
                                : "text-[#A1A1AA] hover:bg-white/5 hover:text-white"
                            )}
                          >
                            <div className={cn(
                              "mt-0.5 shrink-0 w-2 h-2 rounded-full",
                              currentVideo?.uid === video.uid 
                                ? group.track === 'video'
                                  ? "bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                                  : group.track === 'marketing'
                                  ? "bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                  : "bg-[#A78BFA] shadow-[0_0_10px_#A78BFA]" 
                                : "bg-white/20 group-hover:bg-white/50"
                            )} />
                            <span className="line-clamp-2 leading-snug">{video.title}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Player Area */}
        <div className="flex-1 flex flex-col h-full relative bg-[#0B0B0F]">
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
            <div className="flex items-center gap-3 pointer-events-auto min-w-0 pr-4">
              {!isSidebarOpen && (
                <button 
                  id="open-course-content-btn"
                  onClick={() => setIsSidebarOpen(true)}
                  className="px-3.5 py-2 bg-black/75 hover:bg-[#7C3AED] border border-white/15 rounded-xl backdrop-blur-md text-white flex items-center gap-2 text-xs font-semibold transition-all shadow-xl hover:scale-105 shrink-0 btn-glow cursor-pointer group"
                  title="Open Course Content (Ctrl+B)"
                  aria-label="Open Course Content"
                >
                  <PanelLeftOpen className="w-4 h-4 text-purple-300 group-hover:text-white transition-colors" />
                  <span className="hidden sm:inline">Course Content</span>
                </button>
              )}
              <h1 className="text-sm md:text-lg font-bold text-white drop-shadow-md truncate max-w-[55vw]">
                {currentVideo?.title}
              </h1>
            </div>
            <button 
              onClick={onClose}
              className="p-2 bg-black/60 hover:bg-red-500/80 rounded-xl backdrop-blur-md text-white btn-glow pointer-events-auto shrink-0 transition-colors cursor-pointer"
              title="Close player"
              aria-label="Close player"
            >
              <X strokeWidth={1.5} className="w-5 h-5" />
            </button>
          </div>

          {/* Video Container */}
          <div 
            ref={containerRef}
            className="flex-1 flex items-center justify-center p-0 md:p-6 lg:p-12 relative group"
          >
            <div className="w-full h-full max-h-[80vh] relative rounded-none md:rounded-[20px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-black">
              
              {/* YouTube Player Wrapper */}
              <div id="yt-player-wrapper" className={cn("w-full h-full absolute inset-0", showThumbnail ? "opacity-0 pointer-events-none" : "opacity-100")}>
                <div id="yt-player" className="w-full h-full" />
              </div>

              {/* Thumbnail Overlay */}
              {showThumbnail && currentVideo && (
                <div 
                  className="absolute inset-0 cursor-pointer group/thumb"
                  onClick={handleThumbnailClick}
                >
                  <img 
                    src={currentVideo.id.length > 11 
                      ? "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80" 
                      : `https://img.youtube.com/vi/${currentVideo.id}/maxresdefault.jpg`}
                    onError={(e) => {
                      if (!(currentVideo.id.length > 11)) {
                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${currentVideo.id}/hqdefault.jpg`;
                      }
                    }}
                    alt={currentVideo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/20 transition-colors" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#7C3AED]/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.5)] group-hover/thumb:scale-110 group-hover/thumb:bg-[#7C3AED] transition-all">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                </div>
              )}

              {/* Custom Controls Overlay */}
              <div className={cn(
                "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-20 pb-4 px-6 transition-opacity duration-300",
                isPlaying && !showThumbnail ? "opacity-0 group-hover:opacity-100" : "opacity-100",
                showThumbnail && "hidden"
              )}>
                {/* Progress Bar */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-medium text-white/80 w-10 text-right">{formatTime(currentTime)}</span>
                  <div className="flex-1 relative group/progress h-1.5 flex items-center cursor-pointer">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={progress}
                      onChange={handleProgressChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#A78BFA] transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div 
                      className="absolute h-3 w-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] -ml-1.5 scale-0 group-hover/progress:scale-100 transition-transform pointer-events-none"
                      style={{ left: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-white/80 w-10">{formatTime(duration)}</span>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleSeek(-10)} className="text-white/80 hover:text-white hover:scale-110 transition-all">
                      <SkipBack className="w-6 h-6" />
                    </button>
                    
                    <button 
                      onClick={handlePlayPause}
                      className="w-12 h-12 bg-[#7C3AED] hover:bg-[#A78BFA] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:scale-105 text-white btn-glow"
                    >
                      {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                    </button>
                    
                    <button onClick={() => handleSeek(10)} className="text-white/80 hover:text-white hover:scale-110 transition-all">
                      <SkipForward className="w-6 h-6" />
                    </button>

                    <div className="w-px h-6 bg-white/20 mx-2" />

                    <button onClick={toggleMute} className="text-white/80 hover:text-white hover:scale-110 transition-all">
                      {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                      className={cn(
                        "text-white/80 hover:text-white hover:scale-105 transition-all p-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium cursor-pointer",
                        isSidebarOpen ? "bg-white/15 text-purple-300" : "hover:bg-white/5"
                      )}
                      title={isSidebarOpen ? "Close Course Content (Ctrl+B)" : "Open Course Content (Ctrl+B)"}
                      aria-label={isSidebarOpen ? "Close Course Content" : "Open Course Content"}
                    >
                      <ListVideo className="w-5 h-5" />
                      <span className="hidden lg:inline text-[11px]">{isSidebarOpen ? "Hide Playlist" : "Playlist"}</span>
                    </button>

                    <button onClick={toggleFullscreen} className="text-white/80 hover:text-white hover:scale-110 transition-all p-1.5 rounded-lg hover:bg-white/5 cursor-pointer" title="Fullscreen">
                      <Maximize className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
