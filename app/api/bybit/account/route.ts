import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

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
  error?: string
}

// 바이비트 API 서명 생성
function generateSignature(queryString: string, apiSecret: string, timestamp: string, recvWindow: string): string {
  const message = timestamp + apiSecret + recvWindow + queryString
  return crypto.createHmac("sha256", apiSecret).update(message).digest("hex")
}

// 바이비트 API 호출
async function callBybitAPI(
  endpoint: string,
  params: Record<string, any>,
  apiKey: string,
  apiSecret: string,
  testnet = true,
) {
  const baseUrl = testnet ? "https://api-testnet.bybit.com" : "https://api.bybit.com"
  const timestamp = Date.now().toString()
  const recvWindow = "5000"

  // 파라미터 정렬 및 문자열 생성
  const queryString = Object.keys(params)
    .sort()
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join("&")

  const signature = generateSignature(queryString, apiSecret, timestamp, recvWindow)

  const url = `${baseUrl}${endpoint}?${queryString}&signature=${signature}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-BAPI-API-KEY": apiKey,
      "X-BAPI-TIMESTAMP": timestamp,
      "X-BAPI-RECV-WINDOW": recvWindow,
      "X-BAPI-SIGN": signature,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`API 호출 실패: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function POST(request: NextRequest) {
  try {
    const { apiKey, apiSecret, testnet } = await request.json()

    if (!apiKey || !apiSecret) {
      return NextResponse.json({ error: "API 키가 필요합니다" }, { status: 400 })
    }

    // API 키 유효성 체크
    if (apiKey.length < 10 || apiSecret.length < 10) {
      return NextResponse.json({ error: "유효하지 않은 API 키입니다" }, { status: 400 })
    }

    // 계정 정보 조회
    const accountInfo = await callBybitAPI(
      "/v5/account/wallet-balance",
      { accountType: "UNIFIED", coin: "USDT" },
      apiKey,
      apiSecret,
      testnet,
    )

    // API 응답 확인
    if (accountInfo.retCode !== 0) {
      throw new Error(`API 오류: ${accountInfo.retMsg}`)
    }

    // 포지션 정보 조회
    const positions = await callBybitAPI(
      "/v5/position/list",
      { category: "linear", settleCoin: "USDT" },
      apiKey,
      apiSecret,
      testnet,
    )

    // PnL 히스토리 조회
    const pnlHistory = await callBybitAPI(
      "/v5/position/closed-pnl",
      { category: "linear", limit: 50 },
      apiKey,
      apiSecret,
      testnet,
    )

    // 데이터 가공
    const accountData: AccountData = {
      accountInfo: {
        totalWalletBalance: accountInfo.result?.list?.[0]?.totalWalletBalance || "0",
        totalUnrealizedPnl: accountInfo.result?.list?.[0]?.totalUnrealizedPnl || "0",
        totalMarginBalance: accountInfo.result?.list?.[0]?.totalMarginBalance || "0",
        accountType: accountInfo.result?.list?.[0]?.accountType || "UNIFIED",
      },
      positions: positions.result?.list?.filter((pos: any) => Number.parseFloat(pos.size) > 0) || [],
      recentOrders: [],
      pnlHistory: pnlHistory.result?.list || [],
    }

    return NextResponse.json(accountData)
  } catch (error) {
    console.error("바이비트 API 호출 오류:", error)
    return NextResponse.json(
      { error: `API 연결 실패: ${error instanceof Error ? error.message : "알 수 없는 오류"}` },
      { status: 500 },
    )
  }
}
