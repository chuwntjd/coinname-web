"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Volume2, RefreshCw, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CoinData {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  total_volume: number
  market_cap: number
  high_24h: number
  low_24h: number
}

interface LeaderboardData {
  topGainers: CoinData[]
  topLosers: CoinData[]
  topVolume: CoinData[]
  lastUpdate: string
  source: string
  error?: string
}

export function BybitLeaderboard() {
  const [data, setData] = useState<LeaderboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"gainers" | "losers" | "volume">("gainers")

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/bybit/leaderboard")

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()

      if (result.error) {
        throw new Error(result.error)
      }

      setData(result)
    } catch (err) {
      console.error("리더보드 데이터 로딩 실패:", err)
      setError(err instanceof Error ? err.message : "데이터를 불러올 수 없습니다")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    // 5분마다 자동 새로고침
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    if (price >= 1) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    } else {
      return `$${price.toFixed(6)}`
    }
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`
    } else if (volume >= 1e3) {
      return `$${(volume / 1e3).toFixed(2)}K`
    }
    return `$${volume.toFixed(2)}`
  }

  const formatPercentage = (percentage: number) => {
    const isPositive = percentage > 0
    return (
      <span className={`flex items-center ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
        {Math.abs(percentage).toFixed(2)}%
      </span>
    )
  }

  const renderCoinList = (coins: CoinData[], showVolume = false) => {
    if (!coins || coins.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p>데이터를 불러올 수 없습니다</p>
        </div>
      )
    }

    return (
      <div className="space-y-2">
        {coins.map((coin, index) => (
          <div
            key={coin.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-600 w-6">#{index + 1}</span>
              <div>
                <div className="font-medium text-gray-900">{coin.name}</div>
                <div className="text-sm text-gray-500 uppercase">{coin.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900">{formatPrice(coin.current_price)}</div>
              <div className="text-sm">
                {showVolume ? formatVolume(coin.total_volume) : formatPercentage(coin.price_change_percentage_24h)}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">암호화폐 리더보드</h2>
          <RefreshCw className="h-5 w-5 text-gray-400 animate-spin" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-4 bg-gray-200 rounded"></div>
                  <div>
                    <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="w-16 h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-20 h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="w-16 h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-400" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">데이터 로딩 실패</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <Button onClick={fetchData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            다시 시도
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">암호화폐 리더보드</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={fetchData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            새로고침
          </Button>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("gainers")}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "gainers" ? "bg-white text-green-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          <span>상승률 TOP</span>
        </button>
        <button
          onClick={() => setActiveTab("losers")}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "losers" ? "bg-white text-red-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <TrendingDown className="h-4 w-4" />
          <span>하락률 TOP</span>
        </button>
        <button
          onClick={() => setActiveTab("volume")}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "volume" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Volume2 className="h-4 w-4" />
          <span>거래량 TOP</span>
        </button>
      </div>

      {/* 컨텐츠 */}
      <div className="max-h-96 overflow-y-auto">
        {activeTab === "gainers" && renderCoinList(data?.topGainers || [])}
        {activeTab === "losers" && renderCoinList(data?.topLosers || [])}
        {activeTab === "volume" && renderCoinList(data?.topVolume || [], true)}
      </div>

      {/* 업데이트 정보 */}
      {data && (
        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            마지막 업데이트: {new Date(data.lastUpdate).toLocaleString("ko-KR")} | 출처: {data.source}
          </p>
        </div>
      )}
    </div>
  )
}
