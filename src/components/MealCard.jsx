// src/components/MealCard.jsx
import React, { useRef, useEffect, useState } from "react";

function MealCard({ meal, onClick }) {
  const imgRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax effect based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const windowSize = isMobile ? window.innerHeight : window.innerWidth;

      // Relative offset: -10 to +10
      const relative = ((rect.top - windowSize / 2) / windowSize) * 20;

      setOffset(relative);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
      <div
        onClick={() => onClick(meal)}
            className="cursor-pointer overflow-hidden rounded-lg shadow-xl 
                hover:shadow-xl hover:scale-105 transition-transform duration-300 flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px]"
      >
      <div className="overflow-hidden h-72 w-full">
        <img
          ref={imgRef}
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover transform transition-transform duration-500"
          style={{
            transform: isMobile
              ? `scale(1.1) translateY(${offset}px)`
              : `scale(1.1) translateX(${offset}px)`,
          }}
        />
      </div>
      <div className="p-4 bg-cream-50">
        <h3 className="font-semibold text-lg text-pink-700">{meal.strMeal}</h3>
      </div>
    </div>
  );
}

export default MealCard;
