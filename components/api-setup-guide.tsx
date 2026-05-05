"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Shield, ExternalLink, Copy, Check, AlertTriangle } from "lucide-react"

export function ApiSetupGuide() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const envExample = `# .env.local 파일에 추가
BYBIT_API_KEY=your_api_key_here
BYBIT_API_SECRET=your_api_secret_here
BYBIT_TESTNET=false`

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="text-center mb-6">
        <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">바이비트 API 설정 가이드</h3>
        <p className="text-gray-600">실시간 카피트레이딩 데이터를 보려면 API 키가 필요합니다</p>
      </div>

      {/* 보안 주의사항 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div className="text-sm">
            <h4 className="font-medium text-yellow-800 mb-1">🔒 보안 주의사항</h4>
            <ul className="text-yellow-700 space-y-1">
              <li>
                • <strong>읽기 전용(Read-Only)</strong> 권한만 부여하세요
              </li>
              <li>• 출금, 거래 권한은 절대 활성화하지 마세요</li>
              <li>• API 키는 안전한 곳에 보관하세요</li>
              <li>• 정기적으로 API 키를 갱신하세요</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 설정 단계 */}
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">📋 설정 단계</h4>
          <ol className="space-y-3">
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </span>
              <div>
                <p className="font-medium text-gray-900">바이비트 API 관리 페이지 접속</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                  onClick={() => window.open("https://www.bybit.com/app/user/api-management", "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  API 관리 페이지 열기
                </Button>
              </div>
            </li>

            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                2
              </span>
              <div>
                <p className="font-medium text-gray-900">새 API 키 생성</p>
                <p className="text-sm text-gray-600 mt-1">"Create New Key" 버튼을 클릭하고 API 키 이름을 입력하세요</p>
              </div>
            </li>

            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                3
              </span>
              <div>
                <p className="font-medium text-gray-900">권한 설정</p>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-green-700">Read-Only (읽기 전용) ✅</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 bg-red-100 rounded flex items-center justify-center">
                      <span className="text-red-600 text-xs">✕</span>
                    </span>
                    <span className="text-red-700">Trade (거래) ❌</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 bg-red-100 rounded flex items-center justify-center">
                      <span className="text-red-600 text-xs">✕</span>
                    </span>
                    <span className="text-red-700">Withdraw (출금) ❌</span>
                  </div>
                </div>
              </div>
            </li>

            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                4
              </span>
              <div>
                <p className="font-medium text-gray-900">환경 변수 설정</p>
                <p className="text-sm text-gray-600 mt-1">
                  프로젝트 루트에 .env.local 파일을 생성하고 다음 내용을 추가하세요:
                </p>
                <div className="mt-2 bg-gray-900 text-gray-100 p-3 rounded-lg text-sm relative">
                  <pre className="whitespace-pre-wrap">{envExample}</pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
                    onClick={() => copyToClipboard(envExample)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </li>

            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                5
              </span>
              <div>
                <p className="font-medium text-gray-900">서버 재시작</p>
                <p className="text-sm text-gray-600 mt-1">환경 변수 변경 후 개발 서버를 재시작하세요</p>
                <div className="mt-2 bg-gray-100 p-2 rounded text-sm font-mono">npm run dev</div>
              </div>
            </li>
          </ol>
        </div>

        {/* 테스트 방법 */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-gray-900 mb-3">🧪 테스트 방법</h4>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800 mb-2">
              API 키 설정이 완료되면 페이지를 새로고침하여 실시간 데이터를 확인하세요.
            </p>
            <p className="text-xs text-blue-600">
              💡 처음에는 테스트넷(BYBIT_TESTNET=true)으로 테스트해보는 것을 권장합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
