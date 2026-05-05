"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NewsItem {
  id: string
  title: string
  summary: string
  source: string
  sourceUrl: string
  publishedAt: string
  category: string
  isExternal: boolean
}

export function NewsAggregator() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 합법적인 뉴스 데이터 (요약 + 출처)
    const legalNewsData: NewsItem[] = [
      {
        id: "1",
        title: "비트코인 ETF 승인 관련 시장 동향 분석",
        summary: "SEC의 비트코인 ETF 승인 소식에 따른 시장 반응과 전문가들의 분석을 종합해보면...",
        source: "코인네임 분석팀",
        sourceUrl: "#",
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        category: "분석",
        isExternal: false,
      },
      {
        id: "2",
        title: "이더리움 2.0 업그레이드 완료 소식 요약",
        summary: "주요 언론사들이 보도한 이더리움 2.0 업그레이드 완료 소식을 정리하면...",
        source: "외부 언론사 종합",
        sourceUrl: "https://ethereum.org",
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        category: "뉴스",
        isExternal: true,
      },
      {
        id: "3",
        title: "국내 암호화폐 규제 동향 정리",
        summary: "금융위원회 발표 내용을 바탕으로 한 국내 암호화폐 규제 현황 분석...",
        source: "코인네임 리서치",
        sourceUrl: "#",
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        category: "규제",
        isExternal: false,
      },
    ]

    setNews(legalNewsData)
    setLoading(false)
  }, [])

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "방금 전"
    if (diffInHours < 24) return `${diffInHours}시간 전`
    return `${Math.floor(diffInHours / 24)}일 전`
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "분석":
        return "bg-blue-100 text-blue-800"
      case "뉴스":
        return "bg-green-100 text-green-800"
      case "규제":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return <div className="animate-pulse">뉴스를 불러오는 중...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">암호화폐 뉴스</h2>
        <div className="text-sm text-gray-500">
          <TrendingUp className="h-4 w-4 inline mr-1" />
          실시간 업데이트
        </div>
      </div>

      <div className="grid gap-6">
        {news.map((item) => (
          <article
            key={item.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTimeAgo(item.publishedAt)}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
                  {item.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">{item.summary}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>출처: {item.source}</span>
                    {item.isExternal && <span className="text-blue-600">(외부 링크)</span>}
                  </div>

                  {item.isExternal && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(item.sourceUrl, "_blank")}
                      className="bg-transparent"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      원문 보기
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* 저작권 고지 */}
            {item.isExternal && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  ⚠️ 본 내용은 외부 소스를 요약한 것으로, 자세한 내용은 원문을 참조하시기 바랍니다. 저작권은 원 출처에
                  있습니다.
                </p>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* 면책 조항 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-800 mb-2">📋 뉴스 이용 안내</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• 외부 뉴스는 요약 형태로 제공되며, 정확한 정보는 원문을 확인하세요</li>
          <li>• 모든 외부 콘텐츠의 저작권은 해당 언론사에 있습니다</li>
          <li>• 투자 결정은 개인의 책임이며, 뉴스 내용에 대한 책임을 지지 않습니다</li>
          <li>• 저작권 문제 시 즉시 삭제 조치됩니다</li>
        </ul>
      </div>
    </div>
  )
}
