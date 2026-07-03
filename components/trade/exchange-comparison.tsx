"use client"

import { exchanges } from "@/lib/exchanges"
import { ExchangeCard } from "./exchange-card"

export function ExchangeComparison() {
  const sortedExchanges = [...exchanges].sort((a, b) => a.rank - b.rank)

  return (
    <section id="exchanges" className="py-12 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">거래소별 혜택 비교</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            각 거래소의 수수료, 할인 혜택, 가입 보너스를 한눈에 비교해보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {sortedExchanges.map((exchange) => (
            <ExchangeCard
              key={exchange.id}
              exchange={exchange}
              featured={exchange.rank === 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
