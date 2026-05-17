"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TraderFiltersProps {
  selectedExchange: string;
  onExchangeChange: (exchange: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const exchanges = [
  { id: "all", name: "전체" },
  { id: "binance", name: "Binance" },
  { id: "bybit", name: "Bybit" },
  { id: "okx", name: "OKX" },
  { id: "bitget", name: "Bitget" },
];

export function TraderFilters({
  selectedExchange,
  onExchangeChange,
  searchQuery,
  onSearchChange,
}: TraderFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="트레이더 검색..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Exchange Filter */}
      <div className="flex gap-2 flex-wrap">
        {exchanges.map((exchange) => (
          <Button
            key={exchange.id}
            variant={selectedExchange === exchange.id ? "default" : "outline"}
            size="sm"
            onClick={() => onExchangeChange(exchange.id)}
            className={
              selectedExchange === exchange.id
                ? "bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            }
          >
            {exchange.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
