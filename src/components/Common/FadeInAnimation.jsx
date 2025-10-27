import React, { useState, useEffect } from "react";

const FadeInAnimation = ({ children, delay = 0, direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getTransform = () => {
    switch (direction) {
      case "left":
        return "translateX(-50px)";
      case "right":
        return "translateX(50px)";
      case "up":
        return "translateY(50px)";
      case "down":
        return "translateY(-50px)";
      default:
        return "translateY(50px)";
    }
  };

  return (
    <div
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? "opacity-100 transform translate-x-0 translate-y-0"
          : "opacity-0"
      }`}
      style={{
        transform: isVisible ? "none" : getTransform(),
      }}
    >
      {children}
    </div>
  );
};

export default FadeInAnimation;
