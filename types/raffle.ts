// 응모(래플) 시스템 타입 정의
// 향후 포인트, NFT, 이벤트 시스템으로 확장 가능하도록 설계됨

export type RewardKind = "cash" | "points" | "nft" | "item"

export type MissionCategory = "signup" | "exchange" | "community" | "attendance" | "social" | "trading"

// 응모권을 지급하는 미션 정의 (관리자가 추가/수정/삭제 가능)
export interface RaffleMission {
  id: string
  title: string
  description: string
  ticketReward: number // 완료 시 지급되는 응모권 수
  category: MissionCategory
  // 반복 가능 여부: true면 수행할 때마다 계속 누적 지급
  repeatable: boolean
  // 전환 유도용 외부/내부 링크 (예: 거래소 가입 페이지)
  ctaLabel?: string
  ctaHref?: string
  active: boolean
}

// 현재 진행 중인 응모 라운드
export interface RaffleRound {
  id: string
  name: string
  rewardKind: RewardKind
  prizeAmount: number // 현금 보상 금액 (원)
  prizeLabel: string // 표시용 보상 설명
  status: "active" | "drawn"
  createdAt: string
  drawAt: string // 추첨 예정 시각
  // userId -> 이번 라운드에 사용한 응모권 수
  entries: Record<string, number>
  // 참여자별 닉네임 캐시 (당첨자 표시용)
  participantNames: Record<string, string>
  winnerId?: string
  winnerName?: string
  drawnAt?: string
  autoDraw: boolean
}

// 당첨 기록
export interface WinnerRecord {
  id: string
  roundId: string
  roundName: string
  userId: string
  nickname: string
  rewardKind: RewardKind
  amount: number
  drawnAt: string
}

// 사용자별 응모 상태
export interface RaffleUserState {
  userId: string
  totalTickets: number // 보유 응모권 (누적 획득 - 사용)
  earnedTickets: number // 총 획득 응모권
  // missionId -> 완료 횟수 (반복 미션 누적 관리)
  missionCompletions: Record<string, number>
  totalWinnings: number // 누적 당첨금
  winCount: number
}

// 실시간 확률 계산 결과
export interface RaffleOdds {
  totalParticipants: number
  totalTickets: number
  myTickets: number
  winProbability: number // 0~100 (%)
}
