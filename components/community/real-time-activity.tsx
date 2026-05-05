"use client"

import { useState, useEffect } from "react"
import { Activity, MessageCircle, Heart, UserPlus } from "lucide-react"

interface ActivityItem {
  id: string
  type: "post" | "comment" | "like" | "join"
  user: string
  action: string
  target?: string
  timestamp: Date
}

export function RealTimeActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([])

  useEffect(() => {
    const loadRealActivities = () => {
      const users = JSON.parse(localStorage.getItem("coinname_users") || "[]")
      const posts = JSON.parse(localStorage.getItem("community_posts") || "[]")

      const realActivities: ActivityItem[] = []

      // 최근 게시글 활동
      posts
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
        .forEach((post: any) => {
          realActivities.push({
            id: `post-${post.id}`,
            type: "post",
            user: post.author?.name || "익명",
            action: "새 글을 작성했습니다",
            target: post.title,
            timestamp: new Date(post.createdAt),
          })

          // 좋아요 활동 (좋아요가 있는 경우)
          if (post.likes > 0) {
            realActivities.push({
              id: `like-${post.id}`,
              type: "like",
              user: "커뮤니티 회원",
              action: "게시글에 좋아요를 눌렀습니다",
              target: post.title,
              timestamp: new Date(post.createdAt),
            })
          }
        })

      // 최근 가입 활동
      users
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3)
        .forEach((user: any) => {
          realActivities.push({
            id: `join-${user.id}`,
            type: "join",
            user: user.name,
            action: "커뮤니티에 가입했습니다",
            timestamp: new Date(user.createdAt),
          })
        })

      // 시간순으로 정렬
      realActivities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

      setActivities(realActivities.slice(0, 10)) // 최대 10개
    }

    loadRealActivities()

    // 30초마다 실제 데이터 새로고침
    const interval = setInterval(loadRealActivities, 30000)
    return () => clearInterval(interval)
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "post":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case "comment":
        return <MessageCircle className="h-4 w-4 text-green-500" />
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />
      case "join":
        return <UserPlus className="h-4 w-4 text-purple-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "방금 전"
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}시간 전`

    return `${Math.floor(diffInHours / 24)}일 전`
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>최근 활동</span>
        </h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-xs text-gray-500">실제 데이터</span>
        </div>
      </div>

      {activities.length > 0 ? (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm">
                  <span className="font-medium text-gray-900">{activity.user}</span>
                  <span className="text-gray-600 ml-1">{activity.action}</span>
                  {activity.target && <span className="text-blue-600 ml-1 block truncate">"{activity.target}"</span>}
                </div>
                <div className="text-xs text-gray-500 mt-1">{getTimeAgo(activity.timestamp)}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">아직 활동이 없습니다</p>
          <p className="text-sm text-gray-400">첫 번째 게시글을 작성해보세요!</p>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500">실제 커뮤니티 활동 기반</p>
      </div>
    </div>
  )
}
