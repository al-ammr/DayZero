import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw, X } from 'lucide-react';

export const PWAToast: React.FC = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered:', r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (!offlineReady && !needRefresh) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-4 rounded-xl bg-surface-container-high border border-outline-variant p-4 shadow-2xl">
      <div className="text-sm font-medium text-on-surface">
        {offlineReady ? (
          <span>App ready to work offline</span>
        ) : (
          <span>New content available, click on reload button to update.</span>
        )}
      </div>
      
      {needRefresh && (
        <button
          className="flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-on-primary hover:opacity-90 transition-opacity"
          onClick={() => updateServiceWorker(true)}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reload
        </button>
      )}
      
      <button
        className="p-1 text-on-surface-variant hover:text-on-surface transition-colors rounded-md"
        onClick={close}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
