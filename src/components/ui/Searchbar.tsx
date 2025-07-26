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
        className="group flex items-center gap-3 bg-card/50 hover:bg-card/80 border border-border/40 hover:border-border py-2.5 px-4 rounded-xl w-64 hover:shadow-xl transition-all duration-200"
      >
        <Search className="w-4 h-4 text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200" />
        <div className="flex-1 flex items-center justify-between">
          <span className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200">
            Search farms...
          </span>
          <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground/60">
            <kbd className="px-1.5 py-0.5 text-xs bg-muted/60 border border-border/40 rounded">
              ⌘
            </kbd>
            <kbd className="px-1.5 py-0.5 text-xs bg-muted/60 border border-border/40 rounded">
              K
            </kbd>
          </div>
        </div>
      </button>
      <SearchModal />
    </>
  );
};

export default SearchBar;
