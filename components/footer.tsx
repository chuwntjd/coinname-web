"use client"

import { Github, Twitter, MessageCircle, Send, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactModal } from "@/components/contact/contact-modal"
import { useState } from "react"
import Link from "next/link"

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
      { name: "이용약관", href: "#" },
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* 메인 푸터 콘텐츠 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* 로고 및 설명 */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center mb-4 group" aria-label="CoinName 홈으로">
                <img
                  src="/placeholder.svg?height=40&width=160"
                  alt="CoinName 로고"
                  className="h-10 w-auto transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </Link>
              <p className="text-gray-400 mb-6 leading-relaxed">
                혁신적인 블록체인 기술과 투명한 거버넌스로 탈중앙화 금융의 미래를 구축하고 있습니다.
              </p>
              <div className="flex space-x-4">
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
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="bg-gray-800 rounded-lg p-4 mb-8">
              <h4 className="text-white font-semibold mb-2">컨트랙트 주소</h4>
              <div className="flex items-center justify-between">
                <code className="text-sm text-gray-300 bg-gray-700 px-3 py-1 rounded">
                  0x1234567890abcdef1234567890abcdef12345678
                </code>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  복사
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">이더리움 메인넷 • 거래 전 항상 컨트랙트 주소를 확인하세요</p>
            </div>
          </div>

          {/* 하단 푸터 */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 CoinName. 모든 권리 보유.</div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  개인정보처리방침
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
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
