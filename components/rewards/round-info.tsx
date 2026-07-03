"use client"

import { useEffect, useState } from "react"
import type { RaffleRound } from "@/types/raffle"
import { Gift, Clock, Users, Ticket } from "lucide-react"

interface RoundInfoProps {
  round: RaffleRound
  participantCount: number
  totalTickets: number
}

function useCountdown(target: string) {
  const [remaining, setRemaining] = useState("")
  useEffect(() => {
    const update = () => {
      const diff = new Date(target).getTime() - Date.now()
      if (diff <= 0) {
        setRemaining("추첨 대기 중")
        return
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24))
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const m = Math.floor((diff / (1000 * 60)) % 60)
      const s = Math.floor((diff / 1000) % 60)
      setRemaining(`${d}일 ${h}시간 ${m}분 ${s}초`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [target])
  return remaining
}

export function RoundInfo({ round, participantCount, totalTickets }: RoundInfoProps) {
  const countdown = useCountdown(round.drawAt)

  return (
    <div className="relative overflow-hidden rounded-2xl border border-lime-400/30 bg-zinc-900 p-6 sm:p-8">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-lime-400/10 blur-3xl" aria-hidden />
      <div className="relative">
        <div className="flex items-center gap-2 text-lime-400">
          <Gift className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wider">진행 중인 응모</span>
        </div>
        <h2 className="mt-3 text-2xl font-bold text-zinc-50 sm:text-3xl text-balance">{round.name}</h2>
        <div className="mt-4 flex flex-wrap items-baseline gap-2">
          <span className="text-4xl font-black text-yellow-400 sm:text-5xl">
            {round.prizeAmount.toLocaleString("ko-KR")}원
          </span>
          <span className="text-sm text-zinc-400">{round.prizeLabel}</span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/50 p-3">
            <Clock className="h-5 w-5 shrink-0 text-lime-400" />
            <div className="min-w-0">
              <p className="text-xs text-zinc-500">추첨까지</p>
              <p className="truncate text-sm font-semibold text-zinc-100">{countdown}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/50 p-3">
            <Users className="h-5 w-5 shrink-0 text-lime-400" />
            <div>
              <p className="text-xs text-zinc-500">참여자</p>
              <p className="text-sm font-semibold text-zinc-100">{participantCount.toLocaleString("ko-KR")}명</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/50 p-3">
            <Ticket className="h-5 w-5 shrink-0 text-lime-400" />
            <div>
              <p className="text-xs text-zinc-500">총 응모권</p>
              <p className="text-sm font-semibold text-zinc-100">{totalTickets.toLocaleString("ko-KR")}장</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
