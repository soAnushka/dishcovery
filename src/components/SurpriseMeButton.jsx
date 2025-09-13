// src/components/SurpriseMeButton.jsx
import React from "react";

const SurpriseMeButton = ({ onClick }) => (
  <button
    className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
    onClick={onClick}
  >
    🎲 Surprise Me!
  </button>
);

export default SurpriseMeButton;
