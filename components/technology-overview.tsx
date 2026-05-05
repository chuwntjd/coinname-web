import { Shield, Zap, Globe, Code } from "lucide-react"

export function TechnologyOverview() {
  const features = [
    {
      icon: Shield,
      title: "지분증명 합의 알고리즘",
      description: "네트워크 보안과 탈중앙화를 보장하는 에너지 효율적인 합의 메커니즘입니다.",
    },
    {
      icon: Zap,
      title: "초고속 트랜잭션",
      description: "최소한의 수수료로 초당 최대 10,000건의 트랜잭션을 처리합니다.",
    },
    {
      icon: Globe,
      title: "크로스체인 호환성",
      description: "여러 블록체인 네트워크와 프로토콜과 원활하게 상호작용합니다.",
    },
    {
      icon: Code,
      title: "스마트 컨트랙트 플랫폼",
      description: "복잡한 스마트 컨트랙트와 DeFi 애플리케이션을 완벽하게 지원합니다.",
    },
  ]

  return (
    <section id="technology" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">기술 개요</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            차세대 탈중앙화 애플리케이션을 위한 확장성, 보안성, 지속가능성에 중점을 둔 최첨단 블록체인 기술로
            구축되었습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* 기술 사양 */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">기술 사양</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{"<1초"}</div>
              <div className="text-sm text-gray-600">블록 생성 시간</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-sm text-gray-600">TPS 처리 능력</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{"<₩13"}</div>
              <div className="text-sm text-gray-600">트랜잭션 수수료</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
