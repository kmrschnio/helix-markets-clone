import { ReactNode } from 'react'
import { BottomTicker } from '@/components/layout/BottomTicker'
import { TopNav } from '@/components/layout/TopNav'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-root">
      <TopNav />
      <main className="page-wrap">{children}</main>
      <BottomTicker />
    </div>
  )
}
