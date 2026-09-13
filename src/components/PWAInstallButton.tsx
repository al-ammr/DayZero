import React, { useState, useEffect } from 'react';
import { usePWAInstall } from './usePWAInstall';
import { Download, X, Share } from 'lucide-react';
import { cn } from '../lib/utils';

export const PWAInstallButton: React.FC<{ className?: string }> = ({ className }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  
  // Optionally, we can delay showing the install prompt to avoid spamming the user immediately.
  const [showPrompt, setShowPrompt] = useState(false);
  
  useEffect(() => {
    // Only show after a short delay so it doesn't immediately yell at the user
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (isInstalled || !showPrompt) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={cn(
          "flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary shadow-sm hover:opacity-90 transition group",
          className
        )}
      >
        <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        Install App
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={cn(
            "flex items-center gap-2 rounded-lg border border-outline-variant px-3 py-1.5 text-xs font-medium text-on-surface hover:bg-surface-container transition",
            className
          )}
        >
          <Download className="w-3.5 h-3.5" />
          Install on iOS
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onClick={() => setShowIOSGuide(false)}>
            <div 
              className="w-full max-w-sm rounded-2xl bg-surface p-6 shadow-xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-lg font-syne font-bold text-on-surface mb-4">Install TechOptyx</h3>
              <div className="space-y-4 text-sm text-on-surface-variant leading-relaxed">
                <p className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold border border-outline-variant/30">1</span>
                  <span>Tap the <Share className="w-4 h-4 inline mx-1" /> <strong>Share</strong> button in your Safari browser's bottom toolbar.</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold border border-outline-variant/30">2</span>
                  <span>Scroll down and tap <br/><strong>Add to Home Screen</strong>.</span>
                </p>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-8 w-full rounded-xl bg-surface-container py-3 text-sm font-bold text-on-surface hover:bg-surface-container-high transition-colors border border-outline-variant/50"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
