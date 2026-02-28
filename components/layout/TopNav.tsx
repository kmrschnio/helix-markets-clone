import Link from 'next/link'

const navItems = [
  { label: 'Markets', href: '/markets' },
  { label: 'Trade', href: '/spot/inj-usdt' },
  { label: 'Trading Bots', href: '/trading-bots' },
  { label: 'Stocks', href: '/markets?category=Stocks' },
  { label: 'Leaderboard', href: '/markets?category=Trending' },
  { label: 'More', href: '/markets' }
]

export function TopNav() {
  return (
    <header className="top-nav">
      <div className="top-nav-inner">
        <div className="brand">∿</div>

        <nav className="main-nav">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="top-nav-actions">
          <button className="ghost-btn">Deposit</button>
          <button className="primary-btn">Connect</button>
        </div>
      </div>
    </header>
  )
}
