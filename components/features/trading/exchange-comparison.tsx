import { exchanges } from '@/lib/features/trading/exchanges'
import { ExchangeCard } from '@/components/features/trading/exchange-card'

export function ExchangeComparison() {
  return (
    <section id="exchanges" className="py-24 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            거래소별 혜택 비교
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            각 거래소의 수수료, 할인 혜택, 가입 보너스를 한눈에 비교해보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exchanges.map((exchange, index) => (
            <ExchangeCard
              key={exchange.id}
              exchange={exchange}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
