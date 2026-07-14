"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Settings, MessageSquare, HelpCircle, Gift } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { LoginModal } from "./auth/login-modal"
import { UserDropdown } from "./auth/user-dropdown"
import { useUserPoints } from "@/hooks/use-user-points"
import { AdminVerificationPanel } from "./asset-verification/admin-verification-panel"
import { ContactManagementPanel } from "./admin/contact-management-panel"
import { ContactModal } from "./contact/contact-modal"

export function Header() {
  const { user, isAuthenticated } = useAuth()
  const { userPoints } = useUserPoints()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [showContactPanel, setShowContactPanel] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

  const isAdmin = user?.email === "winner031128@gmail.com"

  const navItems = [
    { href: "/", label: "홈" },
    { href: "/community", label: "커뮤니티" },
    { href: "#news", label: "뉴스" },
  ]

  

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CN</span>
              </div>
              <span className="font-bold text-xl">CoinName</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/trade"
                className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
              >
                거래하기
              </Link>
              <Link
                href="/rewards"
                prefetch={false}
                className="flex items-center gap-1 rounded-full bg-lime-400 px-3 py-1.5 text-sm font-bold text-zinc-950 transition-colors hover:bg-lime-300"
              >
                <Gift className="h-4 w-4" />
                응모하기
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* 문의하기 버튼 - 데모 계정에는 숨김 */}
            {!isAdmin && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowContactModal(true)}
                className="hidden sm:flex items-center space-x-2"
              >
                <HelpCircle className="h-4 w-4" />
                <span>문의하기</span>
              </Button>
            )}

            {isAuthenticated && user ? (
              <>
                {isAdmin && (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setShowAdminPanel(true)}>
                      <Settings className="h-4 w-4 mr-2" />
                      관리자
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowContactPanel(true)}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      문의관리
                    </Button>
                  </>
                )}
                <UserDropdown 
                  user={{
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    displayName: user.displayName,
                    avatar: user.avatar,
                    createdAt: user.createdAt,
                  }} 
                  userPoints={userPoints} 
                />
              </>
            ) : (
              <Button onClick={() => setShowLoginModal(true)}>로그인</Button>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/trade"
                    className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    거래하기
                  </Link>
                  <Link
                    href="/rewards"
                    prefetch={false}
                    className="flex items-center justify-center gap-1.5 rounded-full bg-lime-400 px-4 py-2 text-sm font-bold text-zinc-950 transition-colors hover:bg-lime-300"
                  >
                    <Gift className="h-4 w-4" />
                    응모하기
                  </Link>

                  {/* 모바일 문의하기 버튼 - 데모 계정에는 숨김 */}
                  {!isAdmin && (
                    <Button
                      variant="outline"
                      onClick={() => setShowContactModal(true)}
                      className="flex items-center justify-center space-x-2 mt-4"
                    >
                      <HelpCircle className="h-4 w-4" />
                      <span>문의하기</span>
                    </Button>
                  )}

                  {!isAuthenticated && (
                    <Button onClick={() => setShowLoginModal(true)} className="mt-4">
                      로그인
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />

      {isAdmin && (
        <>
          <AdminVerificationPanel isOpen={showAdminPanel} onClose={() => setShowAdminPanel(false)} />
          <ContactManagementPanel isOpen={showContactPanel} onClose={() => setShowContactPanel(false)} />
        </>
      )}
    </>
  )
}
