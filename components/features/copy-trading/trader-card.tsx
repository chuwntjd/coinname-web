"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  TrendingUp,
  TrendingDown,
  Users,
  ExternalLink,
  Star,
  Zap,
} from "lucide-react";

export interface Trader {
  id: string;
  name: string;
  avatar: string;
  exchange: "binance" | "bybit" | "okx" | "bitget";
  roi30d: number;
  roi90d: number;
  totalPnl: number;
  followers: number;
  winRate: number;
  trades: number;
  copyLink: string;
  tags: string[];
  isVerified: boolean;
  riskLevel: "low" | "medium" | "high";
}

const exchangeConfig = {
  binance: {
    name: "Binance",
    color: "bg-yellow-500/20 text-yellow-400",
    logo: "🟡",
  },
  bybit: {
    name: "Bybit",
    color: "bg-orange-500/20 text-orange-400",
    logo: "🟠",
  },
  okx: {
    name: "OKX",
    color: "bg-blue-500/20 text-blue-400",
    logo: "🔵",
  },
  bitget: {
    name: "Bitget",
    color: "bg-cyan-500/20 text-cyan-400",
    logo: "🔷",
  },
};

const riskConfig = {
  low: { label: "안전", color: "bg-primary/20 text-primary" },
  medium: { label: "보통", color: "bg-yellow-500/20 text-yellow-400" },
  high: { label: "고위험", color: "bg-destructive/20 text-destructive" },
};

export function TraderCard({ trader }: { trader: Trader }) {
  const exchange = exchangeConfig[trader.exchange];
  const risk = riskConfig[trader.riskLevel];

  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 group">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-border">
              <AvatarImage src={trader.avatar} alt={trader.name} />
              <AvatarFallback className="bg-secondary text-secondary-foreground">
                {trader.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{trader.name}</h3>
                {trader.isVerified && (
                  <Star className="h-4 w-4 fill-primary text-primary" />
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className={exchange.color}>
                  {exchange.logo} {exchange.name}
                </Badge>
                <Badge variant="secondary" className={risk.color}>
                  {risk.label}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">30일 수익률</p>
            <div className="flex items-center gap-1">
              {trader.roi30d >= 0 ? (
                <TrendingUp className="h-4 w-4 text-primary" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span
                className={`text-lg font-bold ${trader.roi30d >= 0 ? "text-primary" : "text-destructive"}`}
              >
                {trader.roi30d >= 0 ? "+" : ""}
                {trader.roi30d.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">90일 수익률</p>
            <div className="flex items-center gap-1">
              {trader.roi90d >= 0 ? (
                <TrendingUp className="h-4 w-4 text-primary" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span
                className={`text-lg font-bold ${trader.roi90d >= 0 ? "text-primary" : "text-destructive"}`}
              >
                {trader.roi90d >= 0 ? "+" : ""}
                {trader.roi90d.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{trader.followers.toLocaleString()} 팔로워</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Zap className="h-4 w-4" />
            <span>승률 {trader.winRate}%</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {trader.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs border-border text-muted-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          asChild
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          <a
            href={trader.copyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            카피 트레이딩 시작
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
