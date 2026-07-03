"use client"

import { useMemo, useState } from "react"
import type { RaffleOdds, RaffleUserState } from "@/types/raffle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Ticket, Sparkles, ArrowDown } from "lucide-react"

interface EntryPanelProps {
  userState: RaffleUserState
  odds: RaffleOdds
  onEnter: (amount: number) => Promise<{ success: boolean; error?: string }>
  onScrollToMissions: () => void
}

export function EntryPanel({ userState, odds, onEnter, onScrollToMissions }: EntryPanelProps) {
  const [amount, setAmount] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const max = userState.totalTickets
  const clampedAmount = Math.max(0, Math.min(amount, max))

  // 응모 후 예상 확률 미리보기
  const projected = useMemo(() => {
    const newMine = odds.myTickets + clampedAmount
    const newTotal = odds.totalTickets + clampedAmount
    return newTotal > 0 ? (newMine / newTotal) * 100 : 0
  }, [odds, clampedAmount])

  const quickAmounts = [1, 5, 10, 50]

  const handleEnter = async () => {
    if (clampedAmount <= 0) {
      setFeedback({ type: "error", message: "응모할 응모권을 선택해주세요" })
      return
    }
    setSubmitting(true)
    try {
      const result = await onEnter(clampedAmount)
      if (result.success) {
        setFeedback({ type: "success", message: `${clampedAmount}장 응모 완료! 행운을 빕니다 🍀` })
        setAmount(1)
      } else {
        setFeedback({ type: "error", message: result.error || "응모에 실패했습니다" })
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (max <= 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">
        <Ticket className="mx-auto mb-3 h-10 w-10 text-zinc-600" />
        <h3 className="text-lg font-bold text-zinc-100">보유한 응모권이 없어요</h3>
        <p className="mt-1 text-sm text-zinc-500">미션을 완료하고 응모권을 모아 응모에 참여하세요.</p>
        <Button
          onClick={onScrollToMissions}
          className="mt-4 bg-lime-400 font-bold text-zinc-950 hover:bg-lime-300"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          응모권 더 얻기
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
      <h3 className="mb-1 text-lg font-bold text-zinc-50">응모하기</h3>
      <p className="mb-4 text-sm text-zinc-500">
        사용할 응모권이 많을수록 당첨 확률이 올라갑니다. (보유 {max.toLocaleString("ko-KR")}장)
      </p>

      <div className="flex flex-wrap gap-2">
        {quickAmounts.map((q) => (
          <button
            key={q}
            onClick={() => setAmount(Math.min(q, max))}
            disabled={q > max}
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-sm font-medium text-zinc-300 transition-colors hover:border-lime-400 hover:text-lime-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {q}장
          </button>
        ))}
        <button
          onClick={() => setAmount(max)}
          className="rounded-lg border border-yellow-400/50 bg-yellow-400/10 px-3 py-1.5 text-sm font-bold text-yellow-400 transition-colors hover:bg-yellow-400/20"
        >
          전부 ({max})
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Input
          type="number"
          min={1}
          max={max}
          value={clampedAmount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border-zinc-700 bg-zinc-950 text-zinc-100"
        />
        <span className="shrink-0 text-sm text-zinc-400">장</span>
      </div>

      {/* 응모 후 예상 확률 */}
      <div className="mt-4 flex items-center justify-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/50 p-3 text-sm">
        <span className="text-zinc-400">
          현재 <span className="font-semibold text-zinc-200">{odds.winProbability.toFixed(2)}%</span>
        </span>
        <ArrowDown className="h-4 w-4 -rotate-90 text-lime-400" />
        <span className="text-zinc-400">
          응모 후 <span className="font-bold text-lime-400">{projected.toFixed(2)}%</span>
        </span>
      </div>

      <Button
        onClick={handleEnter}
        disabled={submitting}
        className="mt-4 h-12 w-full bg-lime-400 text-base font-bold text-zinc-950 hover:bg-lime-300 disabled:opacity-60"
      >
        <Ticket className="mr-2 h-5 w-5" />
        {submitting ? "응모 중..." : `${clampedAmount.toLocaleString("ko-KR")}장 응모하기`}
      </Button>

      {feedback && (
        <p
          className={`mt-3 text-center text-sm font-medium ${
            feedback.type === "success" ? "text-lime-400" : "text-red-400"
          }`}
        >
          {feedback.message}
        </p>
      )}

      <button
        onClick={onScrollToMissions}
        className="mt-3 flex w-full items-center justify-center gap-1.5 text-sm font-medium text-yellow-400 hover:text-yellow-300"
      >
        <Sparkles className="h-4 w-4" />
        응모권 더 얻기
      </button>
    </div>
  )
}
