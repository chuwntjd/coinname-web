"use client"

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Area, ComposedChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// 샘플 RSI 데이터
const rsiData = [
  { time: "1", rsi: 45, price: 42000 },
  { time: "2", rsi: 52, price: 43500 },
  { time: "3", rsi: 58, price: 44200 },
  { time: "4", rsi: 65, price: 45800 },
  { time: "5", rsi: 72, price: 47200 },
  { time: "6", rsi: 78, price: 48500 },
  { time: "7", rsi: 82, price: 49100 },
  { time: "8", rsi: 75, price: 47800 },
  { time: "9", rsi: 68, price: 46500 },
  { time: "10", rsi: 55, price: 45200 },
  { time: "11", rsi: 42, price: 43800 },
  { time: "12", rsi: 35, price: 42100 },
  { time: "13", rsi: 28, price: 40500 },
  { time: "14", rsi: 22, price: 39200 },
  { time: "15", rsi: 25, price: 39800 },
  { time: "16", rsi: 38, price: 41200 },
  { time: "17", rsi: 48, price: 42800 },
  { time: "18", rsi: 55, price: 44100 },
]

export function RSIGuide() {
  return (
    <section id="rsi" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Content */}
          <div>
            <Badge variant="outline" className="mb-4 border-chart-1/50 text-chart-1">
              모멘텀 지표
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              RSI <span className="text-chart-1">(상대강도지수)</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              RSI는 일정 기간 동안 가격 상승폭과 하락폭의 비율을 계산하여 
              현재 시장이 과매수인지 과매도 상태인지를 판단하는 지표입니다.
            </p>

            <div className="mt-8 space-y-6">
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-success">📈 과매수 신호 (RSI &gt; 70)</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  RSI가 70을 넘으면 과매수 상태로, 가격 하락 가능성이 높아집니다. 
                  매도 또는 추가 매수 자제를 고려하세요.
                </p>
              </div>

              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-danger">📉 과매도 신호 (RSI &lt; 30)</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  RSI가 30 미만이면 과매도 상태로, 반등 가능성이 높아집니다. 
                  매수 기회로 활용할 수 있습니다.
                </p>
              </div>

              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold">⚡ 다이버전스 활용</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  가격과 RSI가 다른 방향으로 움직일 때 추세 전환 신호로 활용합니다.
                  강력한 매매 신호로 인식됩니다.
                </p>
              </div>
            </div>
          </div>

          {/* Chart */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg">RSI 차트 예시</CardTitle>
              <CardDescription>BTC/USDT 일봉 기준</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={rsiData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis 
                      dataKey="time" 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <ReferenceLine y={70} stroke="hsl(var(--success))" strokeDasharray="5 5" />
                    <ReferenceLine y={30} stroke="hsl(var(--danger))" strokeDasharray="5 5" />
                    <ReferenceLine y={50} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" strokeOpacity={0.5} />
                    <Area 
                      type="monotone" 
                      dataKey="rsi" 
                      stroke="none"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.1}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="rsi" 
                      stroke="hsl(var(--chart-1))" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-success" />
                  <span className="text-muted-foreground">과매수 (70)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-danger" />
                  <span className="text-muted-foreground">과매도 (30)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
