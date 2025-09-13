import React, { useEffect, useState } from "react";

function RecipeModal({ meal, isOpen, onClose }) {
  const [details, setDetails] = useState(null);
  const [visible, setVisible] = useState(false);

  // Fetch full meal details when modal opens
  useEffect(() => {
    if (!meal) return;

    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        );
        const data = await res.json();
        setDetails(data.meals[0]);
      } catch (err) {
        console.error("Error fetching meal details:", err);
      }
    };

    fetchDetails();
  }, [meal]);

  // Animate fade + scale
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setVisible(true);
    } else {
      document.body.style.overflow = "auto";
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible || !meal) return null;

  // Extract ingredients dynamically
  const ingredients = [];
  if (details) {
    for (let i = 1; i <= 20; i++) {
      const ingredient = details[`strIngredient${i}`];
      const measure = details[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50
        transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
    >
      <div
        className={`relative max-w-3xl w-full max-h-[90vh] rounded-3xl
            transform transition-all duration-300 ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
            shadow-2xl`}
        style={{
          background: "linear-gradient(to bottom, #ffe4e1, #fff9f0)", // pink → cream
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold z-50"
        >
          ✕
        </button>

        {/* Scrollable content */}
        <div
          className="overflow-auto p-6 max-h-[90vh] scrollbar-hide modal-scroll text-justify"
          style={{
            scrollbarWidth: "none",
          }}
        >
          <style>
            {`
              .modal-scroll::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>

          {/* Meal Image with glass overlay */}
          <div className="relative w-full overflow-hidden rounded-2xl mb-6 shadow-lg">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-sm"></div>
          </div>

          {/* Meal Details */}
          <div className="space-y-6 text-gray-800">
            <h2 className="text-3xl font-extrabold text-pink-700">{meal.strMeal}</h2>

            {details ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {ingredients.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
                  <p className="whitespace-pre-line">{details.strInstructions}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Loading details...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeModal;
