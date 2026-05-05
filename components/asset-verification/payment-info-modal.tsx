"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, CreditCard, Shield, CheckCircle, AlertCircle } from "lucide-react"

interface PaymentInfoModalProps {
  isOpen: boolean
  onClose: () => void
  verificationLevel: string
  onPaymentComplete: () => void
}

export function PaymentInfoModal({ isOpen, onClose, verificationLevel, onPaymentComplete }: PaymentInfoModalProps) {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)

  if (!isOpen) return null

  const levelInfo = {
    enhanced: {
      name: "강화 인증",
      price: "₩5,000",
      features: ["거래소 API 연동", "휴대폰 인증", "거래 내역 확인", "60일 유효"],
    },
    premium: {
      name: "프리미엄 인증",
      price: "₩15,000",
      features: ["실시간 영상 인증", "KYC 신원확인", "다중 거래소 연동", "90일 유효", "우선 검토"],
    },
  }

  const currentLevel = levelInfo[verificationLevel as keyof typeof levelInfo]

  const handlePayment = async () => {
    setIsProcessing(true)

    // 결제 처리 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setPaymentComplete(true)

    // 2초 후 완료 처리
    setTimeout(() => {
      onPaymentComplete()
    }, 2000)
  }

  if (paymentComplete) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
        <div className="bg-white rounded-xl w-full max-w-md mx-auto">
          <div className="p-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">결제 완료!</h3>
            <p className="text-gray-600 mb-4">{currentLevel?.name} 결제가 성공적으로 완료되었습니다.</p>
            <p className="text-sm text-gray-500">잠시 후 인증 절차가 진행됩니다...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-xl w-full max-w-md mx-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <CreditCard className="h-6 w-6 text-blue-600" />
            <span>결제 정보</span>
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* 주문 정보 */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">{currentLevel?.name}</h3>
            <ul className="space-y-1 text-sm text-gray-600 mb-3">
              {currentLevel?.features.map((feature, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="font-medium">총 결제 금액</span>
              <span className="text-xl font-bold text-blue-600">{currentLevel?.price}</span>
            </div>
          </div>

          {/* 결제 방법 */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">결제 방법</h3>
            <div className="space-y-2">
              {[
                { id: "card", name: "신용카드", icon: "💳" },
                { id: "kakao", name: "카카오페이", icon: "💛" },
                { id: "toss", name: "토스페이", icon: "💙" },
                { id: "bank", name: "계좌이체", icon: "🏦" },
              ].map((method) => (
                <div
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === method.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{method.icon}</span>
                    <span className="font-medium">{method.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 주의사항 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <h4 className="font-medium text-yellow-800 mb-1">결제 전 확인사항</h4>
                <ul className="text-yellow-700 space-y-1">
                  <li>• 결제 후 즉시 인증 검토가 시작됩니다</li>
                  <li>• 허위 정보 제공 시 환불이 불가능합니다</li>
                  <li>• 인증 완료까지 1-3일 소요됩니다</li>
                  <li>• 문의사항은 고객센터로 연락해주세요</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 결제 버튼 */}
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                <span>결제 처리 중...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>{currentLevel?.price} 결제하기</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
