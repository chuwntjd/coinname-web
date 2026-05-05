"use client"

import { useState, useEffect } from "react"

interface CommunityMetrics {
  totalUsers: number
  totalPosts: number
  totalComments: number
  totalLikes: number
  activeToday: number
  onlineNow: number
  topContributor: {
    name: string
    contributions: number
  }
}

export function useCommunityStats() {
  const [metrics, setMetrics] = useState<CommunityMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const calculateMetrics = () => {
      try {
        // 로컬 스토리지에서 실제 데이터만 수집
        const users = JSON.parse(localStorage.getItem("coinname_users") || "[]")
        const posts = JSON.parse(localStorage.getItem("community_posts") || "[]")

        // 오늘 활성 사용자 계산
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const activeToday = users.filter((user: any) => {
          if (!user.lastLogin) return false
          const loginDate = new Date(user.lastLogin)
          return loginDate >= today
        }).length

        // 총 좋아요 수 계산
        const totalLikes = posts.reduce((sum: number, post: any) => {
          return sum + (post.likes || 0)
        }, 0)

        // 총 댓글 수 계산 (실제 댓글 데이터가 있다면)
        const totalComments = posts.reduce((sum: number, post: any) => {
          return sum + (post.comments || 0)
        }, 0)

        // 최고 기여자 찾기
        const userContributions: { [key: string]: number } = {}
        posts.forEach((post: any) => {
          const authorName = post.author?.name || "익명"
          userContributions[authorName] = (userContributions[authorName] || 0) + 1
        })

        const topContributor = Object.entries(userContributions).reduce(
          (max, [name, count]) => (count > max.contributions ? { name, contributions: count } : max),
          { name: "없음", contributions: 0 },
        )

        // 현재 온라인 사용자 (최근 5분 내 로그인)
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
        const onlineNow = users.filter((user: any) => {
          if (!user.lastLogin) return false
          const lastLogin = new Date(user.lastLogin)
          return lastLogin >= fiveMinutesAgo
        }).length

        const calculatedMetrics: CommunityMetrics = {
          totalUsers: users.length,
          totalPosts: posts.length,
          totalComments,
          totalLikes,
          activeToday,
          onlineNow,
          topContributor,
        }

        setMetrics(calculatedMetrics)
      } catch (error) {
        console.error("통계 계산 오류:", error)
      } finally {
        setLoading(false)
      }
    }

    calculateMetrics()

    // 30초마다 통계 업데이트
    const interval = setInterval(calculateMetrics, 30000)
    return () => clearInterval(interval)
  }, [])

  return { metrics, loading }
}
