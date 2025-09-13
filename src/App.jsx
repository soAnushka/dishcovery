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
  const [searchStarted, setSearchStarted] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { recipes, searchRecipes } = useRecipes();

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

        {/* Header + SearchBar container */}
        {!landingVisible && (
          <div
            className={`
              absolute left-1/2 transform -translate-x-1/2
              transition-all duration-700 ease-in-out
              ${searchStarted ? "top-4 translate-y-0" : "top-1/2 -translate-y-1/2"}
              z-20
              flex flex-col items-center gap-4
            `}
          >
            <Header />
            <SearchBar
              size={searchStarted ? "normal" : "large"}
              onSearch={(ingredients) => {
                searchRecipes(ingredients);
                setSearchStarted(true); // trigger move to top
              }}
              onRandomMealSelect={(meal) => {
                setSelectedMeal(meal);
                setIsModalOpen(true);
                setSearchStarted(true);
              }}
            />
          </div>
        )}

        {/* Recipes Carousel / Grid */}
        <div className={`px-2 transition-all duration-700 ${searchStarted ? "mt-[18rem]" : "mt-[0rem]"}`}>
          {recipes.length === 0 ? (
            <></>
          ) : (
            <MealCarousel meals={recipes} onMealClick={handleMealClick} />
          )}
        </div>

        {/* Recipe Modal */}
        <RecipeModal
          meal={selectedMeal}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      </div>
    </IngredientProvider>
  );
}

export default App;
