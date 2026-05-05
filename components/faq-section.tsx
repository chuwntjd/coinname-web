"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([0])

  const faqs = [
    {
      question: "JY란 무엇이며 어떻게 작동하나요?",
      answer:
        "JY는 고속 트랜잭션, 스마트 컨트랙트 기능, 크로스체인 상호 운용성을 결합한 차세대 블록체인 플랫폼입니다. 에너지 효율성을 유지하면서 보안을 보장하는 지분증명 합의 메커니즘을 사용합니다.",
    },
    {
      question: "JY 토큰은 어떻게 구매할 수 있나요?",
      answer:
        "JY 토큰은 업비트, 빗썸, 코인원, 바이낸스 등 주요 거래소에서 구매할 수 있습니다. 메타마스크 등 지원 지갑을 통해 공식 웹사이트에서도 직접 구매 가능합니다.",
    },
    {
      question: "어떤 지갑이 JY 토큰을 지원하나요?",
      answer:
        "JY 토큰은 메타마스크, 트러스트 월렛, 레저, 트레저, 코인베이스 월렛 등 인기 지갑에서 지원됩니다. iOS와 안드로이드용 자체 모바일 지갑도 제공합니다.",
    },
    {
      question: "JY 토큰의 총 발행량은 얼마인가요?",
      answer:
        "JY 토큰의 총 발행량은 10억 개로 제한됩니다. 현재 7억 5천만 개가 유통되고 있으며, 나머지 토큰은 투명한 베스팅 일정에 따라 출시됩니다.",
    },
    {
      question: "거버넌스 시스템은 어떻게 작동하나요?",
      answer:
        "JY 토큰 홀더는 토큰을 스테이킹하고 제안에 투표하여 거버넌스에 참여할 수 있습니다. 스테이킹된 각 토큰은 하나의 투표권을 나타내며, 제안이 통과되려면 최소 정족수가 필요합니다.",
    },
    {
      question: "스테이킹 보상은 얼마인가요?",
      answer:
        "스테이킹 보상은 네트워크 참여도에 따라 달라지지만 일반적으로 연 8-12% 범위입니다. 보상은 스테이커에게 자동으로 분배되며 언제든지 청구할 수 있습니다.",
    },
    {
      question: "JY는 감사를 받았나요?",
      answer:
        "네, 저희 스마트 컨트랙트는 CertiK와 ConsenSys Diligence 등 선도적인 보안 회사의 감사를 받았습니다. 모든 감사 보고서는 GitHub 저장소에서 공개적으로 확인할 수 있습니다.",
    },
    {
      question: "기술 지원은 어떻게 받을 수 있나요?",
      answer:
        "기술 지원은 디스코드 커뮤니티, 텔레그램 채널을 통해 24시간 이용 가능하며, 지원 포털을 통해 티켓을 제출할 수도 있습니다. 저희 팀은 일반적으로 2-4시간 내에 응답합니다.",
    },
  ]

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]))
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
          <p className="text-lg text-gray-600">JY에 대한 일반적인 질문들의 답변을 확인하세요</p>
        </div>

        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                onClick={() => toggleItem(index)}
              >
                <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openItems.includes(index) && (
                <div className="px-6 pb-4 bg-gray-50">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 고객 지원 */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">더 궁금한 점이 있으신가요?</h3>
          <p className="text-gray-600 mb-6">저희 지원팀이 24시간 도움을 드립니다</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              이메일 지원
            </Button>
            <Button variant="outline" className="flex items-center bg-transparent">
              <MessageCircle className="mr-2 h-4 w-4" />
              실시간 채팅
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
