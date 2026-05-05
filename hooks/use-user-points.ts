"use client"

import { useState, useEffect, useCallback } from "react"
import { type UserLevel, getUserLevel, calculateLevelProgress, generateReferralCode } from "@/utils/user-levels"

export interface UserPoints {
  totalPoints: number
  currentLevel: UserLevel
  progress: number
  nextLevel: UserLevel | null
  referralCode: string
  referrals: any[]
}

export interface Mission {
  id: string
  name: string
  description: string
  points: number
  completed: boolean
  completedAt?: Date
  type: "daily" | "weekly" | "special"
  category: "social" | "trading" | "community" | "referral"
}

export interface PointsHistory {
  id: string
  points: number
  reason: string
  timestamp: Date
  type: "earned" | "spent"
  category: "mission" | "referral" | "bonus" | "trading" | "community"
}

export function useUserPoints(userId?: string) {
  const [userPoints, setUserPoints] = useState<UserPoints | null>(null)
  const [missions, setMissions] = useState<Mission[]>([])
  const [pointsHistory, setPointsHistory] = useState<PointsHistory[]>([])
  const [loading, setLoading] = useState(true)

  // 포인트 데이터 로드
  const loadUserPoints = useCallback(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    try {
      // 기존 포인트 데이터 로드
      const savedPointsData = localStorage.getItem(`coinname_user_points_${userId}`)
      const pointsData = savedPointsData ? JSON.parse(savedPointsData) : {}

      const points = pointsData.totalPoints || 0
      const currentLevel = getUserLevel(points)
      const progress = calculateLevelProgress(points)
      const nextLevel = currentLevel.id < 6 ? getUserLevel(currentLevel.maxPoints + 1) : null

      // 초대 코드가 없으면 생성
      if (!pointsData.referralCode) {
        pointsData.referralCode = generateReferralCode(userId)
        localStorage.setItem(`coinname_user_points_${userId}`, JSON.stringify(pointsData))
      }

      setUserPoints({
        totalPoints: points,
        currentLevel,
        progress,
        nextLevel,
        referralCode: pointsData.referralCode,
        referrals: pointsData.referrals || [],
      })

      // 미션 데이터 로드
      const savedMissions = localStorage.getItem(`user_missions_${userId}`)
      if (savedMissions) {
        const parsedMissions = JSON.parse(savedMissions).map((mission: any) => ({
          ...mission,
          completedAt: mission.completedAt ? new Date(mission.completedAt) : undefined,
        }))
        setMissions(parsedMissions)
      } else {
        // 기본 미션 생성
        const defaultMissions: Mission[] = [
          {
            id: "daily_login",
            name: "일일 로그인",
            description: "매일 로그인하여 포인트를 획득하세요",
            points: 10,
            completed: false,
            type: "daily",
            category: "social",
          },
          {
            id: "first_referral",
            name: "첫 친구 초대",
            description: "첫 번째 친구를 초대하세요",
            points: 100,
            completed: false,
            type: "special",
            category: "referral",
          },
          {
            id: "community_post",
            name: "커뮤니티 게시글 작성",
            description: "커뮤니티에 첫 게시글을 작성하세요",
            points: 50,
            completed: false,
            type: "special",
            category: "community",
          },
          {
            id: "chat_participation",
            name: "채팅 참여",
            description: "실시간 채팅에 메시지를 보내세요",
            points: 20,
            completed: false,
            type: "daily",
            category: "community",
          },
          {
            id: "chat_veteran",
            name: "채팅 베테랑",
            description: "실시간 채팅에 10개 이상의 메시지를 보내세요",
            points: 100,
            completed: false,
            type: "special",
            category: "community",
          },
        ]
        setMissions(defaultMissions)
        localStorage.setItem(`user_missions_${userId}`, JSON.stringify(defaultMissions))
      }

      // 포인트 히스토리 로드
      const savedHistory = localStorage.getItem(`points_history_${userId}`)
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }))
        setPointsHistory(parsedHistory)
      }
    } catch (error) {
      console.error("포인트 데이터 로드 실패:", error)
    } finally {
      setLoading(false)
    }
  }, [userId])

  // 포인트 추가
  const addPoints = useCallback(
    (
      points: number,
      reason: string,
      category: "mission" | "referral" | "bonus" | "trading" | "community" = "mission",
    ) => {
      if (!userId) return

      try {
        const currentPointsData = JSON.parse(localStorage.getItem(`coinname_user_points_${userId}`) || "{}")
        const newPoints = (currentPointsData.totalPoints || 0) + points

        const updatedData = {
          ...currentPointsData,
          totalPoints: newPoints,
        }

        localStorage.setItem(`coinname_user_points_${userId}`, JSON.stringify(updatedData))

        // 포인트 히스토리 추가
        const historyItem: PointsHistory = {
          id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          points,
          reason,
          timestamp: new Date(),
          type: "earned",
          category,
        }

        const currentHistory = JSON.parse(localStorage.getItem(`points_history_${userId}`) || "[]")
        const updatedHistory = [historyItem, ...currentHistory].slice(0, 100) // 최대 100개 유지
        localStorage.setItem(`points_history_${userId}`, JSON.stringify(updatedHistory))

        setPointsHistory(
          updatedHistory.map((item) => ({
            ...item,
            timestamp: new Date(item.timestamp),
          })),
        )

        // 사용자 포인트 업데이트
        loadUserPoints()
      } catch (error) {
        console.error("포인트 추가 실패:", error)
      }
    },
    [userId, loadUserPoints],
  )

  // 미션 완료
  const completeMission = useCallback(
    (missionId: string) => {
      if (!userId) return

      try {
        const currentMissions = [...missions]
        const missionIndex = currentMissions.findIndex((m) => m.id === missionId)

        if (missionIndex !== -1 && !currentMissions[missionIndex].completed) {
          currentMissions[missionIndex].completed = true
          currentMissions[missionIndex].completedAt = new Date()

          setMissions(currentMissions)
          localStorage.setItem(`user_missions_${userId}`, JSON.stringify(currentMissions))

          // 포인트 추가
          addPoints(currentMissions[missionIndex].points, `미션 완료: ${currentMissions[missionIndex].name}`, "mission")
        }
      } catch (error) {
        console.error("미션 완료 실패:", error)
      }
    },
    [userId, missions, addPoints],
  )

  // 채팅 미션 트리거
  const triggerChatMission = useCallback(() => {
    const chatMission = missions.find((m) => m.id === "chat_participation")
    if (chatMission && !chatMission.completed) {
      completeMission("chat_participation")
    }
  }, [missions, completeMission])

  // 채팅 베테랑 미션 트리거
  const triggerChatVeteranMission = useCallback(() => {
    if (!userId) return

    try {
      // 채팅 메시지 수 확인
      const chatMessages = JSON.parse(localStorage.getItem("live_chat_messages") || "[]")
      const userMessages = chatMessages.filter((msg: any) => {
        const users = JSON.parse(localStorage.getItem("coinname_users") || "[]")
        const currentUser = users.find((u: any) => u.id === userId)
        return currentUser && msg.user === currentUser.name
      })

      if (userMessages.length >= 10) {
        const veteranMission = missions.find((m) => m.id === "chat_veteran")
        if (veteranMission && !veteranMission.completed) {
          completeMission("chat_veteran")
        }
      }
    } catch (error) {
      console.error("채팅 베테랑 미션 확인 실패:", error)
    }
  }, [userId, missions, completeMission])

  // 커뮤니티 포스트 미션 트리거
  const triggerCommunityPostMission = useCallback(() => {
    const postMission = missions.find((m) => m.id === "community_post")
    if (postMission && !postMission.completed) {
      completeMission("community_post")
    }
  }, [missions, completeMission])

  // 첫 초대 미션 트리거
  const triggerFirstReferralMission = useCallback(() => {
    const referralMission = missions.find((m) => m.id === "first_referral")
    if (referralMission && !referralMission.completed) {
      completeMission("first_referral")
    }
  }, [missions, completeMission])

  // 일일 로그인 미션 트리거
  const triggerDailyLoginMission = useCallback(() => {
    const loginMission = missions.find((m) => m.id === "daily_login")
    if (loginMission && !loginMission.completed) {
      // 오늘 이미 완료했는지 확인
      const today = new Date().toDateString()
      const completedToday = loginMission.completedAt && new Date(loginMission.completedAt).toDateString() === today

      if (!completedToday) {
        completeMission("daily_login")
      }
    }
  }, [missions, completeMission])

  // 초기 로드
  useEffect(() => {
    loadUserPoints()
  }, [loadUserPoints])

  return {
    userPoints,
    missions,
    pointsHistory,
    loading,
    addPoints,
    completeMission,
    triggerChatMission,
    triggerChatVeteranMission,
    triggerCommunityPostMission,
    triggerFirstReferralMission,
    triggerDailyLoginMission,
    reload: loadUserPoints,
  }
}
