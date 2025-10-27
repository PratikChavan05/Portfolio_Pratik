import React from "react";
import Bio from "./Bio";
import Experience from "./Experience";
import Education from "./Education";
import Organizations from "./Organizations";

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
          <Experience />
          <Education />
          <Organizations />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
