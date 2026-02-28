"use client";

export default function StatusBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 px-4 py-1.5 bg-[#14151a] border-t border-[#1d2130] text-[11px]">
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-[#0ee29b]" />
        <span className="text-[#a6a8ad]">Operational</span>
      </div>
      <span className="text-[#40a9ff]">Version 2.0</span>
    </div>
  );
}
