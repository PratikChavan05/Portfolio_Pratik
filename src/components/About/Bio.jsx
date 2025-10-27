import React from "react";
import FadeInAnimation from "../Common/FadeInAnimation";
import SkillCard from "./SkillCard";

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
      url: "https://img.icons8.com/?size=100&id=kg46nzoJrmTR&format=png&color=000000",
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
            solve meaningful problems. A quick learner, proactive team player,
            and natural leader, I thrive in collaborative environments where I
            can contribute, grow, and inspire. I bring dedication, adaptability,
            and a strong work ethic to every project I take on—striving not just
            for functionality, but excellence.
          </p>
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
    </FadeInAnimation>
  );
};

export default Bio;
