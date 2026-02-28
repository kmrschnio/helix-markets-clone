'use client'

import { useState } from 'react'
import { botTabs } from '@/lib/mock-data'

export function TradingBotsView() {
  const [activeTab, setActiveTab] = useState(botTabs[0])

  return (
    <section className="container bots-page">
      <header className="bots-hero">
        <h1>Trade Smarter</h1>
        <p>
          Your command center for automated trading on Helix. Monitor your active bots,
          track your LP rewards, and discover high-performing community strategies to inform
          your next move.
        </p>

        <div className="bots-stats">
          <div>
            <span>Active Bots</span>
            <strong>2,756</strong>
          </div>
          <div>
            <span>Total Bots Created</span>
            <strong>384,063</strong>
          </div>
        </div>

        <div className="bots-actions">
          <button className="primary-btn">Create Your Strategy</button>
          <button className="ghost-outline-btn">Learn more</button>
        </div>
      </header>

      <section className="bots-panel">
        <aside className="bots-summary">
          <h3>Active Bots (0)</h3>
          <div>
            <span>Total Assets</span>
            <strong>0.00 USD</strong>
          </div>
          <div>
            <span>Total PnL</span>
            <strong>0.00%</strong>
          </div>
        </aside>

        <div className="bots-table-area">
          <div className="panel-tabs bot-tabs">
            {botTabs.map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? 'active' : ''}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="empty-state">No Active Bots</div>
        </div>
      </section>

      <section className="lp-panel">
        <h3>My LP Rewards</h3>
        <button className="trade-link">View All</button>
      </section>
    </section>
  )
}
