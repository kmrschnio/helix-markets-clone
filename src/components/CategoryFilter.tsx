"use client";

import { categories, CategoryId } from "@/data/markets";

interface CategoryFilterProps {
  activeCategory: CategoryId;
  onCategoryChange: (category: CategoryId) => void;
}

export default function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`px-3 py-1 text-[12px] font-medium rounded-md border transition-all ${
              isActive
                ? "bg-[#40a9ff] text-[#14151a] border-[#40a9ff]"
                : "bg-transparent text-[#a6a8ad] border-[#3a3d4e] hover:border-[#71747a] hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
