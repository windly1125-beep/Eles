import React, { useState } from 'react';
import { X, Volume2, VolumeX, RotateCcw, Sparkles, ShieldAlert, Award } from 'lucide-react';
import { GameItem } from '../types';

interface GamePlayModalProps {
  game: GameItem | null;
  isOpen: boolean;
  onClose: () => void;
  userBalance: number;
  onUpdateBalance: (newBalance: number) => void;
}

export const GamePlayModal: React.FC<GamePlayModalProps> = ({
  game,
  isOpen,
  onClose,
  userBalance,
  onUpdateBalance
}) => {
  const [betAmount, setBetAmount] = useState<number>(10);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [lastWin, setLastWin] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  if (!isOpen || !game) return null;

  const handleBet = () => {
    if (userBalance < betAmount) {
      alert('余额不足，请先快捷充值！');
      return;
    }

    setIsSpinning(true);
    setLastWin(null);
    const newBal = userBalance - betAmount;
    onUpdateBalance(newBal);

    setTimeout(() => {
      // Simulate random win probability based on RTP
      const isWin = Math.random() > 0.45;
      const multiplier = isWin ? (Math.random() > 0.7 ? 3.5 : 1.8) : 0;
      const winAmount = parseFloat((betAmount * multiplier).toFixed(2));

      if (winAmount > 0) {
        setLastWin(winAmount);
        onUpdateBalance(newBal + winAmount);
      }
      setIsSpinning(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 select-none">
      <div className="relative w-full max-w-md h-full flex flex-col justify-between p-4 bg-[#0A090D] border-x border-[#29252F]">
        {/* Game Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#29252F] text-white">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full bg-[#17151B] text-[#AAA5B2] hover:text-white cursor-pointer border border-[#302B36]"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <h4 className="text-[14px] font-bold line-clamp-1">{game.name}</h4>
              <span className="text-[11px] text-[#AD50E8] font-semibold">{game.provider}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-[#787381] block leading-tight">账户余额</span>
              <span className="text-[13px] font-bold text-[#55E68A]">
                {userBalance.toFixed(2)} ₮
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-full bg-[#17151B] text-[#AAA5B2] hover:text-white cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Game Arena / Table Visual */}
        <div className="relative flex-1 my-4 rounded-[16px] overflow-hidden border border-[#302B36] bg-[#111014] flex flex-col items-center justify-center p-4">
          <img
            src={game.imageUrl}
            alt={game.name}
            className="absolute inset-0 w-full h-full object-cover opacity-35 filter blur-xs"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A090D] via-[#0A090D]/60 to-transparent" />

          {/* Central Live Table Mock Area */}
          <div className="relative z-10 text-center max-w-xs">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-[#AD50E8]/40 mb-4 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#55E68A] animate-pulse" />
              <span className="text-[12px] font-bold text-white tracking-wide">
                {game.isLive ? '真人荷官实时连接中' : '高精度 RNG 认证运行中'}
              </span>
            </div>

            {/* Win Display or Idle Prompt */}
            {lastWin !== null ? (
              <div className="animate-bounce mb-3">
                <span className="text-[12px] font-extrabold text-[#F59E0B] tracking-widest uppercase block">
                  🎉 恭喜获胜 WIN!
                </span>
                <span className="text-[32px] font-black text-white drop-shadow-[0_0_12px_#AD50E8]">
                  +{lastWin.toFixed(2)} ₮
                </span>
              </div>
            ) : isSpinning ? (
              <div className="mb-4">
                <div className="w-12 h-12 border-4 border-[#AD50E8] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <span className="text-[13px] font-semibold text-[#AAA5B2]">
                  {game.isLive ? '荷官开牌中...' : '转轮旋转中...'}
                </span>
              </div>
            ) : (
              <div className="mb-4">
                <p className="text-[15px] font-bold text-white mb-1">
                  选择注额并开始此局
                </p>
                <p className="text-[12px] text-[#787381]">
                  平台官方担保 · 赔付率 RTP: {game.rtp || 98}%
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bet Controls & Action */}
        <div className="bg-[#17151B] border border-[#302B36] rounded-[18px] p-3.5 space-y-3">
          {/* Bet Presets */}
          <div className="flex items-center justify-between gap-1.5">
            {[5, 10, 25, 50, 100].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setBetAmount(amt)}
                className={`flex-1 py-1.5 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
                  betAmount === amt
                    ? 'bg-[#AD50E8] text-white shadow-[0_0_8px_rgba(173,80,232,0.5)]'
                    : 'bg-[#29272C] text-[#AAA5B2] hover:text-white'
                }`}
              >
                {amt}₮
              </button>
            ))}
          </div>

          {/* Action Button */}
          <button
            type="button"
            disabled={isSpinning}
            onClick={handleBet}
            className={`w-full h-[46px] rounded-full font-bold text-[15px] flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isSpinning
                ? 'bg-[#302B36] text-[#787381] cursor-not-allowed'
                : 'bg-gradient-to-r from-[#AD50E8] to-[#C93B98] hover:from-[#C060FF] hover:to-[#E04FB1] text-white shadow-[0_4px_16px_rgba(173,80,232,0.4)] active:scale-98'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isSpinning ? '进行中...' : `下注并开始 (${betAmount} ₮)`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
