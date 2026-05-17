import { Header } from '@/components/header'
import { HeroSection } from '@/components/features/trading/hero-section'
import { ExchangeComparison } from '@/components/features/trading/exchange-comparison'
import { ComparisonTable } from '@/components/features/trading/comparison-table'
import { GuideSection } from '@/components/features/trading/guide-section'
import { Footer } from '@/components/features/trading/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ExchangeComparison />
      <ComparisonTable />
      <GuideSection />
      <Footer />
    </main>
  )
}
