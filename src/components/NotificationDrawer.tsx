import React from 'react';
import { X, Gift, Bell, CheckCheck, Trophy } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  unreadCount: number;
  onClearAll: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  unreadCount,
  onClearAll
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      title: 'VIP 专属周流水返利已入账',
      desc: '您的专属 VIP 周返水 128.50 USDT 已自动派发至您的主钱包。',
      time: '10分钟前',
      icon: Gift,
      unread: true
    },
    {
      id: '2',
      title: 'Ezugi 新桌台上架通知',
      desc: '全新奢华私享 21点包桌现已开启，专属荷官一对一发牌。',
      time: '2小时前',
      icon: Trophy,
      unread: true
    },
    {
      id: '3',
      title: '登录安全校验提醒',
      desc: '您的账户于新设备完成安全验证，如非本人操作请联系客服。',
      time: '昨天',
      icon: Bell,
      unread: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-sm bg-[#17151B] border border-[#302B36] rounded-[22px] p-5 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#302B36]">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#AD50E8]" />
            <h3 className="text-[16px] font-bold text-white">消息中心</h3>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#AD50E8] text-white text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClearAll}
              className="text-[11px] text-[#AAA5B2] hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>已读全部</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-[#29272C] text-[#AAA5B2] hover:text-white flex items-center justify-center cursor-pointer ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-3 space-y-2.5 max-h-[360px] overflow-y-auto no-scrollbar">
          {notifications.map((n) => {
            const IconComponent = n.icon;
            return (
              <div
                key={n.id}
                className={`p-3 rounded-[12px] border transition-colors ${
                  n.unread
                    ? 'bg-[#1F1C25] border-[#AD50E8]/40'
                    : 'bg-[#111014] border-[#29272C]'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#AD50E8]/20 flex items-center justify-center text-[#AD50E8] flex-shrink-0 mt-0.5">
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[13px] font-bold text-white line-clamp-1">
                        {n.title}
                      </h4>
                      <span className="text-[10px] text-[#787381] flex-shrink-0 ml-1">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#AAA5B2] mt-1 leading-relaxed">
                      {n.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
