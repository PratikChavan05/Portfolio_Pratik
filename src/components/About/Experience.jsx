import React from "react";
import FadeInAnimation from "../Common/FadeInAnimation";
import TenancyPassportLogo from '../../images/tenancy.jpeg';

const Experience = () => {
  const experienceData = [
    {
      date: "July 2025 - Present",
      title: "Developer Intern",
      company: "Tenancy Passport (Remote)",
      duties: [
        "Developed front-end modules using React.js and TypeScript.",
        "Integrated REST APIs to enable smooth data exchange.",
        "Collaborated in daily scrums and met sprint deadlines in agile workflows.",
      ],
      logo: TenancyPassportLogo, 
    },
  ];

  return (
    <FadeInAnimation delay={600}>
      <div className="mb-12">
        <h3 className="text-3xl font-bold mb-12 text-cyan-400 text-center">
          Work Experience
        </h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-cyan-400 to-transparent"></div>

          <div className="space-y-8">
            {experienceData.map((experience, index) => (
              <div key={index} className="relative flex items-start gap-6 group">
                {/* Timeline dot/logo */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-800 border-4 border-cyan-400 rounded-full flex items-center justify-center text-2xl group-hover:border-cyan-300 transition-colors overflow-hidden">
                    <img src={experience.logo} alt="Company Logo" className="w-full h-full object-contain p-2" />
                  </div>
                </div>

                {/* Content card */}
                <div className="flex-1 bg-gray-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-6 hover:border-cyan-400/40 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/10">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-cyan-400/20 text-cyan-400 text-sm font-semibold rounded-full">
                      {experience.date}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">
                    {experience.title}
                  </h4>
                  <p className="text-cyan-400 font-semibold mb-3">
                    {experience.company}
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    {experience.duties.map((duty, idx) => (
                      <li key={idx}>{duty}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeInAnimation>
  );
};

export default Experience;
