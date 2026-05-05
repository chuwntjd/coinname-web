"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { History, TrendingUp, Users, Gift, Star, MessageSquare } from "lucide-react"
import type { PointsHistoryType } from "@/hooks/use-user-points"

interface PointsHistoryProps {
  pointsHistory: PointsHistoryType[]
}

export function PointsHistory({ pointsHistory }: PointsHistoryProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "mission":
        return <Star className="h-4 w-4 text-blue-500" />
      case "referral":
        return <Users className="h-4 w-4 text-green-500" />
      case "bonus":
        return <Gift className="h-4 w-4 text-purple-500" />
      case "trading":
        return <TrendingUp className="h-4 w-4 text-orange-500" />
      case "community":
        return <MessageSquare className="h-4 w-4 text-pink-500" />
      default:
        return <History className="h-4 w-4 text-gray-500" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "mission":
        return "bg-blue-100 text-blue-800"
      case "referral":
        return "bg-green-100 text-green-800"
      case "bonus":
        return "bg-purple-100 text-purple-800"
      case "trading":
        return "bg-orange-100 text-orange-800"
      case "community":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "mission":
        return "미션"
      case "referral":
        return "초대"
      case "bonus":
        return "보너스"
      case "trading":
        return "트레이딩"
      case "community":
        return "커뮤니티"
      default:
        return "기타"
    }
  }

  const totalEarned = pointsHistory.filter((item) => item.type === "earned").reduce((sum, item) => sum + item.points, 0)

  const totalSpent = pointsHistory.filter((item) => item.type === "spent").reduce((sum, item) => sum + item.points, 0)

  return (
    <div className="space-y-6">
      {/* 포인트 요약 */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">+{totalEarned.toLocaleString()}</div>
            <div className="text-sm text-green-700">총 획득 포인트</div>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">-{totalSpent.toLocaleString()}</div>
            <div className="text-sm text-red-700">총 사용 포인트</div>
          </CardContent>
        </Card>
      </div>

      {/* 포인트 내역 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="h-5 w-5 text-gray-500" />
            <span>포인트 내역</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pointsHistory.length > 0 ? (
            <div className="space-y-3">
              {pointsHistory.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getCategoryIcon(item.category)}
                    <div>
                      <p className="font-medium text-sm">{item.reason}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={`text-xs ${getCategoryColor(item.category)}`}>
                          {getCategoryLabel(item.category)}
                        </Badge>
                        <span className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${item.type === "earned" ? "text-green-600" : "text-red-600"}`}>
                      {item.type === "earned" ? "+" : "-"}
                      {item.points.toLocaleString()}P
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <History className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>아직 포인트 내역이 없습니다</p>
              <p className="text-sm">미션을 완료하거나 친구를 초대해보세요!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
