import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const PWAUpdatePrompt = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      setShowUpdatePrompt(false);
    }
  };

  if (!showUpdatePrompt) return null;

  return (
    <div className="fixed top-4 left-4 right-4 md:left-auto md:max-w-sm z-50 bg-orange-500/95 backdrop-blur-sm rounded-lg p-4 shadow-xl">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <ArrowUp className="w-4 h-4 text-orange-500" />
          </div>
        </div>
        <div className="flex-grow">
          <h4 className="text-white font-semibold text-sm mb-1">
            Update Available
          </h4>
          <p className="text-orange-100 text-xs mb-3">
            A new version is ready to install.
          </p>
          <button
            onClick={handleUpdate}
            className="px-3 py-1.5 bg-white text-orange-500 text-xs font-semibold rounded hover:bg-orange-50 transition-colors"
          >
            Update Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAUpdatePrompt;
