export interface UserLevel {
  id: number
  name: string
  icon: string
  color: string
  minPoints: number
  maxPoints: number
  benefits: string[]
  referralBonus: number
}

export interface Mission {
  id: string
  type: "daily" | "weekly" | "monthly"
  title: string
  description: string
  points: number
  progress: number
  maxProgress: number
  completed: boolean
  completedAt?: Date
  expiresAt?: Date
}

export interface PointsTransaction {
  id: string
  type: "earned" | "spent"
  amount: number
  reason: string
  missionId?: string
  referralId?: string
  createdAt: Date
}

export interface Referral {
  id: string
  referrerId: string
  referredUserId: string
  referredUserName: string
  pointsEarned: number
  status: "pending" | "completed"
  createdAt: Date
  completedAt?: Date
}

export interface UserPoints {
  userId: string
  totalPoints: number
  currentLevel: UserLevel
  nextLevel: UserLevel | null
  pointsToNextLevel: number
  missions: Mission[]
  pointsHistory: PointsTransaction[]
  referralCode: string
  referrals: Referral[]
}
