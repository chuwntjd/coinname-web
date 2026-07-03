"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/contexts/auth-context"

export interface Post {
  id: string
  user_id: string
  title: string
  content: string
  category: string
  likes_count: number
  comments_count: number
  created_at: string
  updated_at: string
  profiles?: {
    username: string | null
    display_name: string | null
    avatar_url: string | null
  }
  user_has_liked?: boolean
}

export interface Comment {
  id: string
  post_id: string
  user_id: string
  content: string
  likes_count: number
  created_at: string
  updated_at: string
  profiles?: {
    username: string | null
    display_name: string | null
    avatar_url: string | null
  }
  user_has_liked?: boolean
}

export function usePosts(category?: string) {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const { user } = useAuth()

  const fetchPosts = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      let query = supabase
        .from("posts")
        .select(`
          *,
          profiles:user_id (
            username,
            display_name,
            avatar_url
          )
        `)
        .order("created_at", { ascending: false })

      if (category && category !== "all") {
        query = query.eq("category", category)
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      // Check if current user has liked each post
      if (user && data) {
        const { data: userLikes } = await supabase
          .from("post_likes")
          .select("post_id")
          .eq("user_id", user.id)

        const likedPostIds = new Set(userLikes?.map(l => l.post_id) || [])
        
        const postsWithLikes = data.map(post => ({
          ...post,
          user_has_liked: likedPostIds.has(post.id)
        }))
        
        setPosts(postsWithLikes)
      } else {
        setPosts(data || [])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch posts")
    } finally {
      setIsLoading(false)
    }
  }, [category, user])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const createPost = async (title: string, content: string, postCategory: string = "general") => {
    if (!user) {
      return { success: false, error: "Not authenticated" }
    }

    try {
      const { data, error: insertError } = await supabase
        .from("posts")
        .insert({
          user_id: user.id,
          title,
          content,
          category: postCategory,
        })
        .select(`
          *,
          profiles:user_id (
            username,
            display_name,
            avatar_url
          )
        `)
        .single()

      if (insertError) throw insertError

      setPosts(prev => [data, ...prev])
      return { success: true, data }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : "Failed to create post" }
    }
  }

  const deletePost = async (postId: string) => {
    if (!user) {
      return { success: false, error: "Not authenticated" }
    }

    try {
      const { error: deleteError } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId)
        .eq("user_id", user.id)

      if (deleteError) throw deleteError

      setPosts(prev => prev.filter(p => p.id !== postId))
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : "Failed to delete post" }
    }
  }

  const likePost = async (postId: string) => {
    if (!user) {
      return { success: false, error: "Not authenticated" }
    }

    try {
      const post = posts.find(p => p.id === postId)
      if (!post) return { success: false, error: "Post not found" }

      if (post.user_has_liked) {
        // Unlike
        await supabase
          .from("post_likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id)

        await supabase
          .from("posts")
          .update({ likes_count: Math.max(0, post.likes_count - 1) })
          .eq("id", postId)

        setPosts(prev => prev.map(p => 
          p.id === postId 
            ? { ...p, likes_count: Math.max(0, p.likes_count - 1), user_has_liked: false }
            : p
        ))
      } else {
        // Like
        await supabase
          .from("post_likes")
          .insert({ post_id: postId, user_id: user.id })

        await supabase
          .from("posts")
          .update({ likes_count: post.likes_count + 1 })
          .eq("id", postId)

        setPosts(prev => prev.map(p => 
          p.id === postId 
            ? { ...p, likes_count: p.likes_count + 1, user_has_liked: true }
            : p
        ))
      }

      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : "Failed to like post" }
    }
  }

  return {
    posts,
    isLoading,
    error,
    createPost,
    deletePost,
    likePost,
    refresh: fetchPosts,
  }
}

export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const { user } = useAuth()

  const fetchComments = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from("comments")
        .select(`
          *,
          profiles:user_id (
            username,
            display_name,
            avatar_url
          )
        `)
        .eq("post_id", postId)
        .order("created_at", { ascending: true })

      if (fetchError) throw fetchError

      // Check if current user has liked each comment
      if (user && data) {
        const { data: userLikes } = await supabase
          .from("comment_likes")
          .select("comment_id")
          .eq("user_id", user.id)

        const likedCommentIds = new Set(userLikes?.map(l => l.comment_id) || [])
        
        const commentsWithLikes = data.map(comment => ({
          ...comment,
          user_has_liked: likedCommentIds.has(comment.id)
        }))
        
        setComments(commentsWithLikes)
      } else {
        setComments(data || [])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch comments")
    } finally {
      setIsLoading(false)
    }
  }, [postId, user])

  useEffect(() => {
    if (postId) {
      fetchComments()
    }
  }, [fetchComments, postId])

  const createComment = async (content: string) => {
    if (!user) {
      return { success: false, error: "Not authenticated" }
    }

    try {
      const { data, error: insertError } = await supabase
        .from("comments")
        .insert({
          post_id: postId,
          user_id: user.id,
          content,
        })
        .select(`
          *,
          profiles:user_id (
            username,
            display_name,
            avatar_url
          )
        `)
        .single()

      if (insertError) throw insertError

      // Update post comments count
      await supabase.rpc("increment_comments_count", { post_id: postId }).catch(() => {
        // If RPC doesn't exist, update manually
        supabase
          .from("posts")
          .select("comments_count")
          .eq("id", postId)
          .single()
          .then(({ data: post }) => {
            if (post) {
              supabase
                .from("posts")
                .update({ comments_count: (post.comments_count || 0) + 1 })
                .eq("id", postId)
            }
          })
      })

      setComments(prev => [...prev, data])
      return { success: true, data }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : "Failed to create comment" }
    }
  }

  const deleteComment = async (commentId: string) => {
    if (!user) {
      return { success: false, error: "Not authenticated" }
    }

    try {
      const { error: deleteError } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId)
        .eq("user_id", user.id)

      if (deleteError) throw deleteError

      setComments(prev => prev.filter(c => c.id !== commentId))
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : "Failed to delete comment" }
    }
  }

  const likeComment = async (commentId: string) => {
    if (!user) {
      return { success: false, error: "Not authenticated" }
    }

    try {
      const comment = comments.find(c => c.id === commentId)
      if (!comment) return { success: false, error: "Comment not found" }

      if (comment.user_has_liked) {
        // Unlike
        await supabase
          .from("comment_likes")
          .delete()
          .eq("comment_id", commentId)
          .eq("user_id", user.id)

        await supabase
          .from("comments")
          .update({ likes_count: Math.max(0, comment.likes_count - 1) })
          .eq("id", commentId)

        setComments(prev => prev.map(c => 
          c.id === commentId 
            ? { ...c, likes_count: Math.max(0, c.likes_count - 1), user_has_liked: false }
            : c
        ))
      } else {
        // Like
        await supabase
          .from("comment_likes")
          .insert({ comment_id: commentId, user_id: user.id })

        await supabase
          .from("comments")
          .update({ likes_count: comment.likes_count + 1 })
          .eq("id", commentId)

        setComments(prev => prev.map(c => 
          c.id === commentId 
            ? { ...c, likes_count: c.likes_count + 1, user_has_liked: true }
            : c
        ))
      }

      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : "Failed to like comment" }
    }
  }

  return {
    comments,
    isLoading,
    error,
    createComment,
    deleteComment,
    likeComment,
    refresh: fetchComments,
  }
}
