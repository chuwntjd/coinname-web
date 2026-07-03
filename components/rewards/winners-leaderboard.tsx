"use client"

import { useMemo } from "react"
import type { WinnerRecord } from "@/types/raffle"
import { Crown, Trophy, Medal, Sparkles } from "lucide-react"

interface WinnersLeaderboardProps {
  winners: WinnerRecord[]
}

interface RankedWinner {
  userId: string
  nickname: string
  totalAmount: number
  wins: number
}

// 누적 당첨금 기준 상위 당첨자 랭킹 (서버 당첨 기록에서 집계)
function rankWinners(winners: WinnerRecord[], limit: number): RankedWinner[] {
  const map = new Map<string, RankedWinner>()
  for (const w of winners) {
    const key = w.userId || w.nickname
    const existing = map.get(key)
    if (existing) {
      existing.totalAmount += w.amount
      existing.wins += 1
    } else {
      map.set(key, { userId: key, nickname: w.nickname, totalAmount: w.amount, wins: 1 })
    }
  }
  return Array.from(map.values())
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, limit)
}

const RANK_STYLES = [
  { icon: Crown, color: "text-yellow-400", ring: "border-yellow-400/40 bg-yellow-400/5" },
  { icon: Trophy, color: "text-zinc-300", ring: "border-zinc-600/50 bg-zinc-800/30" },
  { icon: Medal, color: "text-amber-600", ring: "border-amber-600/40 bg-amber-600/5" },
]

export function WinnersLeaderboard({ winners }: WinnersLeaderboardProps) {
  const topWinners = useMemo(() => rankWinners(winners, 5), [winners])
  const recent = winners.slice(0, 5)

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Crown className="h-5 w-5 text-yellow-400" />
        <h3 className="text-lg font-bold text-zinc-50">Top Winners</h3>
      </div>

      {topWinners.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-800 py-8 text-center">
          <Sparkles className="mx-auto mb-2 h-8 w-8 text-zinc-700" />
          <p className="text-sm text-zinc-500">아직 당첨자가 없습니다.</p>
          <p className="text-xs text-zinc-600">첫 번째 당첨자가 되어보세요!</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {topWinners.map((w, i) => {
            const style = RANK_STYLES[i] || { icon: Sparkles, color: "text-zinc-500", ring: "border-zinc-800 bg-zinc-950/50" }
            const Icon = style.icon
            return (
              <div key={w.userId} className={`flex items-center gap-3 rounded-xl border p-3 ${style.ring}`}>
                <div className="flex w-6 shrink-0 items-center justify-center">
                  {i < 3 ? (
                    <Icon className={`h-5 w-5 ${style.color}`} />
                  ) : (
                    <span className="text-sm font-bold text-zinc-500">{i + 1}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-zinc-100">{w.nickname}</p>
                  <p className="text-xs text-zinc-500">{w.wins}회 당첨</p>
                </div>
                <span className="shrink-0 text-sm font-bold text-lime-400">
                  {w.totalAmount.toLocaleString("ko-KR")}원
                </span>
              </div>
            )
          })}
        </div>
      )}

      {recent.length > 0 && (
        <div className="mt-5">
          <h4 className="mb-2 text-sm font-semibold text-zinc-400">최근 당첨 내역</h4>
          <div className="space-y-1.5">
            {recent.map((w) => (
              <div key={w.id} className="flex items-center justify-between rounded-lg bg-zinc-950/50 px-3 py-2 text-xs">
                <span className="font-medium text-zinc-300">{w.nickname}</span>
                <span className="text-zinc-500">{w.roundName}</span>
                <span className="font-bold text-yellow-400">{w.amount.toLocaleString("ko-KR")}원</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
