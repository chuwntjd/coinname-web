"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, Plus, Clock, User, Tag, AtSign, EyeOff } from "lucide-react"
import type { AdminNote } from "@/types/asset-verification"

interface AdminNotesPanelProps {
  verificationId: string
  notes: AdminNote[]
  currentUser: any
  onAddNote: (note: Omit<AdminNote, "id" | "createdAt">) => void
  onUpdateNotes: (notes: AdminNote[]) => void
}

export function AdminNotesPanel({
  verificationId,
  notes,
  currentUser,
  onAddNote,
  onUpdateNotes,
}: AdminNotesPanelProps) {
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [newNote, setNewNote] = useState({
    content: "",
    isPrivate: false,
    priority: "medium" as const,
    tags: [] as string[],
    mentions: [] as string[],
  })
  const [tagInput, setTagInput] = useState("")
  const [mentionInput, setMentionInput] = useState("")

  const handleAddNote = () => {
    if (!newNote.content.trim()) return

    const note: Omit<AdminNote, "id" | "createdAt"> = {
      authorId: currentUser.id,
      authorName: currentUser.name,
      content: newNote.content,
      isPrivate: newNote.isPrivate,
      priority: newNote.priority,
      tags: newNote.tags,
      mentions: newNote.mentions,
    }

    onAddNote(note)
    setNewNote({
      content: "",
      isPrivate: false,
      priority: "medium",
      tags: [],
      mentions: [],
    })
    setIsAddingNote(false)
  }

  const addTag = () => {
    if (tagInput.trim() && !newNote.tags.includes(tagInput.trim())) {
      setNewNote((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    setNewNote((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const addMention = () => {
    if (mentionInput.trim() && !newNote.mentions.includes(mentionInput.trim())) {
      setNewNote((prev) => ({
        ...prev,
        mentions: [...prev.mentions, mentionInput.trim()],
      }))
      setMentionInput("")
    }
  }

  const removeMention = (mention: string) => {
    setNewNote((prev) => ({
      ...prev,
      mentions: prev.mentions.filter((m) => m !== mention),
    }))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "긴급"
      case "high":
        return "높음"
      case "medium":
        return "보통"
      case "low":
        return "낮음"
      default:
        return priority
    }
  }

  const sortedNotes = [...notes].sort((a, b) => {
    // 우선순위별 정렬
    const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
    const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 1
    const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 1

    if (aPriority !== bPriority) {
      return bPriority - aPriority
    }

    // 시간순 정렬 (최신순)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="bg-gray-50 border-t border-gray-200">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-900 flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>관리자 메모 ({notes.length})</span>
          </h4>
          <Button onClick={() => setIsAddingNote(!isAddingNote)} size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-1" />
            메모 추가
          </Button>
        </div>

        {/* 새 메모 작성 */}
        {isAddingNote && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <div className="space-y-3">
              <textarea
                value={newNote.content}
                onChange={(e) => setNewNote((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="관리자 메모를 입력하세요..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">우선순위</label>
                  <select
                    value={newNote.priority}
                    onChange={(e) => setNewNote((prev) => ({ ...prev, priority: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">낮음</option>
                    <option value="medium">보통</option>
                    <option value="high">높음</option>
                    <option value="urgent">긴급</option>
                  </select>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newNote.isPrivate}
                      onChange={(e) => setNewNote((prev) => ({ ...prev, isPrivate: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">비공개</span>
                  </label>
                </div>
              </div>

              {/* 태그 추가 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">태그</label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="태그 입력"
                    className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                  />
                  <Button onClick={addTag} size="sm" variant="outline">
                    <Tag className="h-3 w-3" />
                  </Button>
                </div>
                {newNote.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {newNote.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                      >
                        {tag}
                        <button onClick={() => removeTag(tag)} className="ml-1 text-blue-600 hover:text-blue-800">
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 멘션 추가 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">멘션</label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={mentionInput}
                    onChange={(e) => setMentionInput(e.target.value)}
                    placeholder="관리자 ID 입력"
                    className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === "Enter" && addMention()}
                  />
                  <Button onClick={addMention} size="sm" variant="outline">
                    <AtSign className="h-3 w-3" />
                  </Button>
                </div>
                {newNote.mentions.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {newNote.mentions.map((mention, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"
                      >
                        @{mention}
                        <button
                          onClick={() => removeMention(mention)}
                          className="ml-1 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <Button onClick={() => setIsAddingNote(false)} variant="outline" size="sm">
                  취소
                </Button>
                <Button onClick={handleAddNote} size="sm" className="bg-blue-600 hover:bg-blue-700">
                  메모 저장
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 메모 목록 */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {sortedNotes.length > 0 ? (
            sortedNotes.map((note) => (
              <div key={note.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium text-gray-900">{note.authorName}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(note.priority)}`}
                    >
                      {getPriorityText(note.priority)}
                    </span>
                    {note.isPrivate && (
                      <div className="flex items-center space-x-1 text-gray-500">
                        <EyeOff className="h-3 w-3" />
                        <span className="text-xs">비공개</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(note.createdAt).toLocaleString("ko-KR")}</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-3 whitespace-pre-wrap">{note.content}</p>

                {/* 태그 표시 */}
                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {note.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                      >
                        <Tag className="h-2 w-2 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* 멘션 표시 */}
                {note.mentions.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {note.mentions.map((mention, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700"
                      >
                        <AtSign className="h-2 w-2 mr-1" />
                        {mention}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p>아직 관리자 메모가 없습니다</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
