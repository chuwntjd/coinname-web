"use client"

import { useRealTimeStats } from "@/hooks/use-real-time-stats"
import { RefreshCw, TrendingUp, Users, MessageSquare, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RealTimeStats() {
  const { stats, loading, error, lastUpdated, refresh } = useRealTimeStats()

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  const formatTime = (date: Date | null) => {
    if (!date) return ""
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  if (loading && !stats) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">코인네임과 함께하는 투자자들</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-2 mx-auto w-20"></div>
              <div className="h-4 bg-gray-200 rounded mx-auto w-16"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error && !stats) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">코인네임과 함께하는 투자자들</h2>
        <div className="text-center text-red-600 mb-4">
          <p>데이터를 불러올 수 없습니다: {error}</p>
          <Button onClick={refresh} variant="outline" size="sm" className="mt-2 bg-transparent">
            <RefreshCw className="w-4 h-4 mr-2" />
            다시 시도
          </Button>
        </div>
      </div>
    )
  }

  if (!stats) return null

  const statsData = [
    {
      icon: Users,
      value: formatNumber(stats.totalUsers),
      label: "활성 사용자",
      color: "text-blue-600",
      change: `+${stats.todayNewUsers} 오늘`,
    },
    {
      icon: MessageSquare,
      value: formatNumber(stats.totalPosts),
      label: "게시글",
      color: "text-green-600",
      change: `+${stats.todayNewPosts} 오늘`,
    },
    {
      icon: Heart,
      value: formatNumber(stats.totalComments),
      label: "댓글",
      color: "text-purple-600",
      change: `${stats.onlineUsers}명 온라인`,
    },
    {
      icon: TrendingUp,
      value: `${stats.satisfactionRate}%`,
      label: "만족도",
      color: "text-orange-600",
      change: "실시간 업데이트",
    },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">코인네임과 함께하는 투자자들</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>실시간</span>
          </div>
          {lastUpdated && <span className="text-xs">마지막 업데이트: {formatTime(lastUpdated)}</span>}
          <Button onClick={refresh} variant="ghost" size="sm" className="h-6 w-6 p-0" disabled={loading}>
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {statsData.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="text-center group">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div className={`text-3xl font-bold ${stat.color} mb-2 transition-all duration-300`}>{stat.value}</div>
              <div className="text-gray-600 font-medium mb-1">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.change}</div>
            </div>
          )
        })}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">⚠️ 일부 데이터가 최신이 아닐 수 있습니다: {error}</p>
        </div>
      )}
    </div>
  )
}
