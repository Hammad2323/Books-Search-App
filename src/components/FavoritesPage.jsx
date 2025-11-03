import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookModal from "./BookModal";

const FavoritesPage = ({ darkMode }) => {
  const [favorites, setFavorites] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const removeFromFavorites = (id) => {
    const updated = favorites.filter((book) => book.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  if (favorites.length === 0)
    return (
      <div
        className={`min-h-screen flex items-center justify-center text-center transition-colors duration-500 ${
          darkMode
            ? "bg-gradient-to-br from-[#0B3D2E] to-[#145A32] text-[#E8FCEE]"
            : "bg-gradient-to-br from-[#C7F9CC] to-[#E8FCEE] text-[#1B4332]"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display]">
          No favorites yet! Start adding some books.
        </h2>
      </div>
    );

  return (
    <div
      className={`min-h-screen relative pt-24 px-6 py-12 font-[Lato] transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-[#0B3D2E] to-[#145A32] text-[#E8FCEE]"
          : "bg-gradient-to-br from-[#C7F9CC] to-[#E8FCEE] text-[#1B4332]"
      }`}
    >
      <h1
        className={`text-4xl md:text-5xl font-[Playfair_Display] text-center mb-12 drop-shadow-md ${
          darkMode ? "text-[#F8F9FA]" : "text-[#1A3C2D]"
        }`}
      >
        Your Favorite Books
      </h1>

      {/* 🌿 Books Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {favorites.map((book) => {
          const info = book.volumeInfo;
          return (
            <div
              key={book.id}
              className="rounded-3xl shadow-lg border border-[#A7DCA4]/20 bg-[#1E2B25] text-[#E8FCEE]
              transition-all duration-500 p-6 flex flex-col justify-between
              hover:shadow-[0_0_25px_#A7DCA4AA] hover:border-[#A7DCA4]/50 hover:-translate-y-2 hover:scale-[1.02]"
            >
              <img
                src={
                  info.imageLinks?.thumbnail ||
                  'https://via.placeholder.com/200x300?text=No+Cover'
                }
                alt={info.title}
                className="rounded-2xl mb-4 h-64 w-full object-cover shadow-md hover:scale-105 transition-transform duration-500"
              />
              <h3 className="font-[Playfair_Display] text-2xl mb-2 text-[#E8FCEE]">
                {info.title}
              </h3>
              <p className="text-sm mb-4 text-[#CFE9D8]">
                {info.authors ? info.authors.join(', ') : 'Unknown Author'}
              </p>
              <div className="flex justify-between mt-auto gap-2">
                <button
                  onClick={() => setSelectedBook(book)}
                  className="flex-1 bg-[#2E8B57] text-white px-4 py-2 rounded-xl hover:bg-[#1B4332] transition"
                >
                  Preview
                </button>
                <button
                  onClick={() => removeFromFavorites(book.id)}
                  className="flex-1 bg-[#A7DCA4] text-[#1B4332] px-4 py-2 rounded-xl hover:bg-[#6BBF74] transition"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 📘 Floating Back Button */}
      <Link
        to="/"
        className="fixed bottom-6 left-6 bg-[#2E8B57] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#1B4332] hover:scale-105 transition-all duration-300 flex items-center gap-2"
      >
        <span className="text-lg">⬅</span> Home
      </Link>

      <BookModal
        open={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        book={selectedBook}
        addToFavorites={() => {}}
      />
    </div>
  );
};

export default FavoritesPage;
