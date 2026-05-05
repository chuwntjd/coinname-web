// 합법적인 뉴스 수집 유틸리티

interface NewsSource {
  name: string
  rssUrl?: string
  apiUrl?: string
  apiKey?: string
  isPublic: boolean
}

export const legalNewsSources: NewsSource[] = [
  {
    name: "CoinGecko",
    apiUrl: "https://api.coingecko.com/api/v3/news",
    isPublic: true, // 공개 API
  },
  {
    name: "CryptoCompare",
    apiUrl: "https://min-api.cryptocompare.com/data/v2/news/",
    apiKey: process.env.CRYPTOCOMPARE_API_KEY,
    isPublic: false,
  },
  {
    name: "NewsAPI",
    apiUrl: "https://newsapi.org/v2/everything",
    apiKey: process.env.NEWS_API_KEY,
    isPublic: false,
  },
]

export async function fetchLegalNews() {
  try {
    // 공개 API 사용 예시
    const response = await fetch("https://api.coingecko.com/api/v3/news?per_page=10", {
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("뉴스 API 호출 실패")
    }

    const data = await response.json()

    // 데이터 가공 (요약 형태로 변환)
    return (
      data.data?.map((item: any) => ({
        id: item.id,
        title: item.title,
        summary: item.description?.substring(0, 200) + "...",
        source: item.source?.name || "CoinGecko",
        sourceUrl: item.url,
        publishedAt: item.published_at,
        category: "뉴스",
        isExternal: true,
      })) || []
    )
  } catch (error) {
    console.error("뉴스 수집 오류:", error)
    return []
  }
}

// RSS 피드 파싱 (서버사이드에서만)
export async function parseRSSFeed(rssUrl: string) {
  // RSS 파싱 로직 (서버에서만 실행)
  // 클라이언트에서는 CORS 문제로 직접 접근 불가
}
