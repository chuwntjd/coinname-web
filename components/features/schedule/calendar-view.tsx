"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  cryptoEvents,
  categoryLabels,
  categoryColors,
  type CryptoEvent,
  type EventCategory,
} from "@/lib/features/schedule/crypto-events"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const DAYS = ["일", "월", "화", "수", "목", "금", "토"]
const MONTHS = [
  "1월", "2월", "3월", "4월", "5월", "6월",
  "7월", "8월", "9월", "10월", "11월", "12월"
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

interface CalendarDayProps {
  day: number
  isCurrentMonth: boolean
  isToday: boolean
  events: CryptoEvent[]
  dateString: string
}

function CalendarDay({ day, isCurrentMonth, isToday, events, dateString }: CalendarDayProps) {
  const hasHighImportance = events.some(e => e.importance === "high")
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "relative flex h-24 flex-col items-start gap-1 rounded-lg border border-transparent p-2 text-left transition-colors hover:border-border hover:bg-secondary/50 sm:h-28",
            !isCurrentMonth && "opacity-30",
            isToday && "border-primary bg-primary/10",
            events.length > 0 && "cursor-pointer"
          )}
          disabled={events.length === 0}
        >
          <span
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium",
              isToday && "bg-primary text-primary-foreground"
            )}
          >
            {day}
          </span>
          
          {events.length > 0 && (
            <div className="flex w-full flex-col gap-0.5 overflow-hidden">
              {events.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    "truncate rounded px-1 py-0.5 text-[10px] font-medium leading-tight sm:text-xs",
                    categoryColors[event.category]
                  )}
                >
                  {event.symbol}
                </div>
              ))}
              {events.length > 2 && (
                <span className="text-[10px] text-muted-foreground sm:text-xs">
                  +{events.length - 2}개 더
                </span>
              )}
            </div>
          )}
          
          {hasHighImportance && (
            <div className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
          )}
        </button>
      </PopoverTrigger>
      
      {events.length > 0 && (
        <PopoverContent className="w-80 p-0" align="start">
          <div className="border-b border-border bg-secondary/50 px-4 py-3">
            <h4 className="font-semibold">{dateString}</h4>
            <p className="text-sm text-muted-foreground">{events.length}개의 이벤트</p>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {events.map((event) => (
              <div
                key={event.id}
                className="border-b border-border p-4 last:border-b-0"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded px-2 py-0.5 text-xs font-medium",
                      categoryColors[event.category]
                    )}
                  >
                    {categoryLabels[event.category]}
                  </span>
                  {event.importance === "high" && (
                    <span className="rounded bg-destructive/20 px-2 py-0.5 text-xs font-medium text-destructive">
                      중요
                    </span>
                  )}
                </div>
                <h5 className="font-medium">{event.title}</h5>
                <p className="mt-1 text-sm text-muted-foreground">
                  {event.coin} ({event.symbol}) · {event.time}
                </p>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {event.description}
                </p>
                {event.link && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-primary hover:underline"
                  >
                    자세히 보기
                  </a>
                )}
              </div>
            ))}
          </div>
        </PopoverContent>
      )}
    </Popover>
  )
}

export function CalendarView() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  
  const eventsByDate = useMemo(() => {
    const map = new Map<string, CryptoEvent[]>()
    cryptoEvents.forEach((event) => {
      const existing = map.get(event.date) || []
      map.set(event.date, [...existing, event])
    })
    return map
  }, [])
  
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const daysInPrevMonth = getDaysInMonth(year, month - 1)
    
    const days: Array<{
      day: number
      isCurrentMonth: boolean
      isToday: boolean
      dateString: string
      events: CryptoEvent[]
    }> = []
    
    // 이전 달 날짜
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i
      const prevMonth = month === 0 ? 11 : month - 1
      const prevYear = month === 0 ? year - 1 : year
      const dateString = formatDate(prevYear, prevMonth, day)
      days.push({
        day,
        isCurrentMonth: false,
        isToday: false,
        dateString,
        events: eventsByDate.get(dateString) || [],
      })
    }
    
    // 현재 달 날짜
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(year, month, day)
      const isToday =
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      days.push({
        day,
        isCurrentMonth: true,
        isToday,
        dateString,
        events: eventsByDate.get(dateString) || [],
      })
    }
    
    // 다음 달 날짜 (42일 = 6주로 맞춤)
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      const nextMonth = month === 11 ? 0 : month + 1
      const nextYear = month === 11 ? year + 1 : year
      const dateString = formatDate(nextYear, nextMonth, day)
      days.push({
        day,
        isCurrentMonth: false,
        isToday: false,
        dateString,
        events: eventsByDate.get(dateString) || [],
      })
    }
    
    return days
  }, [year, month, eventsByDate, today])
  
  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }
  
  const goToToday = () => {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))
  }
  
  return (
    <div className="rounded-xl border border-border bg-card">
      {/* Calendar Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">
            {year}년 {MONTHS[month]}
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="text-xs"
          >
            오늘
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={goToPrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="p-4">
        {/* Days Header */}
        <div className="mb-2 grid grid-cols-7 gap-1">
          {DAYS.map((day, index) => (
            <div
              key={day}
              className={cn(
                "py-2 text-center text-sm font-medium text-muted-foreground",
                index === 0 && "text-destructive"
              )}
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((dayData, index) => (
            <CalendarDay
              key={`${dayData.dateString}-${index}`}
              day={dayData.day}
              isCurrentMonth={dayData.isCurrentMonth}
              isToday={dayData.isToday}
              events={dayData.events}
              dateString={dayData.dateString}
            />
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="border-t border-border p-4">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <span className="text-muted-foreground">카테고리:</span>
          {(Object.keys(categoryLabels) as EventCategory[]).map((category) => (
            <div key={category} className="flex items-center gap-1">
              <div className={cn("h-3 w-3 rounded", categoryColors[category])} />
              <span className="text-muted-foreground">{categoryLabels[category]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
