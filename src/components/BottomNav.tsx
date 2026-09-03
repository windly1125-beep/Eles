import React from 'react';
import { Menu, Dices, Trophy, ReceiptText, Gift } from 'lucide-react';

export type BottomNavTab = 'menu' | 'casino' | 'sports' | 'bets' | 'rewards';

interface BottomNavProps {
  currentTab: BottomNavTab;
  onTabChange: (tab: BottomNavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab = 'casino',
  onTabChange
}) => {
  const navItems: {
    id: BottomNavTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'menu', label: '菜单', icon: Menu },
    { id: 'casino', label: '赌场', icon: Dices },
    { id: 'sports', label: '体育', icon: Trophy },
    { id: 'bets', label: '我的投注', icon: ReceiptText },
    { id: 'rewards', label: '福利中心', icon: Gift }
  ];

  return (
    <nav
      id="fixed-bottom-navigation-bar"
      className="fixed bottom-0 left-0 right-0 z-40 h-[76px] bg-[#121015] border-t border-[#29252F] flex items-center justify-around px-2 pb-1.5 select-none"
    >
      {navItems.map((item) => {
        const isActive = currentTab === item.id;
        const IconComponent = item.icon;

        return (
          <button
            key={item.id}
            id={`bottom-nav-tab-${item.id}`}
            type="button"
            onClick={() => onTabChange(item.id)}
            className="flex-1 flex flex-col items-center justify-center h-full transition-colors cursor-pointer active:scale-95 group"
          >
            {/* Icon (above) */}
            <div className="relative flex items-center justify-center mb-1">
              <IconComponent
                className={`w-[22px] h-[22px] transition-colors ${
                  isActive
                    ? 'text-[#AD50E8]'
                    : 'text-[#AAA6B5] group-hover:text-white'
                }`}
              />
              {/* Optional tiny dot indicator for active tab */}
              {isActive && (
                <span className="absolute -top-1 w-1 h-1 rounded-full bg-[#AD50E8]" />
              )}
            </div>

            {/* Label (below, 12px) */}
            <span
              className={`text-[12px] font-medium leading-none transition-colors ${
                isActive
                  ? 'text-[#AD50E8] font-semibold'
                  : 'text-[#AAA6B5] group-hover:text-white'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
