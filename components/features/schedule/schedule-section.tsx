"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { EventList } from "@/components/features/schedule/event-list"
import { CalendarView } from "@/components/features/schedule/calendar-view"
import { ViewToggle, type ViewMode } from "@/components/features/schedule/view-toggle"

export function ScheduleSection() {
  const [view, setView] = useState<ViewMode>("list")

  return (
    <div>
      {/* Schedule Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
            <Calendar className="h-5 w-5 text-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">일정</h2>
            <p className="text-sm text-muted-foreground">다가오는 이벤트를 확인하세요</p>
          </div>
        </div>
        <ViewToggle view={view} onViewChange={setView} />
      </div>

      {/* View Content */}
      {view === "list" ? <EventList /> : <CalendarView />}
    </div>
  )
}
