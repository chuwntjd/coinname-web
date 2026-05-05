"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, CheckCircle, Star, Users, MessageSquare, Calendar } from "lucide-react"
import type { Mission } from "@/hooks/use-user-points"

interface MissionsPanelProps {
  missions: Mission[]
  onCompleteMission: (missionId: string) => void
}

export function MissionsPanel({ missions, onCompleteMission }: MissionsPanelProps) {
  const completedMissions = missions.filter((m) => m.completed).length
  const totalMissions = missions.length
  const completionRate = totalMissions > 0 ? (completedMissions / totalMissions) * 100 : 0

  const getMissionIcon = (category: string) => {
    switch (category) {
      case "social":
        return <Users className="h-4 w-4" />
      case "community":
        return <MessageSquare className="h-4 w-4" />
      case "referral":
        return <Users className="h-4 w-4" />
      case "trading":
        return <Star className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const getMissionTypeColor = (type: string) => {
    switch (type) {
      case "daily":
        return "bg-blue-100 text-blue-800"
      case "weekly":
        return "bg-green-100 text-green-800"
      case "special":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMissionTypeLabel = (type: string) => {
    switch (type) {
      case "daily":
        return "일일"
      case "weekly":
        return "주간"
      case "special":
        return "특별"
      default:
        return "기타"
    }
  }

  return (
    <div className="space-y-6">
      {/* 미션 진행률 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-500" />
            <span>미션 진행률</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>완료된 미션</span>
              <span className="font-medium">
                {completedMissions} / {totalMissions}
              </span>
            </div>
            <Progress value={completionRate} className="h-2" />
            <p className="text-xs text-gray-600 text-center">{completionRate.toFixed(1)}% 완료</p>
          </div>
        </CardContent>
      </Card>

      {/* 미션 목록 */}
      <div className="space-y-4">
        {missions.length > 0 ? (
          missions.map((mission) => (
            <Card key={mission.id} className={mission.completed ? "bg-green-50 border-green-200" : ""}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`p-2 rounded-full ${mission.completed ? "bg-green-100" : "bg-gray-100"}`}>
                      {mission.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        getMissionIcon(mission.category)
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`font-medium ${mission.completed ? "text-green-800" : ""}`}>{mission.name}</h3>
                        <Badge className={`text-xs ${getMissionTypeColor(mission.type)}`}>
                          {getMissionTypeLabel(mission.type)}
                        </Badge>
                      </div>
                      <p className={`text-sm ${mission.completed ? "text-green-700" : "text-gray-600"}`}>
                        {mission.description}
                      </p>
                      {mission.completed && mission.completedAt && (
                        <p className="text-xs text-green-600 mt-1 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(mission.completedAt).toLocaleDateString()} 완료
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-sm font-medium">
                      {mission.points}P
                    </Badge>
                    {!mission.completed && (
                      <Button size="sm" onClick={() => onCompleteMission(mission.id)} className="text-xs">
                        완료
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Target className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">미션이 없습니다</h3>
              <p className="text-gray-600">새로운 미션이 곧 추가될 예정입니다.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 미션 완료 팁 */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center">
            <Star className="h-4 w-4 mr-1" />
            미션 완료 팁
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 매일 로그인하여 일일 미션을 완료하세요</li>
            <li>• 커뮤니티에 적극적으로 참여해보세요</li>
            <li>• 친구를 초대하여 특별 보상을 받으세요</li>
            <li>• 실시간 채팅에 참여하여 포인트를 획득하세요</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
