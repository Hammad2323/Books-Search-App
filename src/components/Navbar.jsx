import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBookOpen, FaHeart, FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav
      className={`w-full sticky top-0 z-50 shadow-md transition-all duration-500 
      ${darkMode ? "bg-[#0B3D2E]" : "bg-[#1B4332]"}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
  
        <Link
          to="/"
          className="flex items-center gap-2 text-white text-2xl md:text-3xl font-playfair tracking-wide hover:scale-105 transition-transform duration-300"
        >
          <FaBookOpen className="text-[#A7E9AF]" />
          <span className="hover:text-[#A7E9AF] transition-colors duration-300">
            BookVerse
          </span>
        </Link>

    
        <div className="hidden md:flex items-center gap-8 text-white font-lato text-lg">
          <Link
            to="/"
            className={`relative group ${
              location.pathname === "/" ? "text-[#A7E9AF]" : "text-white"
            }`}
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#A7E9AF] group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link
            to="/favorites"
            className={`relative flex items-center gap-1 group ${
              location.pathname === "/favorites" ? "text-[#A7E9AF]" : "text-white"
            }`}
          >
            <FaHeart className="text-[#A7E9AF]" />
            Favorites
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#A7E9AF] group-hover:w-full transition-all duration-300"></span>
          </Link>

    
          <button
            onClick={toggleDarkMode}
            className="ml-4 bg-[#A7E9AF]/20 hover:bg-[#A7E9AF]/40 text-white px-4 py-2 rounded-lg border border-[#A7E9AF]/30 transition-all duration-300 hover:scale-105"
          >
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>

    
        <button
          className="md:hidden text-white text-2xl focus:outline-none hover:text-[#A7E9AF] transition"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

    
      {menuOpen && (
        <div className="md:hidden bg-[#1B4332] text-white text-lg flex flex-col items-center space-y-5 py-6 rounded-b-3xl border-t border-[#A7E9AF]/30 shadow-inner animate-slideDown">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className={`hover:text-[#A7E9AF] transition-all duration-300 ${
              location.pathname === "/" ? "text-[#A7E9AF]" : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/favorites"
            onClick={() => setMenuOpen(false)}
            className={`flex items-center gap-1 hover:text-[#A7E9AF] transition-all duration-300 ${
              location.pathname === "/favorites" ? "text-[#A7E9AF]" : ""
            }`}
          >
            <FaHeart className="text-[#A7E9AF]" /> Favorites
          </Link>

          <button
            onClick={() => {
              toggleDarkMode();
              setMenuOpen(false);
            }}
            className="bg-[#A7E9AF]/20 hover:bg-[#A7E9AF]/40 text-white px-5 py-2 rounded-lg border border-[#A7E9AF]/30 transition-all duration-300 hover:scale-105"
          >
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
