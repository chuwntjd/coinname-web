import { CheckCircle, Circle, Clock } from "lucide-react"

export function Roadmap() {
  const roadmapItems = [
    {
      year: "2024년 1분기",
      title: "기반 구축 & 런칭",
      status: "completed" as const,
      items: ["메인넷 출시", "초기 토큰 분배", "핵심 팀 구성", "커뮤니티 구축"],
    },
    {
      year: "2024년 2분기",
      title: "플랫폼 개발",
      status: "completed" as const,
      items: ["스마트 컨트랙트 플랫폼", "개발자 도구 출시", "첫 DeFi 파트너십", "모바일 지갑 출시"],
    },
    {
      year: "2024년 3분기",
      title: "생태계 확장",
      status: "in-progress" as const,
      items: ["크로스체인 브릿지", "NFT 마켓플레이스", "거버넌스 구현", "주요 거래소 상장"],
    },
    {
      year: "2024년 4분기",
      title: "글로벌 채택",
      status: "upcoming" as const,
      items: ["기업 파트너십", "레이어 2 솔루션", "글로벌 마케팅 캠페인", "기관 투자 상품"],
    },
    {
      year: "2025년",
      title: "혁신 & 확장",
      status: "upcoming" as const,
      items: ["AI 통합", "양자 저항 보안", "글로벌 확장", "차세대 기능"],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-green-600" />
      case "in-progress":
        return <Clock className="h-6 w-6 text-blue-600" />
      default:
        return <Circle className="h-6 w-6 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-200 bg-green-50"
      case "in-progress":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <section id="roadmap" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">개발 로드맵</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            JY의 진화와 성장을 위해 계획된 주요 마일스톤과 개발 사항을 보여주는 전략적 로드맵입니다.
          </p>
        </div>

        <div className="space-y-8">
          {roadmapItems.map((item, index) => (
            <div key={index} className={`relative p-6 rounded-xl border-2 ${getStatusColor(item.status)}`}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">{getStatusIcon(item.status)}</div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.year}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : item.status === "in-progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.status === "completed" ? "완료" : item.status === "in-progress" ? "진행중" : "예정"}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {item.items.map((subItem, subIndex) => (
                      <div key={subIndex} className="flex items-center space-x-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                        <span>{subItem}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
