import React from 'react';
import { X, Check } from 'lucide-react';
import { GameCategory } from '../types';
import { CATEGORIES, PROVIDERS } from '../data/casinoData';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: GameCategory | '全部';
  onCategorySelect: (cat: GameCategory | '全部') => void;
  selectedProvider: string;
  onProviderSelect: (prov: string) => void;
  minRtp: number;
  onMinRtpChange: (val: number) => void;
  onReset: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onCategorySelect,
  selectedProvider,
  onProviderSelect,
  minRtp,
  onMinRtpChange,
  onReset
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-sm bg-[#17151B] border border-[#302B36] rounded-[20px] p-5 shadow-2xl z-10 select-none">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#302B36]">
          <h3 className="text-[17px] font-bold text-white">游戏高级筛选</h3>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#29272C] text-[#AAA5B2] hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Body */}
        <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar">
          {/* Game Category */}
          <div>
            <label className="text-[12px] font-semibold text-[#AAA5B2] block mb-2">
              游戏类型
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onCategorySelect('全部')}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                  selectedCategory === '全部'
                    ? 'bg-[#AD50E8] text-white'
                    : 'bg-[#29272C] text-[#AAA5B2] hover:text-white'
                }`}
              >
                全部类型
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onCategorySelect(cat)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#AD50E8] text-white'
                      : 'bg-[#29272C] text-[#AAA5B2] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Provider Selection */}
          <div>
            <label className="text-[12px] font-semibold text-[#AAA5B2] block mb-2">
              游戏厂商
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onProviderSelect('全部')}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                  selectedProvider === '全部'
                    ? 'bg-[#AD50E8] text-white'
                    : 'bg-[#29272C] text-[#AAA5B2] hover:text-white'
                }`}
              >
                全部厂商
              </button>
              {PROVIDERS.map((prov) => (
                <button
                  key={prov.id}
                  type="button"
                  onClick={() => onProviderSelect(prov.name)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                    selectedProvider === prov.name
                      ? 'bg-[#AD50E8] text-white'
                      : 'bg-[#29272C] text-[#AAA5B2] hover:text-white'
                  }`}
                >
                  {prov.name}
                </button>
              ))}
            </div>
          </div>

          {/* Min RTP Range */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[12px] font-semibold text-[#AAA5B2]">
                最低回报率 (RTP)
              </label>
              <span className="text-[13px] font-bold text-[#AD50E8]">
                {minRtp > 0 ? `≥ ${minRtp}%` : '不限'}
              </span>
            </div>
            <input
              type="range"
              min="90"
              max="99"
              step="0.5"
              value={minRtp}
              onChange={(e) => onMinRtpChange(parseFloat(e.target.value))}
              className="w-full accent-[#AD50E8] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#787381] mt-1">
              <span>90%</span>
              <span>95%</span>
              <span>99%</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#302B36] flex items-center gap-2.5">
          <button
            type="button"
            onClick={onReset}
            className="flex-1 py-2 rounded-full bg-[#29272C] hover:bg-[#343138] text-[13px] font-medium text-[#AAA5B2] hover:text-white transition-colors cursor-pointer"
          >
            重置筛选
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-full bg-[#AD50E8] hover:bg-[#C060FF] text-[13px] font-bold text-white transition-colors cursor-pointer shadow-md"
          >
            确认应用
          </button>
        </div>
      </div>
    </div>
  );
};
