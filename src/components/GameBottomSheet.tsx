import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Play, X, ShieldCheck, Flame, Radio, Zap } from 'lucide-react';
import { GameItem } from '../types';

interface GameBottomSheetProps {
  game: GameItem | null;
  isOpen: boolean;
  onClose: () => void;
  onLaunchGame: (game: GameItem) => void;
  onToggleFavorite: (game: GameItem) => void;
  isFavorite: boolean;
}

export const GameBottomSheet: React.FC<GameBottomSheetProps> = ({
  game,
  isOpen,
  onClose,
  onLaunchGame,
  onToggleFavorite,
  isFavorite
}) => {
  if (!game) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
          />

          {/* Bottom Sheet Modal Content */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-lg bg-[#17151B] border-t border-[#302B36] rounded-t-[24px] p-5 sm:p-6 shadow-[0_-12px_40px_rgba(0,0,0,0.8)] z-10 select-none pb-8"
          >
            {/* Top Sheet Drag Notch */}
            <div className="w-10 h-1 bg-[#302B36] rounded-full mx-auto mb-4" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#29272C] hover:bg-[#343138] text-[#AAA5B2] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Game Info Row */}
            <div className="flex items-start gap-4">
              {/* Cover Thumbnail */}
              <div className="relative w-[90px] h-[120px] rounded-[12px] overflow-hidden bg-[#111014] border border-[#302B36] flex-shrink-0 shadow-md">
                <img
                  src={game.imageUrl}
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
                {game.isLive && (
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-red-600 text-white text-[8px] font-bold">
                    LIVE
                  </span>
                )}
              </div>

              {/* Text & Stats */}
              <div className="flex-1 min-w-0 pr-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#AD50E8]/20 text-[#C060FF] border border-[#AD50E8]/30">
                    {game.category}
                  </span>
                  {game.badge && (
                    <span className="text-[11px] font-semibold text-[#F59E0B]">
                      {game.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-[18px] font-bold text-white leading-snug line-clamp-1">
                  {game.name}
                </h3>
                <p className="text-[13px] text-[#AAA5B2] font-medium mt-0.5">
                  厂商：<span className="text-white font-semibold">{game.provider}</span>
                </p>

                {/* Key Metrics: Online & RTP */}
                <div className="mt-3 flex items-center gap-3 text-[12px]">
                  <div className="flex items-center gap-1.5 text-[#AAA5B2]">
                    <span className="w-2 h-2 rounded-full bg-[#55E68A] shadow-[0_0_6px_#55E68A]" />
                    <span className="text-[#55E68A] font-bold">{game.onlineCount}</span>
                    <span>在线</span>
                  </div>

                  {game.rtp !== undefined && (
                    <div className="flex items-center gap-1 text-[#AAA5B2]">
                      <span className="w-1 h-1 rounded-full bg-[#787381]" />
                      <span>RTP</span>
                      <span className="text-white font-semibold">{game.rtp}%</span>
                    </div>
                  )}
                </div>

                {game.minBet && (
                  <p className="text-[11px] text-[#787381] mt-1.5">
                    最低底注：{game.minBet}
                  </p>
                )}
              </div>
            </div>

            {/* Description if present */}
            {game.description && (
              <p className="mt-4 text-[12px] text-[#AAA5B2] bg-[#111014] p-3 rounded-[10px] border border-[#29272C] leading-relaxed">
                {game.description}
              </p>
            )}

            {/* Action Buttons: Primary Start Game + Secondary Favorite */}
            <div className="mt-6 flex items-center gap-3">
              {/* Secondary Action: ♡ 收藏 (toggles to ♥ in brand purple) */}
              <button
                id="sheet-favorite-btn"
                type="button"
                onClick={() => onToggleFavorite(game)}
                className={`flex items-center justify-center gap-2 h-[48px] px-5 rounded-full border transition-all cursor-pointer font-medium text-[14px] flex-shrink-0 ${
                  isFavorite
                    ? 'bg-[#AD50E8]/15 border-[#AD50E8] text-[#AD50E8]'
                    : 'bg-[#29272C] border-[#302B36] text-white hover:border-[#AD50E8]/50'
                }`}
              >
                <Heart
                  className={`w-5 h-5 transition-transform active:scale-125 ${
                    isFavorite ? 'fill-[#AD50E8] text-[#AD50E8]' : 'text-white'
                  }`}
                />
                <span>{isFavorite ? '已收藏' : '收藏'}</span>
              </button>

              {/* Primary Action: 开始游戏 (Purple background) */}
              <button
                id="sheet-launch-game-btn"
                type="button"
                onClick={() => onLaunchGame(game)}
                className="flex-1 h-[48px] rounded-full bg-[#AD50E8] hover:bg-[#C060FF] text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(173,80,232,0.4)] active:scale-98 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>开始游戏</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
