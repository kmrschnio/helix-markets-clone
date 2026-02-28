"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown, ArrowDown, Star } from "lucide-react";
import TokenIcon from "./TokenIcon";
import { Market } from "@/data/markets";

type SortField = "markets" | "last-price" | "change-24h" | "volume-24h";
type SortDirection = "asc" | "desc";

function formatPrice(price: number): string {
  if (price >= 10000)
    return price.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (price >= 100)
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  if (price >= 1)
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 4,
    });
  if (price >= 0.01) return price.toFixed(4);
  // Subscript notation for tiny prices
  const str = price.toFixed(10);
  const match = str.match(/^0\.0*(\d+)/);
  if (match) {
    const zeros = str.match(/^0\.(0*)/)?.[1].length || 0;
    if (zeros >= 2) {
      const significant = match[1].slice(0, 4);
      return `0.0${subscriptNum(zeros)}${significant}`;
    }
  }
  return price.toFixed(6);
}

function subscriptNum(n: number): string {
  const subs = "₀₁₂₃₄₅₆₇₈₉";
  return String(n)
    .split("")
    .map((d) => subs[parseInt(d)])
    .join("");
}

function formatVolume(vol: number): string {
  if (vol >= 1000000)
    return `$${(vol / 1000000).toFixed(1)}M`.replace(".0M", "M");
  if (vol >= 1000) return `$${Math.round(vol).toLocaleString("en-US")}`;
  return `$${vol.toFixed(2)}`;
}

function formatChange(change: number): string {
  if (change === 0) return "0.00%";
  const prefix = change > 0 ? "+" : "";
  return `${prefix}${change.toFixed(2)}%`;
}

interface MarketsTableProps {
  markets: Market[];
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

export default function MarketsTable({
  markets,
  favorites,
  onToggleFavorite,
}: MarketsTableProps) {
  const [sortField, setSortField] = useState<SortField>("volume-24h");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const sortedMarkets = useMemo(() => {
    const sorted = [...markets];
    sorted.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "markets":
          cmp = a.ticker.localeCompare(b.ticker);
          break;
        case "last-price":
          cmp = a.lastPrice - b.lastPrice;
          break;
        case "change-24h":
          cmp = a.change24h - b.change24h;
          break;
        case "volume-24h":
          cmp = a.volume24h - b.volume24h;
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return sorted;
  }, [markets, sortField, sortDir]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField === field) {
      return (
        <ArrowDown
          size={12}
          className={`inline ml-1 text-[#a6a8ad] transition-transform ${
            sortDir === "asc" ? "rotate-180" : ""
          }`}
        />
      );
    }
    return <ArrowUpDown size={12} className="inline ml-1 text-[#3a3d4e]" />;
  };

  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="grid grid-cols-[1fr_140px_140px_160px_100px] items-center px-4 py-3 border-b border-[#1d2130] text-[11px] text-[#71747a] uppercase tracking-wider font-medium">
        <button
          onClick={() => handleSort("markets")}
          className="flex items-center gap-1 text-left hover:text-[#a6a8ad] transition-colors"
        >
          Markets
          <SortIcon field="markets" />
        </button>
        <span className="text-center">Last Price</span>
        <button
          onClick={() => handleSort("change-24h")}
          className="flex items-center justify-center gap-1 hover:text-[#a6a8ad] transition-colors"
        >
          Change (24h)
          <SortIcon field="change-24h" />
        </button>
        <button
          onClick={() => handleSort("volume-24h")}
          className="flex items-center justify-end gap-1 hover:text-[#a6a8ad] transition-colors"
        >
          Volume (24h)
          <SortIcon field="volume-24h" />
        </button>
        <span />
      </div>

      {/* Table Body */}
      <div className="divide-y divide-[#1d2130]">
        {sortedMarkets.map((market) => {
          const isPositive = market.change24h > 0;
          const isNeutral = market.change24h === 0;
          const isFav = favorites.has(market.id);

          return (
            <div
              key={market.id}
              className="grid grid-cols-[1fr_140px_140px_160px_100px] items-center px-4 py-3 hover:bg-[#1a1b23]/50 transition-colors group cursor-pointer"
            >
              {/* Market Info */}
              <div className="flex items-center gap-3 min-w-0">
                <TokenIcon
                  token={market.baseToken}
                  bg={market.iconBg}
                  size={32}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-[13px] font-semibold truncate">
                      {market.ticker}
                    </span>
                    {market.leverage && (
                      <span className="text-[10px] font-medium text-[#40a9ff] bg-[#40a9ff]/10 border border-[#40a9ff]/20 px-1.5 py-0.5 rounded shrink-0">
                        {market.leverage}x
                      </span>
                    )}
                    {market.isStock && (
                      <span className="text-[10px] font-medium text-[#0ee29b] bg-[#0ee29b]/10 border border-[#0ee29b]/20 px-1.5 py-0.5 rounded shrink-0">
                        Stocks 24/5
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#71747a] truncate block">
                    {market.name}
                  </span>
                </div>
              </div>

              {/* Last Price */}
              <div className="text-center text-[13px] text-white tabular-nums font-medium">
                {formatPrice(market.lastPrice)}
              </div>

              {/* Change 24h */}
              <div
                className={`text-center text-[13px] tabular-nums font-medium ${
                  isNeutral
                    ? "text-[#a6a8ad]"
                    : isPositive
                    ? "text-[#0ee29b]"
                    : "text-[#f3164d]"
                }`}
              >
                {formatChange(market.change24h)}
              </div>

              {/* Volume 24h */}
              <div className="text-right text-[13px] text-white tabular-nums">
                {formatVolume(market.volume24h)}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3">
                <a
                  href={`/trade/${market.slug}`}
                  className="text-[#40a9ff] text-[13px] font-medium hover:text-[#69bbff] transition-colors"
                >
                  Trade
                </a>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(market.id);
                  }}
                  className="transition-colors"
                >
                  <Star
                    size={16}
                    className={
                      isFav
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-[#3a3d4e] hover:text-[#71747a]"
                    }
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
