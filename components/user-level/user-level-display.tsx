"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Gift, Users } from "lucide-react"
import type { UserPoints } from "@/hooks/use-user-points"

interface UserLevelDisplayProps {
  userPoints: UserPoints
  onShowBenefits: () => void
}

export function UserLevelDisplay({ userPoints, onShowBenefits }: UserLevelDisplayProps) {
  if (!userPoints || !userPoints.currentLevel) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse mx-auto mb-4"></div>
            <div className="w-24 h-6 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { currentLevel, nextLevel, totalPoints = 0, referrals = [] } = userPoints

  const progressPercentage =
    nextLevel && currentLevel
      ? ((totalPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
      : 100

  const pointsToNextLevel = nextLevel && currentLevel ? nextLevel.minPoints - totalPoints : 0

  const completedReferrals = referrals.filter((r) => r.status === "completed").length || 0
  const totalReferralPoints =
    referrals.reduce((sum, r) => sum + (r.status === "completed" ? r.pointsEarned || 0 : 0), 0) || 0

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span>내 등급</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 현재 등급 */}
        <div className="text-center">
          <div className="text-6xl mb-2">{currentLevel.icon}</div>
          <h2 className={`text-2xl font-bold`} style={{ color: currentLevel.color }}>
            {currentLevel.name}
          </h2>
          <p className="text-gray-600 mt-1">총 {totalPoints.toLocaleString()} 포인트</p>
        </div>

        {/* 다음 등급까지 진행도 */}
        {nextLevel && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>다음 등급까지</span>
              <span className="font-medium">{pointsToNextLevel.toLocaleString()}P 남음</span>
            </div>
            <Progress value={Math.min(Math.max(progressPercentage, 0), 100)} className="h-3" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{currentLevel.name}</span>
              <span>{nextLevel.name}</span>
            </div>
          </div>
        )}

        {/* 등급 혜택 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-500" />
              등급 혜택
            </h3>
            <button onClick={onShowBenefits} className="text-sm text-blue-600 hover:text-blue-800">
              전체 보기
            </button>
          </div>
          <div className="space-y-1">
            {currentLevel.benefits && currentLevel.benefits.length > 0 ? (
              <>
                {currentLevel.benefits.slice(0, 3).map((benefit, index) => (
                  <Badge key={index} variant="secondary" className="mr-1 mb-1 text-xs">
                    {benefit}
                  </Badge>
                ))}
                {currentLevel.benefits.length > 3 && (
                  <p className="text-xs text-gray-500">+{currentLevel.benefits.length - 3}개 더...</p>
                )}
              </>
            ) : (
              <p className="text-sm text-gray-500">혜택 정보를 불러오는 중...</p>
            )}
          </div>
        </div>

        {/* 친구 초대 현황 */}
        <div>
          <h3 className="font-semibold mb-2 flex items-center">
            <Users className="h-4 w-4 mr-1 text-blue-500" />
            친구 초대 현황
          </h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{completedReferrals}</div>
              <div className="text-sm text-gray-600">성공한 초대</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{totalReferralPoints.toLocaleString()}P</div>
              <div className="text-sm text-gray-600">초대 보상</div>
            </div>
          </div>
        </div>

        {/* 다음 등급 미리보기 */}
        {nextLevel && (
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2 flex items-center">
              <Gift className="h-4 w-4 mr-1 text-purple-500" />
              다음 등급: {nextLevel.name}
            </h3>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl">{nextLevel.icon}</span>
              <div>
                <p className="font-medium" style={{ color: nextLevel.color }}>
                  {nextLevel.name}
                </p>
                <p className="text-sm text-gray-600">{nextLevel.minPoints.toLocaleString()}P부터</p>
              </div>
            </div>
            {nextLevel.benefits && nextLevel.benefits.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                <p>새로운 혜택: {nextLevel.benefits[nextLevel.benefits.length - 1]}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
