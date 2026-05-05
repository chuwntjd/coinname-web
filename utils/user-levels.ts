import type { UserLevel } from "@/types/user-level"

export const USER_LEVELS: UserLevel[] = [
  {
    id: 1,
    name: "브론즈",
    icon: "🥉",
    color: "#CD7F32",
    minPoints: 0,
    maxPoints: 999,
    benefits: ["기본 커뮤니티 접근", "일일 미션 참여"],
    referralBonus: 50,
  },
  {
    id: 2,
    name: "실버",
    icon: "🥈",
    color: "#C0C0C0",
    minPoints: 1000,
    maxPoints: 2999,
    benefits: ["프리미엄 콘텐츠 접근", "주간 미션 참여", "초대 보너스 10% 증가"],
    referralBonus: 75,
  },
  {
    id: 3,
    name: "골드",
    icon: "🥇",
    color: "#FFD700",
    minPoints: 3000,
    maxPoints: 7999,
    benefits: ["VIP 채팅방 접근", "월간 미션 참여", "초대 보너스 20% 증가", "우선 고객지원"],
    referralBonus: 100,
  },
  {
    id: 4,
    name: "플래티넘",
    icon: "💎",
    color: "#E5E4E2",
    minPoints: 8000,
    maxPoints: 19999,
    benefits: ["전용 트레이딩 시그널", "개인 상담 서비스", "초대 보너스 30% 증가", "특별 이벤트 우선 참여"],
    referralBonus: 150,
  },
  {
    id: 5,
    name: "다이아몬드",
    icon: "💍",
    color: "#B9F2FF",
    minPoints: 20000,
    maxPoints: 49999,
    benefits: ["프리미엄 분석 리포트", "1:1 전문가 상담", "초대 보너스 50% 증가", "베타 기능 우선 체험"],
    referralBonus: 200,
  },
  {
    id: 6,
    name: "마스터",
    icon: "👑",
    color: "#9932CC",
    minPoints: 50000,
    maxPoints: 999999,
    benefits: ["모든 프리미엄 기능", "전용 투자 상품", "초대 보너스 100% 증가", "운영진과 직접 소통"],
    referralBonus: 300,
  },
]

export function getUserLevel(points: number): UserLevel {
  for (let i = USER_LEVELS.length - 1; i >= 0; i--) {
    if (points >= USER_LEVELS[i].minPoints) {
      return USER_LEVELS[i]
    }
  }
  return USER_LEVELS[0]
}

export function getNextLevel(currentLevel: UserLevel): UserLevel | null {
  const currentIndex = USER_LEVELS.findIndex((level) => level.id === currentLevel.id)
  if (currentIndex === -1 || currentIndex === USER_LEVELS.length - 1) {
    return null
  }
  return USER_LEVELS[currentIndex + 1]
}

export function getPointsToNextLevel(points: number, currentLevel: UserLevel): number {
  const nextLevel = getNextLevel(currentLevel)
  if (!nextLevel) return 0
  return nextLevel.minPoints - points
}

export function calculateLevelProgress(points: number): number {
  const currentLevel = getUserLevel(points)
  const nextLevel = getNextLevel(currentLevel)

  if (!nextLevel) return 100

  const currentLevelPoints = points - currentLevel.minPoints
  const totalPointsNeeded = nextLevel.minPoints - currentLevel.minPoints

  return Math.min(100, (currentLevelPoints / totalPointsNeeded) * 100)
}

export function generateReferralCode(userId: string): string {
  return `CN${userId.slice(0, 4).toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`
}

export function validateReferralCode(code: string): boolean {
  return /^CN[A-Z0-9]{8}$/.test(code)
}

export function getReferralBonus(level: UserLevel): number {
  return level.referralBonus
}

export const REFERRAL_REWARDS = {
  referrerPoints: 500, // 초대자가 받는 기본 포인트
  referredPoints: 200, // 피초대자가 받는 웰컴 보너스
  maxReferrals: 100, // 최대 초대 가능 수
}
