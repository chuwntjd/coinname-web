"use client"

import { useState, useEffect, useRef } from "react"
import { Send, Users, Crown, Shield, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useUserPoints } from "@/hooks/use-user-points"

interface ChatMessage {
  id: string
  user: string
  message: string
  timestamp: Date
  badge?: "admin" | "expert" | "vip" | "trader" | "verified" | "new"
}

interface OnlineUser {
  name: string
  badge?: "admin" | "expert" | "vip" | "trader" | "verified" | "new"
  isOnline: boolean
}

export function LiveChat() {
  const { user } = useAuth()
  const { triggerChatMission, triggerChatVeteranMission } = useUserPoints(user?.id)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([])
  const [isUserScrolling, setIsUserScrolling] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  // 사용자 뱃지 결정 함수
  const getUserBadge = (username: string): "admin" | "expert" | "vip" | "trader" | "verified" | "new" | undefined => {
    if (username === "시스템") return "admin"
    if (username.includes("크립토킹") || username.includes("DeFi전문가")) return "expert"
    if (username.includes("이더홀더")) return "vip"
    if (username.includes("알트코인러버") || username.includes("트레이더123")) return "trader"
    if (username.includes("비트코인마스터") || username.includes("코인수집가")) return "verified"
    return "new"
  }

  // 뱃지 아이콘 및 스타일 반환
  const getBadgeInfo = (badge: string) => {
    switch (badge) {
      case "admin":
        return { icon: Crown, color: "text-red-600", bg: "bg-red-100", text: "관리자" }
      case "expert":
        return { icon: Crown, color: "text-purple-600", bg: "bg-purple-100", text: "전문가" }
      case "vip":
        return { icon: Star, color: "text-yellow-600", bg: "bg-yellow-100", text: "VIP" }
      case "trader":
        return { icon: Zap, color: "text-blue-600", bg: "bg-blue-100", text: "트레이더" }
      case "verified":
        return { icon: Shield, color: "text-green-600", bg: "bg-green-100", text: "인증됨" }
      case "new":
        return { icon: Star, color: "text-gray-600", bg: "bg-gray-100", text: "새 멤버" }
      default:
        return null
    }
  }

  // 사용자 자산 정보 조회 함수
  const getUserAssetInfo = (username: string) => {
    try {
      // Get all users from localStorage to find the user by name
      const users = JSON.parse(localStorage.getItem("coinname_users") || "[]")
      const foundUser = users.find((u: any) => u.name === username)

      if (!foundUser) {
        return null
      }

      // Check asset verifications from the admin panel storage
      const assetVerifications = JSON.parse(localStorage.getItem("asset_verifications") || "[]")
      const userVerification = assetVerifications.find((v: any) => v.userId === foundUser.id && v.status === "approved")

      if (userVerification && userVerification.assetAmount) {
        // Handle different data types for assetAmount
        let amount = 0
        if (typeof userVerification.assetAmount === "string") {
          // Remove non-numeric characters and convert to number
          amount = Number.parseInt(userVerification.assetAmount.replace(/[^0-9]/g, "")) || 0
        } else if (typeof userVerification.assetAmount === "number") {
          amount = userVerification.assetAmount
        }

        if (amount > 0) {
          return {
            amount: amount,
            currency: "KRW",
          }
        }
      }

      return null
    } catch (error) {
      console.error("Error getting user asset info:", error)
      return null
    }
  }

  // 강제 스크롤 함수
  const forceScrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // 스크롤 감지
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50

      if (!isAtBottom) {
        setIsUserScrolling(true)
        // 3초 후 자동 스크롤 재개
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
        scrollTimeoutRef.current = setTimeout(() => {
          setIsUserScrolling(false)
        }, 3000)
      } else {
        setIsUserScrolling(false)
      }
    }
  }

  // 자동 스크롤
  const scrollToBottom = () => {
    if (!isUserScrolling && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // 메시지 전송
  const sendMessage = () => {
    if (!newMessage.trim() || !user) return

    const message: ChatMessage = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user: user.name,
      message: newMessage.trim(),
      timestamp: new Date(),
      badge: getUserBadge(user.name),
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // 채팅 미션 트리거
    if (triggerChatMission) {
      triggerChatMission()
    }
    if (triggerChatVeteranMission) {
      triggerChatVeteranMission()
    }

    // 본인 메시지 전송 후 강제 스크롤
    setTimeout(() => {
      forceScrollToBottom()
    }, 100)

    // 로컬 스토리지에 저장
    const savedMessages = JSON.parse(localStorage.getItem("live_chat_messages") || "[]")
    const updatedMessages = [...savedMessages, message].slice(-100) // 최대 100개 메시지 유지
    localStorage.setItem("live_chat_messages", JSON.stringify(updatedMessages))
  }

  // 초기 데이터 로드
  useEffect(() => {
    // 저장된 메시지 불러오기
    const savedMessages = JSON.parse(localStorage.getItem("live_chat_messages") || "[]")
    if (savedMessages.length > 0) {
      const parsedMessages = savedMessages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }))
      setMessages(parsedMessages)
    }

    // 온라인 사용자 목록 (실제 로그인한 사용자들 기반)
    const users = JSON.parse(localStorage.getItem("coinname_users") || "[]")
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)

    const activeUsers: OnlineUser[] = users
      .filter((u: any) => {
        if (!u.lastLogin) return false
        const lastLogin = new Date(u.lastLogin)
        return lastLogin >= fiveMinutesAgo
      })
      .map((u: any) => ({
        name: u.name,
        badge: getUserBadge(u.name),
        isOnline: true,
      }))

    setOnlineUsers(activeUsers)
  }, [])

  // 컴포넌트 마운트 시 자동 스크롤
  useEffect(() => {
    // 컴포넌트가 처음 로드될 때 맨 아래로 스크롤
    setTimeout(() => {
      forceScrollToBottom()
    }, 100)
  }, [])

  // 새 메시지 시 자동 스크롤
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[600px] flex flex-col">
      {/* 헤더 */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">실시간 채팅</h3>
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">{onlineUsers.length}명 온라인</span>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* 채팅 영역 */}
        <div className="flex-1 flex flex-col">
          {/* 메시지 목록 */}
          <div ref={chatContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length > 0 ? (
              messages.map((message) => {
                const badgeInfo = message.badge ? getBadgeInfo(message.badge) : null
                const BadgeIcon = badgeInfo?.icon
                const assetInfo = getUserAssetInfo(message.user)

                return (
                  <div key={message.id} className="flex items-start space-x-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900 text-sm">{message.user}</span>
                        {badgeInfo && BadgeIcon && (
                          <div
                            className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs ${badgeInfo.bg}`}
                          >
                            <BadgeIcon className={`h-3 w-3 ${badgeInfo.color}`} />
                            <span className={badgeInfo.color}>{badgeInfo.text}</span>
                          </div>
                        )}
                        {assetInfo && (
                          <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs bg-green-100">
                            <span className="text-green-600">
                              💰 {(() => {
                                const amount = assetInfo.amount
                                if (amount >= 100000000) {
                                  // 1억 이상
                                  return `${(amount / 100000000).toFixed(1)}억원`
                                } else if (amount >= 10000) {
                                  // 1만 이상
                                  return `${(amount / 10000).toFixed(0)}만원`
                                } else {
                                  return `${amount.toLocaleString()}원`
                                }
                              })()}
                            </span>
                          </div>
                        )}
                        <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                      </div>
                      <p className="text-gray-700 text-sm break-words">{message.message}</p>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>아직 메시지가 없습니다.</p>
                <p className="text-sm">첫 번째 메시지를 보내보세요!</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 메시지 입력 */}
          <div className="p-4 border-t border-gray-200">
            {user ? (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  maxLength={200}
                />
                <Button onClick={sendMessage} size="sm" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-2">
                <p className="text-sm">채팅에 참여하려면 로그인하세요</p>
              </div>
            )}
          </div>
        </div>

        {/* 온라인 사용자 목록 */}
        <div className="w-48 border-l border-gray-200 p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">온라인 사용자</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {onlineUsers.length > 0 ? (
              onlineUsers.map((user, index) => {
                const badgeInfo = user.badge ? getBadgeInfo(user.badge) : null
                const BadgeIcon = badgeInfo?.icon

                return (
                  <div key={`${user.name}-${index}`} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-900 truncate">{user.name}</div>
                      {badgeInfo && BadgeIcon && (
                        <div className={`flex items-center space-x-1 mt-0.5`}>
                          <BadgeIcon className={`h-2.5 w-2.5 ${badgeInfo.color}`} />
                          <span className={`text-xs ${badgeInfo.color}`}>{badgeInfo.text}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="text-xs text-gray-500">온라인 사용자가 없습니다</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
