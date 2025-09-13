import { useState, useEffect, useContext } from "react";
import { IngredientContext } from "../contexts/IngredientContext";
import SurpriseMeButton from "../components/SurpriseMeButton";
import { useRandomMeal } from "../hooks/useRandomMeal";

function SearchBar({ onSearch , onRandomMealSelect}) {
  const [ingredient, setIngredient] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const { masterIngredients, loading } = useContext(IngredientContext);


  const { fetchRandomMeal } = useRandomMeal();
  const handleSurpriseMe = async () => {
    const randomMeal = await fetchRandomMeal();
    if (randomMeal) {
        onRandomMealSelect(randomMeal);
    }
  };

  const normalizeIngredient = (input) => {
    const normalize = (str) => str.toLowerCase().trim();
    return input.map((ing) => {
      const found = masterIngredients.find((master) =>
        normalize(master).includes(normalize(ing)) ||
        normalize(ing).includes(normalize(master))
      );
      return found || ing;
    });
  };

  useEffect(() => {
    if (!ingredient || loading) return;
    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(() => {
      const ingredientsArray = ingredient
        .split(/[\s,]+/)
        .map((i) => i.trim())
        .filter(Boolean);

      if (ingredientsArray.length) {
        const normalized = normalizeIngredient(ingredientsArray);
        onSearch(normalized);
      }
    }, 500);

    setDebounceTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [ingredient, masterIngredients, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    const ingredientsArray = ingredient
      .split(/[\s,]+/)
      .map((i) => i.trim())
      .filter(Boolean);

    if (ingredientsArray.length) {
      const normalized = normalizeIngredient(ingredientsArray);
      onSearch(normalized);
    }
  };

  if (loading) return <p>Loading ingredients...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center gap-2 mt-8"
    >
      <input
        type="text"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        placeholder="(e.g., chicken, rice)"
        className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-pink-400 italic"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition"
      >
        Search
      </button>

        {/* Surprise Me */}
        <div className="px-2 py-2">
        <SurpriseMeButton onClick={handleSurpriseMe} />
        </div>

    </form>
  );
}

export default SearchBar;
