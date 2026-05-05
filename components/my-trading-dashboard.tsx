"use client"

import { useState, useEffect } from "react"
import { BybitAccountSetup } from "./bybit-account-setup"
import { PersonalLeaderboard } from "./personal-leaderboard"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

interface ApiCredentials {
  apiKey: string
  apiSecret: string
  testnet: boolean
}

export function MyTradingDashboard() {
  const [credentials, setCredentials] = useState<ApiCredentials | null>(null)
  const [isSetup, setIsSetup] = useState(false)

  useEffect(() => {
    // 로컬 스토리지에서 저장된 인증 정보 확인
    const saved = localStorage.getItem("bybit_credentials")
    if (saved) {
      try {
        const parsedCredentials = JSON.parse(saved)
        setCredentials(parsedCredentials)
        setIsSetup(true)
      } catch (error) {
        console.error("저장된 인증 정보 파싱 오류:", error)
        localStorage.removeItem("bybit_credentials")
      }
    }
  }, [])

  const handleCredentialsSet = (newCredentials: ApiCredentials) => {
    setCredentials(newCredentials)
    setIsSetup(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("bybit_credentials")
    setCredentials(null)
    setIsSetup(false)
  }

  if (!isSetup || !credentials) {
    return <BybitAccountSetup onCredentialsSet={handleCredentialsSet} />
  }

  return (
    <div className="space-y-6">
      {/* 로그아웃 버튼 */}
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          계정 연결 해제
        </Button>
      </div>

      {/* 개인 리더보드 */}
      <PersonalLeaderboard
        apiKey={credentials.apiKey}
        apiSecret={credentials.apiSecret}
        testnet={credentials.testnet}
      />
    </div>
  )
}
