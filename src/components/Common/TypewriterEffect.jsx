import React, { useState, useEffect } from "react";

const TypewriterEffect = ({
  texts,
  speed = 100,
  deleteSpeed = 50,
  delayBetween = 1000,
}) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const current = texts[currentIndex];

        if (isDeleting) {
          setCurrentText(current.substring(0, currentText.length - 1));
          if (currentText === "") {
            setIsDeleting(false);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
          }
        } else {
          setCurrentText(current.substring(0, currentText.length + 1));
          if (currentText === current) {
            setTimeout(() => setIsDeleting(true), delayBetween);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    currentIndex,
    isDeleting,
    texts,
    speed,
    deleteSpeed,
    delayBetween,
  ]);

  return (
    <span className="text-cyan-500 font-semibold text-xl sm:text-2xl md:text-4xl">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypewriterEffect;
