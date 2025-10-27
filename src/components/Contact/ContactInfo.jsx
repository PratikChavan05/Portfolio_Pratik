import React from "react";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

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
    <div className="bg-gray-800/50 backdrop-blur-sm p-6">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
            Get In Touch
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Ready to collaborate or just want to say hello? Choose your preferred way to connect with me.
          </p>
        </div>

        {/* Contact Methods Grid */}
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

export default ContactInfo;
