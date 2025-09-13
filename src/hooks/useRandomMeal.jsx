// src/hooks/useRandomMeal.js
import { useState } from "react";

export function useRandomMeal() {
  const [meal, setMeal] = useState(null);

  const fetchRandomMeal = async () => {
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await res.json();
      setMeal(data.meals[0]);
      return data.meals[0];
    } catch (err) {
      console.error("Error fetching random meal:", err);
      return null;
    }
  };

  return { meal, fetchRandomMeal, setMeal };
}
