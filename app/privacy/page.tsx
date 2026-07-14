import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "개인정보처리방침 | CoinName",
  description: "코인네임 개인정보처리방침 - 수집 항목, 이용 목적, 보유 기간 및 처리 위탁 안내",
}

const sections = [
  {
    title: "1. 수집하는 개인정보 항목",
    content: null,
    items: [
      "이메일 회원가입 시: 이메일 주소, 비밀번호, 닉네임",
      "카카오 로그인 시: 닉네임, 프로필 사진(선택), 이메일(선택)",
    ],
  },
  {
    title: "2. 개인정보의 수집 및 이용 목적",
    content: null,
    items: [
      "회원 식별 및 본인 확인",
      "커뮤니티 기능 제공 (게시글, 댓글 등)",
      "응모권 이벤트 운영 및 당첨자 관리",
      "고객 문의 응대 및 공지사항 전달",
    ],
  },
  {
    title: "3. 개인정보의 보유 및 이용 기간",
    content:
      "회원의 개인정보는 서비스 이용 기간 동안 보유하며, 회원 탈퇴 시 지체 없이 파기합니다. 단, 관계 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 보관할 수 있습니다.",
    items: null,
  },
  {
    title: "4. 개인정보 처리의 위탁",
    content:
      "코인네임은 서비스 제공을 위해 아래와 같이 개인정보 처리를 위탁하고 있습니다.",
    items: ["Supabase: 회원 인증 및 데이터베이스 운영"],
  },
  {
    title: "5. 이용자의 권리",
    content:
      "이용자는 언제든지 자신의 개인정보를 조회, 수정할 수 있으며 회원 탈퇴를 통해 개인정보의 파기를 요청할 수 있습니다.",
    items: null,
  },
  {
    title: "6. 개인정보 관련 문의",
    content:
      "개인정보 처리에 관한 문의는 아래 이메일로 연락해 주시기 바랍니다.",
    items: ["이메일: privacy@coinname.kr"],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <h1 className="text-3xl font-black text-zinc-50 sm:text-4xl text-balance">개인정보처리방침</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400 text-pretty">
          코인네임(CoinName)은 이용자의 개인정보를 소중히 여기며, 관련 법령을 준수하여 개인정보를 안전하게
          관리합니다. 본 방침은 코인네임이 수집하는 개인정보의 항목, 이용 목적, 보유 기간 등을 안내합니다.
        </p>

        <div className="mt-8 flex flex-col gap-6">
          {sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
              <h2 className="text-lg font-bold text-zinc-50">{section.title}</h2>
              {section.content && (
                <p className="mt-2 text-sm leading-relaxed text-zinc-400 text-pretty">{section.content}</p>
              )}
              {section.items && (
                <ul className="mt-3 flex flex-col gap-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-zinc-300">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lime-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <p className="mt-8 text-xs text-zinc-500">시행일: 2024년 1월 1일</p>
      </main>

      <Footer />
    </div>
  )
}
