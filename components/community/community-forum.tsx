"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PostCard } from "./post-card"
import { CreatePostModal } from "./create-post-modal"
import { PostDetailModal } from "./post-detail-modal"
import { PlusCircle, Search, MessageSquare } from "lucide-react"
import { useUserPoints } from "@/hooks/use-user-points"
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

interface CommunityForumProps {
  user: User | null
}

export function CommunityForum({ user }: CommunityForumProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "trending">("latest")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const { triggerForumPostMission } = useUserPoints(user?.id)

  const categories = [
    { id: "all", name: "전체", icon: "📋" },
    { id: "trading", name: "거래 분석", icon: "📈" },
    { id: "news", name: "뉴스", icon: "📰" },
    { id: "technical", name: "기술 분석", icon: "🔍" },
    { id: "discussion", name: "자유 토론", icon: "💬" },
    { id: "question", name: "질문", icon: "❓" },
  ]

  // 초기 게시글 데이터
  useEffect(() => {
    const initialPosts: Post[] = [
      {
        id: "1",
        title: "비트코인 50,000달러 돌파! 다음 목표는?",
        content: "비트코인이 드디어 50,000달러를 돌파했습니다. 기술적 분석을 통해 다음 저항선을 예측해보겠습니다...",
        author: { name: "크립토분석가", avatar: "/placeholder.svg?height=40&width=40&text=크", id: "crypto1" },
        category: "trading",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likes: 24,
        comments: 8,
        tags: ["비트코인", "기술분석", "50000달러"],
      },
      {
        id: "2",
        title: "이더리움 2.0 업데이트 후 가격 전망",
        content: "이더리움 2.0 업데이트가 완료된 후 가격 변동성과 향후 전망에 대해 논의해보겠습니다...",
        author: { name: "이더리움홀더", avatar: "/placeholder.svg?height=40&width=40&text=이", id: "eth1" },
        category: "technical",
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        likes: 18,
        comments: 12,
        tags: ["이더리움", "ETH2.0", "업데이트"],
      },
      {
        id: "3",
        title: "알트코인 시즌이 올까요?",
        content: "비트코인 도미넌스가 하락하고 있는데, 이번에 알트코인 시즌이 올 가능성이 있을까요?",
        author: { name: "알트코인러버", avatar: "/placeholder.svg?height=40&width=40&text=알", id: "alt1" },
        category: "discussion",
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        likes: 31,
        comments: 15,
        tags: ["알트코인", "시즌", "도미넌스"],
      },
      {
        id: "4",
        title: "DeFi 프로토콜 추천 부탁드립니다",
        content: "DeFi 투자를 시작하려고 하는데, 안전하고 수익률 좋은 프로토콜 추천해주세요!",
        author: { name: "DeFi초보", avatar: "/placeholder.svg?height=40&width=40&text=D", id: "defi1" },
        category: "question",
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
        likes: 12,
        comments: 22,
        tags: ["DeFi", "추천", "초보"],
      },
      {
        id: "5",
        title: "SEC 비트코인 ETF 승인 소식",
        content: "SEC가 비트코인 ETF를 승인했다는 소식이 있는데, 이것이 시장에 미칠 영향은?",
        author: { name: "뉴스헌터", avatar: "/placeholder.svg?height=40&width=40&text=뉴", id: "news1" },
        category: "news",
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
        likes: 45,
        comments: 28,
        tags: ["SEC", "ETF", "승인", "뉴스"],
      },
    ]

    // 로컬 스토리지에서 게시글 불러오기
    const savedPosts = localStorage.getItem("community_posts")
    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts).map((post: any) => ({
        ...post,
        createdAt: new Date(post.createdAt),
      }))
      setPosts([...initialPosts, ...parsedPosts])
    } else {
      setPosts(initialPosts)
    }
  }, [])

  // 필터링 및 정렬
  useEffect(() => {
    let filtered = posts

    // 카테고리 필터
    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    // 검색 필터
    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // 정렬
    switch (sortBy) {
      case "latest":
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        break
      case "popular":
        filtered.sort((a, b) => b.likes - a.likes)
        break
      case "trending":
        filtered.sort((a, b) => b.likes + b.comments - (a.likes + a.comments))
        break
    }

    setFilteredPosts(filtered)
  }, [posts, selectedCategory, searchQuery, sortBy])

  const handleCreatePost = (newPost: Omit<Post, "id" | "createdAt" | "likes" | "comments">) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      createdAt: new Date(),
      likes: 0,
      comments: 0,
    }

    const updatedPosts = [post, ...posts]
    setPosts(updatedPosts)

    // 로컬 스토리지에 저장
    const postsToSave = updatedPosts.filter((p) => !["1", "2", "3", "4", "5"].includes(p.id))
    localStorage.setItem("community_posts", JSON.stringify(postsToSave))

    // 포럼 포스트 미션 트리거
    if (user) {
      triggerForumPostMission()
    }
  }

  const handleLikePost = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post,
      ),
    )
  }

  return (
    <div className="space-y-6">
      {/* 상단 컨트롤 */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900">커뮤니티 포럼</h2>
          {user && (
            <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
              <PlusCircle className="h-4 w-4 mr-2" />글 작성
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {/* 검색 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 정렬 */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="latest">최신순</option>
            <option value="popular">인기순</option>
            <option value="trending">트렌딩</option>
          </select>
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* 게시글 목록 */}
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => handleLikePost(post.id)}
              onClick={() => setSelectedPost(post)}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">게시글이 없습니다.</p>
            {user && (
              <Button onClick={() => setShowCreateModal(true)} className="mt-4 bg-blue-600 hover:bg-blue-700">
                첫 번째 글 작성하기
              </Button>
            )}
          </div>
        )}
      </div>

      {/* 모달들 */}
      {showCreateModal && user && (
        <CreatePostModal
          user={user}
          categories={categories.filter((c) => c.id !== "all")}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreatePost}
        />
      )}

      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          user={user}
          onClose={() => setSelectedPost(null)}
          onLike={() => handleLikePost(selectedPost.id)}
        />
      )}
    </div>
  )
}
