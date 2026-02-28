"use client";

import TokenIcon from "./TokenIcon";
import Sparkline from "./Sparkline";
import { Market } from "@/data/markets";

function formatPrice(price: number): string {
  if (price >= 1000) return price.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (price >= 1) return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 3 });
  if (price >= 0.01) return price.toFixed(4);
  return price.toFixed(6);
}

function formatVolume(vol: number): string {
  if (vol >= 1000000) return `${(vol / 1000000).toFixed(1)}M`;
  if (vol >= 1000) return `${Math.round(vol).toLocaleString()}`;
  return vol.toFixed(2);
}

function formatChange(change: number): string {
  const prefix = change > 0 ? "+" : "";
  return `${prefix}${change.toFixed(2)}%`;
}

// Hot market card with sparkline
function HotMarketCard({ market }: { market: Market }) {
  const isPositive = market.change24h >= 0;

  return (
    <a
      href={`/trade/${market.slug}`}
      className="block rounded-lg border border-[#282a3a] bg-[#1a1b23]/60 hover:bg-[#232536]/80 transition-all p-4 cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <TokenIcon token={market.baseToken} bg={market.iconBg} size={28} />
          <span className="text-white text-[13px] font-semibold">
            {market.ticker}
          </span>
        </div>
        {market.sparklineData && (
          <Sparkline
            data={market.sparklineData}
            width={80}
            height={32}
            color={isPositive ? "#0ee29b" : "#f3164d"}
          />
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`text-[14px] font-medium ${isPositive ? "text-[#0ee29b]" : "text-[#f3164d]"}`}>
          {formatPrice(market.lastPrice)}
        </span>
        <span className={`text-[12px] ${isPositive ? "text-[#0ee29b]" : "text-[#f3164d]"}`}>
          {formatChange(market.change24h)}
        </span>
      </div>
      <div className="text-[11px] text-[#71747a] mt-0.5">
        Vol {formatVolume(market.volume24h)} USD
      </div>
    </a>
  );
}

// Compact market row for New Markets / Top Gainers
function MarketListRow({ market }: { market: Market }) {
  const isPositive = market.change24h >= 0;

  return (
    <a
      href={`/trade/${market.slug}`}
      className="flex items-center justify-between py-2.5 px-1 hover:bg-[#232536]/50 rounded transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <TokenIcon token={market.baseToken} bg={market.iconBg} size={28} />
        <span className="text-white text-[13px] font-medium truncate">
          {market.ticker}
        </span>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <span className="text-white text-[13px] tabular-nums">
          $ {formatPrice(market.lastPrice)}
        </span>
        <span
          className={`text-[13px] tabular-nums w-[70px] text-right ${
            isPositive ? "text-[#0ee29b]" : "text-[#f3164d]"
          }`}
        >
          {formatChange(market.change24h)}
        </span>
      </div>
    </a>
  );
}

// Market list section (New Markets / Top Gainers)
function MarketListSection({
  title,
  emoji,
  markets,
}: {
  title: string;
  emoji: string;
  markets: Market[];
}) {
  return (
    <div className="rounded-lg border border-[#282a3a] bg-[#1a1b23]/40 p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">{emoji}</span>
        <span className="text-[14px] font-semibold text-white">{title}</span>
      </div>
      <div className="flex flex-col gap-0.5">
        {markets.map((market) => (
          <MarketListRow key={market.id} market={market} />
        ))}
      </div>
    </div>
  );
}

interface MarketOverviewProps {
  hotMarkets: Market[];
  newMarkets: Market[];
  topGainers: Market[];
}

export default function MarketOverview({
  hotMarkets,
  newMarkets,
  topGainers,
}: MarketOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Hot Markets - 2 cards */}
      <div className="md:col-span-2 xl:col-span-2 grid grid-cols-2 gap-4">
        {hotMarkets.slice(0, 2).map((market) => (
          <HotMarketCard key={market.id} market={market} />
        ))}
        {hotMarkets.slice(2, 4).map((market) => (
          <HotMarketCard key={market.id} market={market} />
        ))}
      </div>

      {/* New Markets */}
      <MarketListSection title="New Markets" emoji="🔥" markets={newMarkets} />

      {/* Top Gainers */}
      <MarketListSection title="Top Gainers" emoji="🚀" markets={topGainers} />
    </div>
  );
}
