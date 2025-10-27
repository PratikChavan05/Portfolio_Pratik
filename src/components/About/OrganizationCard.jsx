import React from "react";

const OrganizationCard = ({ organization }) => {
  const { position, name, logo, link } = organization;

  return (
    <div className="w-full xl:w-1/2 my-4">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg px-8 py-6 m-4 h-full hover:border-cyan-400/40 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/10">
        <div className="flex flex-col justify-between sm:flex-row sm:space-x-8 h-full">
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

export default OrganizationCard;
