"use client"

import { ArrowRight, BarChart3, LineChart, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Activity className="h-4 w-4" />
            <span>암호화폐 기술적 분석 완벽 가이드</span>
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            코인 투자 보조 지표
            <br />
            <span className="text-primary">사용법 가이드</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground lg:text-xl">
            RSI, MACD, 볼린저 밴드 등 핵심 기술적 분석 지표의 원리와 활용법을 
            초보자도 쉽게 이해할 수 있도록 상세하게 설명합니다.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="gap-2 font-semibold">
              지표 학습 시작하기
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="font-semibold">
              무료 가이드 다운로드
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 lg:gap-16">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <span className="mt-3 text-2xl font-bold lg:text-3xl">15+</span>
              <span className="text-sm text-muted-foreground">기술적 지표</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <span className="mt-3 text-2xl font-bold lg:text-3xl">50+</span>
              <span className="text-sm text-muted-foreground">매매 전략</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <span className="mt-3 text-2xl font-bold lg:text-3xl">실시간</span>
              <span className="text-sm text-muted-foreground">차트 예시</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
