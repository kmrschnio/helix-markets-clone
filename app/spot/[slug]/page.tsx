import { TradeView } from '@/components/trade/TradeView'

export default async function SpotTradePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return <TradeView slug={slug} />
}
