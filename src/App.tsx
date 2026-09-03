import React, { useState, useMemo, useRef } from 'react';
import {
  Clock,
  Sparkles,
  Flame,
  Tv,
  Fish,
  Award,
  Smartphone,
  Maximize2,
  Trash2,
  Wifi,
  Battery,
  ChevronRight
} from 'lucide-react';
import { GameCategory, GameItem, ProviderItem } from './types';
import {
  BANNERS,
  INITIAL_RECENT_GAMES,
  RECOMMENDED_GAMES,
  HOT_GAMES,
  LIVE_CASINO_GAMES,
  BLACKJACK_ALL_GAMES,
  FISHING_GAMES,
  PROVIDERS
} from './data/casinoData';
import { HeaderNav } from './components/HeaderNav';
import { MarketingBanner } from './components/MarketingBanner';
import { SearchBar } from './components/SearchBar';
import { CategoryNav } from './components/CategoryNav';
import { SectionHeader } from './components/SectionHeader';
import { StandardGameCard } from './components/StandardGameCard';
import { LiveCasinoCard } from './components/LiveCasinoCard';
import { BlackjackSection } from './components/BlackjackSection';
import { HotProviders } from './components/HotProviders';
import { GameBottomSheet } from './components/GameBottomSheet';
import { BottomNav, BottomNavTab } from './components/BottomNav';
import { FilterModal } from './components/FilterModal';
import { DepositModal } from './components/DepositModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { GamePlayModal } from './components/GamePlayModal';

export default function App() {
  // User Balance & Notifications
  const [balance, setBalance] = useState<number>(1177.30);
  const [unreadCount, setUnreadCount] = useState<number>(54);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>('推荐');
  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<GameCategory | '全部'>('全部');
  const [filterProvider, setFilterProvider] = useState<string>('全部');
  const [minRtp, setMinRtp] = useState<number>(90);

  // Recently Played games list (can be emptied to test module auto-hide rule)
  const [recentGames, setRecentGames] = useState<GameItem[]>(INITIAL_RECENT_GAMES);

  // Favorites state: track by game id
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(
    new Set(['recent-1', 'rec-1', 'rec-4', 'hot-1', 'live-1'])
  );

  // Active Bottom Sheet selection
  const [sheetGame, setSheetGame] = useState<GameItem | null>(null);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  // Game Arena Simulator Modal
  const [playingGame, setPlayingGame] = useState<GameItem | null>(null);

  // Modals
  const [depositOpen, setDepositOpen] = useState<boolean>(false);
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);

  // Bottom Navigation tab
  const [currentTab, setCurrentTab] = useState<BottomNavTab>('casino');

  // Device display mode: mobile frame or full stretch
  const [mobileFrameMode, setMobileFrameMode] = useState<boolean>(true);

  // Section refs for smooth scrolling when category chips are clicked
  const recentSectionRef = useRef<HTMLDivElement>(null);
  const recSectionRef = useRef<HTMLDivElement>(null);
  const hotSectionRef = useRef<HTMLDivElement>(null);
  const liveSectionRef = useRef<HTMLDivElement>(null);
  const blackjackSectionRef = useRef<HTMLDivElement>(null);
  const fishingSectionRef = useRef<HTMLDivElement>(null);
  const providerSectionRef = useRef<HTMLDivElement>(null);

  // Handle category chip selection with smooth scroll to targeted module
  const handleCategorySelect = (category: GameCategory) => {
    setSelectedCategory(category);

    if (category === '最近' && recentSectionRef.current) {
      recentSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (category === '推荐' && recSectionRef.current) {
      recSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if ((category === '热门' || category === '老虎机') && hotSectionRef.current) {
      hotSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (category === '真人' && liveSectionRef.current) {
      liveSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (category === '21点' && blackjackSectionRef.current) {
      blackjackSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (category === '捕鱼' && fishingSectionRef.current) {
      fishingSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Toggle favorite on card or in bottom sheet
  const handleToggleFavorite = (e?: React.MouseEvent, game?: GameItem) => {
    e?.stopPropagation();
    const target = game || sheetGame;
    if (!target) return;

    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(target.id)) {
        next.delete(target.id);
      } else {
        next.add(target.id);
      }
      return next;
    });
  };

  // Open Game Bottom Sheet on card click
  const handleCardClick = (game: GameItem) => {
    setSheetGame(game);
    setSheetOpen(true);
  };

  // Launch Game from Bottom Sheet
  const handleLaunchGame = (game: GameItem) => {
    setSheetOpen(false);
    setPlayingGame(game);

    // Also push into recently played games list if not already in top
    setRecentGames((prev) => {
      const filtered = prev.filter((g) => g.id !== game.id);
      return [game, ...filtered].slice(0, 6);
    });
  };

  // Provider card click: filter by provider
  const handleSelectProvider = (prov: ProviderItem) => {
    setSearchQuery(prov.name);
    // Scroll to search or top
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  // All combined games for search/filter lookup
  const allGameLibrary: GameItem[] = useMemo(() => {
    const list = [
      ...RECOMMENDED_GAMES,
      ...HOT_GAMES,
      ...LIVE_CASINO_GAMES,
      ...BLACKJACK_ALL_GAMES,
      ...FISHING_GAMES
    ];
    // Remove duplicates by id
    const seen = new Set<string>();
    return list.filter((g) => {
      if (seen.has(g.id)) return false;
      seen.add(g.id);
      return true;
    });
  }, []);

  // Filtered search results if user has typed a query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase().trim();
    return allGameLibrary.filter((g) => {
      const matchName = g.name.toLowerCase().includes(query);
      const matchProvider = g.provider.toLowerCase().includes(query);
      const matchCategory = g.category.toLowerCase().includes(query);
      return matchName || matchProvider || matchCategory;
    });
  }, [searchQuery, allGameLibrary]);

  // Active filters count
  const activeFiltersCount = (filterCategory !== '全部' ? 1 : 0) + (filterProvider !== '全部' ? 1 : 0) + (minRtp > 90 ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col items-center justify-start antialiased selection:bg-[#AD50E8] selection:text-white">
      {/* Viewport Width Mode Switcher (For developer/review convenience in preview) */}
      <aside aria-label="屏幕模式切换" className="fixed top-2 right-2 z-50 hidden sm:flex items-center gap-1.5 bg-[#17151B]/90 backdrop-blur-md border border-[#302B36] rounded-full p-1 shadow-lg text-[11px] text-[#AAA5B2]">
        <button
          type="button"
          onClick={() => setMobileFrameMode(true)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
            mobileFrameMode ? 'bg-[#AD50E8] text-white font-bold' : 'hover:text-white'
          }`}
          title="限制标准手机宽度 (430px)"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>手机App尺寸</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileFrameMode(false)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
            !mobileFrameMode ? 'bg-[#AD50E8] text-white font-bold' : 'hover:text-white'
          }`}
          title="扩展全宽"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>自适应全宽</span>
        </button>
      </aside>

      {/* Main App Container: Strictly Standard Mobile App Canvas (max-w-[430px] or full) */}
      <div
        className={`w-full bg-[#050505] min-h-screen flex flex-col relative transition-all duration-300 pb-[96px] ${
          mobileFrameMode
            ? 'max-w-[430px] shadow-[0_0_80px_rgba(0,0,0,0.9)] border-x border-[#1A1820]'
            : 'max-w-xl'
        }`}
      >
        {/* Smartphone Top Notch / Status Bar */}
        <div className="w-full h-[28px] bg-[#050505] flex items-center justify-between px-6 pt-1 text-[11px] font-semibold text-[#AAA5B2] select-none">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* 1. 【顶部导航】(HeaderNav) */}
        <HeaderNav
          balance={balance}
          unreadCount={unreadCount}
          onDepositClick={() => setDepositOpen(true)}
          onBalanceClick={() => setDepositOpen(true)}
          onNotificationsClick={() => setNotificationOpen(true)}
          onProfileClick={() => setDepositOpen(true)}
        />

        {/* 2. 【营销Banner】(MarketingBanner) */}
        <MarketingBanner
          banners={BANNERS}
          onBannerCtaClick={(banner) => {
            // Find related game or open live casino
            const target = LIVE_CASINO_GAMES[0];
            handleCardClick(target);
          }}
        />

        {/* 3. 【搜索区域】(SearchBar) */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenFilter={() => setFilterModalOpen(true)}
          activeFilterCount={activeFiltersCount}
        />

        {/* 4. 【游戏分类导航】(CategoryNav) */}
        <CategoryNav
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* --- SEARCH RESULTS VIEW (if query is active) --- */}
        {searchResults !== null ? (
          <div className="mt-[24px] px-[24px]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] text-[#AAA5B2]">
                搜索结果: <span className="text-white font-bold">"{searchQuery}"</span> ({searchResults.length})
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[12px] text-[#AD50E8] hover:underline"
              >
                清除搜索
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="py-12 text-center text-[#787381]">
                <p className="text-[14px]">未找到匹配的游戏或厂商</p>
                <p className="text-[12px] mt-1">请尝试搜索其他关键词，如：21点、麻将、Evolution</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {searchResults.map((game) => (
                  <StandardGameCard
                    key={game.id}
                    game={game}
                    onCardClick={handleCardClick}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favoriteIds.has(game.id)}
                    className="w-full"
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* --- NORMAL HOMEPAGE FLOW --- */
          <main className="w-full flex flex-col">
            {/* 5. 【最近玩过】(Recently Played) - 仅在有记录时显示，若无则整块隐藏 */}
            {recentGames.length > 0 && (
              <section
                ref={recentSectionRef}
                id="recently-played-module"
                className="mt-[28px] sm:mt-[32px] w-full"
              >
                <div className="px-[24px] flex items-center justify-between mb-[14px]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#AD50E8]" />
                    <h2 className="text-[20px] font-semibold tracking-tight text-white">
                      最近玩过
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Quick clear records button for testing module auto-hiding */}
                    <button
                      type="button"
                      onClick={() => setRecentGames([])}
                      className="text-[11px] text-[#787381] hover:text-[#AAA5B2] flex items-center gap-1 cursor-pointer mr-2"
                      title="清除最近记录以测试隐藏"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>清空</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('最近');
                      }}
                      className="group flex items-center text-[13px] font-medium text-[#AAA5B2] hover:text-white transition-colors cursor-pointer py-1"
                    >
                      <span>查看全部</span>
                      <ChevronRight className="w-4 h-4 ml-0.5 text-[#787381] group-hover:text-white" />
                    </button>
                  </div>
                </div>

                {/* Horizontal Scroll with 20-30px Peeking */}
                <div className="w-full overflow-x-auto no-scrollbar pl-[24px] pr-[12px] flex items-start gap-[12px] scroll-smooth">
                  {recentGames.map((game) => (
                    <StandardGameCard
                      key={`recent-${game.id}`}
                      game={game}
                      onCardClick={handleCardClick}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={favoriteIds.has(game.id)}
                    />
                  ))}
                  {/* Peeking spacer */}
                  <div className="w-[12px] flex-shrink-0" />
                </div>
              </section>
            )}

            {/* 6. 【为你推荐】(Recommended For You) - 优先级更高，展示4-6个游戏 */}
            <section
              ref={recSectionRef}
              id="recommended-for-you-module"
              className="mt-[28px] sm:mt-[32px] w-full"
            >
              <div className="px-[24px]">
                <SectionHeader
                  id="section-recommended"
                  icon={<Sparkles className="w-5 h-5 text-[#AD50E8]" />}
                  title="为你推荐"
                  onViewAll={() => {
                    handleCardClick(RECOMMENDED_GAMES[0]);
                  }}
                />
              </div>

              {/* Horizontal Scroll with Peeking */}
              <div className="w-full overflow-x-auto no-scrollbar pl-[24px] pr-[12px] flex items-start gap-[12px] scroll-smooth">
                {RECOMMENDED_GAMES.map((game) => (
                  <StandardGameCard
                    key={game.id}
                    game={game}
                    onCardClick={handleCardClick}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favoriteIds.has(game.id)}
                  />
                ))}
                {/* Peeking spacer */}
                <div className="w-[12px] flex-shrink-0" />
              </div>
            </section>

            {/* 7. 【热门游戏】(Hot Games) - 2.7-3张露出下一张卡片 */}
            <section
              ref={hotSectionRef}
              id="hot-games-module"
              className="mt-[28px] sm:mt-[32px] w-full"
            >
              <div className="px-[24px]">
                <SectionHeader
                  id="section-hot"
                  icon={<span className="text-[18px]">🔥</span>}
                  title="热门游戏"
                  onViewAll={() => {
                    handleCardClick(HOT_GAMES[0]);
                  }}
                />
              </div>

              {/* Horizontal Scroll showing ~2.7-3 cards */}
              <div className="w-full overflow-x-auto no-scrollbar pl-[24px] pr-[12px] flex items-start gap-[12px] scroll-smooth">
                {HOT_GAMES.map((game) => (
                  <StandardGameCard
                    key={game.id}
                    game={game}
                    onCardClick={handleCardClick}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favoriteIds.has(game.id)}
                  />
                ))}
                {/* Peeking spacer */}
                <div className="w-[12px] flex-shrink-0" />
              </div>
            </section>

            {/* 8. 【真人娱乐场】(Live Casino) - 荷官视觉主打，高5-10%，专属卡片 */}
            <section
              ref={liveSectionRef}
              id="live-casino-module"
              className="mt-[28px] sm:mt-[32px] w-full"
            >
              <div className="px-[24px]">
                <SectionHeader
                  id="section-live-casino"
                  icon={<span className="text-[18px]">🎥</span>}
                  title="真人娱乐场"
                  onViewAll={() => {
                    handleCardClick(LIVE_CASINO_GAMES[0]);
                  }}
                />
              </div>

              {/* Horizontal Scroll with Live Casino Cards */}
              <div className="w-full overflow-x-auto no-scrollbar pl-[24px] pr-[12px] flex items-start gap-[12px] scroll-smooth">
                {LIVE_CASINO_GAMES.map((game) => (
                  <LiveCasinoCard
                    key={game.id}
                    game={game}
                    onCardClick={handleCardClick}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favoriteIds.has(game.id)}
                  />
                ))}
                {/* Peeking spacer */}
                <div className="w-[12px] flex-shrink-0" />
              </div>
            </section>

            {/* 9. 【21点】(Blackjack) - 动态布局：>=3 普通卡，=2 双卡，=1 横向大卡 */}
            <div ref={blackjackSectionRef}>
              <BlackjackSection
                allGames={BLACKJACK_ALL_GAMES}
                onCardClick={handleCardClick}
                onToggleFavorite={handleToggleFavorite}
                favorites={favoriteIds}
                onViewAll={() => {
                  handleCardClick(BLACKJACK_ALL_GAMES[0]);
                }}
              />
            </div>

            {/* 10. 【捕鱼】(Fishing Module) - 高对比深色鲜艳捕鱼 */}
            <section
              ref={fishingSectionRef}
              id="fishing-games-module"
              className="mt-[28px] sm:mt-[32px] w-full"
            >
              <div className="px-[24px]">
                <SectionHeader
                  id="section-fishing"
                  icon={<span className="text-[18px]">🐟</span>}
                  title="捕鱼"
                  onViewAll={() => {
                    handleCardClick(FISHING_GAMES[0]);
                  }}
                />
              </div>

              {/* Horizontal Scroll */}
              <div className="w-full overflow-x-auto no-scrollbar pl-[24px] pr-[12px] flex items-start gap-[12px] scroll-smooth">
                {FISHING_GAMES.map((game) => (
                  <StandardGameCard
                    key={game.id}
                    game={game}
                    onCardClick={handleCardClick}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favoriteIds.has(game.id)}
                  />
                ))}
                {/* Peeking spacer */}
                <div className="w-[12px] flex-shrink-0" />
              </div>
            </section>

            {/* 11. 【热门厂商】(Hot Providers) - 110 x 64px Logo卡片 */}
            <div ref={providerSectionRef}>
              <HotProviders
                onSelectProvider={handleSelectProvider}
                onViewAll={() => setFilterModalOpen(true)}
              />
            </div>

            {/* Safe Bottom Spacer so scrolling goes smoothly past bottom fixed nav */}
            <div className="h-[24px]" />
          </main>
        )}

        {/* 12. 【底部固定导航】(BottomNav) - Fixed 76px bottom navigation */}
        <BottomNav
          currentTab={currentTab}
          onTabChange={(tab) => {
            setCurrentTab(tab);
            if (tab === 'casino') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (tab === 'rewards') {
              setNotificationOpen(true);
            } else if (tab === 'bets') {
              // Quick open recent played
              if (recentGames.length > 0) {
                handleCardClick(recentGames[0]);
              }
            } else if (tab === 'sports') {
              alert('体育竞猜专区即将上线，敬请期待！');
            } else if (tab === 'menu') {
              setFilterModalOpen(true);
            }
          }}
        />

        {/* 13. 【游戏卡片轻量底部弹层】(GameBottomSheet) */}
        <GameBottomSheet
          game={sheetGame}
          isOpen={sheetOpen}
          onClose={() => setSheetOpen(false)}
          onLaunchGame={handleLaunchGame}
          onToggleFavorite={(g) => handleToggleFavorite(undefined, g)}
          isFavorite={sheetGame ? favoriteIds.has(sheetGame.id) : false}
        />

        {/* 14. 【游戏实时对战试玩体验窗口】(GamePlayModal) */}
        <GamePlayModal
          game={playingGame}
          isOpen={playingGame !== null}
          onClose={() => setPlayingGame(null)}
          userBalance={balance}
          onUpdateBalance={setBalance}
        />

        {/* 15. 【高级筛选弹层】(FilterModal) */}
        <FilterModal
          isOpen={filterModalOpen}
          onClose={() => setFilterModalOpen(false)}
          selectedCategory={filterCategory}
          onCategorySelect={setFilterCategory}
          selectedProvider={filterProvider}
          onProviderSelect={setFilterProvider}
          minRtp={minRtp}
          onMinRtpChange={setMinRtp}
          onReset={() => {
            setFilterCategory('全部');
            setFilterProvider('全部');
            setMinRtp(90);
          }}
        />

        {/* 16. 【充值充币弹窗】(DepositModal) */}
        <DepositModal
          isOpen={depositOpen}
          onClose={() => setDepositOpen(false)}
          onAddFunds={(amount) => {
            setBalance((prev) => prev + amount);
          }}
        />

        {/* 17. 【通知中心抽屉】(NotificationDrawer) */}
        <NotificationDrawer
          isOpen={notificationOpen}
          onClose={() => setNotificationOpen(false)}
          unreadCount={unreadCount}
          onClearAll={() => setUnreadCount(0)}
        />
      </div>
    </div>
  );
}
