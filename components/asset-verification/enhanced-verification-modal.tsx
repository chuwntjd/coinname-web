"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  X,
  Upload,
  Shield,
  AlertTriangle,
  Phone,
  Mail,
  Camera,
  LinkIcon,
  CheckCircle,
  Star,
  Lock,
  FileText,
  Video,
  Zap,
  CreditCard,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { PaymentInfoModal } from "./payment-info-modal"
import type { AssetVerification } from "@/types/asset-verification"

interface EnhancedVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (verification: Omit<AssetVerification, "id" | "submittedAt" | "expiresAt">) => void
}

export function EnhancedVerificationModal({ isOpen, onClose, onSubmit }: EnhancedVerificationModalProps) {
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [formData, setFormData] = useState({
    assetAmount: "",
    assetCurrency: "KRW" as const,
    proofDescription: "",
    isPublic: true,
    verificationLevel: "basic" as const,
    documentType: "screenshot" as const,
    phoneNumber: "",
    trustedExchange: "",
  })
  const [proofImages, setProofImages] = useState<string[]>([])
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [phoneCode, setPhoneCode] = useState("")
  const [emailCode, setEmailCode] = useState("")
  const [emailCodeSent, setEmailCodeSent] = useState(false)
  const [phoneCodeSent, setPhoneCodeSent] = useState(false)

  if (!isOpen || !user) return null

  const trustedExchanges = [
    { name: "업비트", value: "upbit", trustLevel: "high", logo: "🏦" },
    { name: "빗썸", value: "bithumb", trustLevel: "high", logo: "💎" },
    { name: "코인원", value: "coinone", trustLevel: "high", logo: "🪙" },
    { name: "바이낸스", value: "binance", trustLevel: "medium", logo: "🌐" },
    { name: "기타", value: "other", trustLevel: "low", logo: "📱" },
  ]

  const verificationLevels = [
    {
      level: "basic",
      name: "기본 인증",
      price: "무료",
      features: ["스크린샷 증빙", "이메일 인증", "30일 유효"],
      trustScore: 60,
      badge: "bronze",
      icon: Shield,
      color: "text-orange-600 bg-orange-50 border-orange-200",
      description: "개인 사용자를 위한 기본적인 자산 인증",
    },
    {
      level: "enhanced",
      name: "강화 인증",
      price: "₩5,000",
      features: ["거래소 API 연동", "휴대폰 인증", "거래 내역 확인", "60일 유효"],
      trustScore: 80,
      badge: "silver",
      icon: Star,
      color: "text-blue-600 bg-blue-50 border-blue-200",
      description: "더 높은 신뢰도가 필요한 활성 트레이더를 위한 인증",
    },
    {
      level: "premium",
      name: "프리미엄 인증",
      price: "₩15,000",
      features: ["실시간 영상 인증", "KYC 신원확인", "다중 거래소 연동", "90일 유효", "우선 검토"],
      trustScore: 95,
      badge: "gold",
      icon: Star,
      color: "text-purple-600 bg-purple-50 border-purple-200",
      description: "최고 수준의 신뢰도가 필요한 대형 투자자를 위한 인증",
    },
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setUploading(true)
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setProofImages((prev) => [...prev, e.target!.result as string])
        }
      }
      reader.readAsDataURL(file)
    })
    setUploading(false)
  }

  const sendPhoneVerification = () => {
    if (!formData.phoneNumber) {
      alert("휴대폰 번호를 입력해주세요.")
      return
    }
    setPhoneCodeSent(true)
    alert(`${formData.phoneNumber}로 인증번호를 발송했습니다.\n\n데모용 인증번호: 123456`)
  }

  const verifyPhoneCode = () => {
    if (phoneCode === "123456") {
      setPhoneVerified(true)
      alert("휴대폰 인증이 완료되었습니다.")
    } else {
      alert("인증번호가 올바르지 않습니다. 데모용 인증번호: 123456")
    }
  }

  const sendEmailVerification = () => {
    setEmailCodeSent(true)
    alert(`${user.email}로 인증번호를 발송했습니다.\n\n데모용 인증번호: 654321`)
  }

  const verifyEmailCode = () => {
    if (emailCode === "654321") {
      setEmailVerified(true)
      alert("이메일 인증이 완료되었습니다.")
    } else {
      alert("인증번호가 올바르지 않습니다. 데모용 인증번호: 654321")
    }
  }

  const calculateRiskScore = () => {
    let riskScore = 50 // 기본 위험도

    // 인증 레벨에 따른 위험도 감소
    if (formData.verificationLevel === "enhanced") riskScore -= 15
    if (formData.verificationLevel === "premium") riskScore -= 25

    // 휴대폰/이메일 인증에 따른 위험도 감소
    if (phoneVerified) riskScore -= 10
    if (emailVerified) riskScore -= 5

    // 신뢰할 수 있는 거래소 사용 시 위험도 감소
    const exchange = trustedExchanges.find((e) => e.value === formData.trustedExchange)
    if (exchange?.trustLevel === "high") riskScore -= 15
    else if (exchange?.trustLevel === "medium") riskScore -= 10

    // 증빙 자료 개수에 따른 위험도 감소
    riskScore -= Math.min(proofImages.length * 3, 15)

    return Math.max(0, Math.min(100, riskScore))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.assetAmount || proofImages.length === 0) {
      alert("자산 금액과 증빙 자료를 모두 입력해주세요.")
      return
    }

    if (formData.verificationLevel !== "basic" && !phoneVerified) {
      alert("강화/프리미엄 인증은 휴대폰 인증이 필요합니다.")
      return
    }

    // 유료 인증의 경우 결제 모달 표시
    if (formData.verificationLevel !== "basic") {
      setShowPaymentModal(true)
      return
    }

    // 무료 인증은 바로 진행
    const verification: Omit<AssetVerification, "id" | "submittedAt" | "expiresAt"> = {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      assetAmount: Number(formData.assetAmount),
      assetCurrency: formData.assetCurrency,
      proofImages,
      proofDescription: formData.proofDescription,
      status: "pending",
      isPublic: formData.isPublic,
      verificationLevel: formData.verificationLevel,
      kycStatus: formData.verificationLevel === "premium" ? "pending" : "none",
      phoneVerified,
      emailVerified,
      documentType: formData.documentType,
      riskScore: calculateRiskScore(),
      fraudFlags: [],
      reviewHistory: [],
      renewalCount: 0,
      trustedSources: formData.trustedExchange ? [formData.trustedExchange] : [],
    }

    onSubmit(verification)
    onClose()
  }

  const handlePaymentComplete = () => {
    setShowPaymentModal(false)

    const verification: Omit<AssetVerification, "id" | "submittedAt" | "expiresAt"> = {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      assetAmount: Number(formData.assetAmount),
      assetCurrency: formData.assetCurrency,
      proofImages,
      proofDescription: formData.proofDescription,
      status: "pending",
      isPublic: formData.isPublic,
      verificationLevel: formData.verificationLevel,
      kycStatus: formData.verificationLevel === "premium" ? "pending" : "none",
      phoneVerified,
      emailVerified,
      documentType: formData.documentType,
      riskScore: calculateRiskScore(),
      fraudFlags: [],
      reviewHistory: [],
      renewalCount: 0,
      trustedSources: formData.trustedExchange ? [formData.trustedExchange] : [],
    }

    onSubmit(verification)
    onClose()
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center px-6 py-8">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">인증 레벨 선택</h3>
              <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
                신뢰도와 혜택에 따라 인증 레벨을 선택하세요
              </p>
            </div>

            <div className="space-y-4">
              {verificationLevels.map((level) => {
                const Icon = level.icon
                return (
                  <div
                    key={level.level}
                    onClick={() => setFormData({ ...formData, verificationLevel: level.level as any })}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.verificationLevel === level.level ? level.color : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-6 w-6" />
                        <div>
                          <h4 className="font-bold text-lg">{level.name}</h4>
                          <p className="text-sm opacity-75">신뢰도: {level.trustScore}점</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg flex items-center space-x-1">
                          {level.level !== "basic" && <CreditCard className="h-4 w-4" />}
                          <span>{level.price}</span>
                        </div>
                        <div className="text-sm opacity-75">{level.badge} 배지</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{level.description}</p>
                    <ul className="space-y-1">
                      {level.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {level.level !== "basic" && (
                      <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-700">
                        💡 <strong>수수료 용도:</strong> AI 분석, 전문 검토, 보안 시스템 운영비
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center px-6 py-8">
              <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">신원 인증</h3>
              <p className="text-gray-600 leading-relaxed max-w-md mx-auto">보안을 위해 본인 인증을 진행합니다</p>
            </div>

            {/* 이메일 인증 */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">이메일 인증</span>
                  {emailVerified && <CheckCircle className="h-5 w-5 text-green-600" />}
                </div>
                {!emailVerified && (
                  <Button onClick={sendEmailVerification} size="sm" variant="outline">
                    {emailCodeSent ? "재발송" : "인증번호 발송"}
                  </Button>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3">{user.email}</p>
              {emailCodeSent && !emailVerified && (
                <div className="space-y-3">
                  <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                    ✅ 인증번호가 발송되었습니다. (데모: 654321)
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={emailCode}
                      onChange={(e) => setEmailCode(e.target.value)}
                      placeholder="인증번호 입력 (654321)"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button onClick={verifyEmailCode} size="sm">
                      확인
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* 휴대폰 인증 (강화/프리미엄만) */}
            {formData.verificationLevel !== "basic" && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">휴대폰 인증</span>
                    {phoneVerified && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </div>
                  {!phoneVerified && formData.phoneNumber && (
                    <Button onClick={sendPhoneVerification} size="sm" variant="outline">
                      {phoneCodeSent ? "재발송" : "인증번호 발송"}
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="휴대폰 번호 입력 (010-1234-5678)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {phoneCodeSent && !phoneVerified && (
                    <div className="space-y-3">
                      <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                        ✅ 인증번호가 발송되었습니다. (데모: 123456)
                      </div>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={phoneCode}
                          onChange={(e) => setPhoneCode(e.target.value)}
                          placeholder="인증번호 입력 (123456)"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Button onClick={verifyPhoneCode} size="sm">
                          확인
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center px-6 py-8">
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">자산 정보 입력</h3>
              <p className="text-gray-600 leading-relaxed max-w-md mx-auto">정확한 자산 정보를 입력해주세요</p>
            </div>

            {/* 거래소 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">주 거래소</label>
              <div className="grid grid-cols-2 gap-3">
                {trustedExchanges.map((exchange) => (
                  <div
                    key={exchange.value}
                    onClick={() => setFormData({ ...formData, trustedExchange: exchange.value })}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.trustedExchange === exchange.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{exchange.logo}</span>
                      <div>
                        <div className="font-medium">{exchange.name}</div>
                        <div className="text-xs text-gray-500">
                          신뢰도:{" "}
                          {exchange.trustLevel === "high" ? "높음" : exchange.trustLevel === "medium" ? "보통" : "낮음"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 자산 금액 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">자산 금액</label>
              <div className="flex space-x-3">
                <input
                  type="number"
                  value={formData.assetAmount}
                  onChange={(e) => setFormData({ ...formData, assetAmount: e.target.value })}
                  placeholder="자산 금액을 입력하세요"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min="0"
                />
                <select
                  value={formData.assetCurrency}
                  onChange={(e) => setFormData({ ...formData, assetCurrency: e.target.value as any })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="KRW">원 (KRW)</option>
                  <option value="USD">달러 (USD)</option>
                  <option value="BTC">비트코인 (BTC)</option>
                  <option value="ETH">이더리움 (ETH)</option>
                </select>
              </div>
            </div>

            {/* 증빙 방법 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">증빙 방법</label>
              <div className="space-y-2">
                {[
                  { value: "screenshot", label: "스크린샷", icon: Camera, desc: "거래소 잔고 화면 캡처" },
                  { value: "statement", label: "거래 내역서", icon: FileText, desc: "공식 거래 내역 문서" },
                  { value: "api_connection", label: "API 연동", icon: LinkIcon, desc: "거래소 API 직접 연결" },
                  { value: "video_proof", label: "영상 인증", icon: Video, desc: "실시간 화면 녹화" },
                ].map((method) => {
                  const Icon = method.icon
                  return (
                    <div
                      key={method.value}
                      onClick={() => setFormData({ ...formData, documentType: method.value as any })}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.documentType === method.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">{method.label}</div>
                          <div className="text-sm text-gray-500">{method.desc}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center px-6 py-8">
              <Upload className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">증빙 자료 업로드</h3>
              <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
                선택한 방법에 따라 증빙 자료를 업로드하세요
              </p>
            </div>

            {/* 업로드 가이드 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <h4 className="font-medium text-yellow-800 mb-1">📋 업로드 가이드</h4>
                  <ul className="text-yellow-700 space-y-1">
                    <li>• 개인정보는 가려서 업로드해주세요 (계좌번호, 주민번호 등)</li>
                    <li>• 선명하고 읽기 쉬운 이미지로 업로드해주세요</li>
                    <li>• 여러 각도나 다른 시점의 증빙자료를 제공하면 신뢰도가 높아집니다</li>
                    <li>• 최신 날짜의 자료를 업로드해주세요 (7일 이내 권장)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 파일 업로드 */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="proof-upload"
                disabled={uploading}
              />
              <label htmlFor="proof-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">{uploading ? "업로드 중..." : "증빙 자료를 업로드하세요"}</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG 파일 지원 (최대 10개, 각 5MB 이하)</p>
              </label>
            </div>

            {/* 업로드된 이미지 */}
            {proofImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {proofImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`증빙자료 ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => setProofImages((prev) => prev.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 추가 설명 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">추가 설명 (선택)</label>
              <textarea
                value={formData.proofDescription}
                onChange={(e) => setFormData({ ...formData, proofDescription: e.target.value })}
                placeholder="자산 구성이나 특별한 사항이 있다면 설명해주세요"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                maxLength={1000}
              />
              <div className="text-xs text-gray-500 mt-1">{formData.proofDescription.length}/1000</div>
            </div>

            {/* 공개 설정 */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isPublic"
                checked={formData.isPublic}
                onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label htmlFor="isPublic" className="text-sm text-gray-700">
                다른 사용자에게 인증된 자산 금액 공개 (닉네임 옆에 배지 표시)
              </label>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.verificationLevel !== ""
      case 2:
        return emailVerified && (formData.verificationLevel === "basic" || phoneVerified)
      case 3:
        return formData.assetAmount && formData.trustedExchange
      case 4:
        return proofImages.length > 0
      default:
        return false
    }
  }

  const riskScore = calculateRiskScore()
  const trustScore = 100 - riskScore

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto mx-auto my-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <span>강화된 자산 인증</span>
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* 진행 단계 */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>인증 레벨</span>
              <span>신원 확인</span>
              <span>자산 정보</span>
              <span>증빙 자료</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {renderStepContent()}

            {/* 신뢰도 점수 표시 */}
            {currentStep > 1 && (
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">예상 신뢰도 점수</span>
                  <span className="text-2xl font-bold text-green-600">{trustScore}점</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${trustScore}%` }}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  높은 신뢰도는 커뮤니티에서 더 많은 신뢰를 받을 수 있습니다
                </div>
              </div>
            )}

            {/* 버튼 */}
            <div className="flex justify-between pt-6 border-t border-gray-200 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => (currentStep > 1 ? setCurrentStep(currentStep - 1) : onClose())}
              >
                {currentStep > 1 ? "이전" : "취소"}
              </Button>

              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceedToNext()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  다음 <Zap className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                  disabled={!canProceedToNext() || uploading}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  {formData.verificationLevel === "basic" ? "무료 신청" : "결제 후 신청"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* 결제 모달 */}
      <PaymentInfoModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        verificationLevel={formData.verificationLevel}
        onPaymentComplete={handlePaymentComplete}
      />
    </>
  )
}
