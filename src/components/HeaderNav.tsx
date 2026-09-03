import React from 'react';
import { Bell, ChevronDown, Plus } from 'lucide-react';

interface HeaderNavProps {
  balance: number;
  unreadCount?: number;
  onDepositClick?: () => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  onBalanceClick?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  balance,
  unreadCount = 54,
  onDepositClick,
  onNotificationsClick,
  onProfileClick,
  onBalanceClick
}) => {
  const formattedBalance = balance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <header
      id="top-navigation-header"
      className="sticky top-0 z-40 w-full h-[68px] bg-[#050505]/95 backdrop-blur-md px-[24px] flex items-center justify-between border-b border-[#1A1820]"
    >
      {/* Brand Logo with Purple-to-Orange/Red Gradient */}
      <div className="flex items-center gap-2">
        <a
          id="brand-logo-link"
          href="#"
          className="group flex items-center select-none"
        >
          <span className="text-[26px] font-extrabold tracking-tight bg-gradient-to-r from-[#AD50E8] via-[#D45BD6] to-[#FF7043] bg-clip-text text-transparent font-['Outfit'] drop-shadow-[0_2px_10px_rgba(173,80,232,0.25)]">
            Willbet
          </span>
          <span className="ml-1 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-[#AD50E8] bg-[#AD50E8]/10 border border-[#AD50E8]/20 rounded-md uppercase">
            VIP
          </span>
        </a>
      </div>

      {/* Right User Controls Group */}
      <div className="flex items-center gap-2.5">
        {/* Balance Capsule & Deposit '+' Combo */}
        <div className="flex items-center">
          {/* Balance Capsule */}
          <button
            id="user-balance-capsule"
            type="button"
            onClick={onBalanceClick}
            className="flex items-center gap-1.5 h-[38px] pl-3 pr-2.5 bg-[#17151B] border border-[#302B36] rounded-l-full hover:bg-[#1F1C25] transition-colors cursor-pointer group"
          >
            <span className="text-[14px] font-bold text-white tracking-tight">
              {formattedBalance}
            </span>

            {/* USDT Icon */}
            <div className="w-[18px] h-[18px] rounded-full bg-[#26A17B]/20 border border-[#26A17B]/40 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-black text-[#26A17B] leading-none">₮</span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-[#787381] group-hover:text-white transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>

          {/* Purple Deposit '+' Button (directly attached, ~48px width) */}
          <button
            id="deposit-action-btn"
            type="button"
            onClick={onDepositClick}
            className="flex items-center justify-center w-[48px] h-[38px] bg-[#AD50E8] hover:bg-[#C060FF] text-white rounded-r-full font-bold transition-all shadow-[0_0_12px_rgba(173,80,232,0.35)] active:scale-95 cursor-pointer -ml-[1px]"
            title="快捷充值"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Notifications Bell with Badge 54 */}
        <button
          id="notification-bell-btn"
          type="button"
          onClick={onNotificationsClick}
          className="relative w-[38px] h-[38px] rounded-full bg-[#17151B] border border-[#302B36] flex items-center justify-center text-[#AAA5B2] hover:text-white hover:border-[#AD50E8]/40 transition-colors cursor-pointer"
          title="系统消息"
        >
          <Bell className="w-[18px] h-[18px]" />
          {unreadCount > 0 && (
            <span
              id="unread-badge-count"
              className="absolute -top-1 -right-1 min-w-[19px] h-[18px] px-1 bg-[#AD50E8] border border-[#050505] rounded-full text-[10px] font-bold text-white flex items-center justify-center leading-none shadow-[0_2px_6px_rgba(173,80,232,0.5)]"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>

        {/* User Profile Avatar */}
        <button
          id="user-profile-avatar-btn"
          type="button"
          onClick={onProfileClick}
          className="relative w-[38px] h-[38px] rounded-full overflow-hidden border-2 border-[#302B36] hover:border-[#AD50E8] transition-all cursor-pointer group flex-shrink-0"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
            alt="用户头像"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#55E68A] border-2 border-[#050505] rounded-full" />
        </button>
      </div>
    </header>
  );
};
