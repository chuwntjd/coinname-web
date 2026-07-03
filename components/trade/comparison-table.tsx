"use client"

import { useState } from "react"
import { exchanges } from "@/lib/exchanges"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ExternalLink, Trophy, Medal, Award, Star } from "lucide-react"

type SortBy = "rank" | "rating" | "spotFee"

export function ComparisonTable() {
  const [sortBy, setSortBy] = useState<SortBy>("rank")

  const sortedExchanges = [...exchanges].sort((a, b) => {
    if (sortBy === "rank") return a.rank - b.rank
    if (sortBy === "rating") return b.rating - a.rating
    if (sortBy === "spotFee") return parseFloat(a.spotFee) - parseFloat(b.spotFee)
    return 0
  })

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />
    return <span className="w-5 h-5 flex items-center justify-center text-muted-foreground font-medium">{rank}</span>
  }

  return (
    <section id="ranking" className="py-12 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">거래소 추천 순위</h2>
          <p className="text-sm sm:text-base text-muted-foreground px-2">
            수수료, 안정성, 사용 편의성을 종합적으로 고려한 추천 순위입니다.
          </p>
        </div>

        {/* Sort Buttons */}
        <div className="flex justify-center gap-2 mb-6 sm:mb-8">
          <Button
            variant={sortBy === "rank" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("rank")}
            className={sortBy === "rank" ? "bg-orange-500 hover:bg-orange-600" : ""}
          >
            추천순
          </Button>
          <Button
            variant={sortBy === "rating" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("rating")}
            className={sortBy === "rating" ? "bg-orange-500 hover:bg-orange-600" : ""}
          >
            평점순
          </Button>
          <Button
            variant={sortBy === "spotFee" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("spotFee")}
            className={sortBy === "spotFee" ? "bg-orange-500 hover:bg-orange-600" : ""}
          >
            수수료순
          </Button>
        </div>

        {/* Rank Pills - Mobile */}
        <div className="md:hidden flex flex-wrap justify-center gap-2 mb-6">
          {sortedExchanges.slice(0, 3).map((exchange) => (
            <div 
              key={exchange.id}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border text-sm"
            >
              {getRankIcon(exchange.rank)}
              <span className="font-medium">{exchange.name}</span>
              <div className="flex items-center gap-0.5">
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                <span className="text-xs">{exchange.rating}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block max-w-5xl mx-auto">
          <div className="rounded-xl border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[80px]">순위</TableHead>
                  <TableHead>거래소</TableHead>
                  <TableHead>수수료 할인</TableHead>
                  <TableHead>현물 수수료</TableHead>
                  <TableHead>선물 수수료</TableHead>
                  <TableHead>평점</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedExchanges.map((exchange) => (
                  <TableRow key={exchange.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center justify-center">
                        {getRankIcon(exchange.rank)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center border">
                          <span className="font-bold">{exchange.name.charAt(0)}</span>
                        </div>
                        <span className="font-semibold">{exchange.name}</span>
                        {exchange.rank === 1 && (
                          <Badge className="bg-orange-500 hover:bg-orange-600">추천</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-green-500 font-medium">{exchange.feeDiscount}</span>
                    </TableCell>
                    <TableCell>{exchange.spotFee}</TableCell>
                    <TableCell>{exchange.futuresFee}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span>{exchange.rating}/5</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        asChild
                        size="sm"
                        className={
                          exchange.rank === 1 ? "bg-orange-500 hover:bg-orange-600" : ""
                        }
                      >
                        <a
                          href={exchange.referralLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          가입하기
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {sortedExchanges.map((exchange) => (
            <div
              key={exchange.id}
              className={`p-3 rounded-xl border bg-card ${
                exchange.rank === 1 ? "border-orange-500/50" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6">
                    {getRankIcon(exchange.rank)}
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center border">
                    <span className="font-bold text-sm">{exchange.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-sm">{exchange.name}</span>
                      {exchange.rank === 1 && (
                        <Badge className="bg-orange-500 hover:bg-orange-600 text-xs px-1.5 py-0">추천</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-3 text-xs">
                <div className="p-1.5 rounded bg-muted/50 text-center">
                  <span className="text-muted-foreground block text-xs">할인</span>
                  <span className="text-green-500 font-medium">{exchange.feeDiscount}</span>
                </div>
                <div className="p-1.5 rounded bg-muted/50 text-center">
                  <span className="text-muted-foreground block text-xs">현물</span>
                  <span className="font-medium">{exchange.spotFee}</span>
                </div>
                <div className="p-1.5 rounded bg-muted/50 text-center">
                  <span className="text-muted-foreground block text-xs">선물</span>
                  <span className="font-medium">{exchange.futuresFee}</span>
                </div>
                <div className="p-1.5 rounded bg-muted/50 text-center">
                  <span className="text-muted-foreground block text-xs">평점</span>
                  <span className="flex items-center justify-center gap-0.5 font-medium">
                    <Star className="h-2.5 w-2.5 text-yellow-500 fill-yellow-500" />
                    {exchange.rating}
                  </span>
                </div>
              </div>

              <Button
                asChild
                size="sm"
                className={`w-full text-xs h-8 ${exchange.rank === 1 ? "bg-orange-500 hover:bg-orange-600" : ""}`}
              >
                <a
                  href={exchange.referralLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1"
                >
                  가입하기
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
