import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RealTimeStats } from "@/components/real-time-stats"
import { TrendingUp, Users, MessageCircle, Shield } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "코인네임 - 암호화폐 커뮤니티 | 비트코인 이더리움 투자정보 실시간 공유",
  description:
    "🚀 대한민국 최고의 암호화폐 커뮤니티! 비트코인, 이더리움 투자정보와 실시간 채팅. 전문가 분석, 코인 뉴스, 투자 경험담을 한곳에서 만나보세요. 지금 가입하고 투자 수익률을 높이세요!",
  keywords:
    "코인네임, 암호화폐 커뮤니티, 비트코인, 이더리움, 코인 사이트, 가상화폐, 투자정보, 코인 분석, 암호화폐 뉴스, 실시간 채팅",
  openGraph: {
    title: "코인네임 - 대한민국 최고의 암호화폐 커뮤니티 🚀",
    description: "비트코인, 이더리움 투자정보 실시간 공유! 전문가 분석 📈 투자자 경험담 💰 실시간 채팅 💬",
    url: "https://coinname.kr",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200&text=코인네임+메인페이지",
        width: 1200,
        height: 630,
        alt: "코인네임 메인페이지 - 암호화폐 커뮤니티",
      },
    ],
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-8">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            코인네임
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            대한민국 최고의 암호화폐 커뮤니티 플랫폼
            <br />
            전문가 분석부터 실시간 채팅까지, 모든 것을 한곳에서
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/community">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                커뮤니티 참여하기
              </Button>
            </Link>
            <Link href="/levels">
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
              >
                등급 시스템 보기
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">실시간 분석</h3>
              <p className="text-sm text-gray-600">전문가들의 실시간 시장 분석과 투자 인사이트</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">활발한 커뮤니티</h3>
              <p className="text-sm text-gray-600">수천 명의 투자자들과 경험과 정보 공유</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">실시간 채팅</h3>
              <p className="text-sm text-gray-600">24시간 실시간 채팅으로 즉시 소통</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">신뢰할 수 있는</h3>
              <p className="text-sm text-gray-600">검증된 정보와 안전한 투자 환경</p>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Stats Section */}
        <RealTimeStats />

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">지금 바로 시작하세요</h2>
          <p className="text-xl mb-8 opacity-90">코인네임 커뮤니티에 참여하고 더 나은 투자 결정을 내리세요</p>
          <Link href="/community">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              무료로 시작하기
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
