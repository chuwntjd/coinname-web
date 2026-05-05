"use client"

import { AlertTriangle, Crown, Info } from 'lucide-react'

export function CrownTraderDashboard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="text-center">
        <AlertTriangle className="h-16 w-16 text-orange-500 mx-auto mb-6" />
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">서비스 준비 중</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Crown Trader 대시보드가 일시적으로 중단되었습니다. 더 나은 서비스를 위해 시스템을 개선하고 있습니다.
        </p>
        
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <h4 className="font-medium text-blue-900 mb-2">개선 중인 기능들</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 실시간 데이터 연동 최적화</li>
                <li>• 사용자 인터페이스 개선</li>
                <li>• 보안 시스템 강화</li>
                <li>• 성능 향상 작업</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            서비스 복구 시 즉시 알려드리겠습니다. 불편을 드려 죄송합니다.
          </p>
        </div>
      </div>
    </div>
  )
}
