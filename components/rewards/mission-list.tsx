"use client"

import { useState } from "react"
import Link from "next/link"
import type { RaffleMission, RaffleUserState, MissionCategory } from "@/types/raffle"
import { Button } from "@/components/ui/button"
import { Ticket, CheckCircle2, UserPlus, Building2, MessageSquare, CalendarCheck, Share2, TrendingUp, RotateCw } from "lucide-react"

interface MissionListProps {
  missions: RaffleMission[]
  userState: RaffleUserState
  onComplete: (missionId: string) => Promise<{ success: boolean; reward?: number; error?: string }>
}

const CATEGORY_ICON: Record<MissionCategory, typeof UserPlus> = {
  signup: UserPlus,
  exchange: Building2,
  community: MessageSquare,
  attendance: CalendarCheck,
  social: Share2,
  trading: TrendingUp,
}

export function MissionList({ missions, userState, onComplete }: MissionListProps) {
  const [toast, setToast] = useState<string | null>(null)
  const [pendingId, setPendingId] = useState<string | null>(null)
  const activeMissions = missions.filter((m) => m.active)

  const handleComplete = async (mission: RaffleMission) => {
    setPendingId(mission.id)
    try {
      const result = await onComplete(mission.id)
      if (result.success) {
        setToast(`+${result.reward}장 응모권 획득!`)
      } else {
        setToast(result.error || "완료할 수 없습니다")
      }
      setTimeout(() => setToast(null), 2000)
    } finally {
      setPendingId(null)
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
      <div className="mb-1 flex items-center gap-2">
        <Ticket className="h-5 w-5 text-yellow-400" />
        <h3 className="text-lg font-bold text-zinc-50">응모권 더 얻기</h3>
      </div>
      <p className="mb-4 text-sm text-zinc-500">미션을 수행할 때마다 응모권이 계속 누적됩니다.</p>

      <div className="space-y-3">
        {activeMissions.map((mission) => {
          const Icon = CATEGORY_ICON[mission.category] || Ticket
          const completions = userState.missionCompletions[mission.id] || 0
          const doneOnce = !mission.repeatable && completions >= 1

          return (
            <div
              key={mission.id}
              className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/50 p-3.5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-lime-400">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="truncate text-sm font-semibold text-zinc-100">{mission.title}</h4>
                  {mission.repeatable && (
                    <span className="flex shrink-0 items-center gap-0.5 rounded bg-yellow-400/15 px-1.5 py-0.5 text-[10px] font-medium text-yellow-400">
                      <RotateCw className="h-2.5 w-2.5" />
                      반복
                    </span>
                  )}
                </div>
                <p className="truncate text-xs text-zinc-500">{mission.description}</p>
                <span className="mt-0.5 inline-block text-xs font-bold text-lime-400">
                  +{mission.ticketReward}장
                  {mission.repeatable && completions > 0 && (
                    <span className="ml-1 font-normal text-zinc-500">({completions}회 완료)</span>
                  )}
                </span>
              </div>

              <div className="shrink-0">
                {doneOnce ? (
                  <span className="flex items-center gap-1 text-sm font-medium text-zinc-500">
                    <CheckCircle2 className="h-4 w-4 text-lime-400" />
                    완료
                  </span>
                ) : mission.ctaHref ? (
                  <div className="flex flex-col gap-1.5">
                    <Link href={mission.ctaHref}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 w-full border-yellow-400/50 bg-transparent text-xs text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300"
                      >
                        {mission.ctaLabel || "이동"}
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      disabled={pendingId === mission.id}
                      onClick={() => handleComplete(mission)}
                      className="h-7 bg-lime-400 text-xs font-bold text-zinc-950 hover:bg-lime-300 disabled:opacity-60"
                    >
                      {pendingId === mission.id ? "처리중" : "받기"}
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    disabled={pendingId === mission.id}
                    onClick={() => handleComplete(mission)}
                    className="h-8 bg-lime-400 text-xs font-bold text-zinc-950 hover:bg-lime-300 disabled:opacity-60"
                  >
                    {pendingId === mission.id ? "처리중" : "완료"}
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-lime-400/40 bg-zinc-900 px-5 py-2.5 text-sm font-bold text-lime-400 shadow-lg shadow-lime-400/10">
          {toast}
        </div>
      )}
    </div>
  )
}
