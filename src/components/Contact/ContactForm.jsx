import React, { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "* Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "* Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "* Phone is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "* Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xvgrwqvo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send");

      alert("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-8 space-y-6"
    >
      {/* Name and Email */}
      <div className="grid md:grid-cols-2 gap-6">
        {["name", "email"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-white mb-2 capitalize">
              {field}
            </label>
            <input
              name={field}
              type={field === "email" ? "email" : "text"}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Your ${field}`}
              className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none ${
                errors[field]
                  ? "border-red-500 focus:border-red-400"
                  : "border-cyan-400/30 focus:border-cyan-400"
              }`}
            />
            {errors[field] && (
              <p className="text-red-400 text-xs mt-2">{errors[field]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Phone</label>
        <input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="9876543210"
          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none ${
            errors.phone
              ? "border-red-500 focus:border-red-400"
              : "border-cyan-400/30 focus:border-cyan-400"
          }`}
        />
        {errors.phone && <p className="text-red-400 text-xs mt-2">{errors.phone}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Message</label>
        <textarea
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Hey there, I am interested in your services. Can we schedule a call?"
          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white resize-none focus:outline-none ${
            errors.message
              ? "border-red-500 focus:border-red-400"
              : "border-cyan-400/30 focus:border-cyan-400"
          }`}
        />
        {errors.message && (
          <p className="text-red-400 text-xs mt-2">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 rounded-lg font-semibold transition-all ${
          isSubmitting
            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
            : "bg-gradient-to-r from-cyan-400 to-orange-500 text-gray-900 hover:from-cyan-300 hover:to-orange-400 hover:scale-105"
        }`}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
