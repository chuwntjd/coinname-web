"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Users, Star, Crown, AlertCircle, BarChart3, Target, Zap } from "lucide-react"

export function TradingSection() {
  const [activeTab, setActiveTab] = useState("copy-trading")

  const strategies = [
    {
      id: 1,
      name: "보수적 장기 투자",
      description: "안정적인 수익을 추구하는 장기 투자 전략",
      risk: "낮음",
      expectedReturn: "8-12%",
      period: "6-12개월",
      icon: <Target className="h-5 w-5" />,
      color: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      name: "중위험 스윙 트레이딩",
      description: "중기적 관점에서 변동성을 활용한 수익 창출",
      risk: "중간",
      expectedReturn: "15-25%",
      period: "1-3개월",
      icon: <BarChart3 className="h-5 w-5" />,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 3,
      name: "고수익 데이트레이딩",
      description: "단기 변동성을 활용한 적극적 투자 전략",
      risk: "높음",
      expectedReturn: "30-50%",
      period: "1일-1주",
      icon: <Zap className="h-5 w-5" />,
      color: "bg-red-100 text-red-800",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Crown Trader</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            전문 트레이더들의 검증된 전략을 따라하거나, 나만의 투자 전략을 구축하세요
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
            <TabsTrigger value="copy-trading" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              카피트레이딩
            </TabsTrigger>
            <TabsTrigger value="strategy-trading" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              전략트레이딩
            </TabsTrigger>
          </TabsList>

          <TabsContent value="copy-trading" className="space-y-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <AlertCircle className="h-12 w-12 text-orange-600" />
                  </div>
                  <CardTitle className="text-2xl text-orange-900">서비스 준비 중</CardTitle>
                  <CardDescription className="text-orange-700">
                    카피트레이딩 서비스는 현재 개선 작업 중입니다
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-orange-800">
                    더 안전하고 투명한 카피트레이딩 환경을 제공하기 위해 시스템을 업그레이드하고 있습니다.
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-2">개선 중인 기능들:</h4>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• 실시간 트레이더 성과 추적</li>
                      <li>• 리스크 관리 시스템 강화</li>
                      <li>• 투명한 수수료 구조</li>
                      <li>• 고급 필터링 및 검색</li>
                    </ul>
                  </div>
                  <p className="text-sm text-orange-600">
                    서비스 재개 시 알림을 받으시려면 커뮤니티에서 공지사항을 확인해주세요.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="strategy-trading" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              {strategies.map((strategy) => (
                <Card key={strategy.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {strategy.icon}
                        <CardTitle className="text-lg">{strategy.name}</CardTitle>
                      </div>
                      <Badge className={strategy.color}>{strategy.risk}</Badge>
                    </div>
                    <CardDescription>{strategy.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">예상 수익률</p>
                        <p className="font-semibold text-green-600">{strategy.expectedReturn}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">투자 기간</p>
                        <p className="font-semibold">{strategy.period}</p>
                      </div>
                    </div>
                    <Button className="w-full bg-transparent" variant="outline">
                      전략 상세보기
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Crown className="h-12 w-12 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl text-purple-900">Crown Trader 프리미엄</CardTitle>
                  <CardDescription className="text-purple-700">
                    전문가 수준의 고급 트레이딩 도구와 분석을 제공합니다
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-purple-900">포함된 기능:</h4>
                      <ul className="space-y-2 text-sm text-purple-800">
                        <li className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-purple-600" />
                          실시간 시장 분석 및 알림
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-purple-600" />
                          고급 차트 분석 도구
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-purple-600" />
                          포트폴리오 최적화 제안
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-purple-600" />
                          전문가 1:1 상담 서비스
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-purple-900">프리미엄 혜택:</h4>
                      <ul className="space-y-2 text-sm text-purple-800">
                        <li className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-purple-600" />
                          수수료 50% 할인
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-purple-600" />
                          우선 고객 지원
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-purple-600" />
                          독점 투자 정보 제공
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-purple-600" />
                          월간 투자 리포트
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="text-center">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                      프리미엄 시작하기
                    </Button>
                    <p className="text-sm text-purple-600 mt-2">첫 달 무료 체험 가능</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
