"use client"

import { Calendar, TrendingUp, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cryptoEvents } from "@/lib/features/schedule/crypto-events"

export function StatsCards() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcomingEvents = cryptoEvents.filter(
    (event) => new Date(event.date) >= today
  )

  const thisWeekEvents = upcomingEvents.filter((event) => {
    const eventDate = new Date(event.date)
    const weekFromNow = new Date(today)
    weekFromNow.setDate(weekFromNow.getDate() + 7)
    return eventDate <= weekFromNow
  })

  const highImportanceEvents = upcomingEvents.filter(
    (event) => event.importance === "high"
  )

  const stats = [
    {
      label: "전체 이벤트",
      value: upcomingEvents.length,
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "이번 주",
      value: thisWeekEvents.length,
      icon: Clock,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      label: "중요 이벤트",
      value: highImportanceEvents.length,
      icon: AlertCircle,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      label: "토큰 언락",
      value: upcomingEvents.filter((e) => e.category === "token_unlock").length,
      icon: TrendingUp,
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card border-border">
          <CardContent className="flex items-center gap-3 p-4">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
