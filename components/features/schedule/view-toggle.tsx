"use client"

import { Calendar, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ViewMode = "list" | "calendar"

interface ViewToggleProps {
  view: ViewMode
  onViewChange: (view: ViewMode) => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex rounded-lg border border-border bg-secondary/50 p-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange("list")}
        className={cn(
          "gap-2 text-muted-foreground hover:text-foreground",
          view === "list" && "bg-background text-foreground shadow-sm"
        )}
      >
        <List className="h-4 w-4" />
        <span className="hidden sm:inline">리스트</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange("calendar")}
        className={cn(
          "gap-2 text-muted-foreground hover:text-foreground",
          view === "calendar" && "bg-background text-foreground shadow-sm"
        )}
      >
        <Calendar className="h-4 w-4" />
        <span className="hidden sm:inline">달력</span>
      </Button>
    </div>
  )
}
