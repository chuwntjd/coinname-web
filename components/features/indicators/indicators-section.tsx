"use client"

import { Activity, TrendingUp, TrendingDown, BarChart2, Layers, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const indicators = [
  {
    icon: Activity,
    title: "RSI (상대강도지수)",
    description: "과매수/과매도 상태를 판단하는 대표적인 모멘텀 지표",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    icon: TrendingUp,
    title: "MACD",
    description: "이동평균선의 수렴과 발산을 통해 추세 전환을 포착",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    icon: BarChart2,
    title: "볼린저 밴드",
    description: "가격의 변동성을 시각화하여 매매 타이밍 포착",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    icon: Layers,
    title: "이동평균선 (MA)",
    description: "가격의 평균을 통해 추세의 방향과 강도를 파악",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  {
    icon: TrendingDown,
    title: "스토캐스틱",
    description: "현재 가격이 일정 기간 중 어느 위치에 있는지 표시",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    icon: Target,
    title: "피보나치 되돌림",
    description: "주요 지지/저항 레벨을 예측하는 필수 도구",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

export function IndicatorsSection() {
  return (
    <section id="indicators" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            핵심 <span className="text-primary">보조 지표</span> 소개
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            성공적인 코인 투자를 위해 반드시 알아야 할 기술적 분석 지표들을 소개합니다.
            각 지표의 특징과 활용법을 익혀보세요.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {indicators.map((indicator) => (
            <Card
              key={indicator.title}
              className="group cursor-pointer border-border/50 bg-card/50 transition-all hover:border-primary/50 hover:bg-card"
            >
              <CardHeader>
                <div className={`mb-2 flex h-12 w-12 items-center justify-center rounded-xl ${indicator.bgColor}`}>
                  <indicator.icon className={`h-6 w-6 ${indicator.color}`} />
                </div>
                <CardTitle className="text-lg">{indicator.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {indicator.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                  자세히 알아보기 →
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
