"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"

interface KakaoLoginButtonProps {
  onError?: (message: string) => void
  className?: string
}

export function KakaoLoginButton({ onError, className }: KakaoLoginButtonProps) {
  const { loginWithKakao } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    const result = await loginWithKakao()
    if (!result.success) {
      onError?.(result.error || "카카오 로그인 중 오류가 발생했습니다.")
      setIsLoading(false)
    }
    // 성공 시 카카오 인증 페이지로 리다이렉트되므로 로딩 상태를 유지합니다.
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className={`flex w-full items-center justify-center gap-2 rounded-md bg-[#FEE500] px-4 py-2.5 text-sm font-medium text-[#191600] transition-opacity hover:opacity-90 disabled:opacity-60 ${className ?? ""}`}
    >
      <svg
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 3C6.477 3 2 6.463 2 10.734c0 2.743 1.84 5.15 4.61 6.508-.203.736-.733 2.66-.84 3.072-.13.51.187.503.394.366.162-.107 2.576-1.75 3.626-2.466.717.105 1.457.16 2.21.16 5.523 0 10-3.463 10-7.64C22 6.463 17.523 3 12 3Z"
          fill="#191600"
        />
      </svg>
      {isLoading ? "카카오로 이동 중..." : "카카오로 시작하기"}
    </button>
  )
}
