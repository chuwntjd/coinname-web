import type {
  RaffleMission,
  RaffleRound,
  RaffleUserState,
  WinnerRecord,
  RaffleOdds,
} from "@/types/raffle"

// localStorage 키
export const RAFFLE_KEYS = {
  round: "coinname_raffle_round",
  roundsHistory: "coinname_raffle_rounds_history",
  winners: "coinname_raffle_winners",
  missions: "coinname_raffle_missions",
  userState: (userId: string) => `coinname_raffle_user_${userId}`,
} as const

// 기본 미션 (회원가입)
export const DEFAULT_MISSIONS: RaffleMission[] = [
  {
    id: "signup",
    title: "회원가입 완료",
    description: "코인네임에 가입하고 응모권을 받으세요",
    ticketReward: 5,
    category: "signup",
    repeatable: false,
    active: true,
  },
]

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

// ---------- 미션 ----------
export function getMissions(): RaffleMission[] {
  if (typeof window === "undefined") return DEFAULT_MISSIONS
  const stored = safeParse<RaffleMission[] | null>(localStorage.getItem(RAFFLE_KEYS.missions), null)
  if (!stored || stored.length === 0) {
    localStorage.setItem(RAFFLE_KEYS.missions, JSON.stringify(DEFAULT_MISSIONS))
    return DEFAULT_MISSIONS
  }
  return stored
}

export function saveMissions(missions: RaffleMission[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(RAFFLE_KEYS.missions, JSON.stringify(missions))
}

// ---------- 라운드 ----------
export function createDefaultRound(): RaffleRound {
  const now = new Date()
  const drawAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // 7일 후
  return {
    id: `round_${now.getTime()}`,
    name: "위클리 캐시 드로우",
    rewardKind: "cash",
    prizeAmount: 1000000,
    prizeLabel: "현금 100만원",
    status: "active",
    createdAt: now.toISOString(),
    drawAt: drawAt.toISOString(),
    entries: {},
    participantNames: {},
    autoDraw: false,
  }
}

export function getCurrentRound(): RaffleRound {
  if (typeof window === "undefined") return createDefaultRound()
  const stored = safeParse<RaffleRound | null>(localStorage.getItem(RAFFLE_KEYS.round), null)
  if (!stored) {
    const round = createDefaultRound()
    localStorage.setItem(RAFFLE_KEYS.round, JSON.stringify(round))
    return round
  }
  return stored
}

export function saveCurrentRound(round: RaffleRound) {
  if (typeof window === "undefined") return
  localStorage.setItem(RAFFLE_KEYS.round, JSON.stringify(round))
}

export function getRoundTotalTickets(round: RaffleRound): number {
  return Object.values(round.entries).reduce((sum, n) => sum + n, 0)
}

export function getRoundParticipantCount(round: RaffleRound): number {
  return Object.keys(round.entries).filter((id) => round.entries[id] > 0).length
}

// ---------- 사용자 상태 ----------
export function getUserState(userId: string): RaffleUserState {
  if (typeof window === "undefined") {
    return {
      userId,
      totalTickets: 0,
      earnedTickets: 0,
      missionCompletions: {},
      totalWinnings: 0,
      winCount: 0,
    }
  }
  const stored = safeParse<RaffleUserState | null>(localStorage.getItem(RAFFLE_KEYS.userState(userId)), null)
  if (!stored) {
    const fresh: RaffleUserState = {
      userId,
      totalTickets: 0,
      earnedTickets: 0,
      missionCompletions: {},
      totalWinnings: 0,
      winCount: 0,
    }
    localStorage.setItem(RAFFLE_KEYS.userState(userId), JSON.stringify(fresh))
    return fresh
  }
  return stored
}

export function saveUserState(state: RaffleUserState) {
  if (typeof window === "undefined") return
  localStorage.setItem(RAFFLE_KEYS.userState(state.userId), JSON.stringify(state))
}

// ---------- 확률 계산 ----------
export function calculateOdds(round: RaffleRound, userId: string): RaffleOdds {
  const totalTickets = getRoundTotalTickets(round)
  const myTickets = round.entries[userId] || 0
  const totalParticipants = getRoundParticipantCount(round)
  const winProbability = totalTickets > 0 ? (myTickets / totalTickets) * 100 : 0
  return { totalParticipants, totalTickets, myTickets, winProbability }
}

// ---------- 당첨자 ----------
export function getWinners(): WinnerRecord[] {
  if (typeof window === "undefined") return []
  return safeParse<WinnerRecord[]>(localStorage.getItem(RAFFLE_KEYS.winners), [])
}

export function saveWinners(winners: WinnerRecord[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(RAFFLE_KEYS.winners, JSON.stringify(winners))
}

// 누적 당첨금 기준 Top Winners 랭킹
export interface RankedWinner {
  userId: string
  nickname: string
  totalAmount: number
  wins: number
}

export function getTopWinners(limit = 10): RankedWinner[] {
  const winners = getWinners()
  const map = new Map<string, RankedWinner>()
  for (const w of winners) {
    const existing = map.get(w.userId)
    if (existing) {
      existing.totalAmount += w.amount
      existing.wins += 1
    } else {
      map.set(w.userId, { userId: w.userId, nickname: w.nickname, totalAmount: w.amount, wins: 1 })
    }
  }
  return Array.from(map.values())
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, limit)
}

// ---------- 추첨 로직 ----------
// 가중 랜덤: 응모권이 많을수록 당첨 확률이 높아짐
export function pickWeightedWinner(round: RaffleRound): string | null {
  const entries = Object.entries(round.entries).filter(([, n]) => n > 0)
  const total = entries.reduce((sum, [, n]) => sum + n, 0)
  if (total === 0) return null
  let roll = Math.random() * total
  for (const [userId, tickets] of entries) {
    roll -= tickets
    if (roll <= 0) return userId
  }
  return entries[entries.length - 1][0]
}
