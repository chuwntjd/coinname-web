"use client"

import { Shield, Star, Award, Crown, TrendingUp, Users, CheckCircle, AlertTriangle } from "lucide-react"

interface TrustScoreDisplayProps {
  trustScore: number
  verificationLevel: "basic" | "enhanced" | "premium"
  renewalCount: number
  communityReputation: number
  fraudReports: number
  className?: string
}

export function TrustScoreDisplay({
  trustScore,
  verificationLevel,
  renewalCount,
  communityReputation,
  fraudReports,
  className = "",
}: TrustScoreDisplayProps) {
  const getTrustLevel = () => {
    if (trustScore >= 90) return { level: "매우 높음", color: "text-green-600", bgColor: "bg-green-50", icon: Crown }
    if (trustScore >= 80) return { level: "높음", color: "text-blue-600", bgColor: "bg-blue-50", icon: Award }
    if (trustScore >= 70) return { level: "보통", color: "text-yellow-600", bgColor: "bg-yellow-50", icon: Star }
    if (trustScore >= 60) return { level: "낮음", color: "text-orange-600", bgColor: "bg-orange-50", icon: Shield }
    return { level: "매우 낮음", color: "text-red-600", bgColor: "bg-red-50", icon: AlertTriangle }
  }

  const getVerificationBadge = () => {
    switch (verificationLevel) {
      case "premium":
        return { name: "프리미엄", color: "bg-purple-100 text-purple-800", icon: "💎" }
      case "enhanced":
        return { name: "강화", color: "bg-blue-100 text-blue-800", icon: "⭐" }
      default:
        return { name: "기본", color: "bg-gray-100 text-gray-800", icon: "🛡️" }
    }
  }

  const trustInfo = getTrustLevel()
  const badgeInfo = getVerificationBadge()
  const TrustIcon = trustInfo.icon

  return (
    <div className={`${trustInfo.bgColor} border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <TrustIcon className={`h-5 w-5 ${trustInfo.color}`} />
          <span className="font-medium text-gray-900">신뢰도 점수</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeInfo.color}`}>
            {badgeInfo.icon} {badgeInfo.name}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-2xl font-bold ${trustInfo.color}`}>{trustScore}점</span>
          <span className={`text-sm font-medium ${trustInfo.color}`}>{trustInfo.level}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              trustScore >= 80 ? "bg-green-500" : trustScore >= 60 ? "bg-yellow-500" : "bg-red-500"
            }`}
            style={{ width: `${trustScore}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="flex items-center justify-center space-x-1 mb-1">
            <TrendingUp className="h-4 w-4 text-gray-500" />
            <span className="text-xs text-gray-600">갱신</span>
          </div>
          <div className="font-bold text-gray-900">{renewalCount}회</div>
        </div>
        <div>
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-xs text-gray-600">평판</span>
          </div>
          <div className="font-bold text-gray-900">{communityReputation}점</div>
        </div>
        <div>
          <div className="flex items-center justify-center space-x-1 mb-1">
            <AlertTriangle className="h-4 w-4 text-gray-500" />
            <span className="text-xs text-gray-600">신고</span>
          </div>
          <div className={`font-bold ${fraudReports > 0 ? "text-red-600" : "text-green-600"}`}>{fraudReports}건</div>
        </div>
      </div>

      {fraudReports === 0 && renewalCount > 0 && (
        <div className="mt-3 flex items-center justify-center space-x-1 text-xs text-green-600">
          <CheckCircle className="h-3 w-3" />
          <span>신뢰할 수 있는 사용자</span>
        </div>
      )}
    </div>
  )
}
