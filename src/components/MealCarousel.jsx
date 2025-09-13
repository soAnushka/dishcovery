// src/components/MealCarousel.jsx
import React, { useRef, useEffect, useState } from "react";
import MealCard from "./MealCard";

function MealCarousel({ meals, onMealClick }) {
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile / desktop
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
        ref={carouselRef}
        className={`${isMobile ? "flex flex-col" : "flex flex-row overflow-x-auto scrollbar-hide"} 
        gap-6 py-6 px-4`}
    >
      {meals.map((meal) => (
        <MealCard key={meal.idMeal} meal={meal} onClick={onMealClick} />
      ))}
    </div>
  );
}

export default MealCarousel;
