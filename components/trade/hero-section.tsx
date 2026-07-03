import { ArrowDown, Shield, Zap, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  {
    icon: Shield,
    title: "검증된 거래소",
    description: "안전하고 신뢰할 수 있는 거래소만 선별",
  },
  {
    icon: Zap,
    title: "즉시 혜택 적용",
    description: "레퍼럴 링크를 통해 자동으로 할인 적용",
  },
  {
    icon: Gift,
    title: "추가 보너스",
    description: "가입 시 특별 보너스 및 이벤트 참여",
  },
]

export function TradeHeroSection() {
  return (
    <section className="relative min-h-[80vh] sm:min-h-screen flex items-center justify-center pt-8 sm:pt-16 overflow-hidden">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-background to-yellow-500/5" />
      <div className="absolute top-1/4 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-orange-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-yellow-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10 py-10 sm:py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* 배지 */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs sm:text-sm font-medium mb-4 sm:mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            2026년 최신 혜택 업데이트
          </div>

          {/* 타이틀 */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
            암호화폐 거래소
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
              수수료 할인 혜택
            </span>
          </h1>

          {/* 설명 */}
          <p className="text-sm sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-10 text-pretty max-w-2xl mx-auto px-2">
            OKX, Binance, Bybit 등 주요 거래소의 최대 수수료 할인 혜택을 한눈에 비교하고 가장 유리한 조건으로 시작하세요.
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-16 px-4 sm:px-0">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 text-sm sm:text-base">
              <Link href="#exchanges">거래소 비교하기</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-6 sm:px-8 text-sm sm:text-base">
              <Link href="#guide">가입 가이드 보기</Link>
            </Button>
          </div>

          {/* 특징 카드 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card/50 backdrop-blur border border-border hover:border-orange-500/30 transition-all"
              >
                <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500 mb-2 sm:mb-4 mx-auto" />
                <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs sm:text-sm">스크롤</span>
          <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
