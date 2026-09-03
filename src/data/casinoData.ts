import { BannerItem, GameCategory, GameItem, ProviderItem } from '../types';

export const CATEGORIES: GameCategory[] = [
  '推荐',
  '最近',
  '热门',
  '老虎机',
  '真人',
  '21点',
  '捕鱼',
  '扑克',
  '桌面游戏'
];

export const BANNERS: BannerItem[] = [
  {
    id: 'banner-1',
    title: 'Ezugi 真人娱乐场',
    subtitle: '真人桌台 · 轮盘 · Blackjack · 21点',
    ctaText: '立即体验',
    tag: '独家桌台',
    imageUrl: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'banner-2',
    title: 'Evolution VIP 极速桌台',
    subtitle: '私享豪客包厢 · 顶级真人荷官 · 毫秒级发牌',
    ctaText: '进入包厢',
    tag: 'VIP特邀',
    imageUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'banner-3',
    title: 'Pragmatic 夺宝锦标赛',
    subtitle: '巨额周奖池 · 掉落倍率翻倍 · 全服排行争夺',
    ctaText: '参与争夺',
    tag: '热门赛事',
    imageUrl: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'banner-4',
    title: 'Willbet 独家神话巨制',
    subtitle: '万倍彩池随机触发 · 沉浸式暗黑视听',
    ctaText: '试玩体验',
    tag: '新上线',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85'
  }
];

export const INITIAL_RECENT_GAMES: GameItem[] = [
  {
    id: 'recent-1',
    name: '凤舞麻将',
    provider: 'Askmelot',
    category: '推荐',
    imageUrl: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=600&q=80',
    badge: '推荐',
    badgeType: 'rec',
    onlineCount: 840,
    rtp: 98.2,
    isFavorite: true
  },
  {
    id: 'recent-2',
    name: '太空冲刺',
    provider: 'Willbet',
    category: '热门',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    badge: '热门',
    badgeType: 'hot',
    onlineCount: 1290,
    rtp: 97.8,
    isFavorite: false
  },
  {
    id: 'recent-3',
    name: 'GOLD VAULT ROULETTE',
    provider: 'Evolution',
    category: '真人',
    imageUrl: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=600&q=80',
    badge: '热门',
    badgeType: 'hot',
    onlineCount: 783,
    rtp: 97.3,
    isLive: true,
    isFavorite: true
  },
  {
    id: 'recent-4',
    name: '深海夜光',
    provider: 'Willbet',
    category: '捕鱼',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    badge: '热门',
    badgeType: 'hot',
    onlineCount: 890,
    rtp: 97.5,
    isFavorite: false
  }
];

export const RECOMMENDED_GAMES: GameItem[] = [
  {
    id: 'rec-1',
    name: '凤舞麻将',
    provider: 'Askmelot',
    category: '推荐',
    imageUrl: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=600&q=80',
    badge: '推荐',
    badgeType: 'rec',
    onlineCount: 840,
    rtp: 98.2,
    isFavorite: true,
    description: '国风韵味麻将消除，连击爆分，千倍彩金即刻爆发。'
  },
  {
    id: 'rec-2',
    name: '太空冲刺',
    provider: 'Willbet',
    category: '热门',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    badge: '热门',
    badgeType: 'hot',
    onlineCount: 1290,
    rtp: 97.8,
    isFavorite: false,
    description: '极速飞船倍率爬升，精准逃逸获取万倍高额收益。'
  },
  {
    id: 'rec-3',
    name: '超级幸运球',
    provider: 'KA Gaming',
    category: '推荐',
    imageUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
    badge: 'Jackpot',
    badgeType: 'jackpot',
    onlineCount: 684,
    rtp: 96.9,
    isFavorite: false,
    description: '经典数字掉落碰撞机制，多级累计奖池触手可及。'
  },
  {
    id: 'rec-4',
    name: '龙焰传说',
    provider: 'Pragmatic Play',
    category: '老虎机',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
    badge: '高RTP',
    badgeType: 'rtp',
    onlineCount: 932,
    rtp: 98.0,
    isFavorite: true,
    description: '巨龙吐息炽热免费旋转，全屏百搭翻倍炸裂。'
  },
  {
    id: 'rec-5',
    name: '末日危机',
    provider: 'Willbet',
    category: '推荐',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    badge: 'NEW',
    badgeType: 'new',
    onlineCount: 512,
    rtp: 97.4,
    isFavorite: false,
    description: '末日废土射击求生，解救神秘物资赢取巨量筹码。'
  }
];

export const HOT_GAMES: GameItem[] = [
  {
    id: 'hot-1',
    name: '奥林匹斯之门',
    provider: 'Pragmatic Play',
    category: '老虎机',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    badge: '热门',
    badgeType: 'hot',
    onlineCount: 2140,
    rtp: 96.5,
    isFavorite: true
  },
  {
    id: 'hot-2',
    name: '甜蜜狂欢',
    provider: 'Pragmatic Play',
    category: '老虎机',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    badge: '热门',
    badgeType: 'hot',
    onlineCount: 1820,
    rtp: 96.48,
    isFavorite: false
  },
  {
    id: 'hot-3',
    name: '财神到',
    provider: 'KA Gaming',
    category: '老虎机',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    badge: '推荐',
    badgeType: 'rec',
    onlineCount: 1040,
    rtp: 97.1,
    isFavorite: false
  },
  {
    id: 'hot-4',
    name: '荒野大镖客',
    provider: 'Willbet',
    category: '老虎机',
    imageUrl: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&w=600&q=80',
    badge: '高RTP',
    badgeType: 'rtp',
    onlineCount: 790,
    rtp: 98.0,
    isFavorite: false
  },
  {
    id: 'hot-5',
    name: '埃及秘宝',
    provider: 'Evolution',
    category: '老虎机',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    badge: 'NEW',
    badgeType: 'new',
    onlineCount: 620,
    rtp: 97.2,
    isFavorite: false
  }
];

export const LIVE_CASINO_GAMES: GameItem[] = [
  {
    id: 'live-1',
    name: 'PLATINUM PRIVATE BLACKJACK',
    provider: 'Evolution',
    category: '真人',
    imageUrl: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=600&q=85',
    badge: '推荐',
    badgeType: 'rec',
    onlineCount: 396,
    rtp: 99.5,
    isLive: true,
    dealerName: 'Natalia V.',
    minBet: '10 USDT',
    isFavorite: true
  },
  {
    id: 'live-2',
    name: 'GOLD VAULT ROULETTE',
    provider: 'Evolution',
    category: '真人',
    imageUrl: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=600&q=85',
    badge: '热门',
    badgeType: 'hot',
    onlineCount: 783,
    rtp: 97.3,
    isLive: true,
    dealerName: 'Chloe M.',
    minBet: '1 USDT',
    isFavorite: false
  },
  {
    id: 'live-3',
    name: 'VIP DIAMOND BLACKJACK',
    provider: 'Ezugi',
    category: '真人',
    imageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=85',
    badge: '高RTP',
    badgeType: 'rtp',
    onlineCount: 214,
    rtp: 99.4,
    isLive: true,
    dealerName: 'Svetlana K.',
    minBet: '50 USDT',
    isFavorite: false
  },
  {
    id: 'live-4',
    name: 'LIGHTNING BACCARAT',
    provider: 'Evolution',
    category: '真人',
    imageUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=85',
    badge: '热门',
    badgeType: 'hot',
    onlineCount: 1120,
    rtp: 98.76,
    isLive: true,
    dealerName: 'Isabella R.',
    minBet: '5 USDT',
    isFavorite: true
  }
];

export const BLACKJACK_ALL_GAMES: GameItem[] = [
  {
    id: 'bj-1',
    name: 'BLACKJACK VIP MIDNIGHT',
    provider: 'Evolution',
    category: '21点',
    imageUrl: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=600&q=85',
    badge: '高RTP',
    badgeType: 'rtp',
    onlineCount: 771,
    rtp: 99.0,
    isLive: true,
    dealerName: 'Victoria L.',
    description: '暗夜独享VIP包桌，支持双倍下注与保险策略，顶级荷官发牌。'
  },
  {
    id: 'bj-2',
    name: 'INFINITE BLACKJACK',
    provider: 'Evolution',
    category: '21点',
    imageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=85',
    badge: '推荐',
    badgeType: 'rec',
    onlineCount: 630,
    rtp: 99.47,
    isLive: true,
    dealerName: 'Marcus T.',
    description: '无限玩家同时入座，独创六龙连击侧注玩法。'
  },
  {
    id: 'bj-3',
    name: 'FREE BET BLACKJACK',
    provider: 'Evolution',
    category: '21点',
    imageUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=85',
    badge: '热门',
    badgeType: 'hot',
    onlineCount: 485,
    rtp: 98.45,
    isLive: true,
    dealerName: 'Elena P.',
    description: '系统自动赠送免额分牌与双倍下注，高回报率首选。'
  }
];

export const FISHING_GAMES: GameItem[] = [
  {
    id: 'fish-1',
    name: '深海夜光',
    provider: 'Willbet',
    category: '捕鱼',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    badge: '热门',
    badgeType: 'hot',
    onlineCount: 890,
    rtp: 97.5,
    isFavorite: true
  },
  {
    id: 'fish-2',
    name: 'Monster Destroyer',
    provider: 'KA Gaming',
    category: '捕鱼',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=600&q=80',
    badge: 'NEW',
    badgeType: 'new',
    onlineCount: 640,
    rtp: 96.8,
    isFavorite: false
  },
  {
    id: 'fish-3',
    name: 'Octopus Legend',
    provider: 'Willbet',
    category: '捕鱼',
    imageUrl: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=600&q=80',
    badge: 'Jackpot',
    badgeType: 'jackpot',
    onlineCount: 1020,
    rtp: 97.0,
    isFavorite: false
  },
  {
    id: 'fish-4',
    name: 'Sea Treasure',
    provider: 'KA Gaming',
    category: '捕鱼',
    imageUrl: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=600&q=80',
    badge: '推荐',
    badgeType: 'rec',
    onlineCount: 510,
    rtp: 96.5,
    isFavorite: false
  },
  {
    id: 'fish-5',
    name: 'Ocean King',
    provider: 'Willbet',
    category: '捕鱼',
    imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=600&q=80',
    badge: '高RTP',
    badgeType: 'rtp',
    onlineCount: 730,
    rtp: 97.2,
    isFavorite: false
  }
];

export const PROVIDERS: ProviderItem[] = [
  {
    id: 'prov-evolution',
    name: 'Evolution',
    gameCount: 142,
    featuredColor: '#E65100',
    subText: 'Live Casino'
  },
  {
    id: 'prov-ezugi',
    name: 'Ezugi',
    gameCount: 88,
    featuredColor: '#00897B',
    subText: 'VIP Tables'
  },
  {
    id: 'prov-pragmatic',
    name: 'Pragmatic Play',
    gameCount: 260,
    featuredColor: '#F59E0B',
    subText: 'Slots & Live'
  },
  {
    id: 'prov-willbet',
    name: 'Willbet',
    gameCount: 65,
    featuredColor: '#AD50E8',
    subText: 'Originals'
  },
  {
    id: 'prov-ka',
    name: 'KA Gaming',
    gameCount: 180,
    featuredColor: '#3B82F6',
    subText: 'Fish & Arcade'
  },
  {
    id: 'prov-sexy',
    name: 'Sexy Gaming',
    gameCount: 54,
    featuredColor: '#EC4899',
    subText: 'Live Baccarat'
  }
];
