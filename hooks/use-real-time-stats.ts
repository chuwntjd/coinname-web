"use client"

import { useState, useEffect } from "react"

interface RealTimeStats {
  totalUsers: number
  totalPosts: number
  totalComments: number
  satisfactionRate: number
  onlineUsers: number
  todayNewUsers: number
  todayNewPosts: number
}

interface StatsResponse {
  success: boolean
  data: RealTimeStats
  timestamp: string
  error?: string
}

export function useRealTimeStats() {
  const [stats, setStats] = useState<RealTimeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/stats", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: StatsResponse = await response.json()

      if (result.success && result.data) {
        setStats(result.data)
        setLastUpdated(new Date(result.timestamp))
        setError(null)
      } else {
        throw new Error(result.error || "데이터를 가져올 수 없습니다")
      }
    } catch (err) {
      console.error("통계 데이터 가져오기 실패:", err)
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다")

      // 에러 발생 시 기본값 설정
      if (!stats) {
        setStats({
          totalUsers: 2847,
          totalPosts: 15234,
          totalComments: 43891,
          satisfactionRate: 98.7,
          onlineUsers: 45,
          todayNewUsers: 12,
          todayNewPosts: 38,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // 초기 데이터 로드
    fetchStats()

    // 30초마다 데이터 업데이트
    const interval = setInterval(fetchStats, 30000)

    return () => clearInterval(interval)
  }, [])

  const refresh = () => {
    setLoading(true)
    fetchStats()
  }

  return {
    stats,
    loading,
    error,
    lastUpdated,
    refresh,
  }
}
