import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TradeHeroSection } from "@/components/trade/hero-section"
import { ExchangeComparison } from "@/components/trade/exchange-comparison"
import { ComparisonTable } from "@/components/trade/comparison-table"
import { GuideSection } from "@/components/trade/guide-section"

export const metadata: Metadata = {
  title: "크립토 거래소 가이드 | 최고의 거래소 수수료 할인 혜택",
  description:
    "OKX, Binance, Bybit 등 주요 거래소의 최대 수수료 할인 혜택을 한눈에 비교하고 가장 유리한 조건으로 시작하세요.",
  keywords: [
    "암호화폐 거래소",
    "수수료 할인",
    "레퍼럴",
    "OKX",
    "Binance",
    "Bybit",
    "Bitget",
    "Deepcoin",
    "Gate.io",
    "비트코인",
  ],
}

export default function TradePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <TradeHeroSection />
        <ExchangeComparison />
        <ComparisonTable />
        <GuideSection />

        {/* Back to Home */}
        <section className="py-8 sm:py-12 border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <Button asChild variant="outline">
              <Link href="/">홈으로 돌아가기</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
