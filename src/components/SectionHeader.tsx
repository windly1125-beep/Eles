import React from 'react';
import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  id?: string;
  icon?: React.ReactNode;
  title: string;
  count?: number;
  onViewAll?: () => void;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  id,
  icon,
  title,
  count,
  onViewAll,
  className = ''
}) => {
  return (
    <div id={id} className={`flex items-center justify-between mb-[14px] ${className}`}>
      <div className="flex items-center gap-2">
        {icon && <span className="flex-shrink-0 text-[#AD50E8]">{icon}</span>}
        <h2 className="text-[20px] font-semibold tracking-tight text-white flex items-center gap-1.5">
          {title}
          {typeof count === 'number' && (
            <span className="text-[13px] font-normal text-[#787381] ml-1">({count})</span>
          )}
        </h2>
      </div>
      <button
        id={id ? `${id}-view-all` : undefined}
        onClick={onViewAll}
        type="button"
        className="group flex items-center text-[13px] font-medium text-[#AAA5B2] hover:text-white transition-colors cursor-pointer active:opacity-70 py-1"
      >
        <span>查看全部</span>
        <ChevronRight className="w-4 h-4 ml-0.5 text-[#787381] group-hover:text-white transition-colors" />
      </button>
    </div>
  );
};
