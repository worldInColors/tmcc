import React from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <button
      className="
    group flex items-center gap-2 border border-gray-300 
    py-2 px-4 rounded-md w-full text-left cursor-pointer
    transition-all duration-300 ease-out 
    hover:border-blue-500 hover:shadow-sm
  
  "
    >
      <Search className="text-gray-400 group-hover:text-gray-700 transition duration-300" />
      <span className="text-gray-400 group-hover:text-gray-700 transition duration-300">
        Search designs
      </span>
    </button>
  );
};

export default SearchBar;
