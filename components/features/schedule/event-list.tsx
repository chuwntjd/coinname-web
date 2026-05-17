"use client"

import { useState, useMemo } from "react"
import { Search, CalendarDays, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EventCard } from "@/components/features/schedule/event-card"
import { CategoryFilter } from "@/components/features/schedule/category-filter"
import { cryptoEvents, EventCategory } from "@/lib/features/schedule/crypto-events"

type SortOrder = "date-asc" | "date-desc" | "importance"

export function EventList() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<SortOrder>("date-asc")

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = cryptoEvents

    // 카테고리 필터
    if (selectedCategory !== "all") {
      filtered = filtered.filter((event) => event.category === selectedCategory)
    }

    // 검색 필터
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.coin.toLowerCase().includes(query) ||
          event.symbol.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query)
      )
    }

    // 정렬
    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === "date-asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (sortOrder === "date-desc") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else {
        const importanceOrder = { high: 0, medium: 1, low: 2 }
        return importanceOrder[a.importance] - importanceOrder[b.importance]
      }
    })

    return sorted
  }, [selectedCategory, searchQuery, sortOrder])

  const groupedByDate = useMemo(() => {
    const groups: Record<string, typeof filteredAndSortedEvents> = {}
    
    filteredAndSortedEvents.forEach((event) => {
      if (!groups[event.date]) {
        groups[event.date] = []
      }
      groups[event.date].push(event)
    })

    return groups
  }, [filteredAndSortedEvents])

  const formatDateHeader = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const eventDate = new Date(date)
    eventDate.setHours(0, 0, 0, 0)
    
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    const monthDay = `${date.getMonth() + 1}월 ${date.getDate()}일`
    const weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
    const weekday = weekdays[date.getDay()]

    let relative = ""
    if (diffDays === 0) relative = "오늘"
    else if (diffDays === 1) relative = "내일"
    else if (diffDays === 2) relative = "모레"
    else if (diffDays > 0 && diffDays <= 7) relative = `${diffDays}일 후`

    return { monthDay, weekday, relative }
  }

  const cycleSortOrder = () => {
    const orders: SortOrder[] = ["date-asc", "date-desc", "importance"]
    const currentIndex = orders.indexOf(sortOrder)
    const nextIndex = (currentIndex + 1) % orders.length
    setSortOrder(orders[nextIndex])
  }

  const sortLabels: Record<SortOrder, string> = {
    "date-asc": "날짜순 ↑",
    "date-desc": "날짜순 ↓",
    importance: "중요도순",
  }

  return (
    <section id="schedule" className="space-y-6">
      {/* 필터 영역 */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="코인명, 심볼, 이벤트 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-card border-border"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={cycleSortOrder}
            className="gap-2 self-start"
          >
            <ArrowUpDown className="h-4 w-4" />
            {sortLabels[sortOrder]}
          </Button>
        </div>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* 이벤트 리스트 */}
      <div className="space-y-8">
        {Object.keys(groupedByDate).length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
            <CalendarDays className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg font-medium text-foreground">
              검색 결과가 없습니다
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              다른 키워드나 카테고리로 검색해 보세요
            </p>
          </div>
        ) : (
          Object.entries(groupedByDate).map(([date, events]) => {
            const { monthDay, weekday, relative } = formatDateHeader(date)
            
            return (
              <div key={date} className="space-y-3">
                <div className="sticky top-16 z-10 flex items-center gap-3 bg-background/80 py-2 backdrop-blur-sm">
                  <h2 className="text-lg font-semibold text-foreground">
                    {monthDay}
                  </h2>
                  <span className="text-sm text-muted-foreground">{weekday}</span>
                  {relative && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {relative}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  {events.map((event) => (
                    <EventCard 
                      key={event.id} 
                      event={event}
                      isHighlighted={relative === "오늘" || relative === "내일"}
                    />
                  ))}
                </div>
              </div>
            )
          })
        )}
      </div>
    </section>
  )
}
