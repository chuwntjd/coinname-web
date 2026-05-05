"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Key, Shield, AlertTriangle } from "lucide-react"

interface ApiCredentials {
  apiKey: string
  apiSecret: string
  testnet: boolean
}

interface BybitAccountSetupProps {
  onCredentialsSet: (credentials: ApiCredentials) => void
}

export function BybitAccountSetup({ onCredentialsSet }: BybitAccountSetupProps) {
  const [credentials, setCredentials] = useState<ApiCredentials>({
    apiKey: "",
    apiSecret: "",
    testnet: true,
  })
  const [showSecret, setShowSecret] = useState(false)
  const [isValidating, setIsValidating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!credentials.apiKey || !credentials.apiSecret) {
      alert("API Key와 Secret을 모두 입력해주세요.")
      return
    }

    setIsValidating(true)

    try {
      // 로컬 스토리지에 저장 (실제 운영에서는 더 안전한 방법 사용)
      localStorage.setItem("bybit_credentials", JSON.stringify(credentials))
      onCredentialsSet(credentials)
    } catch (error) {
      console.error("API 설정 오류:", error)
      alert("API 설정 중 오류가 발생했습니다.")
    } finally {
      setIsValidating(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Key className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">바이비트 계정 연결</h3>
        <p className="text-gray-600">개인 거래 데이터를 확인하기 위해 API 키를 설정해주세요</p>
      </div>

      {/* 보안 안내 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div className="text-sm">
            <h4 className="font-medium text-yellow-800 mb-1">보안 주의사항</h4>
            <ul className="text-yellow-700 space-y-1">
              <li>• 읽기 전용(Read-Only) 권한만 부여하세요</li>
              <li>• 출금 권한은 절대 활성화하지 마세요</li>
              <li>• 테스트넷 사용을 권장합니다</li>
              <li>• API 키는 안전하게 보관하세요</li>
            </ul>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 테스트넷 선택 */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="testnet"
            checked={credentials.testnet}
            onChange={(e) => setCredentials({ ...credentials, testnet: e.target.checked })}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <label htmlFor="testnet" className="text-sm font-medium text-gray-700">
            테스트넷 사용 (권장)
          </label>
        </div>

        {/* API Key */}
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
            API Key
          </label>
          <input
            type="text"
            id="apiKey"
            value={credentials.apiKey}
            onChange={(e) => setCredentials({ ...credentials, apiKey: e.target.value })}
            placeholder="바이비트 API Key를 입력하세요"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* API Secret */}
        <div>
          <label htmlFor="apiSecret" className="block text-sm font-medium text-gray-700 mb-2">
            API Secret
          </label>
          <div className="relative">
            <input
              type={showSecret ? "text" : "password"}
              id="apiSecret"
              value={credentials.apiSecret}
              onChange={(e) => setCredentials({ ...credentials, apiSecret: e.target.value })}
              placeholder="바이비트 API Secret을 입력하세요"
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowSecret(!showSecret)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isValidating}>
          {isValidating ? "연결 중..." : "계정 연결하기"}
        </Button>
      </form>

      {/* API 키 생성 가이드 */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">API 키 생성 방법</h4>
        <ol className="text-sm text-gray-600 space-y-2">
          <li>1. 바이비트 웹사이트에 로그인</li>
          <li>2. 계정 → API 관리 메뉴로 이동</li>
          <li>3. "새 API 키 생성" 클릭</li>
          <li>4. 읽기 전용 권한만 선택</li>
          <li>5. API Key와 Secret 복사</li>
        </ol>
        <Button
          variant="outline"
          size="sm"
          className="mt-3 bg-transparent"
          onClick={() => window.open("https://www.bybit.com/app/user/api-management", "_blank")}
        >
          <Shield className="h-4 w-4 mr-2" />
          바이비트 API 관리 페이지
        </Button>
      </div>
    </div>
  )
}
