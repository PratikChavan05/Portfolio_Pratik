import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Palette,
  Database,
  Smartphone,
  ArrowRight,
  Download,
  Menu,
  X,
  ChevronDown,
  Phone, MapPin
} from "lucide-react";
import myimage from "./images/pf.jpg"; // Placeholder for your profile image
import image from "./images/ieee.jpg"; // Placeholder for your profile image
import pictoreal from "./images/pictoreal.png"; // Placeholder for your profile image

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


// Typewriter Effect Component (since we can't import typewriter-effect)
const TypewriterEffect = ({
  texts,
  speed = 100,
  deleteSpeed = 50,
  delayBetween = 1000,
}) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const current = texts[currentIndex];

        if (isDeleting) {
          setCurrentText(current.substring(0, currentText.length - 1));
          if (currentText === "") {
            setIsDeleting(false);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
          }
        } else {
          setCurrentText(current.substring(0, currentText.length + 1));
          if (currentText === current) {
            setTimeout(() => setIsDeleting(true), delayBetween);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    currentIndex,
    isDeleting,
    texts,
    speed,
    deleteSpeed,
    delayBetween,
  ]);

  return (
    <span className="text-orange-500">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Fade Animation Component
const FadeInAnimation = ({ children, delay = 0, direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getTransform = () => {
    switch (direction) {
      case "left":
        return "translateX(-50px)";
      case "right":
        return "translateX(50px)";
      case "up":
        return "translateY(50px)";
      case "down":
        return "translateY(-50px)";
      default:
        return "translateY(50px)";
    }
  };

  return (
    <div
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? "opacity-100 transform translate-x-0 translate-y-0"
          : "opacity-0"
      }`}
      style={{
        transform: isVisible ? "none" : getTransform(),
      }}
    >
      {children}
    </div>
  );
};

// Main Hero Component
const HeroSection = () => {
  const typewriterTexts = [
    "Web Developer",
    "AI/ML Enthusiast",
    "Tech Innovator",
    "Problem Solver",
  ];

  // Placeholder image - replace with your actual photo
  const profileImage = myimage;

 const handleResumeClick = () => {
  // Replace this with your actual portfolio link
  const portfolioUrl = "https://drive.google.com/file/d/1VbPVSKrCL9GLbibpBkLQpZDWXWca6T64/view?usp=drive_link";
  window.open(portfolioUrl, "_blank"); // Opens in new tab
};


  const handleContactClick = () => {
    // Handle contact navigation
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }

  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <FadeInAnimation direction="left" delay={200}>
              <div className="my-auto px-5 flex flex-col justify-start md:justify-center lg:justify-start">
                <h1 className="font-bold text-white text-4xl md:text-5xl text-left leading-tight">
                  Hey there,
                </h1>
                <h1 className="mt-2 font-bold text-white text-4xl md:text-5xl text-left leading-tight">
                  I'm <span className="text-cyan-400">Pratik Chavan</span>
                </h1>

                {/* Typewriter Effect */}
                <div className="mt-4 font-medium hidden md:block text-2xl md:text-4xl text-left min-h-[3rem]">
                  <TypewriterEffect texts={typewriterTexts} />
                </div>

                {/* Mobile Typewriter (Static) */}
                <div className="mt-4 font-medium block md:hidden text-orange-500 text-xl text-left">
                  Web Developer
                </div>

                <p className="mt-6 font-normal text-gray-300 text-lg md:text-xl text-left leading-relaxed"></p>

                {/* Buttons */}
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mt-8">
                  <button
                    onClick={handleResumeClick}
                    className="w-full lg:w-auto font-semibold bg-transparent transition duration-500 ease-in-out hover:bg-orange-500 text-orange-500 hover:text-white py-4 px-8 border-2 border-orange-500 hover:border-transparent rounded-lg hover:scale-105 transform flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    See my Resume
                  </button>
                  {/* <button
                    onClick={() => handleNavClick("CONTACT")}
                    className="w-full lg:w-auto font-semibold bg-transparent transition duration-500 ease-in-out hover:bg-cyan-400 text-cyan-400 hover:text-gray-900 py-4 px-8 border-2 border-cyan-400 hover:border-transparent rounded-lg hover:scale-105 transform flex items-center justify-center gap-2"
                  >
                    <ArrowRight className="w-5 h-5" />
                    Reach out
                  </button> */}
                </div>
              </div>
            </FadeInAnimation>

            {/* Right Content - Image */}
            <FadeInAnimation direction="right" delay={400}>
              <div className="px-5 flex flex-col items-center mt-8 lg:mt-0">
                <div className="relative">
                  {/* Gradient Border Effect */}
                  <div className="relative p-1 rounded-full bg-gradient-to-r from-cyan-400 via-orange-500 to-cyan-400 animate-pulse">
                    <div className="relative">
                      <img
                        src={profileImage}
                        className="w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] rounded-full object-cover shadow-2xl border-4 border-gray-900"
                        alt="Atharva Pardeshi"
                      />

                      {/* Floating Elements */}
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
                      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-500 rounded-full animate-bounce delay-300"></div>
                      <div className="absolute top-1/4 -left-6 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-1/4 -right-6 w-5 h-5 bg-orange-500 rounded-full animate-pulse delay-500"></div>
                    </div>
                  </div>

                  {/* Decorative Rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-ping"></div>
                  <div className="absolute inset-4 rounded-full border border-orange-500/20 animate-ping delay-1000"></div>
                </div>
              </div>
            </FadeInAnimation>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background: linear-gradient(
            -45deg,
            #06b6d4,
            #f97316,
            #06b6d4,
            #f97316
          );
          background-size: 400% 400%;
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

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

// Navigation Component
const Navigation = ({ activeSection, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ["HOME", "ABOUT", "PROJECTS", "CONTACT"];

  const handleNavClick = (item) => {
    onNavigate(item.toLowerCase());
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-900/80 border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-cyan-400 cursor-pointer hover:scale-105 transition-transform">
            PORTFOLIO
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`hover:text-cyan-400 transition-colors hover:scale-110 ${
                  activeSection === item.toLowerCase() ? "text-cyan-400" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden hover:scale-110 transition-transform"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md transform transition-all">
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="block py-2 hover:text-cyan-400 transition-colors w-full text-left"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};


const SkillCard = ({ skill }) => {
  const { name, url } = skill;

  return (
    <div className="group flex flex-col items-center">
      <div
        className="relative w-full aspect-square bg-gray-700/40 backdrop-blur-sm 
  border border-transparent rounded-xl p-4 flex items-center justify-center 
  shadow-md transition-all duration-300 ease-in-out 
  hover:scale-105 hover:-translate-y-2 hover:shadow-cyan-400/30 
  hover:bg-gray-600/40 hover:border-cyan-400/30"
      >
        <img
          src={url}
          alt={`${name} logo`}
          loading="lazy"
          title={name}
          className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div
          className="hidden absolute inset-0 bg-cyan-400/10 text-cyan-300 text-2xl font-semibold 
          rounded-xl items-center justify-center tracking-widest"
        >
          {name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 3)
            .toUpperCase()}
        </div>
      </div>

      <p className="mt-2 text-white text-sm font-semibold tracking-wide text-center transition-colors duration-300 group-hover:text-cyan-400">
        {name}
      </p>
    </div>
  );
};

const Bio = () => {
  const skillsData = [
    {
      name: "C++",
      url: "https://img.icons8.com/color/192/000000/c-plus-plus-logo.png",
    },
    {
      name: "Java",
      url: "https://img.icons8.com/color/192/000000/java-coffee-cup-logo.png",
    },
    {
      name: "Python",
      url: "https://img.icons8.com/color/192/000000/python.png",
    },
    {
      name: "HTML",
      url: "https://img.icons8.com/color/192/000000/html-5.png",
    },
    {
      name: "CSS",
      url: "https://img.icons8.com/color/192/000000/css3.png",
    },
    {
      name: "JavaScript",
      url: "https://img.icons8.com/color/192/000000/javascript.png",
    },

    {
      name: "PostgreSQL",
      url: "https://img.icons8.com/color/192/000000/postgreesql.png",
    },
    {
      name: "Prisma",
      url: "https://img.icons8.com/?size=100&id=aqb9SdV9P8oC&format=png&color=000000",
    },
    {
      name: "MongoDB",
      url: "https://img.icons8.com/color/192/000000/mongodb.png",
    },
    {
      name: "Node JS",
      url: "https://img.icons8.com/color/192/000000/nodejs.png",
    },
    {
      name: "Express JS",
      url: "https://img.icons8.com/?size=100&id=kg46nzoJrmTR&format=png&color=000000", // monochrome (due to no official icon)
    },
    {
      name: "Flask",
      url: "https://img.icons8.com/?size=100&id=MHcMYTljfKOr&format=png&color=000000",
    },
    {
      name: "React JS",
      url: "https://img.icons8.com/color/192/000000/react-native.png",
    },

    {
      name: "Tailwind",
      url: "https://img.icons8.com/?size=100&id=CIAZz2CYc6Kc&format=png&color=000000",
    },
   
    {
      name: "Git",
      url: "https://img.icons8.com/color/192/000000/git.png",
    },
    
    
    {
      name: "Postman",
      url: "https://img.icons8.com/?size=100&id=EPbEfEa7o8CB&format=png&color=000000",
    },
  ];

  const technologies = [];

  return (
    <FadeInAnimation delay={200}>
      <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-8 mb-12">
        <h3 className="text-3xl font-bold mb-6 text-cyan-400 text-center">
          About Me
        </h3>
        <div className="space-y-6 text-lg leading-relaxed">
          <p className="text-gray-300">
            I'm a passionate Computer Engineering student driven by a deep
            curiosity to explore and build innovative tech solutions. With a
            strong inclination toward full-stack development and AI/ML, I love
            transforming ideas into impactful, real-world applications that
            solve meaningful problems.A quick learner, proactive team player,
            and natural leader, I thrive in collaborative environments where I
            can contribute, grow, and inspire. I bring dedication, adaptability,
            and a strong work ethic to every project I take on—striving not just
            for functionality, but excellence.
          </p>

          <p className="text-gray-300"></p>

         

          <p className="text-gray-300"></p>
        </div>

        {/* Featured Technologies */}
        <div className="flex flex-wrap gap-3 mt-8 mb-8">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-sm border border-cyan-400/30 hover:bg-cyan-400/30 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Skills Section */}
        <div className="mt-10">
          <h4 className="text-2xl font-bold mb-6 text-cyan-400 text-center">
            Technical Skills
          </h4>
          <div className="bg-gray-700/30 backdrop-blur-sm rounded-lg p-6 border border-cyan-400/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
              {skillsData.map((skill, index) => (
                <SkillCard key={index} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </FadeInAnimation>
  );
};

// Education Component

// Assuming FadeInAnimation is available, otherwise we'll create a simple version

const Education = () => {
  const educationData = [
    {
      date: "2023 - 2027",
      title: "Pune Institute of Computer Technology, Pune",
      subtitle: "B.E. - Computer Engineering",
      grade: "CGPA: 9.89/10",
      icon: "🎓",
    },
    {
      date: "2021 - 2023",
      title: "Dr. D.Y. Patil Junior College, Pune",
      subtitle: "12th Standard",
      grade: "Percentage: 86.50%",
      icon: "🎓",
    },
    {
      date: "2020-2021",
      title: "S.M. Lohia Highschool, Kolhapur",
      subtitle: "10th Standard",
      grade: "Percentage: 98.80%",
      icon: "🎓",
    },
  ];

  return (
    <FadeInAnimation delay={400}>
      <div className="mb-12">
        <h3 className="text-3xl font-bold mb-12 text-cyan-400 text-center">
          Education Timeline
        </h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-cyan-400 to-transparent"></div>

          <div className="space-y-8">
            {educationData.map((education, index) => (
              <div
                key={index}
                className="relative flex items-start gap-6 group"
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-800 border-4 border-cyan-400 rounded-full flex items-center justify-center text-2xl group-hover:border-cyan-300 transition-colors">
                    {education.icon}
                  </div>
                </div>

                {/* Content card */}
                <div className="flex-1 bg-gray-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-6 hover:border-cyan-400/40 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/10">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-cyan-400/20 text-cyan-400 text-sm font-semibold rounded-full">
                      {education.date}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2">
                    {education.title}
                  </h4>

                  <p className="text-cyan-400 font-semibold mb-3">
                    {education.subtitle}
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-orange-500 font-medium">
                      {education.grade}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </FadeInAnimation>
  );
};

const OrganizationCard = ({ organization }) => {
  const { position, name, logo, link } = organization;

  return (
    <div className="w-full xl:w-1/2 my-4">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg px-8 py-6 m-4 h-full hover:border-cyan-400/40 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/10">
        <div className="flex flex-col justify-between sm:flex-row sm:space-x-8 h-full  ">
          <div className="flex flex-col sm:flex-row sm:space-x-8 h-full">
            <img
              className="rounded-full h-24 w-24 bg-black my-auto mx-auto sm:mx-0 object-contain border-2 border-cyan-400/30"
              src={logo}
              alt={name}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className="hidden rounded-full h-24 w-24 bg-cyan-400/20 my-auto mx-auto sm:mx-0 items-center justify-center border-2 border-cyan-400/30">
              <span className="text-cyan-400 text-2xl font-bold">
                {name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </div>
            <div className="my-auto mt-10 sm:mt-4 sm:ml-6 text-center sm:text-left">
              <h3 className="text-cyan-400 font-bold text-2xl mb-2">{name}</h3>
              <h4 className="text-white font-medium text-lg mb-2">
                {position}
              </h4>
            </div>
          </div>

          <div className="flex items-center">
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto"
            >
              <button className="flex mt-8 sm:mt-0 w-full sm:w-auto mx-auto text-center bg-transparent transition duration-500 ease-in-out hover:bg-cyan-500 text-cyan-400 font-semibold hover:text-white py-3 px-6 border border-cyan-400 hover:border-transparent rounded-lg hover:shadow-lg hover:shadow-cyan-400/30">
                Visit Website
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Organizations = () => {
  const organizationsData = [
    {
      position: "Marketing Head",
      name: "PICTOREAL, PICT",
      logo: pictoreal,
      link: "https://www.pictoreal.in/",
    },
    {
      position: "Volunteer",
      name: "PICT IEEE Student Branch",
      logo: image, // You'll need to update this path
      link: "https://pictieee.in/",
    },
  ];

  return (
    <FadeInAnimation delay={1000}>
      <div className="mb-12">
        <h3 className="text-3xl font-bold mb-8 text-cyan-400 text-center">
          Organizations
        </h3>
        <div className="flex flex-wrap w-full">
          {organizationsData.map((organization, index) => (
            <OrganizationCard organization={organization} key={index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </FadeInAnimation>
  );
};

// About Section Component
const AboutSection = () => {
  return (
    <section id="about" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            <span className="text-cyan-400">ABOUT</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <Bio />
          <Education />
          <Organizations />
        </div>
      </div>
    </section>
  );
};



// Project Card Component
const ProjectCard = ({ project }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg overflow-hidden hover:border-cyan-400/40 transition-all duration-300 hover:scale-105 hover:-translate-y-2">
    <div className="relative overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
    </div>

    <div className="p-6">
      <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
      <p className="text-gray-400 mb-4 text-sm leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 bg-cyan-400/20 text-cyan-400 rounded text-xs border border-cyan-400/30"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <a
          href={project.liveUrl}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-400 text-gray-900 rounded-lg text-sm font-semibold hover:bg-cyan-300 hover:scale-105 transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          Live Demo
        </a>
        <a
          href={project.githubUrl}
          className="flex items-center gap-2 px-4 py-2 border border-cyan-400 text-cyan-400 rounded-lg text-sm font-semibold hover:bg-cyan-400 hover:text-gray-900 hover:scale-105 transition-all"
        >
          <Github className="w-4 h-4" />
          Code
        </a>
      </div>
    </div>
  </div>
);

import proimg from './images/proimg.png';
import ftt from './images/ftt.png';
import nexjob from './images/nexjob.png';

// Projects Section Component
const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "PROIMG",
      tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Socket.io", "OAuth"],
      description: [
        "Designed and developed a full-stack social discovery platform that enables users to explore, curate, and share visual content via personalized boards.",
        "Crafted a responsive and interactive UI/UX for smooth navigation, performance, and user engagement.",
        "Integrated features for image upload, discovery, commenting, likes, following, and real-time chat to encourage collaboration and community engagement."
      ],
      liveUrl: "https://proimg.onrender.com/",
      githubUrl: "https://github.com/PratikChavan05/ProImg",
      image: proimg
    },
    {
      id: 2,
      title: "DAILY-VEGIES",
      tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Flask"],
      description: [
        "Built a supply chain optimization platform with four user roles: farmer, consumer, delivery boy, and admin.",
        "Integrated a machine learning model using Flask to predict crop prices for informed decisions and increased farmer profitability.",
        "Streamlined direct farmer-to-consumer transactions to reduce middlemen and ensure fair pricing.",
        "Delivered an intuitive and mobile-friendly UI for seamless multi-role access and navigation."
      ],
      liveUrl: "https://dailyvegies.onrender.com/",
      githubUrl: "https://github.com/PratikChavan05/DailyVegies",
      image: ftt
    },
    {
      id: 3,
      title: "NEX-JOB",
      tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Flask", "Socket.io", "JitsiMeet"],
      description: [
        "Developed a comprehensive job portal connecting recruiters and job seekers with advanced hiring workflows.",
        "Enabled recruiters to post, edit, and manage job listings, view applications, and schedule interviews with an embedded IDE.",
        "Built features for job seekers to apply, withdraw, and track applications seamlessly.",
        "Implemented intelligent job recommendations, a career pathway generator, and resume builder to assist in personalized job searches."
      ],
      liveUrl: "https://nexjob-1ioj.onrender.com/",
      githubUrl: "https://github.com/PratikChavan05/NeXJob",
      image: nexjob
    }
  ];

  return (
    <section id="projects" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            <span className="text-cyan-400">PROJECTS</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-800/50 p-6 rounded-lg border border-cyan-400/10 hover:border-cyan-400/40 transition-all hover:shadow-lg hover:shadow-cyan-400/10">
              <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-cyan-400 text-xl font-bold mb-2">{project.title}</h3>
              <ul className="text-white text-sm list-disc list-inside space-y-1 mb-3">
                {project.description.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, idx) => (
                  <span key={idx} className="bg-cyan-400/20 text-cyan-300 text-xs px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-white transition">
                  🔗 Live
                </a>
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-white transition">
                  💻 GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



// Contact Form Component with full validation and API integration

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "* Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "* Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "* Phone is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "* Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xvgrwqvo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send");

      alert("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-8 space-y-6"
    >
      {/* Name and Email */}
      <div className="grid md:grid-cols-2 gap-6">
        {["name", "email"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-white mb-2 capitalize">
              {field}
            </label>
            <input
              name={field}
              type={field === "email" ? "email" : "text"}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Your ${field}`}
              className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none ${
                errors[field]
                  ? "border-red-500 focus:border-red-400"
                  : "border-cyan-400/30 focus:border-cyan-400"
              }`}
            />
            {errors[field] && (
              <p className="text-red-400 text-xs mt-2">{errors[field]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Phone</label>
        <input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="9876543210"
          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none ${
            errors.phone
              ? "border-red-500 focus:border-red-400"
              : "border-cyan-400/30 focus:border-cyan-400"
          }`}
        />
        {errors.phone && <p className="text-red-400 text-xs mt-2">{errors.phone}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Message</label>
        <textarea
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Hey there, I am interested in your services. Can we schedule a call?"
          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white resize-none focus:outline-none ${
            errors.message
              ? "border-red-500 focus:border-red-400"
              : "border-cyan-400/30 focus:border-cyan-400"
          }`}
        />
        {errors.message && (
          <p className="text-red-400 text-xs mt-2">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 rounded-lg font-semibold transition-all ${
          isSubmitting
            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
            : "bg-gradient-to-r from-cyan-400 to-orange-500 text-gray-900 hover:from-cyan-300 hover:to-orange-400 hover:scale-105"
        }`}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};





const ContactInfo = () => {
  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Mail Me:",
      info: "pratikpchavan75@gmail.com",
      link: "mailto:pratikpchavan75@gmail.com",
      description: "Drop me a line anytime",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Phone Me:",
      info: "+91 9699951243",
      link: "tel:+91 9699951243",
      description: "Available for calls",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Meet Me:",
      info: "Pune, Maharashtra",
      link: "https://goo.gl/maps/Yg3JFteSWH2MK8q38",
      description: "Let's grab coffee",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Github className="w-8 h-8" />,
      title: "GitHub:",
      info: "Pratik Chavan",
      link: "https://github.com/PratikChavan05",
      description: "Check out my code",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: <Linkedin className="w-8 h-8" />,
      title: "LinkedIn:",
      info: "Pratik Chavan",
      link: "https://www.linkedin.com/in/pratik-chavan-09bb0b2a1",
      description: "Let's connect professionally",
      color: "from-blue-600 to-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-800/50 backdrop-blur-sm p-6">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
            Get In Touch
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Ready to collaborate or just want to say hello? Choose your preferred way to connect with me.
          </p>
        </div>

        {/* Enhanced grid layout - 5 cards in single row on laptop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              target={method.link.startsWith('http') ? '_blank' : '_self'}
              rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
              className="group block h-full"
            >
              <div className="relative bg-gray-900/60 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 text-center hover:border-cyan-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/25 overflow-hidden h-full flex flex-col justify-between min-h-[260px]">
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500 rounded-2xl`}></div>
                
                {/* Enhanced floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-6 left-6 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-12 right-8 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-100"></div>
                  <div className="absolute bottom-8 left-10 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                  <div className="absolute bottom-16 right-6 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-300"></div>
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon container with enhanced styling */}
                  <div className="relative mb-4 flex-shrink-0">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${method.color} group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <div className="text-white drop-shadow-lg">
                        {method.icon}
                      </div>
                    </div>
                    
                    {/* Enhanced pulse ring effect */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-40 animate-ping duration-1000`}></div>
                  </div>
                  
                  {/* Content section with better spacing */}
                  <div className="flex-grow flex flex-col justify-center">
                    <h4 className="text-white font-bold text-lg mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-500">
                      {method.title}
                    </h4>
                    
                    <p className="text-gray-300 group-hover:text-cyan-300 transition-colors duration-500 font-medium mb-2 break-words text-xs leading-relaxed">
                      {method.info}
                    </p>
                    
                    <p className="text-gray-500 text-xs group-hover:text-gray-300 transition-colors duration-500 leading-relaxed">
                      {method.description}
                    </p>
                  </div>
                  
                  {/* Enhanced hover indicator */}
                  <div className="mt-3 flex justify-center flex-shrink-0">
                    <div className="w-0 group-hover:w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Enhanced call-to-action section */}
        <div className="text-center bg-gradient-to-r from-gray-900/70 to-gray-800/70 backdrop-blur-lg border border-cyan-400/30 rounded-3xl p-12 shadow-2xl">
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Start Something Amazing?
          </h3>
          <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
            Whether you have a project in mind, want to collaborate, or just want to chat about technology, 
            I'm always excited to connect with fellow developers and innovators.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="mailto:pratikpchavan75@gmail.com"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/30 text-lg"
            >
              <Mail className="w-6 h-6" />
              Send Email
            </a>
            <a
              href="https://www.linkedin.com/in/pratik-chavan-09bb0b2a1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg"
            >
              <Linkedin className="w-6 h-6" />
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};






// Main Contact Section Component
const ContactSection = () => (
  <section id="contact" className="py-20 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
        <span className="text-cyan-400">CONTACT</span>
        </h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          While I am good with smoke signals,there are simpler ways to get in
          touch and answer your queries.
        </p>
      </div>

      <ContactInfo />

      <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 text-center">
  <h4 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
    We Value Your <span className="text-cyan-400">Feedback</span>
  </h4>
  <p className="text-gray-400 text-base md:text-lg mb-10">
    Let us know your thoughts, suggestions, or questions. We're always eager to improve!
  </p>
  <div className="animate-fadeInUp">
    <ContactForm />
  </div>
</div>

    </div>
  </section>
);


// Footer Component
const Footer = () => (
  <footer className="py-8 border-t border-cyan-400/20 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-gray-400">
          © 2025 Made with 🧡 by Pratik Chavan.
        </p>
      </div>
    </div>
  </footer>
);

// Main App Component
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth"  });
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <AmazingLoader onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-x-hidden">
      <AnimatedBackground />
      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />
      <HeroSection onNavigate={scrollToSection} />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />

      <style jsx>{`
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
      `}</style>
    </div>
  );
};


export default App;
