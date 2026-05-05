"use client"

import { Heart, MessageCircle, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AssetBadge } from "@/components/asset-verification/asset-badge"
import { useAssetVerification } from "@/hooks/use-asset-verification"

interface User {
  id?: string
  name: string
  avatar: string
}

interface Post {
  id: string
  title: string
  content: string
  author: User
  category: string
  createdAt: Date
  likes: number
  comments: number
  tags: string[]
  isLiked?: boolean
}

interface PostCardProps {
  post: Post
  onLike: () => void
  onClick: () => void
}

export function PostCard({ post, onLike, onClick }: PostCardProps) {
  const { userProfile } = useAssetVerification(post.author.id)

  const getCategoryInfo = (category: string) => {
    const categories = {
      trading: { name: "거래 분석", color: "bg-green-100 text-green-800", icon: "📈" },
      news: { name: "뉴스", color: "bg-blue-100 text-blue-800", icon: "📰" },
      technical: { name: "기술 분석", color: "bg-purple-100 text-purple-800", icon: "🔍" },
      discussion: { name: "자유 토론", color: "bg-orange-100 text-orange-800", icon: "💬" },
      question: { name: "질문", color: "bg-red-100 text-red-800", icon: "❓" },
    }
    return (
      categories[category as keyof typeof categories] || {
        name: category,
        color: "bg-gray-100 text-gray-800",
        icon: "📋",
      }
    )
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "방금 전"
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}시간 전`

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}일 전`
  }

  const categoryInfo = getCategoryInfo(post.category)

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
      <div onClick={onClick}>
        {/* 헤더 */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">{post.author.name}</span>
                {/* 자산 인증 배지 */}
                {userProfile?.isVerified && userProfile.verifiedAsset && (
                  <AssetBadge
                    amount={userProfile.verifiedAsset.amount}
                    currency={userProfile.verifiedAsset.currency}
                    badge={userProfile.verificationBadge || "bronze"}
                    isPublic={true}
                    className="ml-1"
                  />
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{getTimeAgo(post.createdAt)}</span>
              </div>
            </div>
          </div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryInfo.color}`}
          >
            <span className="mr-1">{categoryInfo.icon}</span>
            {categoryInfo.name}
          </span>
        </div>

        {/* 제목과 내용 */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>

        {/* 태그 */}
        {post.tags.length > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="h-4 w-4 text-gray-400" />
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag, index) => (
                <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 액션 버튼 */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onLike()
            }}
            className={`flex items-center space-x-1 ${
              post.isLiked ? "text-red-600 hover:text-red-700" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
            <span>{post.likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClick}
            className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments}</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={onClick} className="text-blue-600 hover:text-blue-700">
          자세히 보기
        </Button>
      </div>
    </div>
  )
}
