"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { TraderCard, type Trader } from "@/components/features/copy-trading/trader-card";
import { TraderFilters } from "@/components/features/copy-trading/trader-filters";
import { StatsCard } from "@/components/features/copy-trading/stats-card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  DollarSign,
  Shield,
  ArrowRight,
  Zap,
  BarChart3,
  Lock,
} from "lucide-react";

// Mock data for traders
const mockTraders: Trader[] = [
  {
    id: "1",
    name: "CryptoKing",
    avatar: "",
    exchange: "binance",
    roi30d: 45.23,
    roi90d: 128.56,
    totalPnl: 234567,
    followers: 15234,
    winRate: 72,
    trades: 1456,
    copyLink: "https://www.binance.com/en/copy-trading",
    tags: ["BTC", "ETH", "롱 전문"],
    isVerified: true,
    riskLevel: "medium",
  },
  {
    id: "2",
    name: "WhaleTrader",
    avatar: "",
    exchange: "bybit",
    roi30d: 67.89,
    roi90d: 189.34,
    totalPnl: 567890,
    followers: 28456,
    winRate: 68,
    trades: 2341,
    copyLink: "https://www.bybit.com/copytrading",
    tags: ["알트코인", "스캘핑"],
    isVerified: true,
    riskLevel: "high",
  },
  {
    id: "3",
    name: "SteadyGains",
    avatar: "",
    exchange: "okx",
    roi30d: 12.45,
    roi90d: 45.67,
    totalPnl: 89012,
    followers: 8765,
    winRate: 81,
    trades: 876,
    copyLink: "https://www.okx.com/copy-trading",
    tags: ["저위험", "장기투자"],
    isVerified: true,
    riskLevel: "low",
  },
  {
    id: "4",
    name: "MoonShot",
    avatar: "",
    exchange: "bitget",
    roi30d: 89.12,
    roi90d: 256.78,
    totalPnl: 345678,
    followers: 19876,
    winRate: 65,
    trades: 3456,
    copyLink: "https://www.bitget.com/copy-trading",
    tags: ["고수익", "선물"],
    isVerified: false,
    riskLevel: "high",
  },
  {
    id: "5",
    name: "AlphaHunter",
    avatar: "",
    exchange: "binance",
    roi30d: 34.56,
    roi90d: 98.23,
    totalPnl: 123456,
    followers: 12345,
    winRate: 74,
    trades: 1234,
    copyLink: "https://www.binance.com/en/copy-trading",
    tags: ["DeFi", "신규코인"],
    isVerified: true,
    riskLevel: "medium",
  },
  {
    id: "6",
    name: "SafeTrader",
    avatar: "",
    exchange: "bybit",
    roi30d: 8.45,
    roi90d: 28.67,
    totalPnl: 45678,
    followers: 5678,
    winRate: 85,
    trades: 567,
    copyLink: "https://www.bybit.com/copytrading",
    tags: ["현물", "저위험"],
    isVerified: true,
    riskLevel: "low",
  },
  {
    id: "7",
    name: "QuickFlip",
    avatar: "",
    exchange: "okx",
    roi30d: 56.78,
    roi90d: 145.23,
    totalPnl: 234567,
    followers: 16789,
    winRate: 69,
    trades: 4567,
    copyLink: "https://www.okx.com/copy-trading",
    tags: ["스캘핑", "단타"],
    isVerified: false,
    riskLevel: "high",
  },
  {
    id: "8",
    name: "TrendMaster",
    avatar: "",
    exchange: "bitget",
    roi30d: 23.45,
    roi90d: 67.89,
    totalPnl: 98765,
    followers: 9876,
    winRate: 76,
    trades: 987,
    copyLink: "https://www.bitget.com/copy-trading",
    tags: ["추세추종", "스윙"],
    isVerified: true,
    riskLevel: "medium",
  },
];

export default function HomePage() {
  const [selectedExchange, setSelectedExchange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTraders = useMemo(() => {
    return mockTraders.filter((trader) => {
      const matchesExchange =
        selectedExchange === "all" || trader.exchange === selectedExchange;
      const matchesSearch = trader.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesExchange && matchesSearch;
    });
  }, [selectedExchange, searchQuery]);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              실시간 카피 트레이딩 플랫폼
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              최고의 트레이더를
              <br />
              <span className="text-primary">따라하세요</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              검증된 프로 트레이더들의 거래를 실시간으로 복사하세요.
              <br />
              바이낸스, 바이비트, OKX 등 주요 거래소를 지원합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                트레이더 둘러보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary"
              >
                이용방법 알아보기
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
            <StatsCard
              icon={Users}
              value="50,000+"
              label="활성 사용자"
            />
            <StatsCard
              icon={TrendingUp}
              value="$2.5B+"
              label="총 거래량"
            />
            <StatsCard
              icon={DollarSign}
              value="127%"
              label="평균 수익률"
            />
            <StatsCard
              icon={Shield}
              value="100+"
              label="검증된 트레이더"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              간단한 3단계
            </h2>
            <p className="text-muted-foreground">
              누구나 쉽게 시작할 수 있습니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "트레이더 선택",
                description:
                  "수익률, 승률, 리스크 레벨을 확인하고 원하는 트레이더를 선택하세요.",
                icon: Users,
              },
              {
                step: "02",
                title: "거래소 연결",
                description:
                  "카피 버튼을 누르면 해당 거래소의 카피트레이딩 페이지로 이동합니다.",
                icon: Zap,
              },
              {
                step: "03",
                title: "자동 복사",
                description:
                  "트레이더의 거래가 자동으로 복사되어 같은 수익을 얻을 수 있습니다.",
                icon: TrendingUp,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-card border border-border rounded-xl p-6 text-center"
              >
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-4">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="text-primary font-mono text-sm mb-2">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traders Section */}
      <section id="traders" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              인기 트레이더
            </h2>
            <p className="text-muted-foreground">
              검증된 트레이더들의 실시간 성과를 확인하세요
            </p>
          </div>

          <TraderFilters
            selectedExchange={selectedExchange}
            onExchangeChange={setSelectedExchange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTraders.map((trader) => (
              <TraderCard key={trader.id} trader={trader} />
            ))}
          </div>

          {filteredTraders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                검색 결과가 없습니다. 다른 조건으로 검색해보세요.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              왜 CopyTrade Pro인가요?
            </h2>
            <p className="text-muted-foreground">
              신뢰할 수 있는 카피트레이딩 플랫폼
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: "실시간 성과 분석",
                description:
                  "트레이더의 30일, 90일 수익률과 승률을 실시간으로 확인할 수 있습니다.",
              },
              {
                icon: Shield,
                title: "검증된 트레이더",
                description:
                  "철저한 검증 과정을 통과한 트레이더만 등록됩니다.",
              },
              {
                icon: Lock,
                title: "안전한 연결",
                description:
                  "거래소 공식 카피트레이딩 기능을 통해 안전하게 연결됩니다.",
              },
              {
                icon: Users,
                title: "다양한 거래소",
                description:
                  "바이낸스, 바이비트, OKX, 비트겟 등 주요 거래소를 지원합니다.",
              },
              {
                icon: Zap,
                title: "간편한 시작",
                description:
                  "복잡한 설정 없이 클릭 한 번으로 카피트레이딩을 시작할 수 있습니다.",
              },
              {
                icon: TrendingUp,
                title: "리스크 관리",
                description:
                  "트레이더별 리스크 레벨을 표시하여 투자 결정에 도움을 줍니다.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-muted-foreground mb-8">
            프로 트레이더들의 거래를 복사하고 수익을 얻으세요
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            무료로 시작하기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">CopyTrade Pro</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 CopyTrade Pro. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                이용약관
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                개인정보처리방침
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                문의하기
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
