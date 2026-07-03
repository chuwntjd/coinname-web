"use client"

import { useState } from "react"
import type { RaffleMission, RaffleRound, WinnerRecord, MissionCategory } from "@/types/raffle"
import { getRoundParticipantCount, getRoundTotalTickets } from "@/utils/raffle-system"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Trophy, Plus, Trash2, Dices, Settings2, Ticket } from "lucide-react"

interface AdminRafflePanelProps {
  isOpen: boolean
  onClose: () => void
  round: RaffleRound
  missions: RaffleMission[]
  onUpdateRound: (updates: Partial<RaffleRound>) => void | Promise<void>
  onRunDraw: () => Promise<{ success: boolean; winner?: WinnerRecord; error?: string }>
  onUpsertMission: (mission: RaffleMission) => void | Promise<void>
  onDeleteMission: (missionId: string) => void | Promise<void>
}

const CATEGORIES: MissionCategory[] = ["signup", "exchange", "community", "attendance", "social", "trading"]

export function AdminRafflePanel({
  isOpen,
  onClose,
  round,
  missions,
  onUpdateRound,
  onRunDraw,
  onUpsertMission,
  onDeleteMission,
}: AdminRafflePanelProps) {
  const [name, setName] = useState(round.name)
  const [prizeAmount, setPrizeAmount] = useState(round.prizeAmount)
  const [prizeLabel, setPrizeLabel] = useState(round.prizeLabel)
  const [autoDraw, setAutoDraw] = useState(round.autoDraw)
  const [drawResult, setDrawResult] = useState<string | null>(null)

  // 새 미션 폼
  const [newMission, setNewMission] = useState({ title: "", description: "", ticketReward: 5, category: "community" as MissionCategory, repeatable: true })

  const saveRound = async () => {
    await onUpdateRound({ name, prizeAmount: Number(prizeAmount), prizeLabel, autoDraw })
    setDrawResult("라운드 설정이 저장되었습니다.")
    setTimeout(() => setDrawResult(null), 2000)
  }

  const handleDraw = async () => {
    const result = await onRunDraw()
    if (result.success && result.winner) {
      setDrawResult(`추첨 완료! 당첨자: ${result.winner.nickname} (${result.winner.amount.toLocaleString("ko-KR")}원)`)
    } else {
      setDrawResult(result.error || "추첨 실패")
    }
  }

  const addMission = async () => {
    if (!newMission.title.trim()) return
    await onUpsertMission({
      id: `mission_${Date.now()}`,
      title: newMission.title,
      description: newMission.description,
      ticketReward: Number(newMission.ticketReward),
      category: newMission.category,
      repeatable: newMission.repeatable,
      active: true,
    })
    setNewMission({ title: "", description: "", ticketReward: 5, category: "community", repeatable: true })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            응모 시스템 관리자
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="round" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="round">라운드/추첨</TabsTrigger>
            <TabsTrigger value="missions">미션 관리</TabsTrigger>
            <TabsTrigger value="stats">현황</TabsTrigger>
          </TabsList>

          {/* 라운드 설정 + 추첨 */}
          <TabsContent value="round" className="mt-4 space-y-4">
            <div className="space-y-3 rounded-lg border p-4">
              <div className="space-y-1.5">
                <Label>라운드 이름</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>당첨 금액 (원)</Label>
                  <Input type="number" value={prizeAmount} onChange={(e) => setPrizeAmount(Number(e.target.value))} />
                </div>
                <div className="space-y-1.5">
                  <Label>보상 설명</Label>
                  <Input value={prizeLabel} onChange={(e) => setPrizeLabel(e.target.value)} />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <div>
                  <Label>자동 추첨</Label>
                  <p className="text-xs text-muted-foreground">추첨 시각에 자동으로 당첨자를 선정합니다</p>
                </div>
                <Switch checked={autoDraw} onCheckedChange={setAutoDraw} />
              </div>
              <Button onClick={saveRound} className="w-full">
                설정 저장
              </Button>
            </div>

            <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4">
              <div className="mb-2 flex items-center gap-2 font-semibold text-yellow-800">
                <Dices className="h-5 w-5" />
                수동 추첨 실행
              </div>
              <p className="mb-3 text-sm text-yellow-700">
                응모권 가중치 기반으로 당첨자를 즉시 선정합니다. 추첨 후 새 라운드가 시작됩니다.
              </p>
              <Button onClick={handleDraw} className="w-full bg-yellow-500 text-white hover:bg-yellow-600">
                <Trophy className="mr-2 h-4 w-4" />
                지금 추첨하기
              </Button>
            </div>

            {drawResult && (
              <p className="rounded-lg bg-muted p-3 text-center text-sm font-medium">{drawResult}</p>
            )}
          </TabsContent>

          {/* 미션 관리 */}
          <TabsContent value="missions" className="mt-4 space-y-4">
            <div className="space-y-3 rounded-lg border p-4">
              <h4 className="flex items-center gap-2 font-semibold">
                <Plus className="h-4 w-4" />새 미션 추가
              </h4>
              <Input
                placeholder="미션 제목"
                value={newMission.title}
                onChange={(e) => setNewMission({ ...newMission, title: e.target.value })}
              />
              <Input
                placeholder="설명"
                value={newMission.description}
                onChange={(e) => setNewMission({ ...newMission, description: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">응모권 지급량</Label>
                  <Input
                    type="number"
                    value={newMission.ticketReward}
                    onChange={(e) => setNewMission({ ...newMission, ticketReward: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">카테고리</Label>
                  <select
                    value={newMission.category}
                    onChange={(e) => setNewMission({ ...newMission, category: e.target.value as MissionCategory })}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <Label className="text-sm">반복 가능 (매번 누적 지급)</Label>
                <Switch
                  checked={newMission.repeatable}
                  onCheckedChange={(v) => setNewMission({ ...newMission, repeatable: v })}
                />
              </div>
              <Button onClick={addMission} className="w-full">
                미션 추가
              </Button>
            </div>

            <div className="space-y-2">
              {missions.map((m) => (
                <div key={m.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium">{m.title}</span>
                      <Badge variant="secondary" className="text-xs">
                        +{m.ticketReward}장
                      </Badge>
                      {m.repeatable && <Badge className="bg-green-100 text-xs text-green-700">반복</Badge>}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{m.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={m.active}
                      onCheckedChange={(v) => onUpsertMission({ ...m, active: v })}
                    />
                    <Button size="icon" variant="ghost" onClick={() => onDeleteMission(m.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* 현황 */}
          <TabsContent value="stats" className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border p-4 text-center">
                <Ticket className="mx-auto mb-1 h-5 w-5 text-muted-foreground" />
                <p className="text-2xl font-bold">{getRoundTotalTickets(round).toLocaleString("ko-KR")}</p>
                <p className="text-xs text-muted-foreground">총 응모권</p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <Trophy className="mx-auto mb-1 h-5 w-5 text-muted-foreground" />
                <p className="text-2xl font-bold">{getRoundParticipantCount(round).toLocaleString("ko-KR")}</p>
                <p className="text-xs text-muted-foreground">참여자</p>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 text-sm font-semibold">참여자 목록</h4>
              {Object.entries(round.entries).filter(([, n]) => n > 0).length === 0 ? (
                <p className="text-sm text-muted-foreground">아직 참여자가 없습니다.</p>
              ) : (
                <div className="space-y-1.5">
                  {Object.entries(round.entries)
                    .filter(([, n]) => n > 0)
                    .sort((a, b) => b[1] - a[1])
                    .map(([uid, n]) => (
                      <div key={uid} className="flex items-center justify-between text-sm">
                        <span className="font-medium">{round.participantNames[uid] || "익명"}</span>
                        <span className="text-muted-foreground">{n.toLocaleString("ko-KR")}장</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
