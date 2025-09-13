// src/context/IngredientContext.jsx
import { createContext, useEffect, useState } from "react";

export const IngredientContext = createContext();

export const IngredientProvider = ({ children }) => {
  const [masterIngredients, setMasterIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMasterList = async () => {
      try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
        const data = await res.json();
        const list = data.meals.map((i) => i.strIngredient);
        setMasterIngredients(list);
      } catch (err) {
        console.error("Error fetching master ingredient list:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMasterList();
  }, []);

  return (
    <IngredientContext.Provider value={{ masterIngredients, loading }}>
      {children}
    </IngredientContext.Provider>
  );
};
