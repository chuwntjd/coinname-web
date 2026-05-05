import { NextResponse } from "next/server"

interface NewsItem {
  id: string
  title: string
  summary: string
  url: string
  publishedAt: string
  source: string
  category: string
  imageUrl?: string
}

interface NewsResponse {
  articles: NewsItem[]
  lastUpdate: string
  source: string
  error?: string
}

export async function GET() {
  try {
    // CoinDesk API 또는 CryptoNews API 사용 시도
    const response = await fetch(
      "https://newsapi.org/v2/everything?q=cryptocurrency&sortBy=publishedAt&apiKey=YOUR_NEWS_API_KEY",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "User-Agent": "CoinName-Website/1.0",
        },
        next: {
          revalidate: 600, // 10분마다 재검증
        },
      },
    )

    if (!response.ok) {
      throw new Error(`뉴스 API 오류: ${response.status}`)
    }

    const data = await response.json()

    if (data.status === "ok" && data.articles) {
      const articles: NewsItem[] = data.articles.slice(0, 20).map((article: any, index: number) => ({
        id: `news_${Date.now()}_${index}`,
        title: article.title || "제목 없음",
        summary: article.description || "요약 없음",
        url: article.url || "#",
        publishedAt: article.publishedAt || new Date().toISOString(),
        source: article.source?.name || "Unknown",
        category: "cryptocurrency",
        imageUrl: article.urlToImage,
      }))

      return NextResponse.json({
        articles,
        lastUpdate: new Date().toISOString(),
        source: "NewsAPI",
      })
    }

    throw new Error("유효한 뉴스 데이터가 없습니다")
  } catch (error) {
    console.error("뉴스 API 오류:", error)

    return NextResponse.json(
      {
        articles: [],
        lastUpdate: new Date().toISOString(),
        source: "Error",
        error: error instanceof Error ? error.message : "뉴스를 불러올 수 없습니다",
      },
      { status: 500 },
    )
  }
}
