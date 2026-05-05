import { Calendar, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NewsSection() {
  const news = [
    {
      title: "JY, 주요 DeFi 프로토콜과 파트너십으로 유동성 강화",
      excerpt: "JY 홀더들에게 새로운 유동성 풀과 이자 농사 기회를 제공하는 전략적 파트너십 발표입니다.",
      date: "2024-01-15",
      category: "파트너십",
      image: "/placeholder.svg?height=200&width=300",
      link: "#",
    },
    {
      title: "2023년 4분기 개발 업데이트: 크로스체인 브릿지 정식 오픈",
      excerpt:
        "많은 기대를 받았던 크로스체인 브릿지가 정식 운영을 시작하여 이더리움과 폴리곤 간 원활한 전송이 가능합니다.",
      date: "2024-01-10",
      category: "개발",
      image: "/placeholder.svg?height=200&width=300",
      link: "#",
    },
    {
      title: "JY, 이번 달 3개 주요 거래소 추가 상장",
      excerpt: "업비트, 코인원, 게이트아이오 상장으로 접근성을 확대하여 수백만 명의 새로운 사용자에게 JY를 제공합니다.",
      date: "2024-01-05",
      category: "거래소",
      image: "/placeholder.svg?height=200&width=300",
      link: "#",
    },
  ]

  const mediaFeatures = [
    {
      outlet: "코인데스크 코리아",
      title: "JY: 차세대 DeFi 인프라의 새로운 패러다임",
      date: "2024-01-12",
      link: "#",
    },
    {
      outlet: "블록미디어",
      title: "JY가 블록체인 확장성 문제를 해결하는 방법",
      date: "2024-01-08",
      link: "#",
    },
    {
      outlet: "디센터",
      title: "JY, 시리즈 A에서 500억원 투자 유치",
      date: "2024-01-03",
      link: "#",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "파트너십":
        return "bg-blue-100 text-blue-800"
      case "개발":
        return "bg-green-100 text-green-800"
      case "거래소":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <section id="news" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">최신 뉴스 & 업데이트</h2>
          <p className="text-lg text-gray-600">최신 개발 사항, 파트너십, 마일스톤 소식을 확인하세요</p>
        </div>

        {/* 주요 뉴스 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {news.map((article, index) => (
            <article
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                      article.category,
                    )}`}
                  >
                    {article.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(article.date).toLocaleDateString("ko-KR")}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                <Button variant="ghost" className="p-0 h-auto font-medium">
                  더 읽기 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* 언론 보도 */}
        <div className="bg-white rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">언론 보도</h3>
          <div className="space-y-4">
            {mediaFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-blue-600 text-sm">{feature.outlet}</span>
                    <span className="text-gray-900 font-medium">{feature.title}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(feature.date).toLocaleDateString("ko-KR")}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* 뉴스레터 구독 */}
        <div className="mt-12 bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">최신 소식 받기</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            뉴스레터를 구독하여 최신 뉴스, 업데이트, 독점 인사이트를 이메일로 직접 받아보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="이메일 주소를 입력하세요"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">구독하기</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
