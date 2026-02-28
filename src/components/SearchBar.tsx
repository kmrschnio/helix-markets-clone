"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  showLowVol: boolean;
  onShowLowVolChange: (val: boolean) => void;
}

export default function SearchBar({
  value,
  onChange,
  showLowVol,
  onShowLowVolChange,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search Market..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent text-[13px] text-white placeholder-[#71747a] border-none outline-none w-[160px] focus:w-[200px] transition-all pr-8"
        />
        <Search
          size={16}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[#71747a]"
        />
      </div>
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <div className="relative">
          <input
            type="checkbox"
            checked={showLowVol}
            onChange={(e) => onShowLowVolChange(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-4 h-4 border border-[#3a3d4e] rounded peer-checked:bg-[#40a9ff] peer-checked:border-[#40a9ff] transition-colors flex items-center justify-center">
            {showLowVol && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="#14151a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        </div>
        <span className="text-[12px] text-[#a6a8ad]">Show low vol.</span>
      </label>
    </div>
  );
}
