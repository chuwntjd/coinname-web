export type EventCategory = 
  | "token_unlock" 
  | "airdrop" 
  | "mainnet" 
  | "partnership" 
  | "conference" 
  | "update"
  | "listing"

export interface CryptoEvent {
  id: string
  title: string
  coin: string
  symbol: string
  category: EventCategory
  date: string
  time: string
  description: string
  importance: "high" | "medium" | "low"
  link?: string
}

export const categoryLabels: Record<EventCategory, string> = {
  token_unlock: "토큰 언락",
  airdrop: "에어드랍",
  mainnet: "메인넷",
  partnership: "파트너십",
  conference: "컨퍼런스",
  update: "업데이트",
  listing: "상장",
}

export const categoryColors: Record<EventCategory, string> = {
  token_unlock: "bg-chart-1 text-primary-foreground",
  airdrop: "bg-chart-2 text-accent-foreground",
  mainnet: "bg-chart-5 text-primary-foreground",
  partnership: "bg-chart-4 text-primary-foreground",
  conference: "bg-primary text-primary-foreground",
  update: "bg-muted-foreground text-background",
  listing: "bg-chart-3 text-primary-foreground",
}

// 샘플 이벤트 데이터
export const cryptoEvents: CryptoEvent[] = [
  {
    id: "1",
    title: "ARB 토큰 대규모 언락",
    coin: "Arbitrum",
    symbol: "ARB",
    category: "token_unlock",
    date: "2026-05-10",
    time: "09:00",
    description: "약 11억 달러 규모의 ARB 토큰이 시장에 풀립니다. 팀 및 초기 투자자 물량입니다.",
    importance: "high",
    link: "https://arbitrum.io",
  },
  {
    id: "2",
    title: "LayerZero 에어드랍 클레임 시작",
    coin: "LayerZero",
    symbol: "ZRO",
    category: "airdrop",
    date: "2026-05-12",
    time: "15:00",
    description: "LayerZero 에어드랍 클레임이 시작됩니다. 자격 요건을 확인하세요.",
    importance: "high",
    link: "https://layerzero.network",
  },
  {
    id: "3",
    title: "Sui 메인넷 업그레이드",
    coin: "Sui",
    symbol: "SUI",
    category: "mainnet",
    date: "2026-05-14",
    time: "12:00",
    description: "Sui 네트워크 v2.0 메인넷 업그레이드가 진행됩니다.",
    importance: "medium",
    link: "https://sui.io",
  },
  {
    id: "4",
    title: "Chainlink x Google Cloud 파트너십 발표",
    coin: "Chainlink",
    symbol: "LINK",
    category: "partnership",
    date: "2026-05-15",
    time: "18:00",
    description: "Chainlink와 Google Cloud의 새로운 전략적 파트너십이 발표됩니다.",
    importance: "high",
  },
  {
    id: "5",
    title: "ETH Seoul 2026",
    coin: "Ethereum",
    symbol: "ETH",
    category: "conference",
    date: "2026-05-20",
    time: "10:00",
    description: "아시아 최대 이더리움 컨퍼런스 ETH Seoul 2026이 개최됩니다.",
    importance: "medium",
    link: "https://ethseoul.org",
  },
  {
    id: "6",
    title: "OP 토큰 언락",
    coin: "Optimism",
    symbol: "OP",
    category: "token_unlock",
    date: "2026-05-08",
    time: "00:00",
    description: "약 3,100만 OP 토큰이 언락됩니다.",
    importance: "medium",
  },
  {
    id: "7",
    title: "Starknet 에어드랍 2차",
    coin: "Starknet",
    symbol: "STRK",
    category: "airdrop",
    date: "2026-05-18",
    time: "14:00",
    description: "Starknet 2차 에어드랍이 진행됩니다. 스냅샷 완료.",
    importance: "high",
  },
  {
    id: "8",
    title: "Solana Firedancer 런칭",
    coin: "Solana",
    symbol: "SOL",
    category: "update",
    date: "2026-05-25",
    time: "16:00",
    description: "Jump Trading에서 개발한 새로운 Solana 검증자 클라이언트 Firedancer가 메인넷에 배포됩니다.",
    importance: "high",
  },
  {
    id: "9",
    title: "AVAX 코인베이스 상장",
    coin: "Avalanche",
    symbol: "AVAX",
    category: "listing",
    date: "2026-05-11",
    time: "17:00",
    description: "Avalanche 신규 토큰이 Coinbase에 상장됩니다.",
    importance: "medium",
  },
  {
    id: "10",
    title: "Polygon zkEVM 업그레이드",
    coin: "Polygon",
    symbol: "POL",
    category: "update",
    date: "2026-05-22",
    time: "11:00",
    description: "Polygon zkEVM Type 1 업그레이드가 진행됩니다.",
    importance: "medium",
  },
  {
    id: "11",
    title: "dYdX 토큰 언락",
    coin: "dYdX",
    symbol: "DYDX",
    category: "token_unlock",
    date: "2026-05-09",
    time: "08:00",
    description: "약 800만 DYDX 토큰이 투자자 물량으로 언락됩니다.",
    importance: "low",
  },
  {
    id: "12",
    title: "Celestia 메인넷 v2 런칭",
    coin: "Celestia",
    symbol: "TIA",
    category: "mainnet",
    date: "2026-05-28",
    time: "13:00",
    description: "Celestia 모듈러 블록체인 v2 메인넷이 런칭됩니다.",
    importance: "high",
  },
]
