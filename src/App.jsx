import { useState } from "react";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MealCarousel from "./components/MealCarousel";
import RecipeModal from "./components/RecipeModal";
import { useRecipes } from "./hooks/useRecipes";
import { IngredientProvider } from "./contexts/IngredientContext"; 

function App() {
  const [landingVisible, setLandingVisible] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { recipes, searchRecipes } = useRecipes();

  // Landing page slide-up
  const handleStart = () => setLandingVisible(false);

  // Modal handlers
  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMeal(null);
  };
  const handleNavigateToRecipe = () => {
    if (!selectedMeal) return;
    window.open(
      `https://www.themealdb.com/meal/${selectedMeal.idMeal}`,
      "_blank"
    );
    handleModalClose();
  };

  return (
        <IngredientProvider>

    <div className="relative min-h-screen bg-gradient-to-r from-pink-50 to-yellow-50 text-center overflow-hidden">
      {/* Landing Page */}
      <LandingPage visible={landingVisible} onStart={handleStart} />

      {/* Header */}
      <Header />

      {/* Search */}
      <SearchBar 
        onSearch={searchRecipes} 
        onRandomMealSelect={(meal) => {
          setSelectedMeal(meal);
          setIsModalOpen(true);
        }} 
      />

      {/* Recipes Carousel / Grid */}
      <div className="mt-20 px-2">
        {recipes.length === 0 ? (
          <p className="text-gray-500">Type an ingredient to begin...</p>
        ) : (
          <MealCarousel meals={recipes} onMealClick={handleMealClick} />
        )}
      </div>

      {/* Recipe Modal */}
      <RecipeModal
        meal={selectedMeal}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onNavigate={handleNavigateToRecipe}
      />
    </div>
        </IngredientProvider>
  );
}

export default App;
