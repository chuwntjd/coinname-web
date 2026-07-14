"use client"

import { Github, Twitter, MessageCircle, Send, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactModal } from "@/components/contact/contact-modal"
import { useState } from "react"

export function Footer() {
  const [showContactModal, setShowContactModal] = useState(false)

  const footerLinks = {
    product: [
      { name: "백서", href: "#" },
      { name: "토큰경제", href: "#tokenomics" },
      { name: "로드맵", href: "#roadmap" },
      { name: "감사 보고서", href: "#" },
    ],
    developers: [
      { name: "개발 문서", href: "#" },
      { name: "API 레퍼런스", href: "#" },
      { name: "깃허브", href: "#" },
      { name: "버그 바운티", href: "#" },
    ],
    community: [
      { name: "디스코드", href: "#" },
      { name: "텔레그램", href: "#" },
      { name: "트위터", href: "#" },
      { name: "레딧", href: "#" },
    ],
    support: [
      { name: "도움말 센터", href: "#" },
      { name: "문의하기", href: "#", onClick: () => setShowContactModal(true) },
      { name: "상태 페이지", href: "#" },
      { name: "이용약관", href: "/terms" },
    ],
  }

  const socialLinks = [
    { name: "트위터", icon: Twitter, href: "#" },
    { name: "디스코드", icon: MessageCircle, href: "#" },
    { name: "텔레그램", icon: Send, href: "#" },
    { name: "깃허브", icon: Github, href: "#" },
  ]

  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* 메인 푸터 콘텐츠 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {/* 로고 및 설명 */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-base sm:text-lg bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    C
                  </span>
                </div>
                <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold">CoinName</span>
              </div>
              <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                혁신적인 블록체인 기술과 투명한 거버넌스로 탈중앙화 금융의 미래를 구축하고 있습니다.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <Button key={index} variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                      <Icon className="h-5 w-5" />
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* 제품 링크 */}
            <div>
              <h3 className="text-white font-semibold mb-4">제품</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 개발자 링크 */}
            <div>
              <h3 className="text-white font-semibold mb-4">개발자</h3>
              <ul className="space-y-3">
                {footerLinks.developers.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center"
                    >
                      {link.name}
                      {link.name === "깃허브" && <ExternalLink className="ml-1 h-3 w-3" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 커뮤니티 링크 */}
            <div>
              <h3 className="text-white font-semibold mb-4">커뮤니티</h3>
              <ul className="space-y-3">
                {footerLinks.community.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 지원 링크 */}
            <div>
              <h3 className="text-white font-semibold mb-4">지원</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    {link.onClick ? (
                      <button
                        onClick={link.onClick}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 컨트랙트 주소 */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800">
            <div className="bg-gray-800 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
              <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">컨트랙트 주소</h4>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <code className="text-xs sm:text-sm text-gray-300 bg-gray-700 px-2 sm:px-3 py-1 rounded break-all">
                  0x1234...5678
                </code>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  복사
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">이더리움 메인넷 • 거래 전 항상 컨트랙트 주소를 확인하세요</p>
            </div>
          </div>

          {/* 하단 푸터 */}
          <div className="pt-6 sm:pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              <div className="text-gray-400 text-xs sm:text-sm">© 2024 CoinName. 모든 권리 보유.</div>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  개인정보처리방침
                </a>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  이용약관
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  쿠키 정책
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
    </>
  )
}
