// 데모 사용자 데이터 초기화
export function initializeDemoData() {
  if (typeof window === "undefined") return

  const existingUsers = localStorage.getItem("coinname_users")
  if (!existingUsers) {
    const demoUsers = [
      {
        id: "demo-user-1",
        email: "demo@coinname.kr",
        name: "데모 사용자",
        password: "demo123",
        avatar: "/placeholder.svg?height=40&width=40&text=데",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30일 전
        lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1시간 전
      },
      {
        id: "demo-user-2",
        email: "admin@coinname.kr",
        name: "관리자",
        password: "admin123",
        avatar: "/placeholder.svg?height=40&width=40&text=관",
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60일 전
        lastLogin: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10분 전
      },
    ]

    localStorage.setItem("coinname_users", JSON.stringify(demoUsers))
  }
}
