import React from 'react';
import { Heart, Radio } from 'lucide-react';
import { GameItem } from '../types';

interface LiveCasinoCardProps {
  game: GameItem;
  onCardClick: (game: GameItem) => void;
  onToggleFavorite?: (e: React.MouseEvent, game: GameItem) => void;
  isFavorite?: boolean;
}

export const LiveCasinoCard: React.FC<LiveCasinoCardProps> = ({
  game,
  onCardClick,
  onToggleFavorite,
  isFavorite
}) => {
  return (
    <div
      id={`live-card-${game.id}`}
      onClick={() => onCardClick(game)}
      className="group flex-shrink-0 w-[164px] cursor-pointer select-none transition-all duration-200 active:scale-[0.98]"
    >
      {/* Visual Cover Box (5-10% taller than standard card: ~234px) */}
      <div className="relative w-full h-[234px] rounded-[14px] overflow-hidden bg-[#17151B] border border-[#302B36] group-hover:border-[#AD50E8] shadow-[0_10px_24px_rgba(0,0,0,0.6)] transition-all">
        {/* Dealer / Table Photo */}
        <img
          src={game.imageUrl}
          alt={game.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Live Status Badge */}
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2 py-0.5 rounded-[6px] bg-black/60 backdrop-blur-md border border-red-500/40 text-[10px] font-bold text-white uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span>LIVE</span>
        </div>

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

        {/* Dealer Name Pill if provided */}
        {game.dealerName && (
          <div className="absolute bottom-16 left-3 z-10">
            <span className="text-[10px] text-white/90 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/10 font-medium">
              荷官: {game.dealerName}
            </span>
          </div>
        )}

        {/* Bottom Black Transparent Gradient for Text Clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07060A] via-[#07060A]/85 to-transparent pointer-events-none" />

        {/* Bottom Left Info Overlaid on Image */}
        <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
          <h3 className="text-[14px] font-semibold text-white leading-tight line-clamp-1 group-hover:text-[#AD50E8] transition-colors uppercase tracking-tight">
            {game.name}
          </h3>
          <p className="text-[12px] text-[#AAA5B2] mt-0.5 font-medium">
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

        {/* Right: RTP % */}
        {game.rtp !== undefined && (
          <span className="text-[#AAA5B2] font-semibold">
            RTP {game.rtp}%
          </span>
        )}
      </div>
    </div>
  );
};
