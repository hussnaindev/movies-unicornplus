"use client"
import { FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('query: ', query);
    if(query) {
      window.location.href = `/movies?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-full px-4 py-2 border border-transparent focus-within:ring-2 focus-within:ring-white transition-all duration-200 hover:bg-opacity-20"
    >
      <FaSearch className="text-white text-lg" />
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value); // Update the state
        }}
        className="bg-transparent text-white placeholder-gray-300 focus:outline-none text-sm"
        placeholder="Search movies..."
      />
    </form>
  );
};

export default SearchBar;
