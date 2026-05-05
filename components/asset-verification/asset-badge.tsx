"use client"

import { Shield, Crown, Star, Award } from "lucide-react"

interface AssetBadgeProps {
  amount: number
  currency: string
  badge: "bronze" | "silver" | "gold" | "diamond"
  isPublic: boolean
  className?: string
}

export function AssetBadge({ amount, currency, badge, isPublic, className = "" }: AssetBadgeProps) {
  if (!isPublic) return null

  const getBadgeConfig = () => {
    switch (badge) {
      case "diamond":
        return {
          icon: Crown,
          color: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
          textColor: "text-purple-600",
          bgColor: "bg-purple-50",
          label: "💎",
        }
      case "gold":
        return {
          icon: Award,
          color: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white",
          textColor: "text-yellow-600",
          bgColor: "bg-yellow-50",
          label: "🥇",
        }
      case "silver":
        return {
          icon: Star,
          color: "bg-gradient-to-r from-gray-400 to-gray-600 text-white",
          textColor: "text-gray-600",
          bgColor: "bg-gray-50",
          label: "🥈",
        }
      default:
        return {
          icon: Shield,
          color: "bg-gradient-to-r from-orange-500 to-red-500 text-white",
          textColor: "text-orange-600",
          bgColor: "bg-orange-50",
          label: "🥉",
        }
    }
  }

  const formatAmount = () => {
    switch (currency) {
      case "KRW":
        if (amount >= 100000000) return `${(amount / 100000000).toFixed(1)}억원`
        if (amount >= 10000) return `${(amount / 10000).toFixed(0)}만원`
        return `${amount.toLocaleString()}원`
      case "USD":
        if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`
        if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`
        return `$${amount.toLocaleString()}`
      case "BTC":
        return `${amount} BTC`
      case "ETH":
        return `${amount} ETH`
      default:
        return `${amount} ${currency}`
    }
  }

  const config = getBadgeConfig()
  const Icon = config.icon

  return (
    <div className={`inline-flex items-center space-x-1 ${className}`}>
      <div className={`px-2 py-1 rounded-full text-xs font-medium ${config.color} flex items-center space-x-1`}>
        <span>{config.label}</span>
        <span>{formatAmount()}</span>
      </div>
    </div>
  )
}
