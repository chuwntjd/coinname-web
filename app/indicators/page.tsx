import { Header } from "@/components/header"
import { HeroSection } from "@/components/features/indicators/hero-section"
import { IndicatorsSection } from "@/components/features/indicators/indicators-section"
import { RSIGuide } from "@/components/features/indicators/rsi-guide"
import { MACDGuide } from "@/components/features/indicators/macd-guide"
import { BollingerGuide } from "@/components/features/indicators/bollinger-guide"
import { StrategiesSection } from "@/components/features/indicators/strategies-section"
import { Footer } from "@/components/features/indicators/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <IndicatorsSection />
      <RSIGuide />
      <MACDGuide />
      <BollingerGuide />
      <StrategiesSection />
      <Footer />
    </main>
  )
}
