"use client";
import React, { useState } from "react";
import { Search, ArrowLeft, Grid } from "lucide-react";

// Simple horizontal farm item component
function FarmItem({
  farm,
}: {
  farm: {
    farmName: string;
    rates: string;
    credits: string;
    version: string;
  };
}) {
  const { farmName, rates, credits, version } = farm;

  return (
    <div className="bg-[#313131] rounded-lg p-4 cursor-pointer hover:bg-[#3a3a3a] transition-colors flex items-center gap-4">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZBB0G93NEBoO7C_aIdsiD_BmsL7tVvCSXOFfmi_jO9c0HeTBkzvYVchwvZUKUF6t52veEbPhdJyMIMOhoXRScV_VIyT97ewv2sy387hGDJQJ1-Fv9rlMmnhB3hJDmYvzco6HfgolfS_XV8uZpWcQ1fut8NPFVp_kVUJRZ2QLiHDCd28xdKyWlERJxDd3us9yLgzTcrsCqw3fa-RFX93wORasovWB8C58JkyV_WK5FhlC9pUez2-yxNalXHfBztBPkpXRdidIYBx8l"
        alt={`${farmName} farm image`}
        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
      />

      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-semibold text-white">{farmName}</h3>
          <span className="text-green-400 text-sm bg-green-400/10 px-2 py-1 rounded-full ml-2">
            {version}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-1">{rates}</p>
        <p className="text-xs text-gray-500">by {credits}</p>
      </div>
    </div>
  );
}

// Hardcoded farm data
const farmData = [
  {
    farmName: "Iron Farm",
    rates: "2400+ Iron/Hour",
    credits: "ilmango",
    version: "1.20+",
  },
  {
    farmName: "Creeper Farm",
    rates: "1800+ Gunpowder/Hour",
    credits: "Rays Works",
    version: "1.19+",
  },
  {
    farmName: "Witch Farm",
    rates: "900+ Items/Hour",
    credits: "Shulkercraft",
    version: "1.18+",
  },
  {
    farmName: "Villager Breeder",
    rates: "Infinite Villagers",
    credits: "LogicalGeekBoy",
    version: "1.20+",
  },
  {
    farmName: "Kelp Farm",
    rates: "12000+ Kelp/Hour",
    credits: "Mumbo Jumbo",
    version: "1.17+",
  },
  {
    farmName: "Enderman Farm",
    rates: "60+ Levels/Hour",
    credits: "Gnembon",
    version: "1.19+",
  },
  {
    farmName: "Sugar Cane Farm",
    rates: "3600+ Sugar Cane/Hour",
    credits: "Ilmango",
    version: "1.18+",
  },
  {
    farmName: "Blaze Farm",
    rates: "2000+ Blaze Rods/Hour",
    credits: "Pixlriffs",
    version: "1.16+",
  },
];

function SearchModal() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFarms = farmData.filter(
    (farm) =>
      farm.farmName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farm.credits.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <dialog id="my_modal_4" className="modal modal-top md:modal-middle">
      <div className="modal-box min-w-full min-h-full md:min-w-0 md:min-h-0 md:max-w-4xl bg-[#1a1a1a]">
        {/* Header */}
        <div className=" bg-[#1a1a1a] border-b border-gray-700 pb-4">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center mb-4">
            <form method="dialog">
              <button className="btn btn-ghost btn-sm btn-circle mr-3">
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </button>
            </form>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform z-10 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered w-full pl-10 bg-[#2a2a2a] border-gray-600 text-white placeholder-gray-400"
                autoFocus
              />
            </div>
            <button className="btn btn-ghost btn-sm btn-circle ml-2">
              <Grid className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex-1  relative">
              <Search className="absolute left-3 top-1/2 transform z-10 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered w-full pl-12 pr-4 py-3 text-lg bg-[#2a2a2a] border-gray-600 text-white placeholder-gray-400"
                autoFocus
              />
            </div>
          </div>

          {/* Navigation hints (desktop only) */}
          <div className="hidden md:flex items-center gap-6 mt-3 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <kbd className="kbd kbd-xs">↑</kbd>
              <kbd className="kbd kbd-xs">↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-2">
              <kbd className="kbd kbd-xs">↵</kbd>
              <span>to select</span>
            </span>
            <span className="flex items-center gap-2">
              <kbd className="kbd kbd-xs">esc</kbd>
              <span>to close</span>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="pt-4">
          {/* Default State */}
          {!searchQuery && (
            <div className="text-center py-8">
              <p className="text-gray-400">
                Start typing to search for Minecraft farms...
              </p>
            </div>
          )}

          {/* Search Results */}
          {searchQuery && filteredFarms.length > 0 && (
            <div className="space-y-3">
              {filteredFarms.map((farm, index) => (
                <FarmItem key={index} farm={farm} />
              ))}
            </div>
          )}

          {/* No Results */}
          {searchQuery && filteredFarms.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No farms found
              </h3>
              <p className="text-gray-400">Try searching for something else</p>
            </div>
          )}
        </div>

        <div className="modal-action"></div>
      </div>

      {/* Close modal when clicked outside */}
      <div className="modal-backdrop">
        <button>close</button>
      </div>
    </dialog>
  );
}

export default SearchModal;
