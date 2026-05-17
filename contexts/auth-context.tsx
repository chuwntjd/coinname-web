"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
}

interface AuthResult {
  success: boolean
  message?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<AuthResult>
  signup: (name: string, email: string, password: string, referralCode?: string) => Promise<AuthResult>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function toAppUser(user: SupabaseUser): User {
  const metadata = user.user_metadata || {}
  const name =
    typeof metadata.name === "string" && metadata.name.trim().length > 0
      ? metadata.name
      : user.email?.split("@")[0] || "사용자"
  const avatar = typeof metadata.avatar === "string" ? metadata.avatar : undefined

  return {
    id: user.id,
    name,
    email: user.email || "",
    avatar,
    createdAt: user.created_at,
  }
}

function getAuthErrorMessage(error: { message?: string }, fallback: string) {
  const message = error.message?.toLowerCase() || ""

  if (message.includes("invalid login credentials")) {
    return "이메일 또는 비밀번호가 올바르지 않습니다."
  }

  if (message.includes("email not confirmed")) {
    return "이메일 인증이 아직 완료되지 않았습니다. 받은 메일의 인증 링크를 먼저 눌러주세요."
  }

  if (message.includes("user already registered") || message.includes("already registered")) {
    return "이미 가입된 이메일입니다. 로그인하거나 다른 이메일로 가입해주세요."
  }

  return fallback
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    try {
      const supabase = getSupabaseBrowserClient()

      supabase.auth
        .getSession()
        .then(({ data, error }) => {
          if (!isActive) return
          if (error) {
            console.error("Failed to load Supabase session:", error)
            setUser(null)
            return
          }
          setUser(data.session?.user ? toAppUser(data.session.user) : null)
        })
        .finally(() => {
          if (isActive) setIsLoading(false)
        })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ? toAppUser(session.user) : null)
        setIsLoading(false)
      })

      return () => {
        isActive = false
        subscription.unsubscribe()
      }
    } catch (error) {
      console.error("Supabase auth setup error:", error)
      setUser(null)
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string): Promise<AuthResult> => {
    const supabase = getSupabaseBrowserClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        success: false,
        message: getAuthErrorMessage(error, "로그인 중 오류가 발생했습니다."),
      }
    }

    if (data.user) {
      setUser(toAppUser(data.user))
    }

    return { success: !!data.user }
  }

  const signup = async (name: string, email: string, password: string, referralCode?: string): Promise<AuthResult> => {
    const supabase = getSupabaseBrowserClient()
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          nickname: name,
          full_name: name,
          phone_number: null,
          avatar,
          referral_code: referralCode || null,
        },
      },
    })

    if (error) {
      return {
        success: false,
        message: getAuthErrorMessage(error, "회원가입에 실패했습니다. Supabase 설정을 확인해야 할 수 있습니다."),
      }
    }

    if (data.user && data.session) {
      setUser(toAppUser(data.user))
    }

    return { success: !!data.user }
  }

  const logout = () => {
    try {
      const supabase = getSupabaseBrowserClient()
      void supabase.auth.signOut()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setUser(null)
      localStorage.removeItem("coinname_current_user")
    }
  }

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    if (!user) return

    const supabase = getSupabaseBrowserClient()
    const nextUser = { ...user, ...data }
    const { error } = await supabase.auth.updateUser({
      data: {
        name: nextUser.name,
        nickname: nextUser.name,
        full_name: nextUser.name,
        avatar: nextUser.avatar,
      },
    })

    if (error) {
      console.error("Profile update error:", error)
      throw error
    }

    setUser(nextUser)
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
