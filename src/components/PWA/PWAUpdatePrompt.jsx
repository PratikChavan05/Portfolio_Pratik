import React, { useState, useEffect } from "react";
import { ArrowUp, RefreshCw } from "lucide-react";

const PWAUpdatePrompt = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Listen for controlling service worker changes
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service worker controller changed, reloading...');
        window.location.reload();
      });

      // Check for service worker registration and updates
      navigator.serviceWorker.ready.then((registration) => {
        // Check for waiting service worker
        if (registration.waiting) {
          setWaitingWorker(registration.waiting);
          setShowUpdatePrompt(true);
        }

        // Listen for new service worker installing
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker installed and waiting
                setWaitingWorker(newWorker);
                setShowUpdatePrompt(true);
              }
            });
          }
        });
      });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CACHE_UPDATED') {
          setShowUpdatePrompt(true);
        }
      });

      // Periodically check for updates (every 60 seconds)
      const checkForUpdates = () => {
        navigator.serviceWorker.ready.then((registration) => {
          registration.update();
        });
      };

      const updateInterval = setInterval(checkForUpdates, 60000);

      return () => {
        clearInterval(updateInterval);
      };
    }
  }, []);

  const handleUpdate = () => {
    setIsUpdating(true);
    
    if (waitingWorker) {
      // Tell the waiting service worker to skip waiting and become active
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    } else {
      // Force reload if no waiting worker
      window.location.reload();
    }
    
    setShowUpdatePrompt(false);
  };

  const handleDismiss = () => {
    setShowUpdatePrompt(false);
    // Show again after 30 minutes
    setTimeout(() => {
      if (waitingWorker) {
        setShowUpdatePrompt(true);
      }
    }, 30 * 60 * 1000);
  };

  if (!showUpdatePrompt) return null;

  return (
    <div className="fixed top-4 left-4 right-4 md:left-auto md:max-w-sm z-50 bg-gradient-to-r from-orange-500 to-red-500 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-orange-400/50">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            {isUpdating ? (
              <RefreshCw className="w-4 h-4 text-orange-500 animate-spin" />
            ) : (
              <ArrowUp className="w-4 h-4 text-orange-500" />
            )}
          </div>
        </div>
        <div className="flex-grow">
          <h4 className="text-white font-semibold text-sm mb-1">
            {isUpdating ? 'Updating...' : 'Update Available'}
          </h4>
          <p className="text-orange-100 text-xs mb-3">
            {isUpdating 
              ? 'Please wait while we update the app...' 
              : 'A new version with improvements is ready to install.'
            }
          </p>
          {!isUpdating && (
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="px-3 py-1.5 bg-white text-orange-500 text-xs font-semibold rounded hover:bg-orange-50 transition-colors"
              >
                Update Now
              </button>
              <button
                onClick={handleDismiss}
                className="px-3 py-1.5 text-orange-100 text-xs hover:text-white transition-colors"
              >
                Later
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PWAUpdatePrompt;
