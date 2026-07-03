import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="pt-8 sm:pt-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* 콘텐츠 */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                탈중앙화 금융의
                <span className="text-blue-600"> 미래</span>
                <br />
                코인네임
              </h1>
              <p className="text-base sm:text-xl text-gray-600 leading-relaxed">
                코인네임은 혁신적인 기술, 투명한 거버넌스, 지속 가능한 토큰경제학으로 차세대 DeFi 애플리케이션을 위한
                블록체인 생태계를 혁신하고 있습니다.
              </p>
            </div>

            {/* 미션 & 비전 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-3 sm:p-4 bg-white rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">우리의 미션</h3>
                <p className="text-xs sm:text-sm text-gray-600">블록체인 혁신을 통해 금융 서비스에 대한 접근을 민주화합니다.</p>
              </div>
              <div className="p-3 sm:p-4 bg-white rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">우리의 비전</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  모든 사람이 투명한 금융 도구에 평등하게 접근할 수 있는 세상을 만듭니다.
                </p>
              </div>
            </div>

            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base">
                토큰 구매 <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-sm sm:text-base">
                <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                백서 다운로드
              </Button>
              <Button size="lg" variant="outline" className="text-sm sm:text-base hidden sm:flex">
                <Users className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                커뮤니티 가입
              </Button>
            </div>
          </div>

          {/* 히어로 이미지 */}
          <div className="relative mt-8 lg:mt-0">
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl sm:rounded-2xl flex items-center justify-center max-w-sm mx-auto lg:max-w-none">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="JY 블록체인 네트워크"
                className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
              />
            </div>
            {/* 플로팅 통계 */}
            <div className="absolute -bottom-3 sm:-bottom-6 left-2 sm:-left-6 bg-white p-2 sm:p-4 rounded-lg shadow-lg border border-gray-200">
              <div className="text-lg sm:text-2xl font-bold text-blue-600">5만+</div>
              <div className="text-xs sm:text-sm text-gray-600">활성 사용자</div>
            </div>
            <div className="absolute -top-3 sm:-top-6 right-2 sm:-right-6 bg-white p-2 sm:p-4 rounded-lg shadow-lg border border-gray-200">
              <div className="text-lg sm:text-2xl font-bold text-green-600">25억원</div>
              <div className="text-xs sm:text-sm text-gray-600">총 거래량</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
