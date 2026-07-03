"use client"

import { useRef, useState } from "react"
import { Header } from "@/components/header"
import { useAuth } from "@/contexts/auth-context"
import { useRaffle } from "@/hooks/use-raffle"
import { RoundInfo } from "@/components/rewards/round-info"
import { MyTicketsCard } from "@/components/rewards/my-tickets-card"
import { EntryPanel } from "@/components/rewards/entry-panel"
import { MissionList } from "@/components/rewards/mission-list"
import { WinnersLeaderboard } from "@/components/rewards/winners-leaderboard"
import { AdminRafflePanel } from "@/components/rewards/admin-raffle-panel"
import { LoginModal } from "@/components/auth/login-modal"
import { Button } from "@/components/ui/button"
import { Gift, LogIn, Settings, Sparkles } from "lucide-react"

export default function RewardsPage() {
  const { user, isAuthenticated } = useAuth()
  const nickname = user?.displayName || user?.username || "익명"
  const {
    round,
    missions,
    userState,
    winners,
    odds,
    loading,
    totalTickets,
    participantCount,
    completeMission,
    enterRaffle,
    runDraw,
    updateRound,
    upsertMission,
    deleteMission,
  } = useRaffle(user?.id, nickname)

  const [showLogin, setShowLogin] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const missionsRef = useRef<HTMLDivElement>(null)

  const isAdmin = user?.email === "demo@coinname.kr"

  const scrollToMissions = () => {
    missionsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />

      <main className="mx-auto max-w-5xl px-3 py-6 sm:px-4 sm:py-10">
        {/* 페이지 헤더 */}
        <div className="mb-6 text-center sm:mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-1.5 text-sm font-semibold text-lime-400">
            <Gift className="h-4 w-4" />
            코인네임 리워드
          </div>
          <h1 className="text-3xl font-black text-zinc-50 sm:text-4xl text-balance">
            미션 완료하고 <span className="text-lime-400">현금</span> 당첨받자
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-400 sm:text-base text-pretty">
            활동할수록 응모권이 쌓이고, 응모권이 많을수록 당첨 확률이 올라갑니다.
          </p>
          {isAdmin && (
            <Button
              onClick={() => setShowAdmin(true)}
              variant="outline"
              size="sm"
              className="mt-4 border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
            >
              <Settings className="mr-2 h-4 w-4" />
              관리자 설정
            </Button>
          )}
        </div>

        {loading || !round ? (
          <div className="space-y-4">
            <div className="h-48 animate-pulse rounded-2xl bg-zinc-900" />
            <div className="h-64 animate-pulse rounded-2xl bg-zinc-900" />
          </div>
        ) : !isAuthenticated || !userState ? (
          <>
            <RoundInfo round={round} participantCount={participantCount} totalTickets={totalTickets} />
            <div className="mt-6 rounded-2xl border border-lime-400/30 bg-zinc-900 p-8 text-center">
              <Sparkles className="mx-auto mb-3 h-10 w-10 text-lime-400" />
              <h2 className="text-xl font-bold text-zinc-50">로그인하고 응모권을 받으세요</h2>
              <p className="mt-1 text-sm text-zinc-400">
                회원가입만 해도 응모권 5장을 즉시 드립니다. 지금 시작하세요!
              </p>
              <Button
                onClick={() => setShowLogin(true)}
                className="mt-4 bg-lime-400 font-bold text-zinc-950 hover:bg-lime-300"
              >
                <LogIn className="mr-2 h-4 w-4" />
                로그인 / 회원가입
              </Button>
            </div>
            <div className="mt-6">
              <WinnersLeaderboard winners={winners} />
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* 좌측 */}
            <div className="space-y-6 lg:col-span-3">
              <RoundInfo round={round} participantCount={participantCount} totalTickets={totalTickets} />
              <EntryPanel
                userState={userState}
                odds={odds}
                onEnter={enterRaffle}
                onScrollToMissions={scrollToMissions}
              />
              <div ref={missionsRef} className="scroll-mt-20">
                <MissionList missions={missions} userState={userState} onComplete={completeMission} />
              </div>
            </div>

            {/* 우측 */}
            <div className="space-y-6 lg:col-span-2">
              <MyTicketsCard userState={userState} odds={odds} />
              <WinnersLeaderboard winners={winners} />
            </div>
          </div>
        )}
      </main>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />

      {isAdmin && round && (
        <AdminRafflePanel
          isOpen={showAdmin}
          onClose={() => setShowAdmin(false)}
          round={round}
          missions={missions}
          onUpdateRound={updateRound}
          onRunDraw={runDraw}
          onUpsertMission={upsertMission}
          onDeleteMission={deleteMission}
        />
      )}
    </div>
  )
}
