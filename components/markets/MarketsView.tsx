'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  heroMarkets,
  marketCategories,
  marketRows,
  newMarkets,
  topGainers,
  type MarketCategory,
  type MarketRow
} from '@/lib/mock-data'

type SortField = 'symbol' | 'price' | 'change24h' | 'volume24h'

function formatUsd(value: number) {
  if (value >= 1000) {
    return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
  }

  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 6 })}`
}

function changeClass(value: number) {
  if (value > 0) return 'up'
  if (value < 0) return 'down'
  return 'flat'
}

export function MarketsView() {
  const [activeCategory, setActiveCategory] = useState<MarketCategory>('All')
  const [searchText, setSearchText] = useState('')
  const [showLowVolume, setShowLowVolume] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [sortField, setSortField] = useState<SortField>('volume24h')
  const [sortAsc, setSortAsc] = useState(false)

  const filteredRows = useMemo(() => {
    let rows = [...marketRows]

    if (activeCategory === 'Favorites') {
      rows = rows.filter((row) => favorites.includes(row.id))
    } else if (activeCategory !== 'All') {
      rows = rows.filter((row) => row.categories.includes(activeCategory))
    }

    if (searchText.trim()) {
      const query = searchText.trim().toLowerCase()
      rows = rows.filter(
        (row) =>
          row.symbol.toLowerCase().includes(query) ||
          row.baseName.toLowerCase().includes(query)
      )
    }

    if (!showLowVolume) {
      rows = rows.filter((row) => row.volume24h > 300000)
    }

    rows.sort((a: MarketRow, b: MarketRow) => {
      const factor = sortAsc ? 1 : -1
      if (sortField === 'symbol') {
        return a.symbol.localeCompare(b.symbol) * factor
      }

      return ((a[sortField] as number) - (b[sortField] as number)) * factor
    })

    return rows
  }, [activeCategory, favorites, searchText, showLowVolume, sortAsc, sortField])

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc((current) => !current)
      return
    }
    setSortField(field)
    setSortAsc(field === 'symbol')
  }

  const toggleFavorite = (id: string) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    )
  }

  return (
    <section className="container markets-page">
      <h1 className="page-title">Markets</h1>

      <div className="overview-grid">
        <div className="hero-mini-grid">
          {heroMarkets.map((item) => (
            <article key={item.symbol} className="tile-card">
              <p className="tile-symbol">{item.symbol}</p>
              <p className={`tile-price ${changeClass(item.change)}`}>{formatUsd(item.price)}</p>
              <p className="tile-volume">Vol {item.volume.toLocaleString()} USD</p>
            </article>
          ))}
        </div>

        <article className="tile-list-card tall-tile-card">
          <h3>🟡 New Markets</h3>
          <div className="mini-market-list">
            {newMarkets.map((item) => (
              <div key={item.symbol} className="mini-row">
                <span>{item.symbol}</span>
                <span>{formatUsd(item.price)}</span>
                <span className={changeClass(item.change)}>{item.change > 0 ? '+' : ''}{item.change}%</span>
              </div>
            ))}
          </div>
        </article>

        <article className="tile-list-card tall-tile-card">
          <h3>🚀 Top Gainers</h3>
          <div className="mini-market-list">
            {topGainers.map((item) => (
              <div key={item.symbol} className="mini-row">
                <span>{item.symbol}</span>
                <span>{formatUsd(item.price)}</span>
                <span className={changeClass(item.change)}>+{item.change}%</span>
              </div>
            ))}
          </div>
        </article>
      </div>

      <section className="promo-banner">
        <div>
          <h2>Trade Stocks on Helix</h2>
          <p>
            Trade stocks with crypto for faster, cheaper, and more transparent transactions
            - combining traditional markets with decentralized finance.
          </p>
        </div>
        <button className="light-btn">Trade Now</button>
      </section>

      <div className="filters-row">
        <div className="chip-wrap">
          {marketCategories.map((category) => (
            <button
              key={category}
              className={`chip ${activeCategory === category ? 'chip-active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="search-controls">
          <input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            className="search-input"
            placeholder="Search Market..."
          />
          <label className="checkbox-inline">
            <input
              checked={showLowVolume}
              onChange={(event) => setShowLowVolume(event.target.checked)}
              type="checkbox"
            />
            Show low vol.
          </label>
        </div>
      </div>

      <div className="table-wrap">
        <table className="market-table">
          <thead>
            <tr>
              <th onClick={() => toggleSort('symbol')}>Markets ↕</th>
              <th onClick={() => toggleSort('price')}>Last Price ↕</th>
              <th onClick={() => toggleSort('change24h')}>Change (24h) ↕</th>
              <th onClick={() => toggleSort('volume24h')}>Volume (24h) ↕</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id}>
                <td>
                  <div className="market-name-wrap">
                    <p className="market-symbol">
                      {row.symbol}
                      {row.leverage ? <span className="lev-tag">{row.leverage}</span> : null}
                    </p>
                    <p className="market-subtext">
                      {row.baseName}
                      {row.tags?.map((tag) => (
                        <span key={tag} className="small-tag">
                          {tag}
                        </span>
                      ))}
                    </p>
                  </div>
                </td>
                <td>{formatUsd(row.price)}</td>
                <td className={changeClass(row.change24h)}>
                  {row.change24h > 0 ? '+' : ''}
                  {row.change24h.toFixed(2)}%
                </td>
                <td>{formatUsd(row.volume24h)}</td>
                <td>
                  <Link href={`/spot/${row.id.replace(/-perp$/, '')}`} className="trade-link">
                    Trade
                  </Link>
                </td>
                <td>
                  <button
                    className={`star-btn ${favorites.includes(row.id) ? 'star-active' : ''}`}
                    onClick={() => toggleFavorite(row.id)}
                    aria-label="Toggle favorite"
                  >
                    ★
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
