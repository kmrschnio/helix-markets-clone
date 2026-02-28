"use client";

import { useState, useMemo, useCallback } from "react";
import Navbar from "@/components/Navbar";
import MarketOverview from "@/components/MarketOverview";
import StocksBanner from "@/components/StocksBanner";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import MarketsTable from "@/components/MarketsTable";
import StatusBar from "@/components/StatusBar";
import {
  hotMarkets,
  newMarkets,
  topGainers,
  allMarkets,
  CategoryId,
} from "@/data/markets";

const LOW_VOL_THRESHOLD = 10000; // $10K threshold

export default function MarketsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLowVol, setShowLowVol] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Deduplicate markets by ticker
  const uniqueMarkets = useMemo(() => {
    const seen = new Set<string>();
    return allMarkets.filter((m) => {
      if (seen.has(m.ticker + m.type)) return false;
      seen.add(m.ticker + m.type);
      return true;
    });
  }, []);

  const filteredMarkets = useMemo(() => {
    let filtered = uniqueMarkets;

    // Category filter
    if (activeCategory === "favorites") {
      filtered = filtered.filter((m) => favorites.has(m.id));
    } else if (activeCategory === "spot") {
      filtered = filtered.filter((m) => m.type === "spot");
    } else if (activeCategory === "perps") {
      filtered = filtered.filter((m) => m.type === "perp");
    } else if (activeCategory === "trending") {
      filtered = [...filtered].sort(
        (a, b) => Math.abs(b.change24h) - Math.abs(a.change24h)
      );
    } else if (activeCategory === "stocks") {
      filtered = filtered.filter((m) => m.isStock);
    } else if (activeCategory !== "all") {
      filtered = filtered.filter((m) =>
        m.category.includes(activeCategory)
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.ticker.toLowerCase().includes(q) ||
          m.name.toLowerCase().includes(q) ||
          m.baseToken.toLowerCase().includes(q)
      );
    }

    // Low volume filter
    if (!showLowVol) {
      filtered = filtered.filter((m) => m.volume24h >= LOW_VOL_THRESHOLD);
    }

    return filtered;
  }, [uniqueMarkets, activeCategory, searchQuery, showLowVol, favorites]);

  return (
    <div className="min-h-screen bg-[#14151a] pb-10">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-4 lg:px-6 pt-8 pb-16">
        {/* Page Title */}
        <h1 className="text-[28px] font-bold text-white mb-6">Markets</h1>

        {/* Market Overview Cards */}
        <MarketOverview
          hotMarkets={hotMarkets}
          newMarkets={newMarkets}
          topGainers={topGainers}
        />

        {/* Stocks Banner */}
        <div className="mt-6">
          <StocksBanner />
        </div>

        {/* Filters Section */}
        <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={(cat) => {
              setActiveCategory(cat);
              setSearchQuery("");
            }}
          />
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            showLowVol={showLowVol}
            onShowLowVolChange={setShowLowVol}
          />
        </div>

        {/* Markets Table */}
        <div className="mt-2">
          <MarketsTable
            markets={filteredMarkets}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </div>

        {filteredMarkets.length === 0 && (
          <div className="text-center py-12 text-[#71747a] text-[14px]">
            No markets found matching your criteria.
          </div>
        )}
      </main>

      <StatusBar />
    </div>
  );
}
