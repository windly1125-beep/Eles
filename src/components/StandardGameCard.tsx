import React from 'react';
import { Heart } from 'lucide-react';
import { GameItem } from '../types';

interface StandardGameCardProps {
  game: GameItem;
  onCardClick: (game: GameItem) => void;
  onToggleFavorite?: (e: React.MouseEvent, game: GameItem) => void;
  isFavorite?: boolean;
  className?: string;
  isLiveCard?: boolean;
}

export const StandardGameCard: React.FC<StandardGameCardProps> = ({
  game,
  onCardClick,
  onToggleFavorite,
  isFavorite,
  className = '',
  isLiveCard = false
}) => {
  // Operational badge styling (only one per card, compact)
  const renderBadge = () => {
    if (!game.badge) return null;

    let badgeClasses = 'bg-[#AD50E8] text-white';
    if (game.badge === 'NEW' || game.badgeType === 'new') {
      badgeClasses = 'bg-[#C060FF] text-white';
    } else if (game.badge === '高RTP' || game.badgeType === 'rtp') {
      badgeClasses = 'bg-[#26A17B] text-white';
    } else if (game.badge === 'Jackpot' || game.badgeType === 'jackpot') {
      badgeClasses = 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-black font-extrabold';
    } else if (game.badge === '推荐' || game.badgeType === 'rec') {
      badgeClasses = 'bg-[#8B31C7] text-white';
    }

    return (
      <span
        className={`absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-[6px] text-[10px] font-bold tracking-wider uppercase shadow-md ${badgeClasses}`}
      >
        {game.badge}
      </span>
    );
  };

  // Card body height: standard 216px; live cards can be 5-10% taller (~232px)
  const cardHeightClass = isLiveCard ? 'h-[232px]' : 'h-[216px]';

  return (
    <div
      id={`game-card-${game.id}`}
      onClick={() => onCardClick(game)}
      className={`group flex-shrink-0 w-[160px] cursor-pointer select-none transition-all duration-200 active:scale-[0.98] ${className}`}
    >
      {/* Visual Cover Box */}
      <div
        className={`relative w-full ${cardHeightClass} rounded-[14px] overflow-hidden bg-[#17151B] border border-[#302B36] group-hover:border-[#AD50E8]/70 shadow-[0_8px_20px_rgba(0,0,0,0.5)] transition-all`}
      >
        {/* Main Cover Image */}
        <img
          src={game.imageUrl}
          alt={game.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Operational Badge */}
        {renderBadge()}

        {/* Favorite Heart Quick Toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(e, game);
          }}
          className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:text-[#AD50E8] transition-colors cursor-pointer"
          title={isFavorite ? '取消收藏' : '收藏游戏'}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isFavorite ? 'fill-[#AD50E8] text-[#AD50E8]' : 'text-white/80'
            }`}
          />
        </button>

        {/* Bottom Black Transparent Gradient for Text Clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07060A] via-[#07060A]/80 to-transparent pointer-events-none" />

        {/* Bottom Left Info Overlaid on Image */}
        <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
          <h3 className="text-[15px] font-semibold text-white leading-tight line-clamp-1 drop-shadow-sm group-hover:text-[#AD50E8] transition-colors">
            {game.name}
          </h3>
          <p className="text-[12px] text-[#AAA5B2] mt-0.5 font-medium line-clamp-1">
            {game.provider}
          </p>
        </div>
      </div>

      {/* Additional Info Line Below Card Image */}
      <div className="mt-2 px-1 flex items-center justify-between text-[11px] text-[#96919D] font-medium leading-none">
        {/* Left: Green Dot + Online Count */}
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#55E68A] shadow-[0_0_5px_#55E68A]" />
          <span>{game.onlineCount} 在线</span>
        </div>

        {/* Right: RTP % (only shown if rtp exists, no placeholder) */}
        {game.rtp !== undefined && (
          <span className="text-[#AAA5B2] font-semibold">
            RTP {game.rtp}%
          </span>
        )}
      </div>
    </div>
  );
};
