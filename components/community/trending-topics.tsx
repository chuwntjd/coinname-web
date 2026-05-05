"use client"

import { useState, useEffect } from "react"
import { Hash, ArrowUp, ArrowDown, Minus } from "lucide-react"

interface TrendingTopic {
  tag: string
  posts: number
  trend: "up" | "down" | "stable"
  category: string
  lastUsed: Date
}

export function TrendingTopics() {
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const calculateTrendingTopics = () => {
      // 로컬 스토리지에서 실제 게시글 데이터만 가져오기
      const posts = JSON.parse(localStorage.getItem("community_posts") || "[]")

      if (posts.length === 0) {
        setTrendingTopics([])
        setLoading(false)
        return
      }

      // 실제 태그 분석
      const tagData: { [key: string]: { count: number; category: string; lastUsed: Date } } = {}

      posts.forEach((post: any) => {
        if (post.tags && Array.isArray(post.tags)) {
          post.tags.forEach((tag: string) => {
            const postDate = new Date(post.createdAt)

            if (!tagData[tag]) {
              tagData[tag] = {
                count: 0,
                category: post.category || "discussion",
                lastUsed: postDate,
              }
            }

            tagData[tag].count += 1

            // 더 최근 날짜로 업데이트
            if (postDate > tagData[tag].lastUsed) {
              tagData[tag].lastUsed = postDate
            }
          })
        }
      })

      // 태그를 사용 빈도순으로 정렬하고 트렌드 계산
      const sortedTags = Object.entries(tagData)
        .map(([tag, data]) => {
          // 최근 24시간 내 사용 여부로 트렌드 결정
          const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
          const isRecent = data.lastUsed > oneDayAgo

          let trend: "up" | "down" | "stable" = "stable"
          if (isRecent && data.count >= 2) {
            trend = "up"
          } else if (!isRecent && data.count === 1) {
            trend = "down"
          }

          return {
            tag,
            posts: data.count,
            trend,
            category: data.category,
            lastUsed: data.lastUsed,
          }
        })
        .sort((a, b) => b.posts - a.posts)
        .slice(0, 8) // 상위 8개만

      setTrendingTopics(sortedTags)
      setLoading(false)
    }

    calculateTrendingTopics()

    // 1분마다 트렌딩 토픽 업데이트
    const interval = setInterval(calculateTrendingTopics, 60000)
    return () => clearInterval(interval)
  }, [])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-3 w-3 text-green-500" />
      case "down":
        return <ArrowDown className="h-3 w-3 text-red-500" />
      default:
        return <Minus className="h-3 w-3 text-gray-400" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "trading":
        return "📈"
      case "technical":
        return "🔧"
      case "news":
        return "📰"
      case "discussion":
        return "💬"
      case "question":
        return "❓"
      default:
        return "🏷️"
    }
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "방금 전"
    if (diffInHours < 24) return `${diffInHours}시간 전`
    return `${Math.floor(diffInHours / 24)}일 전`
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Hash className="h-5 w-5" />
          <span>트렌딩 토픽</span>
        </h3>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="w-8 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Hash className="h-5 w-5" />
          <span>트렌딩 토픽</span>
        </h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-xs text-gray-500">실제 데이터</span>
        </div>
      </div>

      {trendingTopics.length > 0 ? (
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div
              key={`${topic.tag}-${index}`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-600">#{index + 1}</span>

                <div className="flex items-center space-x-2">
                  <span className="text-xs">{getCategoryEmoji(topic.category)}</span>
                  <span className="text-sm font-medium text-blue-600">#{topic.tag}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{topic.posts}개</div>
                  <div className="text-xs text-gray-500">{getTimeAgo(topic.lastUsed)}</div>
                </div>

                <div className="flex items-center">{getTrendIcon(topic.trend)}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Hash className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">아직 트렌딩 토픽이 없습니다</p>
          <p className="text-sm text-gray-400">태그가 포함된 게시글을 작성해보세요!</p>
        </div>
      )}

      {/* 범례 */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <ArrowUp className="h-3 w-3 text-green-500" />
              <span>최근 활발</span>
            </div>
            <div className="flex items-center space-x-1">
              <ArrowDown className="h-3 w-3 text-red-500" />
              <span>활동 감소</span>
            </div>
            <div className="flex items-center space-x-1">
              <Minus className="h-3 w-3 text-gray-400" />
              <span>안정</span>
            </div>
          </div>
          <span>실제 게시글 기반</span>
        </div>
      </div>
    </div>
  )
}
