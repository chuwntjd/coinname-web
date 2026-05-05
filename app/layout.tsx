import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "코인네임 - 대한민국 최고의 암호화폐 커뮤니티 | 비트코인 이더리움 투자정보",
  description:
    "코인네임에서 암호화폐 투자 정보를 공유하세요. 비트코인, 이더리움, 알트코인 분석과 실시간 채팅, 전문가 의견을 한곳에서! 국내 최대 코인 커뮤니티",
  keywords: [
    "코인네임",
    "암호화폐",
    "비트코인",
    "이더리움",
    "코인 커뮤니티",
    "코인 사이트",
    "가상화폐",
    "블록체인",
    "DeFi",
    "NFT",
    "투자정보",
    "코인 분석",
    "암호화폐 뉴스",
    "비트코인 시세",
    "이더리움 가격",
    "알트코인",
    "코인 투자",
    "가상화폐 거래소",
    "코인 차트",
    "암호화폐 전망",
    "디지털 자산",
    "크립토",
    "토큰",
    "스테이킹",
    "코인 리뷰",
    "암호화폐 커뮤니티",
    "비트코인 커뮤니티",
    "이더리움 커뮤니티",
  ].join(", "),
  authors: [{ name: "코인네임 팀", url: "https://coinname.kr" }],
  creator: "코인네임",
  publisher: "코인네임",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://coinname.kr",
    siteName: "코인네임",
    title: "코인네임 - 대한민국 최고의 암호화폐 커뮤니티",
    description:
      "비트코인, 이더리움 등 암호화폐 투자 정보와 실시간 커뮤니티. 전문가 분석과 투자자들의 생생한 경험을 공유하세요!",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200&text=코인네임+암호화폐+커뮤니티",
        width: 1200,
        height: 630,
        alt: "코인네임 - 암호화폐 커뮤니티 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@coinname_kr",
    creator: "@coinname_kr",
    title: "코인네임 - 대한민국 최고의 암호화폐 커뮤니티",
    description: "비트코인, 이더리움 투자정보와 실시간 커뮤니티 💰 전문가 분석 📈 투자자 경험담 💬",
    images: ["/placeholder.svg?height=630&width=1200&text=코인네임+암호화폐+커뮤니티"],
  },
  verification: {
    google: "your-google-verification-code",
    other: {
      "naver-site-verification": "your-naver-verification-code",
    },
  },
  alternates: {
    canonical: "https://coinname.kr",
    languages: {
      "ko-KR": "https://coinname.kr",
      "en-US": "https://coinname.kr/en",
    },
  },
  category: "finance",
  classification: "암호화폐 커뮤니티",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* 네이버 웹마스터 도구 */}
        <meta name="naver-site-verification" content="your-naver-verification-code" />

        {/* 구글 서치 콘솔 */}
        <meta name="google-site-verification" content="your-google-verification-code" />

        {/* 추가 SEO 메타태그 */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#2563eb" />

        {/* 지역 SEO */}
        <meta name="geo.region" content="KR" />
        <meta name="geo.country" content="Korea" />
        <meta name="geo.placename" content="Seoul, Korea" />

        {/* 소셜 미디어 최적화 */}
        <meta property="fb:app_id" content="your-facebook-app-id" />
        <meta name="pinterest-rich-pins" content="true" />

        {/* JSON-LD 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "코인네임",
              alternateName: ["코인네임 커뮤니티", "암호화폐 커뮤니티"],
              url: "https://coinname.kr",
              description: "대한민국 최고의 암호화폐 커뮤니티. 비트코인, 이더리움 투자정보와 실시간 소통",
              inLanguage: "ko-KR",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://coinname.kr/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              sameAs: [
                "https://twitter.com/coinname_kr",
                "https://facebook.com/coinname.kr",
                "https://instagram.com/coinname_kr",
                "https://youtube.com/coinname_kr",
              ],
            }),
          }}
        />

        {/* 조직 정보 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "코인네임",
              url: "https://coinname.kr",
              logo: "https://coinname.kr/logo.png",
              description: "암호화폐 투자자들을 위한 커뮤니티 플랫폼",
              foundingDate: "2024",
              founders: [
                {
                  "@type": "Person",
                  name: "코인네임 팀",
                },
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: "contact@coinname.kr",
              },
              sameAs: ["https://twitter.com/coinname_kr", "https://facebook.com/coinname_kr"],
            }),
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
