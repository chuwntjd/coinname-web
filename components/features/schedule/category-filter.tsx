"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  EventCategory, 
  categoryLabels, 
  categoryColors 
} from "@/lib/features/schedule/crypto-events"
import {
  Lock,
  Gift,
  Globe,
  Handshake,
  Users,
  RefreshCw,
  TrendingUp,
} from "lucide-react"

const categoryIcons: Record<EventCategory, React.ElementType> = {
  token_unlock: Lock,
  airdrop: Gift,
  mainnet: Globe,
  partnership: Handshake,
  conference: Users,
  update: RefreshCw,
  listing: TrendingUp,
}

interface CategoryFilterProps {
  selectedCategory: EventCategory | "all"
  onCategoryChange: (category: EventCategory | "all") => void
}

export function CategoryFilter({ 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  const categories: (EventCategory | "all")[] = [
    "all",
    "token_unlock",
    "airdrop",
    "mainnet",
    "partnership",
    "conference",
    "update",
    "listing",
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isSelected = selectedCategory === category
        const Icon = category !== "all" ? categoryIcons[category] : null

        return (
          <Button
            key={category}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={cn(
              "gap-1.5 transition-all",
              isSelected && category !== "all" && categoryColors[category],
              !isSelected && "text-muted-foreground hover:text-foreground"
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            {category === "all" ? "전체" : categoryLabels[category]}
          </Button>
        )
      })}
    </div>
  )
}
