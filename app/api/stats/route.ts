import { NextResponse } from "next/server"

export async function GET() {
  try {
    // 실제 환경에서는 데이터베이스에서 가져오지만,
    // 여기서는 로컬 스토리지 데이터를 시뮬레이션합니다
    const stats = calculateRealTimeStats()

    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("통계 API 오류:", error)
    return NextResponse.json({ success: false, error: "통계 데이터를 가져올 수 없습니다" }, { status: 500 })
  }
}

function calculateRealTimeStats() {
  // 실제 환경에서는 데이터베이스 쿼리를 사용하지만,
  // 데모를 위해 시뮬레이션된 데이터를 생성합니다
  const baseStats = {
    totalUsers: 2847,
    totalPosts: 15234,
    totalComments: 43891,
    satisfactionRate: 98.7,
  }

  // 시간에 따라 약간의 변동을 추가 (실시간 느낌을 위해)
  const now = new Date()
  const hourVariation = Math.sin((now.getHours() / 24) * Math.PI * 2) * 0.02
  const minuteVariation = Math.sin((now.getMinutes() / 60) * Math.PI * 2) * 0.01

  return {
    totalUsers: Math.floor(baseStats.totalUsers * (1 + hourVariation + minuteVariation)),
    totalPosts: Math.floor(baseStats.totalPosts * (1 + hourVariation * 0.5)),
    totalComments: Math.floor(baseStats.totalComments * (1 + hourVariation * 0.3)),
    satisfactionRate: Math.round((baseStats.satisfactionRate + minuteVariation * 0.5) * 10) / 10,
    onlineUsers: Math.floor(50 + Math.sin((now.getHours() / 24) * Math.PI * 2) * 30),
    todayNewUsers: Math.floor(15 + Math.random() * 10),
    todayNewPosts: Math.floor(45 + Math.random() * 20),
  }
}
