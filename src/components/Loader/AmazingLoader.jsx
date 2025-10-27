import React, { useState, useEffect } from "react";

const AmazingLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    const texts = [
      'Initializing...',
      'Loading assets...',
      'Preparing experience...',
      'Almost ready...',
      'Welcome!'
    ];

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        
        if (newProgress >= 20 && newProgress < 40) {
          setLoadingText(texts[1]);
        } else if (newProgress >= 40 && newProgress < 60) {
          setLoadingText(texts[2]);
        } else if (newProgress >= 60 && newProgress < 80) {
          setLoadingText(texts[3]);
        } else if (newProgress >= 80) {
          setLoadingText(texts[4]);
        }

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 1000);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50 loader-container">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Loader Content */}
      <div className="relative z-10 text-center">
        {/* Spinning Ring */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
          <div 
            className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"
            style={{ animationDuration: '1s' }}
          ></div>
          <div 
            className="absolute inset-2 border-4 border-transparent border-b-pink-500 border-l-cyan-500 rounded-full animate-spin"
            style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
          ></div>
          
          {/* Center Pulse */}
          <div className="absolute inset-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse">
            <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mb-6">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white mb-2 animate-pulse">
            {loadingText}
          </h2>
          <p className="text-gray-400 text-sm">
            {Math.round(progress)}%
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .loader-container {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        }
        
        @keyframes fadeOut {
          to {
            opacity: 0;
            transform: scale(0.8);
          }
        }
        
        .fade-out {
          animation: fadeOut 0.8s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AmazingLoader;
