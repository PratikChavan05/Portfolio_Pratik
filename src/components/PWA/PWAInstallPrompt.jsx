import React, { useState, useEffect } from "react";
import { Download, X, Smartphone } from "lucide-react";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if device is iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if already installed (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    setIsStandalone(standalone);

    // Don't show prompt if already installed
    if (standalone) return;

    // Handle beforeinstallprompt for Android/Chrome
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // For iOS devices, show manual install instructions after delay
    if (iOS && !standalone) {
      const timer = setTimeout(() => {
        setShowInstallPrompt(true);
      }, 10000); // Show after 10 seconds on iOS

      return () => {
        clearTimeout(timer);
        window.removeEventListener('beforeinstallprompt', handler);
      };
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Store dismissal in localStorage to respect user choice
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Check if user previously dismissed (don't show again for 7 days)
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      if (dismissedTime > sevenDaysAgo) {
        setShowInstallPrompt(false);
        return;
      }
    }
  }, []);

  if (!showInstallPrompt || isStandalone) return null;

  // iOS Install Instructions
  if (isIOS) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 bg-gray-800/95 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-4 shadow-xl max-w-sm mx-auto">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-white font-semibold text-sm">
                Install App
              </h4>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-300 text-xs mb-3 leading-relaxed">
              Install this app on your iPhone: tap <span className="inline-flex items-center mx-1 px-1 bg-blue-500 rounded text-white">⎙</span> then "Add to Home Screen"
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleDismiss}
                className="px-3 py-1.5 text-gray-400 text-xs hover:text-white transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Android/Chrome Install Prompt
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-sm z-50 bg-gray-800/95 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-4 shadow-xl">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            <Download className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-1">
            <h4 className="text-white font-semibold text-sm">
              Install Portfolio App
            </h4>
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-gray-300 text-xs mb-3">
            Add to your home screen for quick access and offline viewing!
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleInstall}
              className="px-3 py-1.5 bg-cyan-400 text-gray-900 text-xs font-semibold rounded hover:bg-cyan-300 transition-colors"
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-1.5 text-gray-400 text-xs hover:text-white transition-colors"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
