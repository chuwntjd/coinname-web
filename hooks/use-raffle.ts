"use client"

import { useCallback, useEffect, useState } from "react"
import type { RaffleMission, RaffleRound, RaffleUserState, WinnerRecord, RaffleOdds } from "@/types/raffle"
import { calculateOdds, getRoundParticipantCount, getRoundTotalTickets } from "@/utils/raffle-system"
import { createClient } from "@/lib/supabase/client"

const supabase = createClient()
const RAFFLE_EVENT = "coinname_raffle_updated"

function notifyUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(RAFFLE_EVENT))
  }
}

type MutationResult = { success: boolean; error?: string }

// ---------- DB row -> 앱 타입 매핑 ----------
function mapMission(row: any): RaffleMission {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    ticketReward: row.ticket_reward ?? 0,
    category: row.category,
    repeatable: !!row.repeatable,
    ctaLabel: row.cta_label ?? undefined,
    ctaHref: row.cta_href ?? undefined,
    active: !!row.active,
  }
}

function mapRound(row: any, entryRows: any[]): RaffleRound {
  const entries: Record<string, number> = {}
  const participantNames: Record<string, string> = {}
  for (const e of entryRows) {
    entries[e.user_id] = e.tickets ?? 0
    participantNames[e.user_id] = e.nickname ?? "익명"
  }
  return {
    id: row.id,
    name: row.name,
    rewardKind: row.reward_kind,
    prizeAmount: Number(row.prize_amount ?? 0),
    prizeLabel: row.prize_label ?? "",
    status: row.status,
    createdAt: row.created_at,
    drawAt: row.draw_at ?? row.created_at,
    entries,
    participantNames,
    winnerId: row.winner_id ?? undefined,
    winnerName: row.winner_name ?? undefined,
    drawnAt: row.drawn_at ?? undefined,
    autoDraw: !!row.auto_draw,
  }
}

function mapWinner(row: any): WinnerRecord {
  return {
    id: row.id,
    roundId: row.round_id ?? "",
    roundName: row.round_name ?? "",
    userId: row.user_id ?? "",
    nickname: row.nickname ?? "익명",
    rewardKind: row.reward_kind ?? "cash",
    amount: Number(row.amount ?? 0),
    drawnAt: row.drawn_at,
  }
}

export function useRaffle(userId?: string, nickname?: string) {
  const [round, setRound] = useState<RaffleRound | null>(null)
  const [missions, setMissions] = useState<RaffleMission[]>([])
  const [userState, setUserState] = useState<RaffleUserState | null>(null)
  const [winners, setWinners] = useState<WinnerRecord[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      // 미션 (활성/비활성 모두 가져와 관리자 패널에서 사용)
      const { data: missionRows } = await supabase
        .from("raffle_missions")
        .select("*")
        .order("created_at", { ascending: true })
      setMissions((missionRows ?? []).map(mapMission))

      // 현재 진행 중인 라운드 + 응모 내역
      const { data: roundRow } = await supabase
        .from("raffle_rounds")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()

      if (roundRow) {
        const { data: entryRows } = await supabase
          .from("raffle_entries")
          .select("user_id, tickets, nickname")
          .eq("round_id", roundRow.id)
        setRound(mapRound(roundRow, entryRows ?? []))
      } else {
        setRound(null)
      }

      // 당첨 기록
      const { data: winnerRows } = await supabase
        .from("raffle_winners")
        .select("*")
        .order("drawn_at", { ascending: false })
        .limit(50)
      setWinners((winnerRows ?? []).map(mapWinner))

      // 사용자 상태
      if (userId) {
        const [{ data: stateRow }, { data: completionRows }] = await Promise.all([
          supabase.from("raffle_user_state").select("*").eq("user_id", userId).maybeSingle(),
          supabase.from("raffle_mission_completions").select("mission_id, count").eq("user_id", userId),
        ])
        const missionCompletions: Record<string, number> = {}
        for (const c of completionRows ?? []) {
          missionCompletions[c.mission_id] = c.count ?? 0
        }
        setUserState({
          userId,
          totalTickets: stateRow?.total_tickets ?? 0,
          earnedTickets: stateRow?.earned_tickets ?? 0,
          missionCompletions,
          totalWinnings: Number(stateRow?.total_winnings ?? 0),
          winCount: stateRow?.win_count ?? 0,
        })
      } else {
        setUserState(null)
      }
    } catch (err) {
      console.error("[v0] raffle refresh failed:", err)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    refresh()
    const handler = () => refresh()
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh()
    }
    window.addEventListener(RAFFLE_EVENT, handler)
    window.addEventListener("focus", handler)
    document.addEventListener("visibilitychange", onVisible)
    // 다른 기기의 변경 사항을 반영하기 위한 주기적 갱신
    const interval = setInterval(refresh, 20000)
    return () => {
      window.removeEventListener(RAFFLE_EVENT, handler)
      window.removeEventListener("focus", handler)
      document.removeEventListener("visibilitychange", onVisible)
      clearInterval(interval)
    }
  }, [refresh])

  // 미션 완료 → 응모권 지급
  const completeMission = useCallback(
    async (missionId: string): Promise<{ success: boolean; reward?: number; error?: string }> => {
      if (!userId) return { success: false, error: "로그인이 필요합니다" }
      const { data, error } = await supabase.rpc("raffle_complete_mission", { p_mission_id: missionId })
      if (error) return { success: false, error: "처리 중 오류가 발생했습니다" }
      await refresh()
      notifyUpdate()
      return data as { success: boolean; reward?: number; error?: string }
    },
    [userId, refresh],
  )

  // 응모하기 → 보유 응모권 사용
  const enterRaffle = useCallback(
    async (amount: number): Promise<MutationResult> => {
      if (!userId) return { success: false, error: "로그인이 필요합니다" }
      const { data, error } = await supabase.rpc("raffle_enter", {
        p_amount: amount,
        p_nickname: nickname || "익명",
      })
      if (error) return { success: false, error: "처리 중 오류가 발생했습니다" }
      await refresh()
      notifyUpdate()
      return data as MutationResult
    },
    [userId, nickname, refresh],
  )

  const odds: RaffleOdds =
    round && userId
      ? calculateOdds(round, userId)
      : { totalParticipants: 0, totalTickets: 0, myTickets: 0, winProbability: 0 }

  // ---------- 관리자 기능 ----------
  const runDraw = useCallback(async (): Promise<{ success: boolean; winner?: WinnerRecord; error?: string }> => {
    const { data, error } = await supabase.rpc("raffle_run_draw")
    if (error) return { success: false, error: "추첨 중 오류가 발생했습니다" }
    const res = data as any
    await refresh()
    notifyUpdate()
    if (!res?.success) return { success: false, error: res?.error || "추첨 실패" }
    const winner: WinnerRecord = {
      id: `win_${Date.now()}`,
      roundId: "",
      roundName: res.round_name ?? "",
      userId: res.winner_id ?? "",
      nickname: res.nickname ?? "익명",
      rewardKind: "cash",
      amount: Number(res.amount ?? 0),
      drawnAt: new Date().toISOString(),
    }
    return { success: true, winner }
  }, [refresh])

  const updateRound = useCallback(
    async (updates: Partial<RaffleRound>) => {
      await supabase.rpc("raffle_update_round", {
        p_name: updates.name ?? null,
        p_prize_amount: updates.prizeAmount ?? null,
        p_prize_label: updates.prizeLabel ?? null,
        p_draw_at: updates.drawAt ?? null,
        p_auto_draw: updates.autoDraw ?? null,
      })
      await refresh()
      notifyUpdate()
    },
    [refresh],
  )

  const upsertMission = useCallback(
    async (mission: RaffleMission) => {
      await supabase.rpc("raffle_upsert_mission", {
        p_id: mission.id,
        p_title: mission.title,
        p_description: mission.description,
        p_ticket_reward: mission.ticketReward,
        p_category: mission.category,
        p_repeatable: mission.repeatable,
        p_cta_label: mission.ctaLabel ?? null,
        p_cta_href: mission.ctaHref ?? null,
        p_active: mission.active,
      })
      await refresh()
      notifyUpdate()
    },
    [refresh],
  )

  const deleteMission = useCallback(
    async (missionId: string) => {
      await supabase.rpc("raffle_delete_mission", { p_id: missionId })
      await refresh()
      notifyUpdate()
    },
    [refresh],
  )

  const grantTickets = useCallback(
    async (targetUserId: string, amount: number) => {
      await supabase.rpc("raffle_grant_tickets", { p_user: targetUserId, p_amount: amount })
      await refresh()
      notifyUpdate()
    },
    [refresh],
  )

  return {
    round,
    missions,
    userState,
    winners,
    odds,
    loading,
    totalTickets: round ? getRoundTotalTickets(round) : 0,
    participantCount: round ? getRoundParticipantCount(round) : 0,
    completeMission,
    enterRaffle,
    runDraw,
    updateRound,
    upsertMission,
    deleteMission,
    grantTickets,
    refresh,
  }
}
