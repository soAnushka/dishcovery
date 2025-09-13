const LandingPage = ({ visible, onStart }) => (
  <div
    className={`
      absolute inset-0 bg-gradient-to-r from-pink-100 to-yellow-100 flex flex-col items-center justify-center 
      transition-transform duration-700 ease-in-out
      ${visible ? "translate-y-0" : "-translate-y-full"}
      cursor-pointer
    `}
    onClick={onStart}
  >
    <h1 className="text-9xl font-bold text-pink-700 mb-4">🍳 Dishcovery</h1>
    <p className="text-lg text-indigo-800 mb-2">
      Discover, cook, and enjoy — one ingredient at a time.
    </p>
    <p className="text-gray-500 italic">Click anywhere to start cooking!</p>
  </div>
);

export default LandingPage;
