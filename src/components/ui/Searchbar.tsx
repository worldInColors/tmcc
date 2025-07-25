import React from "react";
import { Search } from "lucide-react";
import SearchModal from "./SearchModal";

const SearchBar = () => {
  return (
    <>
      <button
        onClick={() => {
          const modal = document.getElementById(
            "my_modal_4"
          ) as HTMLDialogElement | null;
          modal?.showModal();
        }}
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
      <SearchModal />
    </>
  );
};

export default SearchBar;
