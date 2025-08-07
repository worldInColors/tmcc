"use client";
import { useSearchBarGsap } from "@/hooks/animations/useSearchBarGsap";
import { Search } from "lucide-react";

function SearchBar() {
  const { containerRef, iconRef, handleBlur, handleFocus } = useSearchBarGsap();
  return (
    <div
      ref={containerRef}
      className="flex items-center w-full h-12 rounded-xl overflow-hidden mt-4"
    >
      <div className="pl-4 flex items-center justify-center">
        <div ref={iconRef}>
          <Search className="w-5 h-5" />
        </div>
      </div>
      <input
        type="text"
        placeholder="Search farms"
        className="flex-1 text-white border-none outline-none px-3 h-full rounded-r-xl bg-transparent"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
}

export { SearchBar };
