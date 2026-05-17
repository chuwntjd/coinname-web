"use client"

import { ExternalLink, Clock, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { 
  CryptoEvent, 
  categoryLabels, 
  categoryColors 
} from "@/lib/features/schedule/crypto-events"

interface EventCardProps {
  event: CryptoEvent
  isHighlighted?: boolean
}

export function EventCard({ event, isHighlighted }: EventCardProps) {
  const importanceStyles = {
    high: "border-l-4 border-l-chart-1",
    medium: "border-l-4 border-l-chart-2",
    low: "border-l-4 border-l-muted-foreground",
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"]
    const weekday = weekdays[date.getDay()]
    return `${month}월 ${day}일 (${weekday})`
  }

  return (
    <div
      className={cn(
        "group relative rounded-lg bg-card p-4 transition-all hover:bg-secondary",
        importanceStyles[event.importance],
        isHighlighted && "ring-1 ring-primary/50 bg-secondary"
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge 
              className={cn(
                "text-xs font-medium",
                categoryColors[event.category]
              )}
            >
              {categoryLabels[event.category]}
            </Badge>
            {event.importance === "high" && (
              <Badge variant="outline" className="gap-1 border-chart-1 text-chart-1">
                <AlertCircle className="h-3 w-3" />
                중요
              </Badge>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {event.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {event.coin} ({event.symbol})
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {formatDate(event.date)} {event.time}
            </span>
          </div>
        </div>

        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="sr-only">자세히 보기</span>
          </a>
        )}
      </div>
    </div>
  )
}
