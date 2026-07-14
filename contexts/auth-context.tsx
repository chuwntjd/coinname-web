"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface Profile {
  id: string
  username: string | null
  display_name: string | null
  avatar_url: string | null
  bio: string | null
  created_at: string
  updated_at: string
}

interface User {
  id: string
  email: string
  username: string | null
  displayName: string | null
  avatar: string | null
  bio: string | null
  createdAt: string
}

interface AuthContextType {
  user: User | null
  supabaseUser: SupabaseUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  loginWithKakao: () => Promise<{ success: boolean; error?: string }>
  signup: (email: string, password: string, username: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  updateProfile: (data: Partial<Profile>) => Promise<{ success: boolean; error?: string }>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single()

    if (error) {
      console.error("Error fetching profile:", error)
      return null
    }
    return data
  }

  const mapProfileToUser = (supabaseUser: SupabaseUser, profile: Profile | null): User => {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || "",
      username: profile?.username || null,
      displayName: profile?.display_name || supabaseUser.email?.split("@")[0] || null,
      avatar: profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${supabaseUser.id}`,
      bio: profile?.bio || null,
      createdAt: profile?.created_at || supabaseUser.created_at,
    }
  }

  const refreshUser = async () => {
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    
    if (currentUser) {
      setSupabaseUser(currentUser)
      const profile = await fetchProfile(currentUser.id)
      setUser(mapProfileToUser(currentUser, profile))
    } else {
      setSupabaseUser(null)
      setUser(null)
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true)
      await refreshUser()
      setIsLoading(false)
    }

    initAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setSupabaseUser(session.user)
        const profile = await fetchProfile(session.user.id)
        setUser(mapProfileToUser(session.user, profile))
      } else {
        setSupabaseUser(null)
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    if (data.user) {
      setSupabaseUser(data.user)
      const profile = await fetchProfile(data.user.id)
      setUser(mapProfileToUser(data.user, profile))
    }

    return { success: true }
  }

  const loginWithKakao = async (): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
          `${window.location.origin}/auth/callback`,
        // 카카오 콘솔에서 승인된 동의 항목(닉네임)만 요청 (KOE205 방지)
        scopes: "profile_nickname",
      },
    })

    if (error) {
      return { success: false, error: error.message }
    }

    // 카카오 로그인은 외부 페이지로 리다이렉트되며, 콜백에서 세션이 설정됩니다.
    return { success: true }
  }

  const signup = async (email: string, password: string, username: string): Promise<{ success: boolean; error?: string }> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? 
          `${window.location.origin}/auth/callback`,
        data: {
          username,
          display_name: username,
        },
      },
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSupabaseUser(null)
  }

  const updateProfile = async (data: Partial<Profile>): Promise<{ success: boolean; error?: string }> => {
    if (!supabaseUser) {
      return { success: false, error: "Not authenticated" }
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", supabaseUser.id)

    if (error) {
      return { success: false, error: error.message }
    }

    await refreshUser()
    return { success: true }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        supabaseUser,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithKakao,
        signup,
        logout,
        updateProfile,
        refreshUser,
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
