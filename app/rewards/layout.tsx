import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "응모하기 - 코인네임 리워드 | 미션 완료하고 현금 당첨 기회를 잡으세요",
  description:
    "미션을 완료하고 응모권을 모아 현금 보상에 응모하세요! 회원가입, 거래소 가입, 커뮤니티 활동, 출석체크로 응모권을 누적하고 실시간 당첨 확률을 확인하세요.",
  keywords: "코인네임 응모, 암호화폐 이벤트, 응모권, 현금 추첨, 리워드, 미션, 거래소 가입 이벤트",
  openGraph: {
    title: "응모하기 - 코인네임 리워드",
    description: "미션 완료하고 응모권 모아 현금 당첨 기회를 잡으세요!",
    url: "https://coinname.kr/rewards",
  },
}

export default function RewardsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
