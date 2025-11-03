import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white/90 dark:bg-[#1E2B25] 
      rounded-full shadow-md overflow-hidden border border-[#A7DCA4]/40 
      transition-all focus-within:shadow-[0_0_20px_#A7DCA4AA] max-w-lg mx-auto w-full"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books by title, author, or keyword..."
        className="flex-grow px-5 py-3 text-[#1B4332] dark:text-[#E8FCEE] 
        placeholder-[#5C7857] dark:placeholder-[#CFE9D8] bg-transparent 
        focus:outline-none text-sm sm:text-base"
      />
      <button
        type="submit"
        className="px-5 sm:px-6 py-3 bg-[#2E8B57] text-white font-semibold 
        hover:bg-[#1B4332] transition-all"
      >
        Search
      </button>
    </form>
  );
}
