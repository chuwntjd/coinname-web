"use client"

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, ComposedChart, ReferenceLine } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// 샘플 MACD 데이터
const macdData = [
  { time: "1", macd: -120, signal: -80, histogram: -40 },
  { time: "2", macd: -80, signal: -75, histogram: -5 },
  { time: "3", macd: -40, signal: -60, histogram: 20 },
  { time: "4", macd: 10, signal: -30, histogram: 40 },
  { time: "5", macd: 60, signal: 10, histogram: 50 },
  { time: "6", macd: 100, signal: 50, histogram: 50 },
  { time: "7", macd: 130, signal: 80, histogram: 50 },
  { time: "8", macd: 140, signal: 105, histogram: 35 },
  { time: "9", macd: 130, signal: 115, histogram: 15 },
  { time: "10", macd: 100, signal: 112, histogram: -12 },
  { time: "11", macd: 60, signal: 95, histogram: -35 },
  { time: "12", macd: 20, signal: 70, histogram: -50 },
  { time: "13", macd: -20, signal: 40, histogram: -60 },
  { time: "14", macd: -50, signal: 10, histogram: -60 },
  { time: "15", macd: -60, signal: -15, histogram: -45 },
  { time: "16", macd: -50, signal: -30, histogram: -20 },
  { time: "17", macd: -30, signal: -32, histogram: 2 },
  { time: "18", macd: 0, signal: -20, histogram: 20 },
]

export function MACDGuide() {
  return (
    <section id="macd" className="bg-secondary/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Chart */}
          <Card className="order-2 border-border/50 bg-card/50 lg:order-1">
            <CardHeader>
              <CardTitle className="text-lg">MACD 차트 예시</CardTitle>
              <CardDescription>MACD 라인, 시그널 라인, 히스토그램</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={macdData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis 
                      dataKey="time" 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
                    <Bar 
                      dataKey="histogram" 
                      fill="hsl(var(--chart-3))"
                      fillOpacity={0.6}
                      radius={[2, 2, 0, 0]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="macd" 
                      stroke="hsl(var(--chart-1))" 
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="signal" 
                      stroke="hsl(var(--chart-2))" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-chart-1" />
                  <span className="text-muted-foreground">MACD</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-chart-2" />
                  <span className="text-muted-foreground">Signal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-chart-3" />
                  <span className="text-muted-foreground">Histogram</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <Badge variant="outline" className="mb-4 border-chart-3/50 text-chart-3">
              추세 지표
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              MACD <span className="text-chart-3">(이동평균수렴확산)</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              MACD는 두 이동평균선의 차이를 분석하여 추세의 방향, 강도, 
              전환점을 파악하는 대표적인 추세 추종 지표입니다.
            </p>

            <div className="mt-8 space-y-6">
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-success">🔼 골든 크로스 (매수 신호)</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  MACD 라인이 시그널 라인을 아래에서 위로 돌파할 때 발생합니다.
                  상승 추세 전환의 신호로 매수 타이밍으로 활용됩니다.
                </p>
              </div>

              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-danger">🔽 데드 크로스 (매도 신호)</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  MACD 라인이 시그널 라인을 위에서 아래로 돌파할 때 발생합니다.
                  하락 추세 전환의 신호로 매도 타이밍으로 활용됩니다.
                </p>
              </div>

              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold">📊 히스토그램 분석</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  히스토그램은 MACD와 시그널의 차이를 표시합니다.
                  막대가 점점 작아지면 추세 전환이 임박했음을 의미합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
