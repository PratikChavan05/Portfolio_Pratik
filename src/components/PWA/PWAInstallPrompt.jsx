import React, { useState, useEffect } from "react";
import { Download, X, Smartphone } from "lucide-react";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    console.log('PWA Install Prompt - Component mounted');
    
    // Check if device is iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);
    console.log('Is iOS:', iOS);

    // Check if already installed (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    setIsStandalone(standalone);
    console.log('Is standalone:', standalone);

    // Don't show prompt if already installed
    if (standalone) {
      console.log('App already installed, not showing prompt');
      return;
    }

    // Check if user previously dismissed
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      if (dismissedTime > sevenDaysAgo) {
        console.log('User dismissed recently, not showing prompt');
        return;
      }
    }

    // Handle beforeinstallprompt for Android/Chrome
    const handler = (e) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // For iOS devices, show manual install instructions after shorter delay for testing
    if (iOS && !standalone) {
      console.log('iOS detected, setting timer for install prompt');
      const timer = setTimeout(() => {
        console.log('Showing iOS install prompt');
        setShowInstallPrompt(true);
      }, 3000); // Reduced to 3 seconds for testing

      return () => {
        clearTimeout(timer);
        window.removeEventListener('beforeinstallprompt', handler);
      };
    }

    // For testing on desktop/Android - show after delay
    const timer = setTimeout(() => {
      console.log('Showing install prompt after timeout');
      setShowInstallPrompt(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    console.log('Install button clicked');
    console.log('Deferred prompt available:', !!deferredPrompt);
    
    if (deferredPrompt) {
      try {
        // Show the install prompt
        const promptResult = await deferredPrompt.prompt();
        console.log('Prompt result:', promptResult);
        
        // Wait for the user to respond to the prompt
        const choiceResult = await deferredPrompt.userChoice;
        console.log('User choice:', choiceResult);
        
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          // Store install acceptance
          localStorage.setItem('pwa-install-accepted', Date.now().toString());
        } else {
          console.log('User dismissed the install prompt');
          // Store dismissal with longer delay
          localStorage.setItem('pwa-install-dismissed', Date.now().toString());
        }
        
        // Clear the deferredPrompt for next time
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
        
      } catch (error) {
        console.error('Error during installation:', error);
        // Still hide the prompt even if there's an error
        setShowInstallPrompt(false);
      }
    } else {
      console.log('No deferred prompt available, showing manual instructions');
      // For browsers that don't support beforeinstallprompt
      alert('To install this app:\n1. Open browser menu\n2. Look for "Add to Home Screen" or "Install App"\n3. Follow the prompts');
      setShowInstallPrompt(false);
    }
  };

  // Enhanced detection for installation
  useEffect(() => {
    // Listen for app installed event
    window.addEventListener('appinstalled', (event) => {
      console.log('App was installed successfully', event);
      setShowInstallPrompt(false);
      setIsStandalone(true);
      // Clear any dismissal flags since app is now installed
      localStorage.removeItem('pwa-install-dismissed');
      localStorage.setItem('pwa-install-accepted', Date.now().toString());
    });

    // Check if app is already installed periodically
    const checkInstallStatus = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                          window.navigator.standalone ||
                          document.referrer.includes('android-app://');
      
      if (isStandalone && !isStandalone) {
        console.log('App detected as installed');
        setIsStandalone(true);
        setShowInstallPrompt(false);
      }
    };

    const installCheckInterval = setInterval(checkInstallStatus, 2000);
    
    return () => {
      clearInterval(installCheckInterval);
    };
  }, [isStandalone]);

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Store dismissal in localStorage to respect user choice
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Force show for debugging (you can remove this later)
  useEffect(() => {
    const debugTimer = setTimeout(() => {
      if (!isStandalone) {
        console.log('Debug: Force showing install prompt');
        setShowInstallPrompt(true);
      }
    }, 2000);

    return () => clearTimeout(debugTimer);
  }, [isStandalone]);

  console.log('Render state:', { showInstallPrompt, isStandalone, isIOS });

  if (!showInstallPrompt || isStandalone) {
    console.log('Not showing prompt:', { showInstallPrompt, isStandalone });
    return null;
  }

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
