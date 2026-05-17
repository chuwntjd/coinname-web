"use client"

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, ComposedChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// 샘플 볼린저 밴드 데이터
const bollingerData = [
  { time: "1", price: 44000, upper: 46000, middle: 44500, lower: 43000 },
  { time: "2", price: 44500, upper: 46200, middle: 44600, lower: 43000 },
  { time: "3", price: 45200, upper: 46500, middle: 44800, lower: 43100 },
  { time: "4", price: 46100, upper: 47000, middle: 45200, lower: 43400 },
  { time: "5", price: 46800, upper: 47500, middle: 45600, lower: 43700 },
  { time: "6", price: 47200, upper: 48000, middle: 46000, lower: 44000 },
  { time: "7", price: 46500, upper: 48200, middle: 46200, lower: 44200 },
  { time: "8", price: 45800, upper: 48000, middle: 46000, lower: 44000 },
  { time: "9", price: 44800, upper: 47500, middle: 45500, lower: 43500 },
  { time: "10", price: 43800, upper: 47000, middle: 45000, lower: 43000 },
  { time: "11", price: 43200, upper: 46500, middle: 44500, lower: 42500 },
  { time: "12", price: 42800, upper: 46000, middle: 44000, lower: 42000 },
  { time: "13", price: 43500, upper: 45800, middle: 43800, lower: 41800 },
  { time: "14", price: 44200, upper: 45600, middle: 43700, lower: 41800 },
  { time: "15", price: 44800, upper: 45500, middle: 43700, lower: 41900 },
  { time: "16", price: 45200, upper: 45600, middle: 43900, lower: 42200 },
  { time: "17", price: 45800, upper: 46000, middle: 44200, lower: 42400 },
  { time: "18", price: 46200, upper: 46500, middle: 44600, lower: 42700 },
]

export function BollingerGuide() {
  return (
    <section id="bollinger" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Content */}
          <div>
            <Badge variant="outline" className="mb-4 border-chart-4/50 text-chart-4">
              변동성 지표
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              볼린저 밴드 <span className="text-chart-4">(Bollinger Bands)</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              볼린저 밴드는 이동평균선을 중심으로 상하단에 표준편차 밴드를 그려
              가격의 변동성과 매매 타이밍을 파악하는 지표입니다.
            </p>

            <div className="mt-8 space-y-6">
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-danger">🔴 상단 밴드 터치 (과매수)</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  가격이 상단 밴드에 닿거나 벗어나면 과매수 상태입니다.
                  단기 조정이나 하락 가능성을 고려해야 합니다.
                </p>
              </div>

              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-success">🟢 하단 밴드 터치 (과매도)</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  가격이 하단 밴드에 닿거나 벗어나면 과매도 상태입니다.
                  반등 가능성이 높아 매수 기회로 활용할 수 있습니다.
                </p>
              </div>

              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold">📏 밴드 수축과 확장</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  밴드가 좁아지면 변동성이 감소하여 큰 움직임이 임박합니다.
                  밴드가 넓어지면 변동성이 증가하는 시점입니다.
                </p>
              </div>

              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold">🎯 밴드 워킹</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  강한 추세에서 가격이 밴드를 따라 이동하는 현상입니다.
                  추세의 강도를 확인하는 데 활용됩니다.
                </p>
              </div>
            </div>
          </div>

          {/* Chart */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg">볼린저 밴드 차트 예시</CardTitle>
              <CardDescription>상단/중간/하단 밴드와 가격</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={bollingerData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis 
                      dataKey="time" 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      domain={['dataMin - 1000', 'dataMax + 1000']}
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                    />
                    <Area
                      type="monotone"
                      dataKey="upper"
                      stroke="none"
                      fill="hsl(var(--chart-4))"
                      fillOpacity={0.1}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="upper" 
                      stroke="hsl(var(--chart-4))" 
                      strokeWidth={1}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="middle" 
                      stroke="hsl(var(--muted-foreground))" 
                      strokeWidth={1}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="lower" 
                      stroke="hsl(var(--chart-4))" 
                      strokeWidth={1}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-muted-foreground">가격</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-chart-4" />
                  <span className="text-muted-foreground">상/하단 밴드</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                  <span className="text-muted-foreground">중간선</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
