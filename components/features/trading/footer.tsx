import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">C</span>
              </div>
              <span className="text-lg font-bold text-foreground">CryptoGuide</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              암호화폐 거래소의 수수료 할인 혜택을 비교하고 
              가장 유리한 조건으로 거래를 시작할 수 있도록 도와드립니다.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">바로가기</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#exchanges" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  거래소 비교
                </Link>
              </li>
              <li>
                <Link href="#ranking" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  추천 순위
                </Link>
              </li>
              <li>
                <Link href="#guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  가입 가이드
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">거래소</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  OKX
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Binance
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Bybit
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Bitget
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CryptoGuide. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground text-center md:text-right max-w-lg">
              본 사이트는 정보 제공 목적으로 운영되며, 투자 권유가 아닙니다. 
              암호화폐 투자는 원금 손실의 위험이 있으니 신중하게 결정하세요.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
