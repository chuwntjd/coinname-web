"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { validateReferralCode, processReferralReward } from "@/utils/referral-system"
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, signup } = useAuth()
  const [activeTab, setActiveTab] = useState("login")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // 로그인 폼 상태
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  // 회원가입 폼 상태
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
  })

  // 초대 코드 검증 상태
  const [referralValidation, setReferralValidation] = useState<{
    isValid: boolean
    message: string
    referrerName?: string
    welcomeBonus?: number
  } | null>(null)

  // URL에서 초대 코드 추출
  useEffect(() => {
    if (isOpen) {
      const urlParams = new URLSearchParams(window.location.search)
      const refCode = urlParams.get("ref")
      if (refCode) {
        setSignupForm((prev) => ({ ...prev, referralCode: refCode }))
        setActiveTab("signup")
      }
    }
  }, [isOpen])

  // 초대 코드 검증
  useEffect(() => {
    if (signupForm.referralCode) {
      const validation = validateReferralCode(signupForm.referralCode)
      setReferralValidation(validation)
    } else {
      setReferralValidation(null)
    }
  }, [signupForm.referralCode])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await login(loginForm.email, loginForm.password)
      if (success) {
        onClose()
        setLoginForm({ email: "", password: "" })
      } else {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.")
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "로그인 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // 유효성 검사
    if (signupForm.password !== signupForm.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.")
      setIsLoading(false)
      return
    }

    if (signupForm.password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.")
      setIsLoading(false)
      return
    }

    // 초대 코드 검증
    if (signupForm.referralCode && (!referralValidation || !referralValidation.isValid)) {
      setError("유효하지 않은 초대 코드입니다.")
      setIsLoading(false)
      return
    }

    try {
      const success = await signup(signupForm.name, signupForm.email, signupForm.password, signupForm.referralCode)
      if (success) {
        // 초대 코드가 있으면 보상 처리
        if (signupForm.referralCode && referralValidation?.isValid) {
          const newUserId = `user_${Date.now()}`
          processReferralReward(signupForm.referralCode, newUserId, signupForm.name)
        }

        onClose()
        setSignupForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          referralCode: "",
        })
        alert("회원가입이 완료되었습니다. 이메일 확인 설정이 켜져 있다면 메일 인증 후 로그인하세요.")
      } else {
        setError("회원가입에 실패했습니다. 이미 가입된 이메일이거나 Supabase 설정을 확인해야 할 수 있습니다.")
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "회원가입 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    setError("")
    setLoginForm({ email: "", password: "" })
    setSignupForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      referralCode: "",
    })
    setReferralValidation(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>코인네임에 오신 것을 환영합니다!</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">로그인</TabsTrigger>
            <TabsTrigger value="signup">회원가입</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">이메일</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">비밀번호</Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력하세요"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "로그인 중..." : "로그인"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">이름</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">이메일</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">비밀번호</Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력하세요 (6자 이상)"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password">비밀번호 확인</Label>
                <Input
                  id="signup-confirm-password"
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={signupForm.confirmPassword}
                  onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-referral">초대 코드 (선택사항)</Label>
                <Input
                  id="signup-referral"
                  type="text"
                  placeholder="초대 코드를 입력하세요"
                  value={signupForm.referralCode}
                  onChange={(e) => setSignupForm({ ...signupForm, referralCode: e.target.value.toUpperCase() })}
                />
                {referralValidation && (
                  <Alert variant={referralValidation.isValid ? "default" : "destructive"}>
                    {referralValidation.isValid ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertDescription>{referralValidation.message}</AlertDescription>
                  </Alert>
                )}
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "가입 중..." : "회원가입"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
