import { NextResponse } from "next/server"

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
}

export async function GET() {
  try {
    // CoinGecko API 사용 (무료, 안정적)
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "User-Agent": "CoinName-Website/1.0",
        },
        next: {
          revalidate: 300, // 5분마다 재검증
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const coins: CoinData[] = await response.json()

    if (!Array.isArray(coins) || coins.length === 0) {
      throw new Error("유효한 코인 데이터가 없습니다")
    }

    // 유효한 데이터만 필터링
    const validCoins = coins.filter(
      (coin) =>
        coin.current_price &&
        coin.price_change_percentage_24h !== null &&
        coin.total_volume &&
        coin.total_volume > 1000000, // 최소 거래량 필터
    )

    // 상승률 상위 15개
    const topGainers = validCoins
      .filter((coin) => coin.price_change_percentage_24h > 0)
      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      .slice(0, 15)

    // 하락률 상위 15개
    const topLosers = validCoins
      .filter((coin) => coin.price_change_percentage_24h < 0)
      .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
      .slice(0, 15)

    // 거래량 상위 15개
    const topVolume = validCoins.sort((a, b) => b.total_volume - a.total_volume).slice(0, 15)

    const leaderboardData: LeaderboardData = {
      topGainers,
      topLosers,
      topVolume,
      lastUpdate: new Date().toISOString(),
      source: "CoinGecko",
    }

    return NextResponse.json(leaderboardData)
  } catch (error) {
    console.error("API 에러:", error)
    return NextResponse.json(
      {
        error: "실시간 데이터 로딩 실패",
        message: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다",
        topGainers: [],
        topLosers: [],
        topVolume: [],
        lastUpdate: new Date().toISOString(),
        source: "Error",
      },
      { status: 500 },
    )
  }
}
