import React, { useRef } from 'react';
import { GameCategory } from '../types';
import { CATEGORIES } from '../data/casinoData';

interface CategoryNavProps {
  selectedCategory: GameCategory;
  onSelectCategory: (cat: GameCategory) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div id="game-category-navigation-section" className="mt-[16px] w-full">
      <div
        ref={scrollRef}
        className="flex items-center gap-[8px] overflow-x-auto no-scrollbar px-[24px] py-1 scroll-smooth"
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              id={`category-chip-${cat}`}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`h-[40px] px-[18px] rounded-[20px] text-[14px] font-medium whitespace-nowrap flex-shrink-0 transition-all duration-200 cursor-pointer flex items-center justify-center select-none active:scale-95 ${
                isSelected
                  ? 'bg-[#AD50E8] text-white shadow-[0_4px_16px_rgba(173,80,232,0.35)] font-semibold'
                  : 'bg-[#29272C] text-[#E0DDE4] hover:bg-[#343138] hover:text-white'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
