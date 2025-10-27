import React from "react";

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

export default SkillCard;
