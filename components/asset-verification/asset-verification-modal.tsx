"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Shield, Upload, AlertTriangle, CheckCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface AssetVerificationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AssetVerificationModal({ isOpen, onClose }: AssetVerificationModalProps) {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    assetAmount: "",
    assetType: "cryptocurrency",
    description: "",
    documents: [] as File[],
  })

  if (!isOpen || !user) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 자산 인증 신청 처리 (시뮬레이션)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 관리자 패널과 동일한 키로 저장
      const verificationRequest = {
        id: `req_${Date.now()}`,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        assetAmount: Number.parseInt(formData.assetAmount),
        assetCurrency: "KRW",
        assetType: formData.assetType,
        proofDescription: formData.description,
        proofImages: formData.documents.map((file) => URL.createObjectURL(file)),
        isPublic: true,
        status: "pending",
        submittedAt: new Date(),
        adminNotes: [],
        reviewHistory: [],
        verificationLevel: "basic",
        kycStatus: "none",
        phoneVerified: false,
        emailVerified: false,
        documentType: "screenshot",
        riskScore: 0,
        fraudFlags: [],
        renewalCount: 0,
        trustedSources: [],
      }

      // asset_verifications 키로 저장 (관리자 패널과 동일)
      const existingVerifications = JSON.parse(localStorage.getItem("asset_verifications") || "[]")
      existingVerifications.push(verificationRequest)
      localStorage.setItem("asset_verifications", JSON.stringify(existingVerifications))

      alert("자산 인증 신청이 완료되었습니다. 검토 후 연락드리겠습니다.")
      onClose()
      setFormData({
        assetAmount: "",
        assetType: "cryptocurrency",
        description: "",
        documents: [],
      })
    } catch (error) {
      alert("신청 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setFormData({
        ...formData,
        documents: Array.from(files),
      })
    }
  }

  const handleFileButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] min-h-screen">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto m-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl">
          <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span>자산 인증 신청</span>
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 안내 메시지 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <h4 className="font-medium text-blue-800 mb-1">자산 인증 혜택</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• 신뢰도 배지 획득으로 커뮤니티 내 신뢰성 향상</li>
                  <li>• VIP 전용 채널 및 고급 정보 접근</li>
                  <li>• 전문가 1:1 상담 우선 예약</li>
                  <li>• 특별 이벤트 및 에어드랍 우선 참여</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 자산 유형 */}
          <div className="space-y-2">
            <Label htmlFor="assetType">자산 유형</Label>
            <select
              id="assetType"
              name="assetType"
              value={formData.assetType}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="cryptocurrency">암호화폐</option>
              <option value="stocks">주식</option>
              <option value="real_estate">부동산</option>
              <option value="bonds">채권</option>
              <option value="commodities">원자재</option>
              <option value="other">기타</option>
            </select>
          </div>

          {/* 자산 규모 */}
          <div className="space-y-2">
            <Label htmlFor="assetAmount">자산 규모 (원)</Label>
            <Input
              id="assetAmount"
              name="assetAmount"
              type="number"
              placeholder="예: 50000000 (5천만원)"
              value={formData.assetAmount}
              onChange={handleInputChange}
              className="text-lg"
              required
              min="1000000"
            />
            <p className="text-xs text-gray-500">최소 100만원 이상의 자산만 인증 가능합니다.</p>
          </div>

          {/* 상세 설명 */}
          <div className="space-y-2">
            <Label htmlFor="description">자산 상세 설명</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="보유 자산의 구성, 투자 기간, 투자 전략 등을 상세히 설명해주세요"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* 증빙 서류 업로드 */}
          <div className="space-y-2">
            <Label>증빙 서류</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">증빙 서류를 업로드하세요</p>
              <p className="text-xs text-gray-500">거래소 잔고 증명서, 계좌 잔고 증명서, 부동산 등기부등본 등</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 bg-transparent"
                onClick={handleFileButtonClick}
              >
                파일 선택
              </Button>
            </div>
            {formData.documents.length > 0 && (
              <div className="text-sm text-green-600">
                {formData.documents.length}개 파일이 선택되었습니다.
                <ul className="mt-1 text-xs">
                  {formData.documents.map((file, index) => (
                    <li key={index}>• {file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 주의사항 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <h4 className="font-medium text-yellow-800 mb-1">주의사항</h4>
                <ul className="text-yellow-700 space-y-1">
                  <li>• 개인정보는 가려서 제출해주세요 (계좌번호, 주민번호 등)</li>
                  <li>• 허위 정보 제출 시 계정 제재를 받을 수 있습니다</li>
                  <li>• 인증 심사는 영업일 기준 3-5일 소요됩니다</li>
                  <li>• 추가 서류 요청 시 빠른 제출 부탁드립니다</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="flex space-x-3 sticky bottom-0 bg-white pt-4 border-t border-gray-200 -mx-6 px-6 -mb-6 pb-6">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              취소
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.assetAmount}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  <span>신청 중...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>인증 신청</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
