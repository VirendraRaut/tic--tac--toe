import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4 py-3 sm:py-4">
        <Link to="/" className="text-lg sm:text-xl font-bold hover:text-indigo-200 transition-colors">
          Tic Tac Toe
        </Link>
        <div className="space-x-3 sm:space-x-4">
          <Link to="/" className="text-sm sm:text-base hover:text-indigo-200 transition-colors">
            Home
          </Link>
          <Link to="/game" className="text-sm sm:text-base hover:text-indigo-200 transition-colors">
            Play
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 