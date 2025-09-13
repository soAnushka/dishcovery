import { useState } from "react";

export function useRecipes() {
  const [recipes, setRecipes] = useState([]);

  const searchRecipes = async (ingredientsArray) => {
    try {
      const results = await Promise.all(
        ingredientsArray.map(async (ingredient) => {
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
          );
          const data = await res.json();
          return data.meals || [];
        })
      );

      // Intersection by idMeal
      const commonIds = results.reduce((acc, meals) => {
        const ids = meals.map((meal) => meal.idMeal);
        return acc.filter((id) => ids.includes(id));
      }, results[0]?.map((meal) => meal.idMeal) || []);

      const commonMeals = results[0].filter((meal) =>
        commonIds.includes(meal.idMeal)
      );

      setRecipes(commonMeals);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    }
  };

  return { recipes, searchRecipes };
}
