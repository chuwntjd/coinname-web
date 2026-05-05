import type React from "react"
import { TrendingUp, Users, DollarSign, Coins } from "lucide-react"

type MetricChangeType = "positive" | "negative" | "neutral"

interface Metric {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  value: string
  change: string
  changeType: MetricChangeType
}

export function KeyMetrics() {
  const metrics: Metric[] = [
    {
      icon: DollarSign,
      label: "시가총액",
      value: "1,255억원",
      change: "+12.5%",
      changeType: "positive",
    },
    {
      icon: Coins,
      label: "유통량",
      value: "7.5억 JY",
      change: "전체의 75%",
      changeType: "neutral",
    },
    {
      icon: TrendingUp,
      label: "현재 가격",
      value: "₩223",
      change: "+8.2%",
      changeType: "positive",
    },
    {
      icon: Users,
      label: "홀더 수",
      value: "45,230명",
      change: "+1,250명",
      changeType: "positive",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">주요 지표</h2>
          <p className="text-lg text-gray-600">JY의 성장과 채택을 보여주는 실시간 데이터</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      metric.changeType === "positive"
                        ? "text-green-600"
                        : metric.changeType === "negative"
                          ? "text-red-600"
                          : "text-gray-600"
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
