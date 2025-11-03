import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookModal from "./components/BookModal";
import FavoritesPage from "./components/FavoritesPage";
import "./index.css";

const HomePage = ({ darkMode }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  // Use the API key from .env
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5&key=${API_KEY}`
        );
        setSuggestions(res.data.items?.map((item) => item.volumeInfo.title) || []);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeout);
  }, [query, API_KEY]);

  const fetchBooks = async (searchTerm) => {
    if (!searchTerm) return;
    setLoading(true);
    setSuggestions([]);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=12&key=${API_KEY}`
      );
      setBooks(response.data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (book) => {
    const existing = JSON.parse(localStorage.getItem("favorites")) || [];
    if (existing.some((b) => b.id === book.id)) return alert("Already in favorites");
    const updated = [...existing, book];
    localStorage.setItem("favorites", JSON.stringify(updated));
    alert("Book added to favorites!");
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-[#0B3D2E] to-[#145A32] text-[#E8FCEE]"
          : "bg-gradient-to-br from-[#C7F9CC] to-[#E8FCEE] text-[#1B4332]"
      } font-lato transition-colors duration-300`}
    >
      <section className="text-center py-12 px-4 sm:px-6">
        <h1
          className={`text-4xl md:text-5xl font-playfair mb-6 drop-shadow-md ${
            darkMode ? "text-[#F8F9FA]" : "text-[#1A3C2D]"
          }`}
        >
          Search Your Favorite Books
        </h1>

        <div className="relative w-full max-w-md mx-auto group">
          <div
            className={`flex items-center rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 shadow-md border ${
              darkMode
                ? "bg-[#1E2B25]/80 border-[#88D498]/30"
                : "bg-white/95 border-[#1B4332]/20"
            }`}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for books or authors..."
              className={`w-full px-5 py-3 rounded-l-2xl border-none focus:outline-none text-base ${
                darkMode
                  ? "text-[#E8FCEE] placeholder-[#B8EFC4]"
                  : "text-[#1B4332] placeholder-[#3C6E47]"
              }`}
            />
            <button
              onClick={() => fetchBooks(query)}
              className="bg-[#2E8B57] text-white px-6 py-3 rounded-r-2xl hover:bg-[#1B4332] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Search
            </button>
          </div>

          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full mt-2 bg-white/95 dark:bg-[#2E3B34]/95 rounded-2xl shadow-lg border border-[#A7DCA4] max-h-60 overflow-y-auto animate-fadeIn">
              {suggestions.map((title, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setQuery(title);
                    fetchBooks(title);
                    setSuggestions([]);
                  }}
                  className="px-4 py-2 text-left cursor-pointer transition-colors hover:bg-[#C7F9CC] dark:hover:bg-[#1B4332] hover:text-[#0B3D2E] dark:hover:text-[#E8FCEE] text-[#1B4332] dark:text-[#D4ECDD]"
                >
                  {title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={() => navigate("/favorites")}
          className="mt-8 bg-[#88D498] text-[#1B4332] px-6 py-2 rounded-xl hover:bg-[#6BBF74] transition-all shadow-md hover:shadow-lg hover:scale-105"
        >
          View Favorites
        </button>
      </section>

      {loading ? (
        <div className="text-center mt-10">
          <p className="text-lg animate-pulse text-[#2E8B57]">Loading books...</p>
        </div>
      ) : books.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto px-4 pb-16">
          {books.map((book) => {
            const info = book.volumeInfo;
            return (
              <div
                key={book.id}
                className="bg-white/90 dark:bg-[#1E2B25] rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all p-6 flex flex-col justify-between"
              >
                <img
                  src={
                    info.imageLinks?.thumbnail ||
                    "https://via.placeholder.com/200x300?text=No+Cover"
                  }
                  alt={info.title}
                  className="rounded-2xl mb-4 h-64 w-full object-cover shadow-md"
                />
                <h3 className="font-playfair text-2xl text-[#1B4332] dark:text-[#E8FCEE] mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                  {info.authors ? info.authors.join(", ") : "Unknown Author"}
                </p>
                <div className="flex justify-between mt-auto gap-2">
                  <button
                    onClick={() => setSelectedBook(book)}
                    className="bg-[#2E8B57] text-white px-4 py-2 rounded-xl hover:bg-[#1B4332] transition-all hover:scale-105"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => addToFavorites(book)}
                    className="bg-[#A7DCA4] text-[#1B4332] px-4 py-2 rounded-xl hover:bg-[#6BBF74] transition-all hover:scale-105"
                  >
                    Favorite
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-[#2E8B57] text-lg mt-10">
          Search for a book to begin!
        </p>
      )}

      <BookModal
        open={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        book={selectedBook}
        addToFavorites={addToFavorites}
      />
    </div>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path="/" element={<HomePage darkMode={darkMode} />} />
        <Route path="/favorites" element={<FavoritesPage darkMode={darkMode} />} />
      </Routes>
    </>
  );
};

export default App;
