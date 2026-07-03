"use client"

import { Star, ExternalLink, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import type { Exchange } from "@/lib/exchanges"

interface ExchangeCardProps {
  exchange: Exchange
  featured?: boolean
}

export function ExchangeCard({ exchange, featured = false }: ExchangeCardProps) {
  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
        featured
          ? "border-orange-500/50 bg-gradient-to-br from-orange-500/5 to-transparent"
          : "bg-card hover:border-primary/50"
      }`}
    >
      {featured && (
        <div className="absolute top-4 right-4">
          <Badge className="bg-orange-500 hover:bg-orange-600">추천</Badge>
        </div>
      )}

      <CardContent className="p-4 sm:p-6">
        {/* Logo & Name */}
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-muted flex items-center justify-center border overflow-hidden">
            <Image
              src={exchange.logo}
              alt={exchange.name}
              width={40}
              height={40}
              className="object-contain w-8 h-8 sm:w-10 sm:h-10"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.parentElement!.innerHTML = `<span class="text-xl sm:text-2xl font-bold">${exchange.name.charAt(0)}</span>`
              }}
            />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold">{exchange.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-xs sm:text-sm font-medium">{exchange.rating}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">{exchange.description}</p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground mb-0.5 sm:mb-1">수수료 할인</p>
            <p className="font-semibold text-green-500 text-sm sm:text-base">{exchange.feeDiscount}</p>
          </div>
          <div className="p-2 sm:p-3 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground mb-0.5 sm:mb-1">가입 보너스</p>
            <p className="font-semibold text-orange-500 text-sm sm:text-base">{exchange.bonus}</p>
          </div>
          <div className="p-2 sm:p-3 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground mb-0.5 sm:mb-1">현물 수수료</p>
            <p className="font-semibold text-sm sm:text-base">{exchange.spotFee}</p>
          </div>
          <div className="p-2 sm:p-3 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground mb-0.5 sm:mb-1">선물 수수료</p>
            <p className="font-semibold text-sm sm:text-base">{exchange.futuresFee}</p>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          {exchange.features.slice(0, 3).map((feature) => (
            <Badge key={feature} variant="secondary" className="gap-1 text-xs">
              <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              {feature}
            </Badge>
          ))}
        </div>

        {/* CTA Button - 하단 배치 */}
        <Button
          asChild
          className={`w-full ${featured ? "bg-orange-500 hover:bg-orange-600" : ""}`}
        >
          <a
            href={exchange.referralLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            가입하기
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
