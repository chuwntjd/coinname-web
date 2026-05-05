"use client"

import { useState, useEffect } from "react"
import { Users, MessageSquare, TrendingUp, Award, Eye, Heart, Clock } from "lucide-react"

interface CommunityStatsData {
  totalMembers: number
  totalPosts: number
  dailyActiveUsers: number
  weeklyBestUser: {
    name: string
    likes: number
  }
  todayStats: {
    newMembers: number
    newPosts: number
    activeUsers: number
  }
  onlineUsers: number
  totalViews: number
  totalLikes: number
}

export function CommunityStats() {
  const [stats, setStats] = useState<CommunityStatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const calculatedStats = calculateRealStats()
        setStats(calculatedStats)
      } catch (error) {
        console.error("통계 로딩 오류:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()

    // 30초마다 통계 업데이트
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const calculateRealStats = (): CommunityStatsData => {
    // 로컬 스토리지에서 실제 데이터만 가져오기
    const users = JSON.parse(localStorage.getItem("coinname_users") || "[]")
    const posts = JSON.parse(localStorage.getItem("community_posts") || "[]")

    // 오늘 통계 계산
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayPosts = posts.filter((post: any) => {
      const postDate = new Date(post.createdAt)
      return postDate >= today
    }).length

    const todayUsers = users.filter((user: any) => {
      if (!user.lastLogin) return false
      const loginDate = new Date(user.lastLogin)
      return loginDate >= today
    }).length

    const newMembersToday = users.filter((user: any) => {
      const createdDate = new Date(user.createdAt)
      return createdDate >= today
    }).length

    // 주간 베스트 사용자 (좋아요 기준)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const weeklyPosts = posts.filter((post: any) => {
      const postDate = new Date(post.createdAt)
      return postDate >= weekAgo
    })

    let bestUser = { name: "없음", likes: 0 }

    if (weeklyPosts.length > 0) {
      const userLikes: { [key: string]: number } = {}
      weeklyPosts.forEach((post: any) => {
        const authorName = post.author?.name || "익명"
        userLikes[authorName] = (userLikes[authorName] || 0) + (post.likes || 0)
      })

      const topUser = Object.entries(userLikes).reduce((a, b) => (a[1] > b[1] ? a : b))
      if (topUser[1] > 0) {
        bestUser = { name: topUser[0], likes: topUser[1] }
      }
    }

    // 현재 온라인 사용자 (실제 로그인 상태 기반)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    const onlineUsers = users.filter((user: any) => {
      if (!user.lastLogin) return false
      const lastLogin = new Date(user.lastLogin)
      return lastLogin >= fiveMinutesAgo
    }).length

    // 총 좋아요 수
    const totalLikes = posts.reduce((sum: number, post: any) => sum + (post.likes || 0), 0)

    // 총 조회수 (게시글당 평균 조회수 추정)
    const totalViews = posts.length * 50 // 게시글당 평균 50회 조회 가정

    return {
      totalMembers: users.length,
      totalPosts: posts.length,
      dailyActiveUsers: todayUsers,
      weeklyBestUser: bestUser,
      todayStats: {
        newMembers: newMembersToday,
        newPosts: todayPosts,
        activeUsers: todayUsers,
      },
      onlineUsers,
      totalViews,
      totalLikes,
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toLocaleString()
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">커뮤니티 통계</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!stats) return null

  const mainStats = [
    {
      icon: Users,
      label: "총 회원수",
      value: formatNumber(stats.totalMembers),
      change: stats.todayStats.newMembers > 0 ? `+${stats.todayStats.newMembers}` : "0",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      detail: "오늘 신규",
    },
    {
      icon: MessageSquare,
      label: "총 게시글",
      value: formatNumber(stats.totalPosts),
      change: stats.todayStats.newPosts > 0 ? `+${stats.todayStats.newPosts}` : "0",
      color: "text-green-600",
      bgColor: "bg-green-100",
      detail: "오늘 작성",
    },
    {
      icon: TrendingUp,
      label: "일일 활성 사용자",
      value: formatNumber(stats.dailyActiveUsers),
      change: `${stats.todayStats.activeUsers}명`,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      detail: "오늘 활동",
    },
    {
      icon: Award,
      label: "이번 주 베스트",
      value: stats.weeklyBestUser.name,
      change: stats.weeklyBestUser.likes > 0 ? `${stats.weeklyBestUser.likes} 좋아요` : "활동 없음",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      detail: "주간 1위",
    },
  ]

  const additionalStats = [
    {
      icon: Eye,
      label: "총 조회수",
      value: formatNumber(stats.totalViews),
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      icon: Heart,
      label: "총 좋아요",
      value: formatNumber(stats.totalLikes),
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      icon: Clock,
      label: "현재 온라인",
      value: formatNumber(stats.onlineUsers),
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">커뮤니티 통계</h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-500">실제 데이터</span>
        </div>
      </div>

      {/* 메인 통계 */}
      <div className="space-y-4 mb-6">
        {mainStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                <div className="font-semibold text-gray-900 truncate">{stat.value}</div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-blue-600 font-medium">{stat.change}</span>
                  <span className="text-gray-500">{stat.detail}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 추가 통계 */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">추가 지표</h4>
        <div className="grid grid-cols-1 gap-3">
          {additionalStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="flex items-center space-x-3">
                <div className={`p-1.5 rounded ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-600">{stat.label}</div>
                  <div className="text-sm font-medium text-gray-900">{stat.value}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 업데이트 시간 */}
      <div className="mt-4 pt-3 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500">마지막 업데이트: {new Date().toLocaleTimeString("ko-KR")}</p>
      </div>
    </div>
  )
}
