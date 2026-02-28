"use client";

export default function StocksBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#1a1b3a] via-[#252766] to-[#4338ca] p-6 md:p-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 -bottom-10 w-48 h-48 opacity-20">
          <svg viewBox="0 0 200 200" fill="none">
            <path
              d="M20 180L60 120L100 140L140 80L180 40"
              stroke="#40a9ff"
              strokeWidth="3"
              opacity="0.5"
            />
            <path
              d="M20 160L60 100L100 130L140 60L180 30"
              stroke="#6366f1"
              strokeWidth="2"
              opacity="0.3"
            />
          </svg>
        </div>
        <div className="absolute right-20 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#6366f1]/20 to-transparent" />
      </div>

      <div className="relative flex items-center justify-between">
        <div className="max-w-2xl">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            Trade Stocks on Helix
          </h3>
          <p className="text-[14px] text-[#a6a8ad] leading-relaxed">
            Trade stocks with crypto for faster, cheaper, and more transparent
            transactions - combining traditional markets with the power of
            decentralized finance.
          </p>
        </div>
        <a
          href="/stocks"
          className="shrink-0 ml-6 bg-white hover:bg-gray-100 text-[#14151a] text-[14px] font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Trade Now
        </a>
      </div>
    </div>
  );
}
