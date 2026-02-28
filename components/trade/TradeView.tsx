'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { marketRows, orderbookAsks, orderbookBids } from '@/lib/mock-data'

function formatUsd(value: number) {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: value < 10 ? 3 : 0,
    maximumFractionDigits: value < 10 ? 3 : 0
  })
}

export function TradeView({ slug }: { slug: string }) {
  const market = useMemo(
    () => marketRows.find((item) => item.id.includes(slug)) ?? marketRows[6],
    [slug]
  )

  const [side, setSide] = useState<'Buy' | 'Sell'>('Buy')
  const [activeTab, setActiveTab] = useState<'Limit' | 'Market' | 'Swap'>('Limit')
  const [price, setPrice] = useState('2.94')
  const [amount, setAmount] = useState('0.001')

  return (
    <section className="trade-page">
      <div className="trade-topbar">
        <div className="trade-market-head">
          <h1>{market.symbol}</h1>
          <span className="down">↓ {Math.abs(market.change24h).toFixed(3)}</span>
          <span className="down">{market.change24h.toFixed(2)}%</span>
        </div>
        <div className="trade-top-stats">
          <span>Volume (24h) {formatUsd(market.volume24h)} USDT</span>
          <span>Market Cap {formatUsd(292904057)}</span>
        </div>
      </div>

      <div className="trade-grid">
        <article className="panel chart-panel">
          <div className="panel-tabs">
            <button className="active">Info</button>
            <button>Chart</button>
            <button>Depth</button>
          </div>
          <div className="chart-toolbar">
            <div className="time-tabs">
              <button>1m</button>
              <button>5m</button>
              <button className="active">15m</button>
              <button>1h</button>
              <button className="active">D</button>
            </div>
            <span>Indicators</span>
          </div>
          <div className="fake-chart">
            <div className="grid-lines" />
            <div className="candles">
              {Array.from({ length: 44 }).map((_, index) => (
                <span
                  key={`${index}-candle`}
                  className={`candle ${index % 4 === 0 || index % 7 === 0 ? 'up' : 'down'}`}
                  style={{
                    height: `${30 + ((index * 11) % 90)}px`
                  }}
                />
              ))}
            </div>
          </div>
          <div className="bottom-timeframe">
            <button>5m</button>
            <button>1h</button>
            <button>1d</button>
            <button className="active">1w</button>
          </div>
        </article>

        <article className="panel orderbook-panel">
          <div className="panel-tabs orderbook-tabs">
            <button>Trades</button>
            <button className="active">Orderbook</button>
          </div>

          <div className="book-header">
            <span>Price USDT</span>
            <span>Size INJ</span>
            <span>Total USDT</span>
          </div>

          <div className="book-rows">
            {orderbookAsks.map((row) => (
              <div key={`ask-${row[0]}-${row[2]}`} className="book-row ask">
                <span>{row[0].toFixed(3)}</span>
                <span>{row[1].toLocaleString()}</span>
                <span>{row[2].toLocaleString()}</span>
              </div>
            ))}

            <p className="last-price">2.932 ↑</p>

            {orderbookBids.map((row) => (
              <div key={`bid-${row[0]}-${row[2]}`} className="book-row bid">
                <span>{row[0].toFixed(3)}</span>
                <span>{row[1].toLocaleString()}</span>
                <span>{row[2].toLocaleString()}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel order-panel">
          <div className="mode-switch">
            <button className="active">Standard</button>
            <button>Trading Bots</button>
          </div>

          <div className="panel-tabs trading-tabs">
            <button className={activeTab === 'Limit' ? 'active' : ''} onClick={() => setActiveTab('Limit')}>
              Limit
            </button>
            <button className={activeTab === 'Market' ? 'active' : ''} onClick={() => setActiveTab('Market')}>
              Market
            </button>
            <button className={activeTab === 'Swap' ? 'active' : ''} onClick={() => setActiveTab('Swap')}>
              Swap
            </button>
          </div>

          <div className="buy-sell-toggle">
            <button className={side === 'Buy' ? 'buy active' : 'buy'} onClick={() => setSide('Buy')}>
              Buy
            </button>
            <button className={side === 'Sell' ? 'sell active' : 'sell'} onClick={() => setSide('Sell')}>
              Sell
            </button>
          </div>

          <label className="form-field">
            <span>Limit Price</span>
            <input value={price} onChange={(event) => setPrice(event.target.value)} />
          </label>

          <label className="form-field">
            <span>Amount</span>
            <input value={amount} onChange={(event) => setAmount(event.target.value)} />
          </label>

          <div className="percent-row">
            <button>25%</button>
            <button>50%</button>
            <button>75%</button>
            <button>100%</button>
          </div>

          <details className="details-box" open>
            <summary>Details</summary>
            <div className="details-line">
              <span>Total</span>
              <span>≈ 0 USDT</span>
            </div>
            <div className="details-line">
              <span>Fees</span>
              <span>0%</span>
            </div>
          </details>

          <button className="place-order">Place Order</button>
          <p className="equity-line">Account Equity Spot $0.00 USD</p>
        </article>
      </div>

      <div className="trade-footer-panel">
        <div>
          <strong>Orders (0)</strong>
        </div>
        <Link href="/markets" className="trade-link">
          Back to Markets
        </Link>
      </div>
    </section>
  )
}
