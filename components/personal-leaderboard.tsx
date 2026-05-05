"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, DollarSign, Target, Award, BarChart3, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AccountInfo {
  totalWalletBalance: string
  totalUnrealizedPnl: string
  totalMarginBalance: string
  accountType: string
}

interface Position {
  symbol: string
  side: string
  size: string
  positionValue: string
  unrealisedPnl: string
  percentage: string
  markPrice: string
  entryPrice: string
}

interface AccountData {
  accountInfo: AccountInfo
  positions: Position[]
  recentOrders: any[]
  pnlHistory: any[]
}

interface PersonalLeaderboardProps {
  apiKey: string
  apiSecret: string
  testnet: boolean
}

export function PersonalLeaderboard({ apiKey, apiSecret, testnet }: PersonalLeaderboardProps) {
  const [data, setData] = useState<AccountData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchAccountData = async () => {
    try {
      setError(null)
      const response = await fetch("/api/bybit/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey, apiSecret, testnet }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || "계정 데이터를 가져올 수 없습니다")
      }

      const result = await response.json()
      setData(result)
      setLastUpdate(new Date())
    } catch (err) {
      console.error("계정 데이터 에러:", err)
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAccountData()

    // 1분마다 자동 새로고침
    const interval = setInterval(fetchAccountData, 60000)
    return () => clearInterval(interval)
  }, [apiKey, apiSecret, testnet])

  const formatNumber = (num: string | number) => {
    const value = typeof num === "string" ? Number.parseFloat(num) : num
    if (isNaN(value)) return "0.00"

    if (Math.abs(value) >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M`
    } else if (Math.abs(value) >= 1000) {
      return `${(value / 1000).toFixed(2)}K`
    }
    return value.toFixed(2)
  }

  const formatCurrency = (num: string | number) => {
    const value = typeof num === "string" ? Number.parseFloat(num) : num
    if (isNaN(value)) return "$0.00"
    return `$${formatNumber(value)}`
  }

  const calculateTotalPnL = () => {
    if (!data?.positions) return 0
    return data.positions.reduce((total, pos) => total + Number.parseFloat(pos.unrealisedPnl || "0"), 0)
  }

  const getWinRate = () => {
    if (!data?.pnlHistory || data.pnlHistory.length === 0) return 0
    const wins = data.pnlHistory.filter((pnl) => Number.parseFloat(pnl.closedPnl || "0") > 0).length
    return ((wins / data.pnlHistory.length) * 100).toFixed(1)
  }

  const getBestPosition = () => {
    if (!data?.positions || data.positions.length === 0) return null
    return data.positions.reduce((best, current) => {
      const currentPnl = Number.parseFloat(current.unrealisedPnl || "0")
      const bestPnl = Number.parseFloat(best.unrealisedPnl || "0")
      return currentPnl > bestPnl ? current : best
    })
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="text-red-600 mb-4 font-medium">{error}</div>
        <Button onClick={fetchAccountData} variant="outline" disabled={loading}>
          {loading ? "로딩 중..." : "다시 시도"}
        </Button>
      </div>
    )
  }

  const totalPnL = calculateTotalPnL()
  const winRate = getWinRate()
  const bestPosition = getBestPosition()

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* 헤더 */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Award className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">내 트레이딩 리더보드</h3>
              <p className="text-sm text-gray-600">
                {testnet ? "테스트넷" : "메인넷"} • {data?.accountInfo.accountType}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchAccountData}
            disabled={loading}
            className="text-gray-500 hover:text-gray-700"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* 계정 요약 */}
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(data?.accountInfo.totalWalletBalance || "0")}
            </div>
            <div className="text-sm text-gray-600">총 잔고</div>
          </div>

          <div className={`p-4 rounded-lg text-center ${totalPnL >= 0 ? "bg-green-50" : "bg-red-50"}`}>
            {totalPnL >= 0 ? (
              <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
            ) : (
              <TrendingDown className="h-6 w-6 text-red-600 mx-auto mb-2" />
            )}
            <div className={`text-2xl font-bold ${totalPnL >= 0 ? "text-green-600" : "text-red-600"}`}>
              {totalPnL >= 0 ? "+" : ""}
              {formatCurrency(totalPnL)}
            </div>
            <div className="text-sm text-gray-600">미실현 손익</div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <Target className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{winRate}%</div>
            <div className="text-sm text-gray-600">승률</div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <BarChart3 className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{data?.positions.length || 0}</div>
            <div className="text-sm text-gray-600">활성 포지션</div>
          </div>
        </div>
      </div>

      {/* 활성 포지션 */}
      <div className="p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">활성 포지션</h4>
        {data?.positions && data.positions.length > 0 ? (
          <div className="space-y-3">
            {data.positions.map((position, index) => {
              const pnl = Number.parseFloat(position.unrealisedPnl || "0")
              const percentage = Number.parseFloat(position.percentage || "0")

              return (
                <div
                  key={`${position.symbol}-${index}`}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-3 h-3 rounded-full ${position.side === "Buy" ? "bg-green-500" : "bg-red-500"}`}
                    />
                    <div>
                      <div className="font-bold text-gray-900">{position.symbol}</div>
                      <div className="text-sm text-gray-500">
                        {position.side} • 크기: {formatNumber(position.size)}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`font-bold ${pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {pnl >= 0 ? "+" : ""}
                      {formatCurrency(pnl)}
                    </div>
                    <div className={`text-sm ${percentage >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {percentage >= 0 ? "+" : ""}
                      {percentage.toFixed(2)}%
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">활성 포지션이 없습니다</div>
        )}

        {/* 베스트 포지션 하이라이트 */}
        {bestPosition && Number.parseFloat(bestPosition.unrealisedPnl || "0") > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="h-5 w-5 text-green-600" />
              <span className="font-bold text-green-800">베스트 포지션</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">{bestPosition.symbol}</span>
              <span className="font-bold text-green-600">+{formatCurrency(bestPosition.unrealisedPnl)}</span>
            </div>
          </div>
        )}

        {/* 마지막 업데이트 */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
          마지막 업데이트: {lastUpdate?.toLocaleTimeString("ko-KR")}
        </div>
      </div>
    </div>
  )
}
