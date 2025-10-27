import React from "react";
import FadeInAnimation from "../Common/FadeInAnimation";
import OrganizationCard from "./OrganizationCard";
import pictoreal from "../../images/pictoreal.png";
import image from "../../images/ieee.jpg";

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
      logo: image,
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
    </FadeInAnimation>
  );
};

export default Organizations;
