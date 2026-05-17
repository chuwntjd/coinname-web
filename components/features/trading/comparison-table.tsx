'use client'

import { useState } from 'react'
import { exchanges } from '@/lib/features/trading/exchanges'
import { Button } from '@/components/ui/button'
import { ExternalLink, Trophy, Medal, Award } from 'lucide-react'

export function ComparisonTable() {
  const [sortBy, setSortBy] = useState<'rank' | 'rating' | 'spotFee'>('rank')

  const sortedExchanges = [...exchanges].sort((a, b) => {
    if (sortBy === 'rank') return a.rank - b.rank
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'spotFee') return parseFloat(a.spotFee) - parseFloat(b.spotFee)
    return 0
  })

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-muted-foreground font-medium">{rank}</span>
    }
  }

  return (
    <section id="ranking" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            거래소 추천 순위
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            수수료, 안정성, 사용 편의성을 종합적으로 고려한 추천 순위입니다.
          </p>

          <div className="inline-flex items-center gap-2 p-1 rounded-lg bg-secondary">
            <button
              onClick={() => setSortBy('rank')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                sortBy === 'rank' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              추천순
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                sortBy === 'rating' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              평점순
            </button>
            <button
              onClick={() => setSortBy('spotFee')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                sortBy === 'spotFee' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              수수료순
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-hidden rounded-xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary/50">
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">순위</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">거래소</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">수수료 할인</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">현물 수수료</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">선물 수수료</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">평점</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedExchanges.map((exchange, index) => (
                <tr 
                  key={exchange.id} 
                  className={`transition-colors hover:bg-secondary/30 ${
                    index === 0 ? 'bg-primary/5' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center w-8">
                      {getRankIcon(exchange.rank)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-foreground">
                        {exchange.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-foreground">{exchange.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-primary">{exchange.feeDiscount}</span>
                  </td>
                  <td className="px-6 py-4 text-foreground">{exchange.spotFee}</td>
                  <td className="px-6 py-4 text-foreground">{exchange.futuresFee}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <span className="text-foreground font-medium">{exchange.rating}</span>
                      <span className="text-muted-foreground">/5</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button size="sm" asChild>
                      <a href={exchange.referralLink} target="_blank" rel="noopener noreferrer">
                        가입하기
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {sortedExchanges.map((exchange) => (
            <div
              key={exchange.id}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8">
                    {getRankIcon(exchange.rank)}
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-foreground">
                    {exchange.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-foreground">{exchange.name}</span>
                </div>
                <span className="text-primary font-semibold">{exchange.feeDiscount}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">현물</p>
                  <p className="font-medium text-foreground">{exchange.spotFee}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">선물</p>
                  <p className="font-medium text-foreground">{exchange.futuresFee}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">평점</p>
                  <p className="font-medium text-foreground">{exchange.rating}/5</p>
                </div>
              </div>

              <Button size="sm" className="w-full" asChild>
                <a href={exchange.referralLink} target="_blank" rel="noopener noreferrer">
                  가입하기
                  <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
