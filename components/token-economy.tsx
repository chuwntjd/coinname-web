"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

export function TokenEconomy() {
  const distributionData = [
    { name: "공개 판매", value: 30, color: "#3B82F6" },
    { name: "팀 & 어드바이저", value: 20, color: "#10B981" },
    { name: "개발", value: 25, color: "#F59E0B" },
    { name: "마케팅", value: 15, color: "#EF4444" },
    { name: "리저브", value: 10, color: "#8B5CF6" },
  ]

  const releaseSchedule = [
    { year: "2024", amount: 2.5 },
    { year: "2025", amount: 3.0 },
    { year: "2026", amount: 2.0 },
    { year: "2027", amount: 1.5 },
    { year: "2028", amount: 1.0 },
  ]

  return (
    <section id="tokenomics" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">토큰 경제</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            모든 이해관계자를 위한 인센티브 정렬과 장기적 가치 창출을 위해 설계된 투명하고 지속 가능한 토큰경제학입니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* 토큰 분배 */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">토큰 분배</h3>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {distributionData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* 출시 일정 */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">출시 일정 (억 개)</h3>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={releaseSchedule}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 토큰 세부사항 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">10억 JY</div>
            <div className="text-sm text-gray-600">총 발행량</div>
          </div>
          <div className="bg-green-50 p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">7.5억 JY</div>
            <div className="text-sm text-gray-600">유통량</div>
          </div>
          <div className="bg-purple-50 p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">연 2%</div>
            <div className="text-sm text-gray-600">소각률</div>
          </div>
        </div>
      </div>
    </section>
  )
}
