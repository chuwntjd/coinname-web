import { Linkedin, Twitter, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TeamSection() {
  const teamMembers = [
    {
      name: "이준영",
      position: "CEO & 공동창업자",
      bio: "주요 테크 기업에서 10년 이상의 분산 시스템 경험을 가진 전 블록체인 아키텍트입니다.",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
      },
    },
    {
      name: "이지영",
      position: "CTO & 공동창업자",
      bio: "컴퓨터 과학 박사, 암호학 및 합의 알고리즘 전문가입니다.",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
      },
    },
    {
      name: "박준호",
      position: "프로덕트 총괄",
      bio: "수백만 사용자 규모의 핀테크 제품 확장 경험을 가진 프로덕트 리더입니다.",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "최수진",
      position: "마케팅 총괄",
      bio: "암호화폐 및 블록체인 분야에서 성공적인 실적을 가진 성장 마케팅 전문가입니다.",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
  ]

  const advisors = [
    {
      name: "김영수 박사",
      position: "기술 어드바이저",
      company: "전 코인베이스 VP 엔지니어링",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "이미경",
      position: "전략 어드바이저",
      company: "블록체인 캐피털 파트너",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "박대현",
      position: "규제 어드바이저",
      company: "전 금융위원회 위원",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  return (
    <section id="team" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 핵심 팀 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">우리 팀을 만나보세요</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            블록체인 기술, 금융, 제품 개발 분야에서 수십 년의 경험을 가진 다양한 전문가들로 구성된 우리 팀입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium text-sm mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                <div className="flex space-x-3">
                  {member.social.linkedin && (
                    <Button size="sm" variant="ghost" className="p-2">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  )}
                  {member.social.twitter && (
                    <Button size="sm" variant="ghost" className="p-2">
                      <Twitter className="h-4 w-4" />
                    </Button>
                  )}
                  {member.social.github && (
                    <Button size="sm" variant="ghost" className="p-2">
                      <Github className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 어드바이저 */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">자문단</h3>
          <p className="text-lg text-gray-600">우리의 전략적 방향을 이끄는 업계 리더들</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advisors.map((advisor, index) => (
            <div key={index} className="text-center bg-gray-50 rounded-xl p-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src={advisor.image || "/placeholder.svg"}
                  alt={advisor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">{advisor.name}</h4>
              <p className="text-blue-600 font-medium text-sm mb-2">{advisor.position}</p>
              <p className="text-gray-600 text-sm">{advisor.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
