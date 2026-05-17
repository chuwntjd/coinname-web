import { Star, ExternalLink, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Exchange } from '@/lib/features/trading/exchanges'

interface ExchangeCardProps {
  exchange: Exchange
  featured?: boolean
}

export function ExchangeCard({ exchange, featured = false }: ExchangeCardProps) {
  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:border-primary/50 ${
      featured ? 'border-primary/50 bg-gradient-to-br from-primary/5 to-transparent' : 'bg-card'
    }`}>
      {featured && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
          추천
        </div>
      )}
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-xl font-bold text-foreground">
              {exchange.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{exchange.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(exchange.rating) 
                        ? 'fill-primary text-primary' 
                        : 'fill-muted text-muted'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">{exchange.rating}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {exchange.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="rounded-lg bg-secondary/50 p-3">
            <p className="text-xs text-muted-foreground mb-1">수수료 할인</p>
            <p className="text-lg font-bold text-primary">{exchange.feeDiscount}</p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <p className="text-xs text-muted-foreground mb-1">가입 보너스</p>
            <p className="text-lg font-bold text-foreground">{exchange.bonus}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <p className="text-muted-foreground">현물 수수료</p>
            <p className="font-medium text-foreground">{exchange.spotFee}</p>
          </div>
          <div>
            <p className="text-muted-foreground">선물 수수료</p>
            <p className="font-medium text-foreground">{exchange.futuresFee}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {exchange.features.map((feature) => (
            <span
              key={feature}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground"
            >
              <Check className="h-3 w-3 text-primary" />
              {feature}
            </span>
          ))}
        </div>

        <Button className="w-full" asChild>
          <a href={exchange.referralLink} target="_blank" rel="noopener noreferrer">
            가입하기
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
