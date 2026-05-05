"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useUserPoints } from "@/hooks/use-user-points"
import { UserLevelDisplay } from "@/components/user-level/user-level-display"
import { MissionsPanel } from "@/components/user-level/missions-panel"
import { ReferralPanel } from "@/components/user-level/referral-panel"
import { PointsHistory } from "@/components/user-level/points-history"
import { LevelBenefitsModal } from "@/components/user-level/level-benefits-modal"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Target, Users, History, LogIn } from "lucide-react"
import { LoginModal } from "@/components/auth/login-modal"

export default function LevelsPage() {
  const { user, isAuthenticated } = useAuth()
  const { userPoints, missions, pointsHistory, loading, completeMission } = useUserPoints(user?.id)
  const [showBenefitsModal, setShowBenefitsModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Card>
                <CardContent className="p-8">
                  <div className="mb-6">
                    <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
                    <h1 className="text-3xl font-bold mb-2">등급 시스템</h1>
                    <p className="text-gray-600">미션을 완료하고 친구를 초대하여 등급을 올려보세요!</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-amber-50 rounded-lg">
                      <div className="text-2xl mb-1">🥉</div>
                      <div className="text-sm font-medium">브론즈</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl mb-1">🥈</div>
                      <div className="text-sm font-medium">실버</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <div className="text-2xl mb-1">🥇</div>
                      <div className="text-sm font-medium">골드</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl mb-1">👑</div>
                      <div className="text-sm font-medium">마스터</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <LogIn className="h-5 w-5" />
                    <span>로그인하고 시작하기</span>
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse mx-auto mb-4"></div>
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
              <div className="w-48 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg">
                  <div className="w-24 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="space-y-3">
                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!userPoints) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="p-8">
                <Trophy className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h1 className="text-2xl font-bold mb-2">데이터를 불러올 수 없습니다</h1>
                <p className="text-gray-600">잠시 후 다시 시도해주세요.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* 헤더 */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2">등급 시스템</h1>
              <p className="text-gray-600">미션을 완료하고 친구를 초대하여 등급을 올려보세요!</p>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* 등급 정보 */}
              <div className="lg:col-span-1">
                <UserLevelDisplay userPoints={userPoints} onShowBenefits={() => setShowBenefitsModal(true)} />
              </div>

              {/* 탭 콘텐츠 */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="missions" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="missions" className="flex items-center space-x-1">
                      <Target className="h-4 w-4" />
                      <span>미션</span>
                    </TabsTrigger>
                    <TabsTrigger value="referral" className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>친구초대</span>
                    </TabsTrigger>
                    <TabsTrigger value="history" className="flex items-center space-x-1">
                      <History className="h-4 w-4" />
                      <span>내역</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="missions" className="mt-4">
                    <MissionsPanel missions={missions || []} onCompleteMission={completeMission} />
                  </TabsContent>

                  <TabsContent value="referral" className="mt-4">
                    <ReferralPanel userPoints={userPoints} />
                  </TabsContent>

                  <TabsContent value="history" className="mt-4">
                    <PointsHistory pointsHistory={pointsHistory || []} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 */}
      <LevelBenefitsModal
        isOpen={showBenefitsModal}
        onClose={() => setShowBenefitsModal(false)}
        currentLevel={userPoints?.currentLevel}
        totalPoints={userPoints?.totalPoints || 0}
      />
    </>
  )
}
