import React from 'react';
import { ChevronRight, Award } from 'lucide-react';
import { ProviderItem } from '../types';
import { PROVIDERS } from '../data/casinoData';

interface HotProvidersProps {
  onSelectProvider: (provider: ProviderItem) => void;
  onViewAll?: () => void;
}

export const HotProviders: React.FC<HotProvidersProps> = ({
  onSelectProvider,
  onViewAll
}) => {
  // Provider logo graphics / stylized vector emblems
  const renderProviderBrand = (prov: ProviderItem) => {
    switch (prov.name) {
      case 'Evolution':
        return (
          <div className="flex flex-col items-center">
            <span className="text-[13px] font-black tracking-wider text-white uppercase font-['Outfit']">
              EVOLUTION
            </span>
            <span className="text-[8px] tracking-widest text-[#E65100] uppercase font-bold">
              GAMING
            </span>
          </div>
        );
      case 'Ezugi':
        return (
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#00897B] rotate-45 inline-block" />
            <span className="text-[15px] font-extrabold tracking-tight text-white font-['Outfit']">
              ezugi
            </span>
          </div>
        );
      case 'Pragmatic Play':
        return (
          <div className="flex flex-col items-center leading-tight">
            <span className="text-[11px] font-black tracking-tighter text-[#F59E0B] uppercase">
              PRAGMATIC
            </span>
            <span className="text-[10px] font-bold tracking-widest text-white uppercase">
              PLAY
            </span>
          </div>
        );
      case 'Willbet':
        return (
          <div className="flex items-center gap-1">
            <span className="text-[14px] font-black bg-gradient-to-r from-[#AD50E8] to-[#FF7043] bg-clip-text text-transparent font-['Outfit']">
              Willbet
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#AD50E8]" />
          </div>
        );
      case 'KA Gaming':
        return (
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-[#3B82F6] flex items-center justify-center text-[9px] font-black text-white">
              KA
            </div>
            <span className="text-[12px] font-extrabold text-white tracking-tight">
              GAMING
            </span>
          </div>
        );
      case 'Sexy Gaming':
        return (
          <div className="flex flex-col items-center leading-tight">
            <span className="text-[12px] font-black italic text-[#EC4899] tracking-wider">
              SEXY
            </span>
            <span className="text-[8px] font-bold tracking-widest text-white uppercase">
              CASINO
            </span>
          </div>
        );
      default:
        return (
          <span className="text-[13px] font-bold text-white">
            {prov.name}
          </span>
        );
    }
  };

  return (
    <section id="hot-providers-section" className="mt-[28px] sm:mt-[32px] w-full">
      {/* Title */}
      <div className="px-[24px] flex items-center justify-between mb-[14px]">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#AD50E8]" />
          <h2 className="text-[20px] font-semibold tracking-tight text-white">
            热门厂商
          </h2>
        </div>
        <button
          id="hot-providers-view-all"
          onClick={onViewAll}
          type="button"
          className="group flex items-center text-[13px] font-medium text-[#AAA5B2] hover:text-white transition-colors cursor-pointer active:opacity-70 py-1"
        >
          <span>查看全部</span>
          <ChevronRight className="w-4 h-4 ml-0.5 text-[#787381] group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Horizontal Scrollable Provider Cards: 110 x 64px, bg #17151B, rounded 12px */}
      <div className="w-full overflow-x-auto no-scrollbar pl-[24px] pr-[12px] flex items-center gap-[12px] scroll-smooth">
        {PROVIDERS.map((prov) => (
          <button
            key={prov.id}
            id={`provider-card-${prov.id}`}
            type="button"
            onClick={() => onSelectProvider(prov)}
            className="flex-shrink-0 w-[110px] h-[64px] bg-[#17151B] hover:bg-[#1F1C25] border border-[#302B36] hover:border-[#AD50E8]/80 rounded-[12px] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)] active:scale-95 group px-2 select-none"
            title={`${prov.name} (${prov.gameCount} 款游戏)`}
          >
            {renderProviderBrand(prov)}
          </button>
        ))}
        {/* Peeking spacer */}
        <div className="w-[12px] flex-shrink-0" />
      </div>
    </section>
  );
};
