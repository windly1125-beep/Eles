import React, { useState } from 'react';
import { ChevronRight, Heart, Sparkles } from 'lucide-react';
import { GameItem } from '../types';
import { SectionHeader } from './SectionHeader';
import { StandardGameCard } from './StandardGameCard';

interface BlackjackSectionProps {
  allGames: GameItem[];
  onCardClick: (game: GameItem) => void;
  onToggleFavorite?: (e: React.MouseEvent, game: GameItem) => void;
  favorites: Set<string>;
  onViewAll?: () => void;
}

export const BlackjackSection: React.FC<BlackjackSectionProps> = ({
  allGames,
  onCardClick,
  onToggleFavorite,
  favorites,
  onViewAll
}) => {
  // Allow toggling between 1, 2, or 3+ games to test the dynamic layout
  const [activeCount, setActiveCount] = useState<number>(3);

  const displayedGames = allGames.slice(0, activeCount);

  return (
    <section id="blackjack-module-section" className="mt-[28px] sm:mt-[32px] w-full">
      {/* Module Title with Dynamic Layout Switcher for User Testing */}
      <div className="px-[24px]">
        <div className="flex items-center justify-between mb-[14px]">
          <div className="flex items-center gap-2">
            <span className="text-[18px]">🃏</span>
            <h2 className="text-[20px] font-semibold tracking-tight text-white">
              21点
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Dynamic Layout Testing Pill (1, 2, 3 games demo) */}
            <div className="flex items-center bg-[#17151B] border border-[#302B36] rounded-full p-0.5 text-[10px]">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setActiveCount(num)}
                  className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                    activeCount === num
                      ? 'bg-[#AD50E8] text-white font-bold'
                      : 'text-[#787381] hover:text-white'
                  }`}
                  title={`展示 ${num} 款游戏布局`}
                >
                  {num}款
                </button>
              ))}
            </div>

            {/* View All */}
            <button
              id="blackjack-view-all"
              onClick={onViewAll}
              type="button"
              className="group flex items-center text-[13px] font-medium text-[#AAA5B2] hover:text-white transition-colors cursor-pointer active:opacity-70 py-1"
            >
              <span>查看全部</span>
              <ChevronRight className="w-4 h-4 ml-0.5 text-[#787381] group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Layout Rendering */}
      {displayedGames.length === 1 && (
        /* CASE 1: Single Game -> Full-width Horizontal Large Card (~140px height, 40% dealer photo) */
        <div className="px-[24px]">
          <div
            id={`blackjack-single-card-${displayedGames[0].id}`}
            onClick={() => onCardClick(displayedGames[0])}
            className="group relative w-full h-[142px] bg-[#17151B] border border-[#302B36] hover:border-[#AD50E8] rounded-[16px] overflow-hidden flex cursor-pointer transition-all duration-200 shadow-[0_10px_28px_rgba(0,0,0,0.6)] active:scale-[0.99]"
          >
            {/* Left ~40%: Blackjack Live Dealer Photo */}
            <div className="relative w-[40%] h-full overflow-hidden flex-shrink-0">
              <img
                src={displayedGames[0].imageUrl}
                alt={displayedGames[0].name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#17151B]/40 to-[#17151B]" />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-[6px] bg-red-600/90 text-white text-[9px] font-bold tracking-wider">
                LIVE 独占
              </span>
            </div>

            {/* Right Side Info Area */}
            <div className="relative flex-1 p-3.5 flex flex-col justify-between z-10">
              {/* Top Row: Name & Heart */}
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[15px] sm:text-[16px] font-bold text-white leading-tight group-hover:text-[#AD50E8] transition-colors">
                    {displayedGames[0].name}
                  </h3>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite?.(e, displayedGames[0]);
                    }}
                    className="p-1 text-[#AAA5B2] hover:text-[#AD50E8] transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.has(displayedGames[0].id)
                          ? 'fill-[#AD50E8] text-[#AD50E8]'
                          : ''
                      }`}
                    />
                  </button>
                </div>
                <p className="text-[12px] text-[#AAA5B2] mt-0.5 font-medium">
                  {displayedGames[0].provider}
                </p>
              </div>

              {/* Middle Row: Online & RTP */}
              <div className="flex items-center gap-3 text-[12px] text-[#96919D] font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#55E68A] shadow-[0_0_6px_#55E68A]" />
                  <span>{displayedGames[0].onlineCount} 在线</span>
                </div>
                {displayedGames[0].rtp && (
                  <span className="text-[#AAA5B2] font-semibold">
                    RTP {displayedGames[0].rtp}%
                  </span>
                )}
              </div>

              {/* Bottom: Lightweight Entry '进入游戏 >' */}
              <div className="flex items-center justify-between pt-1 border-t border-[#302B36]/60">
                <span className="text-[11px] text-[#787381]">荷官即时发牌</span>
                <div className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#AD50E8] group-hover:text-[#C060FF] transition-colors">
                  <span>进入游戏</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {displayedGames.length === 2 && (
        /* CASE 2: Exactly 2 Games -> Dual Card Grid Layout */
        <div className="px-[24px] grid grid-cols-2 gap-[12px]">
          {displayedGames.map((game) => (
            <div
              key={game.id}
              onClick={() => onCardClick(game)}
              className="group cursor-pointer"
            >
              <div className="relative w-full h-[180px] rounded-[14px] overflow-hidden bg-[#17151B] border border-[#302B36] group-hover:border-[#AD50E8] transition-all">
                <img
                  src={game.imageUrl}
                  alt={game.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09080C] via-[#09080C]/75 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-[14px] font-semibold text-white leading-tight line-clamp-1 group-hover:text-[#AD50E8]">
                    {game.name}
                  </h3>
                  <p className="text-[11px] text-[#AAA5B2] mt-0.5">{game.provider}</p>
                </div>
              </div>
              <div className="mt-1.5 px-1 flex items-center justify-between text-[11px] text-[#96919D]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#55E68A]" />
                  <span>{game.onlineCount} 在线</span>
                </div>
                {game.rtp && <span>RTP {game.rtp}%</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {displayedGames.length >= 3 && (
        /* CASE 3: 3 or More Games -> Standard Horizontal Scroll with Peeking */
        <div className="w-full overflow-x-auto no-scrollbar pl-[24px] pr-[12px] flex items-start gap-[12px] scroll-smooth">
          {displayedGames.map((game) => (
            <StandardGameCard
              key={game.id}
              game={game}
              onCardClick={onCardClick}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.has(game.id)}
            />
          ))}
          {/* Peeking spacer */}
          <div className="w-[12px] flex-shrink-0" />
        </div>
      )}
    </section>
  );
};
