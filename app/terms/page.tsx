import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "이용약관 | CoinName",
  description: "코인네임 서비스 이용약관 - 회원가입, 서비스 범위, 회원의 의무 및 면책조항 안내",
}

const articles = [
  {
    title: "제1조 (목적)",
    content:
      "본 약관은 코인네임(CoinName, 이하 \u201c회사\u201d)이 제공하는 암호화폐 정보 및 커뮤니티 서비스(이하 \u201c서비스\u201d)의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.",
    items: null,
  },
  {
    title: "제2조 (회원가입)",
    content:
      "회원가입은 이용자가 본 약관에 동의하고 회사가 정한 절차에 따라 가입을 신청하면, 회사가 이를 승낙함으로써 성립합니다.",
    items: [
      "이메일 주소와 비밀번호를 이용한 가입 또는 카카오 계정을 통한 소셜 로그인으로 가입할 수 있습니다.",
      "타인의 정보를 도용하거나 허위 정보를 기재한 경우 서비스 이용이 제한될 수 있습니다.",
      "회원은 언제든지 탈퇴를 요청할 수 있으며, 탈퇴 시 개인정보는 개인정보처리방침에 따라 파기됩니다.",
    ],
  },
  {
    title: "제3조 (서비스의 제공 범위)",
    content: "회사는 회원에게 아래의 서비스를 제공합니다.",
    items: [
      "암호화폐 관련 정보 및 콘텐츠 제공",
      "커뮤니티 기능 (게시글, 댓글 등)",
      "응모권 기반 리워드 이벤트 운영",
      "기타 회사가 정하는 부가 서비스",
    ],
  },
  {
    title: "제4조 (회원의 의무)",
    content: "회원은 다음 각 호의 행위를 하여서는 안 됩니다.",
    items: [
      "타인의 계정 또는 개인정보를 도용하는 행위",
      "허위 정보 유포, 욕설, 비방 등 커뮤니티 질서를 해치는 행위",
      "부정한 방법으로 응모권을 취득하거나 이벤트를 조작하는 행위",
      "서비스의 정상적인 운영을 방해하는 행위",
      "관계 법령 또는 본 약관을 위반하는 행위",
    ],
  },
  {
    title: "제5조 (투자 정보 관련 면책조항)",
    content:
      "서비스에서 제공되는 모든 암호화폐 관련 정보는 투자 참고 자료일 뿐, 투자 권유나 매매 추천이 아닙니다.",
    items: [
      "암호화폐 투자에 대한 최종 판단과 책임은 전적으로 회원 본인에게 있습니다.",
      "회사는 서비스에서 제공된 정보에 근거한 투자 결과에 대해 어떠한 책임도 지지 않습니다.",
      "암호화폐는 가격 변동성이 크므로 원금 손실의 위험이 있음을 유의하시기 바랍니다.",
    ],
  },
  {
    title: "제6조 (약관의 변경)",
    content:
      "회사는 관계 법령을 위반하지 않는 범위에서 본 약관을 변경할 수 있습니다. 약관이 변경되는 경우 회사는 적용일자 및 변경 사유를 명시하여 적용일 7일 전부터 서비스 내에 공지합니다. 변경된 약관 공지 후에도 회원이 서비스를 계속 이용하는 경우 변경된 약관에 동의한 것으로 간주합니다.",
    items: null,
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <h1 className="text-3xl font-black text-zinc-50 sm:text-4xl text-balance">이용약관</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400 text-pretty">
          코인네임 서비스를 이용해 주셔서 감사합니다. 서비스 이용 전 본 약관을 반드시 확인해 주시기 바랍니다.
        </p>

        <div className="mt-8 flex flex-col gap-6">
          {articles.map((article) => (
            <section key={article.title} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
              <h2 className="text-lg font-bold text-zinc-50">{article.title}</h2>
              {article.content && (
                <p className="mt-2 text-sm leading-relaxed text-zinc-400 text-pretty">{article.content}</p>
              )}
              {article.items && (
                <ul className="mt-3 flex flex-col gap-2">
                  {article.items.map((item) => (
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
