"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  PlusCircle, 
  Search, 
  MessageSquare, 
  Heart, 
  MessageCircle,
  Loader2,
  Trash2
} from "lucide-react"
import { usePosts, useComments, type Post } from "@/hooks/use-posts"
import { useAuth } from "@/contexts/auth-context"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const categories = [
  { id: "all", name: "전체", icon: "📋" },
  { id: "general", name: "일반", icon: "💬" },
  { id: "trading", name: "거래 분석", icon: "📈" },
  { id: "news", name: "뉴스", icon: "📰" },
  { id: "technical", name: "기술 분석", icon: "🔍" },
  { id: "question", name: "질문", icon: "❓" },
]

export function CommunityForum() {
  const { user, isAuthenticated } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  
  const { posts, isLoading, error, createPost, deletePost, likePost, refresh } = usePosts(
    selectedCategory === "all" ? undefined : selectedCategory
  )

  const filteredPosts = searchQuery 
    ? posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts

  const handleCreatePost = async (title: string, content: string, category: string) => {
    const result = await createPost(title, content, category)
    if (result.success) {
      setShowCreateModal(false)
    }
    return result
  }

  const handleLikePost = async (postId: string) => {
    await likePost(postId)
  }

  const handleDeletePost = async (postId: string) => {
    const result = await deletePost(postId)
    if (result.success && selectedPost?.id === postId) {
      setSelectedPost(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* 상단 컨트롤 */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">커뮤니티 포럼</h2>
          {isAuthenticated && (
            <Button onClick={() => setShowCreateModal(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              글 작성
            </Button>
          )}
        </div>

        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full sm:w-64"
          />
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* 게시글 목록 */}
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))
        ) : error ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-destructive">{error}</p>
              <Button onClick={refresh} variant="outline" className="mt-4">
                다시 시도
              </Button>
            </CardContent>
          </Card>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUserId={user?.id}
              onLike={() => handleLikePost(post.id)}
              onDelete={() => handleDeletePost(post.id)}
              onClick={() => setSelectedPost(post)}
            />
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">게시글이 없습니다.</p>
              {isAuthenticated && (
                <Button onClick={() => setShowCreateModal(true)} className="mt-4">
                  첫 번째 글 작성하기
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* 글 작성 모달 */}
      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreatePost}
        categories={categories.filter(c => c.id !== "all")}
      />

      {/* 게시글 상세 모달 */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          currentUserId={user?.id}
          isAuthenticated={isAuthenticated}
          onClose={() => setSelectedPost(null)}
          onLike={() => handleLikePost(selectedPost.id)}
          onDelete={() => handleDeletePost(selectedPost.id)}
        />
      )}
    </div>
  )
}

// 게시글 카드 컴포넌트
function PostCard({ 
  post, 
  currentUserId,
  onLike, 
  onDelete,
  onClick 
}: { 
  post: Post
  currentUserId?: string
  onLike: () => void
  onDelete: () => void
  onClick: () => void 
}) {
  const categoryInfo = categories.find(c => c.id === post.category)
  const isOwner = currentUserId === post.user_id

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.profiles?.avatar_url || undefined} />
              <AvatarFallback>
                {(post.profiles?.display_name || post.profiles?.username || "U").charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">
                {post.profiles?.display_name || post.profiles?.username || "익명"}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ko })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {categoryInfo && (
              <Badge variant="secondary">
                {categoryInfo.icon} {categoryInfo.name}
              </Badge>
            )}
            {isOwner && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2">{post.content}</p>
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onLike()
            }}
            className={`flex items-center gap-1 text-sm ${
              post.user_has_liked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
            } transition-colors`}
          >
            <Heart className={`h-4 w-4 ${post.user_has_liked ? "fill-current" : ""}`} />
            <span>{post.likes_count}</span>
          </button>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments_count}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// 글 작성 모달 컴포넌트
function CreatePostModal({ 
  isOpen, 
  onClose, 
  onSubmit,
  categories 
}: { 
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string, content: string, category: string) => Promise<{ success: boolean; error?: string }>
  categories: typeof categories
}) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("general")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const result = await onSubmit(title, content, category)
    
    if (result.success) {
      setTitle("")
      setContent("")
      setCategory("general")
      onClose()
    } else {
      setError(result.error || "게시글 작성에 실패했습니다")
    }
    
    setIsSubmitting(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>새 게시글 작성</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="category">카테고리</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력하세요"
                rows={6}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  작성 중...
                </>
              ) : (
                "작성하기"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// 게시글 상세 모달 컴포넌트
function PostDetailModal({ 
  post, 
  currentUserId,
  isAuthenticated,
  onClose, 
  onLike,
  onDelete 
}: { 
  post: Post
  currentUserId?: string
  isAuthenticated: boolean
  onClose: () => void
  onLike: () => void
  onDelete: () => void
}) {
  const { comments, isLoading, createComment, deleteComment, likeComment } = useComments(post.id)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const categoryInfo = categories.find(c => c.id === post.category)
  const isOwner = currentUserId === post.user_id

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)
    const result = await createComment(newComment)
    if (result.success) {
      setNewComment("")
    }
    setIsSubmitting(false)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.profiles?.avatar_url || undefined} />
                <AvatarFallback>
                  {(post.profiles?.display_name || post.profiles?.username || "U").charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">
                  {post.profiles?.display_name || post.profiles?.username || "익명"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ko })}
                </p>
              </div>
            </div>
            {categoryInfo && (
              <Badge variant="secondary">
                {categoryInfo.icon} {categoryInfo.name}
              </Badge>
            )}
          </div>
          <DialogTitle className="text-xl mt-4">{post.title}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-muted-foreground whitespace-pre-wrap">{post.content}</p>
          
          <div className="flex items-center gap-4 mt-6 pt-4 border-t">
            <button
              onClick={onLike}
              className={`flex items-center gap-1 text-sm ${
                post.user_has_liked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
              } transition-colors`}
            >
              <Heart className={`h-4 w-4 ${post.user_has_liked ? "fill-current" : ""}`} />
              <span>{post.likes_count}</span>
            </button>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MessageCircle className="h-4 w-4" />
              <span>{comments.length}</span>
            </div>
            {isOwner && (
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto text-destructive hover:text-destructive"
                onClick={onDelete}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                삭제
              </Button>
            )}
          </div>
        </div>

        {/* 댓글 섹션 */}
        <div className="border-t pt-4">
          <h4 className="font-semibold mb-4">댓글 ({comments.length})</h4>
          
          {isAuthenticated && (
            <form onSubmit={handleSubmitComment} className="mb-4">
              <div className="flex gap-2">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="댓글을 입력하세요..."
                  className="flex-1"
                />
                <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "작성"}
                </Button>
              </div>
            </form>
          )}

          <div className="space-y-4">
            {isLoading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.profiles?.avatar_url || undefined} />
                    <AvatarFallback>
                      {(comment.profiles?.display_name || comment.profiles?.username || "U").charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        {comment.profiles?.display_name || comment.profiles?.username || "익명"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: ko })}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{comment.content}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => likeComment(comment.id)}
                        className={`flex items-center gap-1 text-xs ${
                          comment.user_has_liked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                        } transition-colors`}
                      >
                        <Heart className={`h-3 w-3 ${comment.user_has_liked ? "fill-current" : ""}`} />
                        <span>{comment.likes_count}</span>
                      </button>
                      {currentUserId === comment.user_id && (
                        <button
                          onClick={() => deleteComment(comment.id)}
                          className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                        >
                          삭제
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground text-sm py-4">
                아직 댓글이 없습니다.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
