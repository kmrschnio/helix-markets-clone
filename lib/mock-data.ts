export type MarketCategory =
  | 'All'
  | 'Favorites'
  | 'Spot'
  | 'Perps'
  | 'Trending'
  | 'Injective'
  | 'L1'
  | 'Stocks'
  | 'RWA'
  | 'AI'
  | 'DeFi'

export type MarketRow = {
  id: string
  symbol: string
  baseName: string
  price: number
  change24h: number
  volume24h: number
  leverage?: string
  categories: MarketCategory[]
  tags?: string[]
}

export const marketCategories: MarketCategory[] = [
  'All',
  'Favorites',
  'Spot',
  'Perps',
  'Trending',
  'Injective',
  'L1',
  'Stocks',
  'RWA',
  'AI',
  'DeFi'
]

export const heroMarkets = [
  { symbol: 'INJ/USDT', price: 2.932, change: -7.15, volume: 169840 },
  { symbol: 'WETH/USDT', price: 1872.6, change: -4.91, volume: 93145 },
  { symbol: 'SOL/USDT', price: 79.01, change: -4.97, volume: 7858 },
  { symbol: 'BTC/USDT PERP', price: 64034, change: -3.35, volume: 5598241 }
]

export const newMarkets = [
  { symbol: 'MEGA/USDT PERP', price: 0.138, change: 2.07 },
  { symbol: 'LIT/USDT PERP', price: 1.306, change: -4.18 },
  { symbol: 'PLTR/USDT PERP', price: 137.2, change: 2.22 },
  { symbol: 'ZEC/USDT PERP', price: 207.57, change: -8.24 }
]

export const topGainers = [
  { symbol: 'OPENAI/USDT PERP', price: 876.75, change: 28.02 },
  { symbol: 'NEPT/INJ', price: 0.01032, change: 8.4 },
  { symbol: 'ZIG/INJ', price: 0.012259, change: 6.87 },
  { symbol: 'DOJO/INJ', price: 0.0452, change: 4 }
]

export const marketRows: MarketRow[] = [
  {
    id: 'btc-usdt-perp',
    symbol: 'BTC/USDT PERP',
    baseName: 'Bitcoin',
    price: 64034,
    change24h: -3.36,
    volume24h: 5598241,
    leverage: '50x',
    categories: ['All', 'Perps', 'Trending', 'L1']
  },
  {
    id: 'eth-usdt-perp',
    symbol: 'ETH/USDT PERP',
    baseName: 'Ethereum',
    price: 1870.5,
    change24h: -4.67,
    volume24h: 1637357,
    leverage: '50x',
    categories: ['All', 'Perps', 'L1']
  },
  {
    id: 'l1x-usdt-perp',
    symbol: 'L1X/USDT PERP',
    baseName: 'Helix L1 Index',
    price: 373.17,
    change24h: 0.05,
    volume24h: 1060094,
    leverage: '10x',
    categories: ['All', 'Perps', 'L1', 'Trending']
  },
  {
    id: 'h100-usdt-perp',
    symbol: 'H100/USDT PERP',
    baseName: 'NVIDIA H100',
    price: 2.582,
    change24h: 0,
    volume24h: 479611,
    leverage: '5x',
    categories: ['All', 'Perps', 'Stocks', 'AI']
  },
  {
    id: 'pepe-usdt-perp',
    symbol: 'PEPE/USDT PERP',
    baseName: 'Pepe',
    price: 0.0003477,
    change24h: -6.24,
    volume24h: 427793,
    leverage: '10x',
    categories: ['All', 'Perps', 'Trending']
  },
  {
    id: 'tao-usdt-perp',
    symbol: 'TAO/USDT PERP',
    baseName: 'Bittensor',
    price: 167.73,
    change24h: -7.08,
    volume24h: 359369,
    leverage: '20x',
    categories: ['All', 'Perps', 'AI']
  },
  {
    id: 'inj-usdt',
    symbol: 'INJ/USDT',
    baseName: 'Injective',
    price: 2.931,
    change24h: -6.83,
    volume24h: 339405,
    leverage: '25x',
    categories: ['All', 'Spot', 'Injective', 'L1']
  },
  {
    id: 'wlfi-usdt-perp',
    symbol: 'WLFI/USDT PERP',
    baseName: 'World Liberty Financial',
    price: 0.1067,
    change24h: -6.69,
    volume24h: 320257,
    leverage: '5x',
    categories: ['All', 'Perps', 'RWA']
  },
  {
    id: 'tti-usdt-perp',
    symbol: 'TTI/USDT PERP',
    baseName: 'TradFi Tech Stock Index',
    price: 605.16,
    change24h: 0.13,
    volume24h: 315828,
    leverage: '25x',
    categories: ['All', 'Perps', 'Stocks'],
    tags: ['Stocks 24/5']
  },
  {
    id: 'meta-usdt-perp',
    symbol: 'META/USDT PERP',
    baseName: 'Meta Platforms',
    price: 645.63,
    change24h: -0.52,
    volume24h: 287847,
    leverage: '10x',
    categories: ['All', 'Perps', 'Stocks', 'AI'],
    tags: ['Stocks 24/5']
  }
]

export const orderbookAsks = [
  [2.969, 175.169, 520076],
  [2.965, 77.644, 230214],
  [2.964, 523.37, 1551268],
  [2.961, 1354.272, 4009999],
  [2.96, 0.551, 1630],
  [2.959, 70.961, 209973],
  [2.956, 1907.478, 5638504],
  [2.955, 1453.495, 4295077],
  [2.951, 0.553, 1631],
  [2.946, 2121.635, 6250336],
  [2.941, 0.554, 1629]
]

export const orderbookBids = [
  [2.94, 1378.019, 4051375],
  [2.937, 1907.153, 5601308],
  [2.936, 2120.191, 6224880],
  [2.933, 1617.036, 4742766],
  [2.932, 1455.478, 4267461],
  [2.927, 10209.515, 29883250],
  [2.926, 8076.407, 23631566],
  [2.914, 12.792, 37275],
  [2.912, 1377.053, 4009978],
  [2.909, 167.014, 485843],
  [2.907, 103.424, 300653]
]

export const botTabs = ['All (0)', 'Spot Grid (0)', 'Futures Grid (0)', 'Volume Boost (0)']
