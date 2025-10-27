import React from "react";
import proimg from '../../images/proimg.png';
import ftt from '../../images/ftt.png';
import nexjob from '../../images/nexjob.png';

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

export default ProjectsSection;
