import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onOpenFilter?: () => void;
  activeFilterCount?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenFilter,
  activeFilterCount = 0
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div id="game-search-section" className="px-[24px] mt-[24px] w-full">
      <div
        className={`relative w-full h-[48px] bg-[#17151B] border rounded-full flex items-center px-4 transition-all duration-200 ${
          isFocused
            ? 'border-[#AD50E8] shadow-[0_0_12px_rgba(173,80,232,0.25)]'
            : 'border-[#302B36] hover:border-[#423C4B]'
        }`}
      >
        {/* Left Search Icon */}
        <Search className="w-5 h-5 text-[#8E8996] flex-shrink-0 mr-2.5" />

        {/* Input field */}
        <input
          id="game-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="搜索游戏或厂商"
          className="w-full h-full bg-transparent text-[14px] text-white placeholder-[#8E8996] focus:outline-none font-normal"
        />

        {/* Clear search text button if typed */}
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-[#AAA5B2] hover:text-white flex items-center justify-center mr-1.5 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Right Lightweight Filter Icon */}
        <button
          id="game-filter-trigger-btn"
          type="button"
          onClick={onOpenFilter}
          className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-colors cursor-pointer ${
            activeFilterCount > 0
              ? 'bg-[#AD50E8]/20 text-[#AD50E8]'
              : 'text-[#8E8996] hover:text-white hover:bg-white/5'
          }`}
          title="筛选游戏"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#AD50E8] rounded-full shadow-[0_0_6px_#AD50E8]" />
          )}
        </button>
      </div>
    </div>
  );
};
