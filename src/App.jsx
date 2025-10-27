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

  // Register Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered successfully');
            registration.update();
            
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log('New content available');
                  }
                });
              }
            });

            navigator.serviceWorker.addEventListener('controllerchange', () => {
              window.location.reload();
            });
          })
          .catch((error) => {
            console.error('SW registration failed:', error);
          });
      });
    }
  }, []);

  // Online/Offline Detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

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

      {/* PWA Components */}
      <PWAInstallPrompt />
      <PWAUpdatePrompt />

      {/* Global Styles */}
      <style jsx="true" global="true">{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-fadeInUp { animation: fade-in 0.8s ease-out; }
        
        html { scroll-behavior: smooth; }
        
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #1f2937; }
        ::-webkit-scrollbar-thumb { 
          background: linear-gradient(to bottom, #06b6d4, #3b82f6);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover { 
          background: linear-gradient(to bottom, #0891b2, #2563eb);
        }
        
        ::selection { background-color: #06b6d4; color: white; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        
        button:focus, a:focus, input:focus, textarea:focus {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
        }
        
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
        
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default App;