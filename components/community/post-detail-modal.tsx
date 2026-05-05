"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Heart, MessageCircle, Send, Clock, Tag } from "lucide-react"
import type { User } from "@/types/auth"

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

interface Comment {
  id: string
  user: User
  content: string
  createdAt: Date
  likes: number
  isLiked?: boolean
}

interface PostDetailModalProps {
  post: Post
  user: User | null
  onClose: () => void
  onLike: () => void
}

export function PostDetailModal({ post, user, onClose, onLike }: PostDetailModalProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    // 시뮬레이션된 댓글 데이터
    const simulatedComments: Comment[] = [
      {
        id: "1",
        user: { name: "댓글러1", avatar: "/placeholder.svg?height=32&width=32&text=댓" },
        content: "좋은 분석 감사합니다! 정말 도움이 되었어요.",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likes: 3,
      },
      {
        id: "2",
        user: { name: "투자고수", avatar: "/placeholder.svg?height=32&width=32&text=투" },
        content: "저도 비슷한 생각이었는데, 추가적인 관점을 얻을 수 있었습니다.",
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        likes: 5,
      },
      {
        id: "3",
        user: { name: "크립토뉴비", avatar: "/placeholder.svg?height=32&width=32&text=크" },
        content: "초보자도 이해하기 쉽게 설명해주셔서 감사해요!",
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
        likes: 2,
      },
    ]
    setComments(simulatedComments)
  }, [])

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

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      alert("댓글을 작성하려면 로그인이 필요합니다.")
      return
    }

    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      user,
      content: newComment.trim(),
      createdAt: new Date(),
      likes: 0,
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  const handleLikeComment = (commentId: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked,
            }
          : comment,
      ),
    )
  }

  const categoryInfo = getCategoryInfo(post.category)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">게시글 상세</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          {/* 게시글 정보 */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-medium text-gray-900">{post.author.name}</div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{getTimeAgo(post.createdAt)}</span>
                  </div>
                </div>
              </div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${categoryInfo.color}`}
              >
                <span className="mr-1">{categoryInfo.icon}</span>
                {categoryInfo.name}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>

            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{post.content}</p>
            </div>

            {/* 태그 */}
            {post.tags.length > 0 && (
              <div className="flex items-center space-x-2 mb-6">
                <Tag className="h-4 w-4 text-gray-400" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 액션 버튼 */}
            <div className="flex items-center space-x-4 pb-6 border-b border-gray-200">
              <Button
                variant="ghost"
                onClick={onLike}
                className={`flex items-center space-x-2 ${
                  post.isLiked ? "text-red-600 hover:text-red-700" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Heart className={`h-5 w-5 ${post.isLiked ? "fill-current" : ""}`} />
                <span>{post.likes}</span>
              </Button>
              <div className="flex items-center space-x-2 text-gray-500">
                <MessageCircle className="h-5 w-5" />
                <span>{comments.length}</span>
              </div>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">댓글 ({comments.length})</h3>

            {/* 댓글 작성 */}
            {user ? (
              <form onSubmit={handleAddComment} className="mb-6">
                <div className="flex space-x-3">
                  <img
                    src={user.avatar || `/placeholder.svg?height=40&width=40&text=${user.name.charAt(0)}`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="댓글을 작성하세요..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      maxLength={500}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">{newComment.length}/500</span>
                      <Button type="submit" disabled={!newComment.trim()} className="bg-blue-600 hover:bg-blue-700">
                        <Send className="h-4 w-4 mr-2" />
                        댓글 작성
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="text-center py-4 mb-6 bg-gray-50 rounded-lg">
                <p className="text-gray-500">댓글을 작성하려면 로그인이 필요합니다</p>
              </div>
            )}

            {/* 댓글 목록 */}
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <img
                      src={comment.user.avatar || "/placeholder.svg"}
                      alt={comment.user.name}
                      className="w-8 h-8 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm text-gray-900">{comment.user.name}</span>
                          <span className="text-xs text-gray-500">{getTimeAgo(comment.createdAt)}</span>
                        </div>
                        <p className="text-gray-700 text-sm whitespace-pre-wrap">{comment.content}</p>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLikeComment(comment.id)}
                          className={`flex items-center space-x-1 text-xs ${
                            comment.isLiked ? "text-red-600" : "text-gray-500"
                          }`}
                        >
                          <Heart className={`h-3 w-3 ${comment.isLiked ? "fill-current" : ""}`} />
                          <span>{comment.likes}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p>첫 번째 댓글을 작성해보세요!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
