"use client"

import { CheckCircle, AlertTriangle, Lightbulb, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const strategies = [
  {
    title: "RSI + MACD 복합 전략",
    description: "두 지표의 신호가 일치할 때 진입하여 신뢰도를 높이는 전략",
    badges: ["중급", "추천"],
    steps: [
      "RSI가 30 이하로 과매도 상태 확인",
      "MACD 골든 크로스 발생 대기",
      "두 조건 충족 시 매수 진입",
      "RSI 70 이상 또는 MACD 데드 크로스 시 청산",
    ],
  },
  {
    title: "볼린저 밴드 + RSI 반전 전략",
    description: "볼린저 밴드 하단 터치와 RSI 과매도 동시 발생 시 매수",
    badges: ["초급", "인기"],
    steps: [
      "가격이 볼린저 밴드 하단 터치 확인",
      "동시에 RSI가 30 이하인지 확인",
      "반등 캔들 출현 시 매수",
      "중간선 또는 상단 밴드에서 분할 매도",
    ],
  },
  {
    title: "이동평균선 크로스 전략",
    description: "단기/장기 이동평균선의 교차를 활용한 추세 추종 전략",
    badges: ["초급", "기본"],
    steps: [
      "20일 이동평균선과 50일 이동평균선 설정",
      "20MA가 50MA를 상향 돌파 시 매수 (골든크로스)",
      "20MA가 50MA를 하향 돌파 시 매도 (데드크로스)",
      "거래량 증가와 함께 발생 시 신뢰도 상승",
    ],
  },
]

const tips = [
  {
    icon: CheckCircle,
    title: "복수 지표 확인",
    description: "하나의 지표만 믿지 말고 2-3개 지표가 동일한 신호를 보낼 때 진입하세요.",
  },
  {
    icon: AlertTriangle,
    title: "손절매 필수",
    description: "진입가 대비 3-5% 손실 시 기계적으로 손절하여 큰 손실을 방지하세요.",
  },
  {
    icon: Lightbulb,
    title: "시장 상황 파악",
    description: "횡보장과 추세장에서 지표의 신뢰도가 다릅니다. 시장 상황을 먼저 판단하세요.",
  },
  {
    icon: Target,
    title: "분할 매매",
    description: "한 번에 전량 매수/매도하지 말고 분할하여 평균 단가를 관리하세요.",
  },
]

export function StrategiesSection() {
  return (
    <section id="strategies" className="bg-secondary/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <Badge variant="outline" className="mb-4">
            실전 활용
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            보조 지표 활용 <span className="text-primary">매매 전략</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            여러 보조 지표를 조합하여 더 높은 승률의 매매 전략을 구사할 수 있습니다.
            아래 전략들을 참고하여 나만의 매매 원칙을 세워보세요.
          </p>
        </div>

        {/* Strategy Cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {strategies.map((strategy) => (
            <Card key={strategy.title} className="border-border/50 bg-card">
              <CardHeader>
                <div className="flex flex-wrap gap-2">
                  {strategy.badges.map((badge) => (
                    <Badge 
                      key={badge} 
                      variant={badge === "추천" || badge === "인기" ? "default" : "outline"}
                      className="text-xs"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="mt-2 text-lg">{strategy.title}</CardTitle>
                <CardDescription>{strategy.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {strategy.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips */}
        <div className="mt-16">
          <h3 className="text-center text-xl font-semibold">💡 매매 시 꼭 기억하세요</h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tips.map((tip) => (
              <div key={tip.title} className="rounded-lg border border-border/50 bg-card/50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <tip.icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="mt-4 font-semibold">{tip.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
