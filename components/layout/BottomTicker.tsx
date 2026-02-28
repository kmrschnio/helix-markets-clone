const tickerItems = [
  'PYTH: $0.046',
  'ENA: $0.096',
  'NBZ: $0.013',
  'HINJ: $2.898',
  'HDRO: $0.002',
  'USDTkv: $1.000',
  'wUSDL: $0.999',
  'INJ: $2.936',
  'USDT: $1.000',
  'AGENT: $0.014',
  'USDY: $1.114',
  'OMNI: $0.808'
]

export function BottomTicker() {
  return (
    <footer className="ticker-wrap">
      <div className="status-pill">
        <span className="status-dot" /> Operational
      </div>
      <div className="version-pill">Version 2.0</div>
      <div className="ticker-row">
        {tickerItems.map((item) => (
          <span key={item} className="ticker-item">
            {item}
          </span>
        ))}
      </div>
    </footer>
  )
}
