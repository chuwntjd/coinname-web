"use client"

import type { RaffleOdds, RaffleUserState } from "@/types/raffle"
import { Ticket, Send, Percent, Trophy } from "lucide-react"

interface MyTicketsCardProps {
  userState: RaffleUserState
  odds: RaffleOdds
}

export function MyTicketsCard({ userState, odds }: MyTicketsCardProps) {
  const stats = [
    {
      icon: Ticket,
      label: "보유 응모권",
      value: `${userState.totalTickets.toLocaleString("ko-KR")}장`,
      accent: "text-lime-400",
    },
    {
      icon: Send,
      label: "이번 라운드 사용",
      value: `${odds.myTickets.toLocaleString("ko-KR")}장`,
      accent: "text-yellow-400",
    },
    {
      icon: Trophy,
      label: "누적 당첨금",
      value: `${userState.totalWinnings.toLocaleString("ko-KR")}원`,
      accent: "text-zinc-100",
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
      <h3 className="mb-4 text-lg font-bold text-zinc-50">내 응모 현황</h3>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-3 text-center">
            <s.icon className={`mx-auto mb-1.5 h-5 w-5 ${s.accent}`} />
            <p className="text-[11px] leading-tight text-zinc-500">{s.label}</p>
            <p className={`mt-1 text-sm font-bold ${s.accent} sm:text-base`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* 예상 당첨 확률 강조 */}
      <div className="mt-4 rounded-xl border border-lime-400/40 bg-gradient-to-br from-lime-400/10 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-300">
            <Percent className="h-4 w-4 text-lime-400" />
            <span className="text-sm font-medium">예상 당첨 확률</span>
          </div>
          <span className="text-2xl font-black text-lime-400">{odds.winProbability.toFixed(2)}%</span>
        </div>
        <p className="mt-2 text-xs text-zinc-500">
          내 응모권 {odds.myTickets.toLocaleString("ko-KR")}장 / 총{" "}
          {odds.totalTickets.toLocaleString("ko-KR")}장 기준 실시간 계산
        </p>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-lime-400 transition-all duration-500"
            style={{ width: `${Math.min(100, odds.winProbability)}%` }}
          />
        </div>
      </div>
    </div>
  )
}
