import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGameMode = (mode) => {
    navigate("/game", { state: { gameMode: mode } });
  };

  return (
    <div className="text-center max-w-2xl mx-auto px-4">
      <h1 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-8 text-indigo-600 animate-appear">
        Welcome to Tic Tac Toe!
      </h1>
      <div className="space-y-4 sm:space-y-6 animate-appear" style={{ animationDelay: '0.2s' }}>
        <button
          onClick={() => handleGameMode("pvp")}
          className="w-full sm:w-72 bg-gradient-to-r from-blue-500 to-blue-700 text-white 
            px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-blue-800 
            transition-all duration-200 transform hover:scale-105 active:scale-95
            text-base sm:text-lg font-bold shadow-lg hover:shadow-xl"
        >
          Player vs Player
        </button>
        <button
          onClick={() => handleGameMode("cpu")}
          className="w-full sm:w-72 bg-gradient-to-r from-green-500 to-green-700 text-white 
            px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl hover:from-green-600 hover:to-green-800 
            transition-all duration-200 transform hover:scale-105 active:scale-95
            text-base sm:text-lg font-bold shadow-lg hover:shadow-xl"
        >
          Play Against Computer
        </button>
      </div>
    </div>
  );
};

export default Home; 