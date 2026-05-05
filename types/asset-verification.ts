export interface AssetVerificationLevel {
  id: string
  name: string
  description: string
  requirements: string[]
  benefits: string[]
  minAmount: number
  color: string
  icon: string
}

export interface AssetVerificationRequest {
  id: string
  userId: string
  assetType: "cryptocurrency" | "stocks" | "real_estate" | "bonds" | "commodities" | "other"
  assetAmount: number
  description: string
  documents: string[]
  status: "pending" | "approved" | "rejected" | "under_review"
  submittedAt: string
  reviewedAt?: string
  reviewerNotes?: string
  verificationLevel: "basic" | "enhanced" | "premium"
}

export interface AssetVerificationStatus {
  isVerified: boolean
  level: AssetVerificationLevel | null
  trustScore: number
  verifiedAmount: number
  verifiedAt?: string
  badges: string[]
}

export interface TrustScoreFactors {
  assetAmount: number
  verificationLevel: number
  communityActivity: number
  tradingHistory: number
  referralSuccess: number
  timeOnPlatform: number
}

export interface FraudDetectionResult {
  riskLevel: "low" | "medium" | "high"
  flags: string[]
  confidence: number
  recommendations: string[]
}

export const ASSET_VERIFICATION_LEVELS: AssetVerificationLevel[] = [
  {
    id: "basic",
    name: "기본 인증",
    description: "기본적인 자산 인증",
    requirements: ["자산 증명서", "신분증"],
    benefits: ["신뢰도 배지", "기본 VIP 채널 접근"],
    minAmount: 1000000, // 100만원
    color: "text-blue-600",
    icon: "🥉",
  },
  {
    id: "enhanced",
    name: "강화 인증",
    description: "강화된 자산 인증",
    requirements: ["자산 증명서", "신분증", "소득 증명서", "거래 내역"],
    benefits: ["고급 신뢰도 배지", "프리미엄 채널 접근", "전문가 상담"],
    minAmount: 10000000, // 1천만원
    color: "text-purple-600",
    icon: "🥈",
  },
  {
    id: "premium",
    name: "프리미엄 인증",
    description: "최고 등급 자산 인증",
    requirements: ["자산 증명서", "신분증", "소득 증명서", "거래 내역", "세무 서류"],
    benefits: ["최고급 신뢰도 배지", "VIP 전용 서비스", "개인 매니저", "특별 이벤트"],
    minAmount: 100000000, // 1억원
    color: "text-gold-600",
    icon: "🥇",
  },
]
