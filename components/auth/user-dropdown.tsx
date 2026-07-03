"use client"

import { useState } from "react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { UserProfileModal } from "./user-profile-modal"
import { User, Trophy, LogOut, Users } from "lucide-react"
import type { UserPoints } from "@/types/user-level"

interface UserDropdownProps {
  user: {
    id: string
    email: string
    username?: string | null
    displayName?: string | null
    avatar?: string | null
    createdAt: string
  }
  userPoints?: UserPoints | null
}

export function UserDropdown({ user, userPoints }: UserDropdownProps) {
  const { logout } = useAuth()
  const [showProfileModal, setShowProfileModal] = useState(false)

  // user가 undefined인 경우 처리
  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.displayName || user.username || "사용자"} />
              <AvatarFallback>{(user.displayName || user.username || "U").charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.displayName || user.username || "사용자"}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email || ""}</p>
              {userPoints && userPoints.currentLevel && (
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-lg">{userPoints.currentLevel.icon || "🥉"}</span>
                  <span className="text-xs font-medium">{userPoints.currentLevel.name || "브론즈"}</span>
                  <span className="text-xs text-muted-foreground">
                    {(userPoints.totalPoints || 0).toLocaleString()}P
                  </span>
                </div>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowProfileModal(true)}>
            <User className="mr-2 h-4 w-4" />
            <span>프로필</span>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/levels">
              <Trophy className="mr-2 h-4 w-4" />
              <span>등급 시스템</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/community">
              <Users className="mr-2 h-4 w-4" />
              <span>커뮤니티</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>로그아웃</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UserProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        user={user}
        userPoints={userPoints}
      />
    </>
  )
}
