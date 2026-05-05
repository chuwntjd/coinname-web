"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Shield, Eye, Brain, Zap } from "lucide-react"

interface FraudDetectionProps {
  verification: any
  onFraudDetected: (flags: string[]) => void
}

export function FraudDetectionSystem({ verification, onFraudDetected }: FraudDetectionProps) {
  const [analysisResults, setAnalysisResults] = useState<{
    riskLevel: "low" | "medium" | "high"
    flags: string[]
    confidence: number
    recommendations: string[]
  } | null>(null)

  useEffect(() => {
    analyzeVerification()
  }, [verification])

  const analyzeVerification = async () => {
    // 시뮬레이션된 AI 기반 사기 탐지 분석
    const flags: string[] = []
    let riskScore = 0

    // 1. 이미지 분석 (시뮬레이션)
    if (verification.proofImages.length < 2) {
      flags.push("증빙 자료 부족")
      riskScore += 20
    }

    // 2. 금액 패턴 분석
    const amount = verification.assetAmount
    if (amount > 1000000000) {
      // 10억 이상
      flags.push("비정상적으로 높은 금액")
      riskScore += 30
    }

    // 3. 사용자 행동 패턴 분석
    const userHistory = JSON.parse(localStorage.getItem("user_verification_history") || "[]")
    const userPreviousVerifications = userHistory.filter((h: any) => h.userId === verification.userId)

    if (userPreviousVerifications.length > 3) {
      flags.push("과도한 인증 시도")
      riskScore += 25
    }

    // 4. 시간 패턴 분석
    const submitHour = new Date(verification.submittedAt).getHours()
    if (submitHour < 6 || submitHour > 23) {
      flags.push("비정상적인 시간대 신청")
      riskScore += 10
    }

    // 5. 이메일/전화번호 검증
    if (!verification.emailVerified) {
      flags.push("이메일 미인증")
      riskScore += 15
    }

    if (verification.verificationLevel !== "basic" && !verification.phoneVerified) {
      flags.push("휴대폰 미인증")
      riskScore += 20
    }

    // 6. 거래소 신뢰도 검증
    if (!verification.trustedSources.length) {
      flags.push("신뢰할 수 있는 거래소 미선택")
      riskScore += 15
    }

    const riskLevel = riskScore > 50 ? "high" : riskScore > 25 ? "medium" : "low"
    const confidence = Math.min(95, 60 + flags.length * 8)

    const recommendations = generateRecommendations(flags, riskLevel)

    setAnalysisResults({
      riskLevel,
      flags,
      confidence,
      recommendations,
    })

    onFraudDetected(flags)
  }

  const generateRecommendations = (flags: string[], riskLevel: string): string[] => {
    const recommendations: string[] = []

    if (flags.includes("증빙 자료 부족")) {
      recommendations.push("추가 증빙 자료 요청")
    }

    if (flags.includes("비정상적으로 높은 금액")) {
      recommendations.push("고액 인증 전용 프로세스 적용")
      recommendations.push("추가 신원 확인 필요")
    }

    if (flags.includes("과도한 인증 시도")) {
      recommendations.push("사용자 이력 상세 검토")
    }

    if (flags.includes("이메일 미인증") || flags.includes("휴대폰 미인증")) {
      recommendations.push("본인 인증 완료 후 재검토")
    }

    if (riskLevel === "high") {
      recommendations.push("수동 검토 필수")
      recommendations.push("영상 통화 인증 고려")
    }

    return recommendations
  }

  if (!analysisResults) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-blue-600 animate-pulse" />
          <span className="text-blue-800 font-medium">AI 사기 탐지 분석 중...</span>
        </div>
      </div>
    )
  }

  const getRiskColor = () => {
    switch (analysisResults.riskLevel) {
      case "high":
        return "bg-red-50 border-red-200 text-red-800"
      case "medium":
        return "bg-yellow-50 border-yellow-200 text-yellow-800"
      default:
        return "bg-green-50 border-green-200 text-green-800"
    }
  }

  const getRiskIcon = () => {
    switch (analysisResults.riskLevel) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "medium":
        return <Eye className="h-5 w-5 text-yellow-600" />
      default:
        return <Shield className="h-5 w-5 text-green-600" />
    }
  }

  return (
    <div className={`border rounded-lg p-4 ${getRiskColor()}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {getRiskIcon()}
          <span className="font-medium">AI 사기 탐지 결과</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4" />
          <span className="text-sm">신뢰도: {analysisResults.confidence}%</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium">위험도: </span>
          <span className="font-bold">
            {analysisResults.riskLevel === "high" ? "높음" : analysisResults.riskLevel === "medium" ? "보통" : "낮음"}
          </span>
        </div>

        {analysisResults.flags.length > 0 && (
          <div>
            <span className="text-sm font-medium block mb-2">탐지된 위험 요소:</span>
            <ul className="space-y-1">
              {analysisResults.flags.map((flag, index) => (
                <li key={index} className="text-sm flex items-center space-x-2">
                  <AlertTriangle className="h-3 w-3" />
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {analysisResults.recommendations.length > 0 && (
          <div>
            <span className="text-sm font-medium block mb-2">권장 조치:</span>
            <ul className="space-y-1">
              {analysisResults.recommendations.map((rec, index) => (
                <li key={index} className="text-sm flex items-center space-x-2">
                  <Shield className="h-3 w-3" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
