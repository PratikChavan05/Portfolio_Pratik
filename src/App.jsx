import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

// Import all components
import AmazingLoader from "./components/Loader/AmazingLoader";
import Navigation from "./components/Navigation/Navigation";
import HeroSection from "./components/Hero/HeroSection";
import AboutSection from "./components/About/AboutSection";
import ProjectsSection from "./components/Projects/ProjectsSection";
import ContactSection from "./components/Contact/ContactSection";
import PWAInstallPrompt from "./components/PWA/PWAInstallPrompt";
import PWAUpdatePrompt from "./components/PWA/PWAUpdatePrompt";

// Background Component
const AnimatedBackground = () => (
  <div className="fixed inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"></div>
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
    </div>
  </div>
);

// Scroll to Top Component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      onClick={scrollToTop}
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

// Footer Component
const Footer = () => (
  <footer className="py-12 border-t border-cyan-400/20 relative z-10 bg-gray-900/50 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
            Pratik Chavan
          </h3>
          <p className="text-gray-400">Full Stack Developer & Tech Enthusiast</p>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <p className="text-gray-400 text-sm">
            © 2025 Made with 💙 by Pratik Chavan. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Built with React.js, Tailwind CSS, and lots of coffee ☕
          </p>
        </div>
      </div>
    </div>
  </footer>
);

// Enhanced App Component with PWA functionality
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pwaSupported, setPwaSupported] = useState(false);

  // Enhanced PWA Support Detection
  useEffect(() => {
    const checkPWASupport = async () => {
      const hasServiceWorker = 'serviceWorker' in navigator;
      const hasManifest = document.querySelector('link[rel="manifest"]');
      const isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
      
      // Check if manifest is actually accessible
      let manifestAccessible = false;
      if (hasManifest) {
        try {
          const response = await fetch('/manifest.json');
          manifestAccessible = response.ok;
        } catch (error) {
          console.log('Manifest not accessible:', error);
          manifestAccessible = false;
        }
      }
      
      const supported = hasServiceWorker && manifestAccessible && isSecure;
      setPwaSupported(supported);
      
      console.log('PWA Support Check:', {
        hasServiceWorker,
        hasManifestLink: !!hasManifest,
        manifestAccessible,
        isSecure,
        protocol: window.location.protocol,
        hostname: window.location.hostname,
        supported
      });
      
      // If manifest is missing, let's still try to enable PWA features
      if (hasServiceWorker && isSecure) {
        console.log('Basic PWA requirements met, enabling PWA features');
        setPwaSupported(true);
      }
    };

    checkPWASupport();
  }, []);

  // Register Service Worker with better error handling
  useEffect(() => {
    console.log('Checking PWA support...', { pwaSupported });
    
    // Always try to register service worker if basic requirements are met
    const hasServiceWorker = 'serviceWorker' in navigator;
    const isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
    
    if (!hasServiceWorker) {
      console.log('Service Worker not supported in this browser');
      return;
    }
    
    if (!isSecure) {
      console.log('PWA requires HTTPS or localhost. Current protocol:', window.location.protocol);
      return;
    }

    console.log('Registering service worker...');
    
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered successfully:', registration);
          console.log('SW scope:', registration.scope);
          setPwaSupported(true);
          
          registration.update();
          
          registration.addEventListener('updatefound', () => {
            console.log('New service worker found');
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                console.log('New worker state:', newWorker.state);
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('New content is available; please refresh.');
                }
              });
            }
          });

          navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('Service worker controller changed');
            window.location.reload();
          });

        })
        .catch((registrationError) => {
          console.error('SW registration failed:', registrationError);
          // Don't disable PWA features just because SW registration failed
          // setPwaSupported(false);
        });
    });
  }, []);

  // Online/Offline Detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      console.log('App is online');
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log('App is offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Smooth scrolling and active section detection
  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledHandleScroll);
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [isLoading]);

  // Throttle function for better performance
  const throttle = (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 100);
  };

  // Disable scroll during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  if (isLoading) {
    return <AmazingLoader onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-x-hidden">
      {/* Offline Indicator */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-orange-500 text-white text-center py-2 text-sm font-medium">
          📱 You're offline - Some features may be limited
        </div>
      )}

      <AnimatedBackground />
      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />

      {/* Show PWA components regardless of full PWA support */}
      <PWAInstallPrompt />
      <PWAUpdatePrompt />

      {/* Enhanced Debug info - show in all environments for troubleshooting */}
      {/* <div className="fixed top-0 right-0 bg-black/90 text-white p-2 text-xs z-50 m-2 rounded max-w-xs">
        <div>Online: {isOnline ? '✅' : '❌'}</div>
        <div>SW: {('serviceWorker' in navigator) ? '✅' : '❌'}</div>
        <div>HTTPS: {(window.location.protocol === 'https:' || window.location.hostname === 'localhost') ? '✅' : '❌'}</div>
        <div>PWA: {pwaSupported ? '✅' : '❌'}</div>
        <div>Manifest: <span id="manifest-check">❓</span></div>
        <div className="mt-1 text-xs text-gray-400">
          {window.location.protocol}//{window.location.hostname}
        </div>
      </div> */}

      {/* Manifest validation script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          fetch('/manifest.json')
            .then(response => {
              console.log('Manifest response:', response.status, response.statusText);
              return response.json();
            })
            .then(manifest => {
              console.log('Manifest loaded successfully:', manifest);
              const manifestCheck = document.getElementById('manifest-check');
              if (manifestCheck) manifestCheck.textContent = '✅';
            })
            .catch(error => {
              console.error('Manifest load failed:', error);
              const manifestCheck = document.getElementById('manifest-check');
              if (manifestCheck) manifestCheck.textContent = '❌';
            });
        `
      }} />

      {/* Debug info (remove in production)
      <div className="fixed top-0 right-0 bg-black/80 text-white p-2 text-xs z-50 m-2 rounded">
        <div>Online: {isOnline ? '✅' : '❌'}</div>
        <div>SW: {('serviceWorker' in navigator) ? '✅' : '❌'}</div>
      </div> */}

      {/* Global Enhanced Styles */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fadeInUp {
          animation: fade-in 0.8s ease-out;
        }

        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #1f2937;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #3b82f6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0891b2, #2563eb);
        }

        /* Selection color */
        ::selection {
          background-color: #06b6d4;
          color: white;
        }

        /* Enhanced animations */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(6, 182, 212, 0.6);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        /* Smooth page transitions */
        .page-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Enhanced focus states for accessibility */
        button:focus,
        a:focus,
        input:focus,
        textarea:focus {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
        }

        /* Loading states */
        .loading-shimmer {
          background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        /* Error states */
        .error-shake {
          animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        /* Success states */
        .success-bounce {
          animation: successBounce 0.6s ease-in-out;
        }

        @keyframes successBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        /* Responsive text scaling */
        @media (max-width: 640px) {
          .text-responsive-xl {
            font-size: 2rem;
            line-height: 2.5rem;
          }
        }

        @media (min-width: 641px) {
          .text-responsive-xl {
            font-size: 3rem;
            line-height: 3.5rem;
          }
        }

        @media (min-width: 1024px) {
          .text-responsive-xl {
            font-size: 4rem;
            line-height: 4.5rem;
          }
        }

        /* Enhanced hover effects */
        .hover-glow:hover {
          box-shadow: 0 0 30px rgba(6, 182, 212, 0.4);
          transform: translateY(-2px);
        }

        /* Gradient text animations */
        .gradient-text-animated {
          background: linear-gradient(-45deg, #06b6d4, #3b82f6, #8b5cf6, #f97316);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 3s ease infinite;
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Dark mode optimizations */
        @media (prefers-color-scheme: dark) {
          .auto-dark {
            color-scheme: dark;
          }
        }

        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Print styles */
        @media print {
          .no-print {
            display: none !important;
          }
          
          .print-friendly {
            color: black !important;
            background: white !important;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .high-contrast {
            border: 2px solid;
          }
        }
      `}</style>
    </div>
  );
};

export default App;