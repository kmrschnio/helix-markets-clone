"use client";

interface TokenIconProps {
  token: string;
  bg: string;
  size?: number;
}

const tokenColors: Record<string, string> = {
  BTC: "#F7931A",
  ETH: "#627EEA",
  WETH: "#627EEA",
  SOL: "#9945FF",
  INJ: "#00F2FE",
  ATOM: "#6F7390",
  PEPE: "#3C9A2F",
  TAO: "#1a1a2e",
  USDC: "#2775CA",
  MEGA: "#1a1a2e",
  LIT: "#6366f1",
  PLTR: "#1a1a2e",
  ZEC: "#F4B728",
  OPENAI: "#10a37f",
  NEPT: "#7c3aed",
  ZIG: "#22d3ee",
  XAG: "#C0C0C0",
  L1X: "#6366f1",
  H100: "#76b900",
  WLFI: "#1e3a5f",
  AAPL: "#555555",
  SKY: "#6366f1",
  COIN: "#0052FF",
  AMZN: "#FF9900",
  NVDA: "#76b900",
  CRCL: "#00D395",
  HOOD: "#00C805",
};

export default function TokenIcon({ token, bg, size = 36 }: TokenIconProps) {
  const color = tokenColors[token] || bg;
  const initial = token.charAt(0);

  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 font-semibold"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color}33, ${color}66)`,
        border: `1px solid ${color}44`,
        color: color,
        fontSize: size * 0.38,
      }}
    >
      {initial}
    </div>
  );
}
