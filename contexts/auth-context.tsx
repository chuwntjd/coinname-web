"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string, referralCode?: string) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 로컬스토리지에서 사용자 정보 복원
    try {
      const savedUser = localStorage.getItem("coinname_current_user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error("Failed to load user from localStorage:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // 로컬스토리지에서 사용자 목록 가져오기
      const users = JSON.parse(localStorage.getItem("coinname_users") || "[]")
      const foundUser = users.find((u: any) => u.email === email && u.password === password)

      if (foundUser) {
        const userWithoutPassword = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          avatar: foundUser.avatar,
          createdAt: foundUser.createdAt,
        }
        setUser(userWithoutPassword)
        localStorage.setItem("coinname_current_user", JSON.stringify(userWithoutPassword))
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const signup = async (name: string, email: string, password: string, referralCode?: string): Promise<boolean> => {
    try {
      // 기존 사용자 목록 가져오기
      const users = JSON.parse(localStorage.getItem("coinname_users") || "[]")

      // 이메일 중복 확인
      if (users.some((u: any) => u.email === email)) {
        return false
      }

      // 새 사용자 생성
      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        password,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        createdAt: new Date().toISOString(),
      }

      // 사용자 목록에 추가
      users.push(newUser)
      localStorage.setItem("coinname_users", JSON.stringify(users))

      // 사용자 포인트 초기화
      const userPoints = {
        userId: newUser.id,
        totalPoints: 0,
        referralCode: `CN${newUser.id.slice(-4).toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        referrals: [],
        pointsHistory: [],
        missions: [],
      }
      localStorage.setItem(`coinname_user_points_${newUser.id}`, JSON.stringify(userPoints))

      // 초대 코드 처리
      if (referralCode) {
        // 초대 코드 검증 및 보상 처리 로직 추가 가능
        console.log("Referral code used:", referralCode)
      }

      // 자동 로그인
      const userWithoutPassword = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        createdAt: newUser.createdAt,
      }
      setUser(userWithoutPassword)
      localStorage.setItem("coinname_current_user", JSON.stringify(userWithoutPassword))

      return true
    } catch (error) {
      console.error("Signup error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("coinname_current_user")
  }

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    if (!user) return

    try {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("coinname_current_user", JSON.stringify(updatedUser))

      // 사용자 목록에서도 업데이트
      const users = JSON.parse(localStorage.getItem("coinname_users") || "[]")
      const updatedUsers = users.map((u: any) => (u.id === user.id ? { ...u, ...data } : u))
      localStorage.setItem("coinname_users", JSON.stringify(updatedUsers))
    } catch (error) {
      console.error("Profile update error:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
