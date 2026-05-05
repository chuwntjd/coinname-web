"use client"

import { MessageCircle, Users, Github, Twitter, Send, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CommunitySection() {
  const communityLinks = [
    {
      name: "디스코드",
      icon: MessageCircle,
      members: "25,000+",
      description: "토론과 지원을 위한 활발한 커뮤니티에 참여하세요",
      link: "#",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      name: "텔레그램",
      icon: Send,
      members: "18,000+",
      description: "실시간 업데이트와 공지사항을 받아보세요",
      link: "#",
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "트위터",
      icon: Twitter,
      members: "45,000+",
      description: "최신 뉴스와 인사이트를 팔로우하세요",
      link: "#",
      color: "bg-sky-100 text-sky-600",
    },
    {
      name: "깃허브",
      icon: Github,
      members: "2,500+",
      description: "오픈소스 개발에 기여해주세요",
      link: "#",
      color: "bg-gray-100 text-gray-600",
    },
    {
      name: "레딧",
      icon: MessageSquare,
      members: "12,000+",
      description: "커뮤니티 토론과 AMA에 참여하세요",
      link: "#",
      color: "bg-orange-100 text-orange-600",
    },
    {
      name: "포럼",
      icon: Users,
      members: "8,000+",
      description: "기술 토론과 거버넌스 제안을 확인하세요",
      link: "#",
      color: "bg-green-100 text-green-600",
    },
  ]

  const recentActivity = [
    {
      platform: "디스코드",
      activity: "개발팀과의 주간 AMA",
      time: "2시간 전",
    },
    {
      platform: "트위터",
      activity: "주요 DeFi 프로토콜과의 파트너십 발표",
      time: "6시간 전",
    },
    {
      platform: "깃허브",
      activity: "새로운 스마트 컨트랙트 감사 결과 공개",
      time: "1일 전",
    },
    {
      platform: "텔레그램",
      activity: "거버넌스 제안 #15에 대한 커뮤니티 투표",
      time: "2일 전",
    },
  ]

  return (
    <section id="community" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">커뮤니티 참여</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            활발한 커뮤니티 플랫폼에서 수천 명의 JY 애호가, 개발자, 투자자들과 소통하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {communityLinks.map((community, index) => {
            const Icon = community.icon
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${community.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">{community.members}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{community.name}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{community.description}</p>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => window.open(community.link, "_blank")}
                >
                  {community.name} 참여하기
                </Button>
              </div>
            )
          })}
        </div>

        {/* 최근 활동 */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">최근 커뮤니티 활동</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {activity.platform}
                    </span>
                    <span className="text-sm text-gray-900">{activity.activity}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-500 ml-4">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 커뮤니티 통계 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600 mb-2">11만+</div>
            <div className="text-sm text-gray-600">총 멤버</div>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-sm text-gray-600">국가</div>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600">활성 지원</div>
          </div>
          <div className="text-center p-6 bg-orange-50 rounded-xl">
            <div className="text-2xl font-bold text-orange-600 mb-2">95%</div>
            <div className="text-sm text-gray-600">만족도</div>
          </div>
        </div>
      </div>
    </section>
  )
}
