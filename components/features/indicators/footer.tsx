import Link from "next/link"
import { TrendingUp } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight">CryptoSignals</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              암호화폐 투자자를 위한 기술적 분석 지표 가이드. 
              초보자부터 전문가까지 모든 레벨의 투자자에게 유용한 정보를 제공합니다.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold">지표 가이드</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="#rsi" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  RSI 사용법
                </Link>
              </li>
              <li>
                <Link href="#macd" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  MACD 활용법
                </Link>
              </li>
              <li>
                <Link href="#bollinger" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  볼린저 밴드
                </Link>
              </li>
              <li>
                <Link href="#strategies" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  매매 전략
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold">리소스</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  무료 가이드북
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  차트 분석 도구
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  용어 사전
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 CryptoSignals. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            ⚠️ 투자에 대한 책임은 투자자 본인에게 있습니다. 본 사이트는 투자 조언을 제공하지 않습니다.
          </p>
        </div>
      </div>
    </footer>
  )
}
