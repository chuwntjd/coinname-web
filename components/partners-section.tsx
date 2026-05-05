export function PartnersSection() {
  const partners = [
    {
      name: "업비트",
      logo: "/placeholder.svg?height=80&width=200",
      category: "거래소",
    },
    {
      name: "빗썸",
      logo: "/placeholder.svg?height=80&width=200",
      category: "거래소",
    },
    {
      name: "메타마스크",
      logo: "/placeholder.svg?height=80&width=200",
      category: "지갑",
    },
    {
      name: "체인링크",
      logo: "/placeholder.svg?height=80&width=200",
      category: "오라클",
    },
    {
      name: "폴리곤",
      logo: "/placeholder.svg?height=80&width=200",
      category: "인프라",
    },
    {
      name: "유니스왑",
      logo: "/placeholder.svg?height=80&width=200",
      category: "DeFi",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">파트너사</h2>
          <p className="text-lg text-gray-600">블록체인 생태계의 선도적인 플랫폼과 기관들의 신뢰를 받고 있습니다</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center"
            >
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={`${partner.name} 로고`}
                className="h-12 w-auto mb-3 grayscale hover:grayscale-0 transition-all"
              />
              <div className="text-center">
                <div className="font-medium text-gray-900 text-sm">{partner.name}</div>
                <div className="text-xs text-gray-500 mt-1">{partner.category}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 통합 정보 */}
        <div className="mt-12 bg-white rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">지원 지갑 & 거래소</h3>
          <p className="text-gray-600 mb-6">JY는 주요 거래소에서 거래 가능하며 인기 지갑에서 지원됩니다</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">거래소</h4>
              <p className="text-sm text-gray-600">업비트, 빗썸, 코인원 등 15개 이상의 거래소에서 JY 거래</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">지갑</h4>
              <p className="text-sm text-gray-600">메타마스크, 트러스트 월렛, 레저 등에서 JY를 안전하게 보관</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">DeFi</h4>
              <p className="text-sm text-gray-600">유니스왑, 스시스왑, 컴파운드 등 DeFi 프로토콜에서 JY 활용</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
