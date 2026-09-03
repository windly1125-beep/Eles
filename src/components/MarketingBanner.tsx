import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BannerItem } from '../types';

interface MarketingBannerProps {
  banners: BannerItem[];
  onBannerCtaClick?: (banner: BannerItem) => void;
}

export const MarketingBanner: React.FC<MarketingBannerProps> = ({
  banners,
  onBannerCtaClick
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play carousel every 6 seconds
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const currentBanner = banners[currentIndex] || banners[0];

  return (
    <div id="marketing-banner-container" className="px-[24px] pt-4 w-full">
      <div className="relative w-full h-[162px] rounded-[16px] overflow-hidden border border-[#302B36] bg-[#17151B] shadow-[0_12px_32px_rgba(0,0,0,0.6)] group select-none">
        {/* Background Image with luxury casino lighting & overlay */}
        <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
          <img
            key={currentBanner.id}
            src={currentBanner.imageUrl}
            alt={currentBanner.title}
            className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
          />
          {/* Multi-stage dark gradient to guarantee high text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070609] via-[#0D0B12]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070609]/90 via-transparent to-transparent" />
        </div>

        {/* Banner Decorative Tag */}
        {currentBanner.tag && (
          <div className="absolute top-3.5 left-4 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-black/50 backdrop-blur-md border border-[#AD50E8]/40">
              <Sparkles className="w-2.5 h-2.5 text-[#AD50E8]" />
              {currentBanner.tag}
            </span>
          </div>
        )}

        {/* Content Details */}
        <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-5 max-w-[78%]">
          {/* Main Title */}
          <h1 className="text-[20px] sm:text-[22px] font-bold text-white tracking-tight leading-snug drop-shadow-md">
            {currentBanner.title}
          </h1>

          {/* Subtitle */}
          <p className="text-[12px] sm:text-[13px] text-[#AAA5B2] mt-1 line-clamp-1 font-medium">
            {currentBanner.subtitle}
          </p>

          {/* CTA Button */}
          <div className="mt-3">
            <button
              id={`banner-cta-btn-${currentIndex}`}
              type="button"
              onClick={() => onBannerCtaClick?.(currentBanner)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#AD50E8] to-[#C93B98] hover:from-[#C060FF] hover:to-[#E04FB1] text-white text-[12px] font-semibold tracking-wide shadow-[0_4px_14px_rgba(173,80,232,0.4)] hover:shadow-[0_4px_20px_rgba(173,80,232,0.6)] transition-all cursor-pointer active:scale-95"
            >
              <span>{currentBanner.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Carousel Indicator: ● ○ ○ ○ */}
        <div
          id="banner-carousel-indicators"
          className="absolute bottom-3 right-4 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/5"
        >
          {banners.map((b, idx) => (
            <button
              key={b.id}
              onClick={() => setCurrentIndex(idx)}
              type="button"
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentIndex
                  ? 'w-4 h-1.5 bg-[#AD50E8] shadow-[0_0_6px_#AD50E8]'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`跳转到轮播 ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
