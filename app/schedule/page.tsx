import { Header } from "@/components/header"
import { StatsCards } from "@/components/features/schedule/stats-cards"
import { ScheduleSection } from "@/components/features/schedule/schedule-section"
import { Calendar, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-10">
          <div className="flex items-center gap-2 text-primary">
            <Zap className="h-5 w-5" />
            <span className="text-sm font-medium">실시간 업데이트</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="text-balance">코인 발표 일정을</span>
            <br />
            <span className="text-balance text-primary">한눈에 확인하세요</span>
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
            토큰 언락, 에어드랍, 메인넷 런칭, 파트너십 발표 등 
            암호화폐 시장의 주요 이벤트 일정을 놓치지 마세요.
          </p>
        </section>

        {/* Stats */}
        <section className="mb-10">
          <StatsCards />
        </section>

        {/* Schedule Section with View Toggle */}
        <section>
          <ScheduleSection />
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Calendar className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">CryptoCalendar</span>
            </div>
            <p className="text-sm text-muted-foreground">
              암호화폐 이벤트 일정 정보 제공 서비스
            </p>
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            투자에 대한 책임은 본인에게 있습니다. 제공되는 정보는 참고용으로만 사용하세요.
          </p>
        </footer>
      </main>
    </div>
  )
}
