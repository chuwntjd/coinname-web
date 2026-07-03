"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CommunityForum } from "@/components/community/community-forum"
import { LiveChat } from "@/components/community/live-chat"
import { CommunityStats } from "@/components/community/community-stats"
import { TrendingTopics } from "@/components/community/trending-topics"
import { Button } from "@/components/ui/button"
import { MessageSquare, Users } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { LoginModal } from "@/components/auth/login-modal"
import { StructuredData } from "@/components/seo/structured-data"
import Head from "next/head"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"forum" | "chat">("forum")
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { user } = useAuth()

  const communityData = {
    title: "코인네임 커뮤니티 - 암호화폐 투자자들의 소통공간",
    description: "비트코인, 이더리움 등 암호화폐 투자 정보를 실시간으로 공유하고 토론하는 커뮤니티",
    url: "https://coinname.kr/community",
    publishedDate: "2024-01-01",
    modifiedDate: new Date().toISOString(),
    author: "코인네임 커뮤니티",
  }

  return (
    <>
      <Head>
        <title>코인네임 커뮤니티 - 암호화폐 투자자들의 실시간 소통공간 | 비트코인 이더리움 토론</title>
        <meta
          name="description"
          content="🔥 암호화폐 투자자들이 모이는 곳! 비트코인, 이더리움 투자 경험담과 분석을 실시간으로 공유하세요. 전문가들과 소통하고 투자 인사이트를 얻어가세요!"
        />
        <meta
          name="keywords"
          content="암호화폐 커뮤니티, 비트코인 커뮤니티, 이더리움 토론, 코인 투자 경험담, 가상화폐 분석, 실시간 채팅, 투자자 소통"
        />
        <meta property="og:title" content="코인네임 커뮤니티 - 암호화폐 투자자들의 실시간 소통공간 🔥" />
        <meta
          property="og:description"
          content="비트코인, 이더리움 투자 경험담과 전문가 분석을 실시간으로! 지금 참여하세요 💬"
        />
        <meta property="og:url" content="https://coinname.kr/community" />
        <link rel="canonical" href="https://coinname.kr/community" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <StructuredData type="community" data={communityData} />

        {/* 커뮤니티 페이지 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "코인네임 커뮤니티",
              description: "암호화폐 투자자들을 위한 커뮤니티 페이지",
              url: "https://coinname.kr/community",
              mainEntity: {
                "@type": "DiscussionForumPosting",
                name: "암호화폐 투자 커뮤니티",
                description: "비트코인, 이더리움 등 암호화폐 투자 정보 공유",
              },
              breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "홈",
                    item: "https://coinname.kr",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "커뮤니티",
                    item: "https://coinname.kr/community",
                  },
                ],
              },
            }),
          }}
        />

        <Header />

        <main className="pt-16">
          {/* 커뮤니티 헤더 */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">코인네임 커뮤니티</h1>
                  <p className="text-sm sm:text-xl text-blue-100">암호화폐 투자자들과 소통하고 정보를 공유하세요</p>
                  <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-6 text-xs sm:text-sm">
                    <span>📈 실시간 분석</span>
                    <span>💬 24시간 채팅</span>
                    <span className="hidden sm:inline">🔥 전문가 의견</span>
                    <span className="hidden sm:inline">📊 시장 동향</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {user ? (
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <img
                        src={user.avatar || `/placeholder.svg?height=40&width=40&text=${(user.displayName || user.username || "U").charAt(0)}`}
                        alt={user.displayName || user.username || "사용자"}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white"
                      />
                      <div>
                        <div className="font-medium text-sm sm:text-base">{user.displayName || user.username || "사용자"}</div>
                        <div className="text-xs sm:text-sm text-blue-200 hidden sm:block">{user.email}</div>
                      </div>
                    </div>
                  ) : (
                    <Button onClick={() => setShowLoginModal(true)} className="bg-white text-blue-600 hover:bg-blue-50 text-sm">
                      <Users className="h-4 w-4 mr-2" />
                      로그인
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
              {/* 메인 콘텐츠 */}
              <div className="lg:col-span-3 order-2 lg:order-1">
                {/* 탭 네비게이션 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                  <div className="flex border-b border-gray-200">
                    <button
                      onClick={() => setActiveTab("forum")}
                      className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                        activeTab === "forum"
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span>포럼</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("chat")}
                      className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                        activeTab === "chat"
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Users className="h-5 w-5" />
                      <span>실시간 채팅</span>
                    </button>
                  </div>

                  <div className="p-6">
                    {activeTab === "forum" ? <CommunityForum /> : <LiveChat user={user} />}
                  </div>
                </div>
              </div>

              {/* 사이드바 */}
              <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                <CommunityStats />
                <TrendingTopics />
              </div>
            </div>
          </div>
        </main>

        <Footer />
        {/* 로그인 모달 */}
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </div>
    </>
  )
}
