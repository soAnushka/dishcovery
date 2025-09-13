import React from "react";

const SurpriseMeButton = ({ onClick, size = "normal" }) => {
  // Size styles
  const height = size === "large" ? "h-14" : "h-10";
  const paddingX = size === "large" ? "px-6" : "px-4";
  const fontSize = size === "large" ? "text-lg" : "text-base";

  return (
    <button
      onClick={onClick}
      className={`${height} ${paddingX} ${fontSize} bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition flex items-center justify-center`}
    >
      🎲 Surprise Me!
    </button>
  );
};

export default SurpriseMeButton;
