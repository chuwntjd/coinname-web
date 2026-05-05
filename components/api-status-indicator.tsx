"use client"

import { useState, useEffect } from "react"
import { WifiOff, Zap, CheckCircle, AlertTriangle, XCircle } from "lucide-react"

interface ApiStatusProps {
  isLive: boolean
  apiStatus: string
  lastUpdate: Date | null
  error?: string
  message?: string
}

export function ApiStatusIndicator({ isLive, apiStatus, lastUpdate, error, message }: ApiStatusProps) {
  const [connectionQuality, setConnectionQuality] = useState<"excellent" | "good" | "poor" | "error">("excellent")

  useEffect(() => {
    if (error) {
      setConnectionQuality("error")
      return
    }

    if (!lastUpdate) return

    const now = new Date()
    const timeDiff = now.getTime() - lastUpdate.getTime()

    if (timeDiff < 30000) {
      // 30초 이내
      setConnectionQuality("excellent")
    } else if (timeDiff < 60000) {
      // 1분 이내
      setConnectionQuality("good")
    } else {
      setConnectionQuality("poor")
    }
  }, [lastUpdate, error])

  const getStatusConfig = () => {
    if (error) {
      return {
        icon: <XCircle className="h-5 w-5 text-red-600" />,
        bgColor: "bg-red-50 border-red-200",
        textColor: "text-red-800",
        statusColor: "text-red-600",
        indicator: "bg-red-500",
        label: "API 연결 실패",
      }
    }

    if (isLive) {
      switch (connectionQuality) {
        case "excellent":
          return {
            icon: <Zap className="h-5 w-5 text-green-600" />,
            bgColor: "bg-green-50 border-green-200",
            textColor: "text-green-800",
            statusColor: "text-green-600",
            indicator: "bg-green-500",
            label: "실시간 연결 - 최적",
          }
        case "good":
          return {
            icon: <CheckCircle className="h-5 w-5 text-blue-600" />,
            bgColor: "bg-blue-50 border-blue-200",
            textColor: "text-blue-800",
            statusColor: "text-blue-600",
            indicator: "bg-blue-500",
            label: "실시간 연결 - 양호",
          }
        default:
          return {
            icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
            bgColor: "bg-yellow-50 border-yellow-200",
            textColor: "text-yellow-800",
            statusColor: "text-yellow-600",
            indicator: "bg-yellow-500",
            label: "실시간 연결 - 지연",
          }
      }
    } else {
      return {
        icon: <WifiOff className="h-5 w-5 text-gray-600" />,
        bgColor: "bg-gray-50 border-gray-200",
        textColor: "text-gray-800",
        statusColor: "text-gray-600",
        indicator: "bg-gray-500",
        label: "시뮬레이션 모드",
      }
    }
  }

  const config = getStatusConfig()

  return (
    <div className={`p-4 rounded-lg border ${config.bgColor}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {config.icon}
          <div>
            <div className={`font-medium ${config.textColor}`}>{config.label}</div>
            <div className={`text-sm ${config.statusColor}`}>{apiStatus}</div>
            {error && message && <div className="text-xs text-red-600 mt-1">오류: {message}</div>}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${config.indicator} ${isLive && !error ? "animate-pulse" : ""}`}></div>
          {lastUpdate && <span className="text-xs text-gray-500">{lastUpdate.toLocaleTimeString("ko-KR")}</span>}
        </div>
      </div>

      {isLive && !error && (
        <div className="mt-3 text-xs text-gray-600">
          • 실시간 데이터 스트리밍 활성화 • 10초마다 자동 업데이트 • Crown Trader 전용 모니터링
        </div>
      )}

      {error && (
        <div className="mt-3 text-xs text-red-600">
          • API 인증 실패 또는 권한 부족 • 시뮬레이션 데이터로 대체 • API 키 설정을 확인하세요
        </div>
      )}
    </div>
  )
}
