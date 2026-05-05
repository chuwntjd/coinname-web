"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Crown, Gift } from "lucide-react"
import { USER_LEVELS } from "@/utils/user-levels"
import type { UserLevel } from "@/types/user-level"

interface LevelBenefitsModalProps {
  isOpen: boolean
  onClose: () => void
  currentLevel?: UserLevel
  totalPoints: number
}

export function LevelBenefitsModal({ isOpen, onClose, currentLevel, totalPoints }: LevelBenefitsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            <span>등급별 혜택 안내</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {USER_LEVELS.map((level) => {
            const isCurrentLevel = currentLevel?.id === level.id
            const isUnlocked = totalPoints >= level.minPoints

            return (
              <Card
                key={level.id}
                className={`${
                  isCurrentLevel
                    ? "ring-2 ring-blue-500 bg-blue-50"
                    : isUnlocked
                      ? "bg-green-50"
                      : "bg-gray-50 opacity-60"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{level.icon}</span>
                      <div>
                        <h3 className="font-bold text-lg" style={{ color: level.color }}>
                          {level.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {level.minPoints.toLocaleString()}P ~{" "}
                          {level.maxPoints === 999999 ? "∞" : level.maxPoints.toLocaleString()}P
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isCurrentLevel && (
                        <Badge variant="default" className="bg-blue-600">
                          현재 등급
                        </Badge>
                      )}
                      {isUnlocked && !isCurrentLevel && (
                        <Badge variant="secondary" className="bg-green-600 text-white">
                          달성 완료
                        </Badge>
                      )}
                      {!isUnlocked && (
                        <Badge variant="outline" className="text-gray-500">
                          미달성
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* 등급 혜택 */}
                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        등급 혜택
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {level.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 초대 보너스 */}
                    <div className="border-t pt-3">
                      <h4 className="font-medium text-sm mb-2 flex items-center">
                        <Gift className="h-4 w-4 mr-1 text-purple-500" />
                        초대 보너스
                      </h4>
                      <div className="bg-white p-3 rounded border">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">친구 초대 시 추가 보너스:</span>
                          <Badge variant="secondary" className="font-bold">
                            +{level.referralBonus}P
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          기본 500P + 등급 보너스 {level.referralBonus}P = 총{" "}
                          {(500 + level.referralBonus).toLocaleString()}P
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">💡 등급 올리는 방법</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 매일 로그인하여 일일 미션 완료</li>
            <li>• 커뮤니티 활동 (게시글 작성, 댓글, 채팅 참여)</li>
            <li>• 친구 초대하여 추가 포인트 획득</li>
            <li>• 특별 이벤트 및 미션 참여</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
