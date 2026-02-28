"use client";

import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";

const navLinks = [
  { label: "Markets", href: "/markets", active: true },
  { label: "Trade", href: "/trade" },
  { label: "Trading Bots", href: "/trading-bots" },
  { label: "Stocks", href: "/stocks" },
  { label: "Leaderboard", href: "/leaderboard" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 lg:px-6 h-[57px] bg-[#14151a] border-b border-[#1d2130]">
      {/* Left: Logo + Links */}
      <div className="flex items-center gap-6">
        {/* Helix Logo */}
        <a href="/" className="flex items-center shrink-0">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <path
              d="M20 4L6 12v16l14 8 14-8V12L20 4z"
              fill="url(#helix-gradient)"
              opacity="0.9"
            />
            <path
              d="M13 16l7-4 7 4-7 4-7-4z"
              fill="#fff"
              opacity="0.9"
            />
            <path
              d="M13 16v8l7 4v-8l-7-4z"
              fill="#fff"
              opacity="0.6"
            />
            <path
              d="M27 16v8l-7 4v-8l7-4z"
              fill="#fff"
              opacity="0.8"
            />
            <defs>
              <linearGradient id="helix-gradient" x1="6" y1="4" x2="34" y2="36">
                <stop stopColor="#40a9ff" />
                <stop offset="1" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`px-3 py-1.5 text-[13px] font-medium rounded transition-colors ${
                link.active
                  ? "text-white"
                  : "text-[#a6a8ad] hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          <button className="flex items-center gap-1 px-3 py-1.5 text-[13px] font-medium text-[#a6a8ad] hover:text-white transition-colors">
            More
            <ChevronDown size={14} className="mt-0.5" />
          </button>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button className="hidden lg:block text-[12px] font-medium text-[#a6a8ad] hover:text-white transition-colors px-3 py-1.5">
          Deposit
        </button>
        <button className="bg-[#40a9ff] hover:bg-[#69bbff] text-[#14151a] text-[12px] font-semibold px-[18px] py-[5px] rounded-md transition-colors">
          Connect
        </button>
        <button className="p-1 text-[#a6a8ad] hover:text-white transition-colors">
          <Globe size={18} />
        </button>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-1 text-[#a6a8ad]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-[57px] left-0 right-0 bg-[#14151a] border-b border-[#1d2130] lg:hidden z-50 p-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`block py-2 text-sm ${
                link.active ? "text-white" : "text-[#a6a8ad]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
