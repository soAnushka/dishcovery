import { useState, useContext } from "react";
import { IngredientContext } from "../contexts/IngredientContext";
import SurpriseMeButton from "../components/SurpriseMeButton";
import { useRandomMeal } from "../hooks/useRandomMeal";
import Autosuggest from "react-autosuggest";
import pluralize from "pluralize";
import "../styles/Autosuggest.css";

function SearchBar({ onSearch, onRandomMealSelect, size = "normal" }) {
  const [ingredient, setIngredient] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { masterIngredients, loading } = useContext(IngredientContext);
  const { fetchRandomMeal } = useRandomMeal();

  const handleSurpriseMe = async () => {
    const randomMeal = await fetchRandomMeal();
    if (randomMeal) onRandomMealSelect(randomMeal);
  };

  const getSuggestions = (value) => {
  const parts = value.split(",").map((p) => p.trim());
  const inputValue = parts[parts.length - 1].toLowerCase();
  if (!inputValue) return [];

  return masterIngredients
    .filter((ing) => {
      const normalized = ing.toLowerCase();
      return (
        normalized.includes(inputValue) ||
        pluralize.singular(normalized) === pluralize.singular(inputValue)
      );
    })
    .sort((a, b) => {
      const aNormalized = a.toLowerCase();
      const bNormalized = b.toLowerCase();

      // Get index of match
      const aIndex = aNormalized.indexOf(inputValue);
      const bIndex = bNormalized.indexOf(inputValue);

      if (aIndex !== bIndex) return aIndex - bIndex; // smaller index first
      return aNormalized.localeCompare(bNormalized); // alphabetically if same index
    });
};


  const onSuggestionsFetchRequested = ({ value }) => setSuggestions(getSuggestions(value));
  const onSuggestionsClearRequested = () => setSuggestions([]);

  const getSuggestionValue = (suggestion) => {
    const parts = ingredient.split(",").map((p) => p.trim());
    parts[parts.length - 1] = suggestion;
    return parts.join(", ");
  };

  const renderSuggestion = (suggestion) => <div className="cursor-pointer">{suggestion}</div>;

  const normalizeIngredient = (input) => {
    const normalize = (str) => str.toLowerCase().trim();
    return input.map((ing) => {
      const found = masterIngredients.find((master) => {
        return (
          normalize(master).includes(normalize(ing)) ||
          normalize(ing).includes(normalize(master)) ||
          pluralize.singular(master) === pluralize.singular(ing)
        );
      });
      return found || ing;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    const ingredientsArray = ingredient
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    if (ingredientsArray.length) {
      const normalized = normalizeIngredient(ingredientsArray);
      onSearch(normalized);
    }
  };

  if (loading) return <p>Loading ingredients...</p>;

  // Adjust sizes for large mode
  const inputHeight = size === "large" ? "h-14" : "h-10";
  const inputWidth = size === "large" ? "w-96" : "w-64";
  const fontSize = size === "large" ? "text-xl" : "text-base";
  const buttonHeight = size === "large" ? "h-14" : "h-10";

  return (
    <form className="flex items-center justify-center gap-2 mt-4 relative" onSubmit={handleSubmit}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: "(e.g., chicken, rice)",
          value: ingredient,
          onChange: (_, { newValue }) => setIngredient(newValue),
          className: `px-4 border border-pink-300 rounded-lg ${inputWidth} ${inputHeight} ${fontSize} italic focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-pink-50 text-pink-900 placeholder-pink-300`,
        }}
      />

      <button
        type="submit"
        className={`px-6 ${buttonHeight} bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-xl shadow hover:from-pink-500 hover:to-pink-700 transition`}
      >
        Search
      </button>

      <div className={`${buttonHeight} flex items-center`}>
        <SurpriseMeButton onClick={handleSurpriseMe} size={size} />
      </div>
    </form>
  );
}

export default SearchBar;
