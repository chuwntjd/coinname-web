"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Share2, Users, Gift, CheckCircle, Clock, XCircle } from "lucide-react"
import type { UserPoints } from "@/hooks/use-user-points"

interface ReferralPanelProps {
  userPoints: UserPoints
}

export function ReferralPanel({ userPoints }: ReferralPanelProps) {
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const handleCopyCode = async () => {
    if (userPoints.referralCode) {
      await navigator.clipboard.writeText(userPoints.referralCode)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    }
  }

  const handleCopyLink = async () => {
    const referralLink = `${window.location.origin}?ref=${userPoints.referralCode}`
    await navigator.clipboard.writeText(referralLink)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const handleShare = async () => {
    const referralLink = `${window.location.origin}?ref=${userPoints.referralCode}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: "코인네임에 초대합니다!",
          text: "코인네임에서 함께 암호화폐 정보를 공유해요!",
          url: referralLink,
        })
      } catch (error) {
        console.log("공유 취소됨")
      }
    } else {
      handleCopyLink()
    }
  }

  const completedReferrals = userPoints.referrals?.filter((r) => r.status === "completed").length || 0
  const pendingReferrals = userPoints.referrals?.filter((r) => r.status === "pending").length || 0
  const totalEarned = userPoints.referrals?.reduce((sum, r) => sum + (r.pointsEarned || 0), 0) || 0

  return (
    <div className="space-y-6">
      {/* 초대 코드 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-500" />
            <span>내 초대 코드</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input value={userPoints.referralCode || ""} readOnly className="font-mono text-lg text-center" />
            <Button onClick={handleCopyCode} variant="outline" size="icon">
              {copiedCode ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleCopyLink} variant="outline" className="flex-1 bg-transparent">
              {copiedLink ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  링크 복사됨
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  링크 복사
                </>
              )}
            </Button>
            <Button onClick={handleShare} className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              공유하기
            </Button>
          </div>

          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
            <p className="font-medium mb-1">💡 초대 방법</p>
            <p>친구에게 초대 코드나 링크를 공유하고, 회원가입 시 코드를 입력하게 하세요!</p>
          </div>
        </CardContent>
      </Card>

      {/* 초대 현황 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gift className="h-5 w-5 text-green-500" />
            <span>초대 현황</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{completedReferrals}</div>
              <div className="text-sm text-gray-600">성공한 초대</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{pendingReferrals}</div>
              <div className="text-sm text-gray-600">대기 중</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{totalEarned.toLocaleString()}P</div>
              <div className="text-sm text-gray-600">총 획득</div>
            </div>
          </div>

          {/* 초대 내역 */}
          {userPoints.referrals && userPoints.referrals.length > 0 ? (
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700">최근 초대 내역</h4>
              {userPoints.referrals.slice(0, 5).map((referral, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs">
                      {referral.referredUser?.charAt(0) || "?"}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{referral.referredUser || "익명"}</p>
                      <p className="text-xs text-gray-500">{new Date(referral.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        referral.status === "completed"
                          ? "default"
                          : referral.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {referral.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {referral.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                      {referral.status === "failed" && <XCircle className="h-3 w-3 mr-1" />}
                      {referral.status === "completed" ? "완료" : referral.status === "pending" ? "대기" : "실패"}
                    </Badge>
                    {referral.pointsEarned && referral.pointsEarned > 0 && (
                      <span className="text-sm font-medium text-green-600">+{referral.pointsEarned}P</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>아직 초대한 친구가 없습니다</p>
              <p className="text-sm">친구를 초대하고 포인트를 받아보세요!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 초대 보상 안내 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">초대 보상 안내</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>기본 초대 보상:</span>
            <span className="font-medium">500P</span>
          </div>
          <div className="flex justify-between">
            <span>등급 보너스 ({userPoints.currentLevel.name}):</span>
            <span className="font-medium">+{userPoints.currentLevel.referralBonus}P</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-medium">총 초대 보상:</span>
            <span className="font-bold text-green-600">
              {(500 + userPoints.currentLevel.referralBonus).toLocaleString()}P
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
