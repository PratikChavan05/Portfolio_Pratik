import React from "react";
import FadeInAnimation from "../Common/FadeInAnimation";

const Education = () => {
  const educationData = [
    {
      date: "2023 - 2027",
      title: "Pune Institute of Computer Technology, Pune",
      subtitle: "B.E. - Computer Engineering",
      grade: "CGPA: 9.715/10",
      icon: "🎓",
    },
    {
      date: "2021 - 2023",
      title: "Dr. D.Y. Patil Junior College, Kolhapur",
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
    </FadeInAnimation>
  );
};

export default Education;
