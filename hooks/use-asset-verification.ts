"use client"

import { useState, useEffect } from "react"
import type { AssetVerificationStatus, AssetVerificationRequest, TrustScoreFactors } from "@/types/asset-verification"
import { ASSET_VERIFICATION_LEVELS } from "@/types/asset-verification"

export function useAssetVerification(userId?: string) {
  const [verificationStatus, setVerificationStatus] = useState<AssetVerificationStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setIsLoading(false)
      return
    }

    // LocalStorage에서 자산 인증 상태 로드
    const loadVerificationStatus = () => {
      try {
        const stored = localStorage.getItem(`asset_verification_${userId}`)
        if (stored) {
          const data = JSON.parse(stored)
          setVerificationStatus(data)
        } else {
          // 기본 상태 설정
          const defaultStatus: AssetVerificationStatus = {
            isVerified: false,
            level: null,
            trustScore: 0,
            verifiedAmount: 0,
            badges: [],
          }
          setVerificationStatus(defaultStatus)
        }
      } catch (error) {
        console.error("자산 인증 상태 로드 실패:", error)
        setVerificationStatus({
          isVerified: false,
          level: null,
          trustScore: 0,
          verifiedAmount: 0,
          badges: [],
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadVerificationStatus()
  }, [userId])

  const submitVerificationRequest = async (
    request: Omit<AssetVerificationRequest, "id" | "userId" | "submittedAt" | "status">,
  ) => {
    if (!userId) throw new Error("사용자 ID가 필요합니다")

    const verificationRequest: AssetVerificationRequest = {
      id: `req_${Date.now()}`,
      userId,
      ...request,
      status: "pending",
      submittedAt: new Date().toISOString(),
    }

    // LocalStorage에 요청 저장
    const existingRequests = JSON.parse(localStorage.getItem("asset_verification_requests") || "[]")
    existingRequests.push(verificationRequest)
    localStorage.setItem("asset_verification_requests", JSON.stringify(existingRequests))

    // 시뮬레이션: 자동 승인 (실제로는 관리자 검토)
    setTimeout(() => {
      approveVerification(verificationRequest)
    }, 2000)

    return verificationRequest
  }

  const approveVerification = (request: AssetVerificationRequest) => {
    if (!userId) return

    // 자산 금액에 따른 레벨 결정
    let level = ASSET_VERIFICATION_LEVELS[0] // 기본
    if (request.assetAmount >= 100000000) {
      level = ASSET_VERIFICATION_LEVELS[2] // 프리미엄
    } else if (request.assetAmount >= 10000000) {
      level = ASSET_VERIFICATION_LEVELS[1] // 강화
    }

    // 신뢰도 점수 계산
    const trustScore = calculateTrustScore({
      assetAmount: request.assetAmount,
      verificationLevel: ASSET_VERIFICATION_LEVELS.findIndex((l) => l.id === level.id) + 1,
      communityActivity: 50,
      tradingHistory: 30,
      referralSuccess: 20,
      timeOnPlatform: 10,
    })

    const newStatus: AssetVerificationStatus = {
      isVerified: true,
      level,
      trustScore,
      verifiedAmount: request.assetAmount,
      verifiedAt: new Date().toISOString(),
      badges: [level.icon, "✅"],
    }

    setVerificationStatus(newStatus)
    localStorage.setItem(`asset_verification_${userId}`, JSON.stringify(newStatus))
  }

  const calculateTrustScore = (factors: TrustScoreFactors): number => {
    const weights = {
      assetAmount: 0.4,
      verificationLevel: 0.2,
      communityActivity: 0.15,
      tradingHistory: 0.1,
      referralSuccess: 0.1,
      timeOnPlatform: 0.05,
    }

    // 각 요소를 0-100 점수로 정규화
    const normalizedScores = {
      assetAmount: Math.min((factors.assetAmount / 1000000000) * 100, 100), // 10억원 = 100점
      verificationLevel: factors.verificationLevel * 33.33, // 3단계 = 100점
      communityActivity: factors.communityActivity,
      tradingHistory: factors.tradingHistory,
      referralSuccess: factors.referralSuccess,
      timeOnPlatform: factors.timeOnPlatform,
    }

    const totalScore = Object.entries(normalizedScores).reduce((sum, [key, score]) => {
      return sum + score * weights[key as keyof typeof weights]
    }, 0)

    return Math.round(Math.min(totalScore, 100))
  }

  const getVerificationRequests = (): AssetVerificationRequest[] => {
    if (!userId) return []

    try {
      const requests = JSON.parse(localStorage.getItem("asset_verification_requests") || "[]")
      return requests.filter((req: AssetVerificationRequest) => req.userId === userId)
    } catch {
      return []
    }
  }

  return {
    verificationStatus,
    isLoading,
    submitVerificationRequest,
    getVerificationRequests,
    calculateTrustScore,
  }
}
