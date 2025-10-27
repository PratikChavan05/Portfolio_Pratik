import React from "react";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const ContactSection = () => (
  <section id="contact" className="py-20 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          <span className="text-cyan-400">CONTACT</span>
        </h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          While I am good with smoke signals, there are simpler ways to get in
          touch and answer your queries.
        </p>
      </div>

      <ContactInfo />

      <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 text-center">
        <h4 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
          I'd Love Your <span className="text-cyan-400">Feedback</span>
        </h4>
        <p className="text-gray-400 text-base md:text-lg mb-10">
          Let me know your thoughts, suggestions, or questions.
        </p>
        <div className="animate-fadeInUp">
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
