"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { User, Mail, Calendar, Trophy, Shield, CheckCircle } from "lucide-react"
import type { UserPoints } from "@/types/user-level"
import { AssetVerificationModal } from "@/components/asset-verification/asset-verification-modal"
import { useAssetVerification } from "@/hooks/use-asset-verification"

interface UserProfileModalProps {
  isOpen: boolean
  onClose: () => void
  user: {
    id: string
    name: string
    email: string
    avatar?: string
    createdAt: string
  }
  userPoints?: UserPoints | null
}

export function UserProfileModal({ isOpen, onClose, user, userPoints }: UserProfileModalProps) {
  const { updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  })
  const [showAssetVerification, setShowAssetVerification] = useState(false)

  const { verificationStatus, isLoading: verificationLoading } = useAssetVerification(user.id)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await updateProfile(formData)
      setIsEditing(false)
      alert("프로필이 업데이트되었습니다!")
    } catch (error) {
      alert("프로필 업데이트 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
    })
    setIsEditing(false)
  }

  const handleAssetVerification = () => {
    onClose() // 프로필 모달을 먼저 닫기
    setTimeout(() => {
      setShowAssetVerification(true) // 약간의 딜레이 후 자산 인증 모달 열기
    }, 100)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const completedReferrals = userPoints?.referrals?.filter((r) => r.status === "completed").length || 0
  const totalReferralPoints =
    userPoints?.referrals?.reduce((sum, r) => sum + (r.status === "completed" ? r.pointsEarned : 0), 0) || 0

  // LocalStorage에서 승인된 요청 확인
  const approvedRequests = JSON.parse(localStorage.getItem("asset_verifications") || "[]")
  const userApprovedRequest = approvedRequests.find((req: any) => req.userId === user.id && req.status === "approved")

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>프로필</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* 프로필 이미지 및 기본 정보 */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>

              {userPoints && (
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-2xl">{userPoints.currentLevel.icon}</span>
                    <span className={`font-bold text-lg ${userPoints.currentLevel.color}`}>
                      {userPoints.currentLevel.name}
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {userPoints.totalPoints.toLocaleString()} 포인트
                  </Badge>
                </div>
              )}
            </div>

            {/* 사용자 정보 */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>이름</span>
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded border">{user.name}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>이메일</span>
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded border">{user.email}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>가입일</span>
                </Label>
                <div className="p-2 bg-gray-50 rounded border">{formatDate(user.createdAt)}</div>
              </div>
            </div>

            {/* 활동 통계 */}
            {userPoints && (
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center space-x-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span>활동 통계</span>
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{completedReferrals}</div>
                    <div className="text-sm text-gray-600">성공한 초대</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{totalReferralPoints.toLocaleString()}P</div>
                    <div className="text-sm text-gray-600">초대 보상</div>
                  </div>
                </div>
              </div>
            )}

            {/* 자산 인증 상태 */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center space-x-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>자산 인증</span>
              </h3>
              <div className="p-3 bg-gray-50 rounded-lg">
                {userApprovedRequest || verificationStatus?.isVerified ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600 font-medium">인증 완료</span>
                      {userApprovedRequest && (
                        <Badge variant="secondary" className="ml-2">
                          {userApprovedRequest.verificationLevel === "basic"
                            ? "기본 인증"
                            : userApprovedRequest.verificationLevel === "enhanced"
                              ? "강화 인증"
                              : "프리미엄 인증"}
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {userApprovedRequest?.reviewedAt &&
                        new Date(userApprovedRequest.reviewedAt).toLocaleDateString("ko-KR")}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">미인증</span>
                    </div>
                    <Button onClick={handleAssetVerification} size="sm" variant="outline">
                      인증하기
                    </Button>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  자산을 인증하면 더 높은 신뢰도와 특별 혜택을 받을 수 있습니다.
                </p>
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} disabled={isLoading} className="flex-1">
                    {isLoading ? "저장 중..." : "저장"}
                  </Button>
                  <Button onClick={handleCancel} variant="outline" className="flex-1 bg-transparent">
                    취소
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="w-full">
                  프로필 수정
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 자산 인증 모달 - 별도로 렌더링 */}
      <AssetVerificationModal isOpen={showAssetVerification} onClose={() => setShowAssetVerification(false)} />
    </>
  )
}
