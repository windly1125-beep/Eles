export type GameCategory = 
  | '推荐'
  | '最近'
  | '热门'
  | '老虎机'
  | '真人'
  | '21点'
  | '捕鱼'
  | '扑克'
  | '桌面游戏';

export type GameBadge = '热门' | 'NEW' | '推荐' | '高RTP' | 'Jackpot';

export interface GameItem {
  id: string;
  name: string;
  provider: 'Willbet' | 'Evolution' | 'Ezugi' | 'KA Gaming' | 'Pragmatic Play' | 'Askmelot' | 'Sexy Gaming' | string;
  category: GameCategory;
  imageUrl: string;
  badge?: GameBadge;
  badgeType?: 'hot' | 'new' | 'rec' | 'rtp' | 'jackpot';
  onlineCount: number;
  rtp?: number; // e.g. 98 or 97.3
  isLive?: boolean;
  dealerName?: string;
  isFavorite?: boolean;
  minBet?: string;
  description?: string;
}

export interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  imageUrl: string;
  tag?: string;
}

export interface ProviderItem {
  id: string;
  name: string;
  gameCount: number;
  featuredColor: string;
  subText?: string;
  logoSvg?: string;
}
