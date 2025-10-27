import React from "react";
import { Download } from "lucide-react";
import TypewriterEffect from "../Common/TypewriterEffect";
import FadeInAnimation from "../Common/FadeInAnimation";
import myimage from "../../images/pf.jpg";

const HeroSection = () => {
  const typewriterTexts = [
    "Web Developer",
    "AI/ML Enthusiast",
    "Tech Innovator",
    "Problem Solver",
  ];

  const profileImage = myimage;

  const handleResumeClick = () => {
    const portfolioUrl = "https://drive.google.com/file/d/1H2hoAYN9Fm9f7tGFwwFuwp18lvz7Dh7b/view?usp=sharing";
    window.open(portfolioUrl, "_blank");
  };

  return (
    <div id="home" className="min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden">
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
                <div className="mt-4 font-semibold text-cyan-400 text-xl sm:text-2xl md:text-4xl text-left min-h-[3rem]">
                  <TypewriterEffect texts={typewriterTexts} />
                </div>

                <p className="mt-6 font-normal text-gray-300 text-lg md:text-xl text-left leading-relaxed"></p>

                {/* Buttons */}
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mt-8">
                  <button
                    onClick={handleResumeClick}
                    className="w-full lg:w-auto font-semibold bg-transparent transition duration-500 ease-in-out hover:bg-cyan-400 text-cyan-400 hover:text-white py-4 px-8 border-2 border-cyan-400 hover:border-transparent rounded-lg hover:scale-105 transform flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    See my Resume
                  </button>
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
                        alt="Pratik Chavan"
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

export default HeroSection;
