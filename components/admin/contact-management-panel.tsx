"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageSquare, Clock, CheckCircle, AlertCircle, Send } from "lucide-react"
import type { ContactMessage } from "@/types/contact"

interface ContactManagementPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactManagementPanel({ isOpen, onClose }: ContactManagementPanelProps) {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [response, setResponse] = useState("")

  useEffect(() => {
    if (isOpen) {
      loadMessages()
    }
  }, [isOpen])

  const loadMessages = () => {
    const savedMessages = JSON.parse(localStorage.getItem("contact_messages") || "[]")
    setMessages(savedMessages)
  }

  const updateMessageStatus = (messageId: string, status: ContactMessage["status"], responseText?: string) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === messageId
        ? {
            ...msg,
            status,
            response: responseText || msg.response,
            respondedAt: responseText ? new Date().toISOString() : msg.respondedAt,
            respondedBy: responseText ? "demo@coinname.kr" : msg.respondedBy,
          }
        : msg,
    )
    setMessages(updatedMessages)
    localStorage.setItem("contact_messages", JSON.stringify(updatedMessages))
  }

  const handleSendResponse = () => {
    if (selectedMessage && response.trim()) {
      updateMessageStatus(selectedMessage.id, "completed", response)
      setResponse("")
      setSelectedMessage(null)
      alert("답변이 전송되었습니다!")
    }
  }

  const getStatusIcon = (status: ContactMessage["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "in_progress":
        return <AlertCircle className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: ContactMessage["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
    }
  }

  const getStatusText = (status: ContactMessage["status"]) => {
    switch (status) {
      case "pending":
        return "대기"
      case "in_progress":
        return "처리중"
      case "completed":
        return "완료"
    }
  }

  const filterMessages = (status: ContactMessage["status"]) => {
    return messages.filter((msg) => msg.status === status)
  }

  const MessageCard = ({ message }: { message: ContactMessage }) => (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge className={getStatusColor(message.status)}>
            {getStatusIcon(message.status)}
            <span className="ml-1">{getStatusText(message.status)}</span>
          </Badge>
          <span className="text-sm text-muted-foreground">
            {new Date(message.createdAt).toLocaleDateString("ko-KR")}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">{message.name}</span>
          <span className="text-sm text-muted-foreground">{message.email}</span>
        </div>
        <div className="text-sm">
          <span className="font-medium">유형:</span> {message.subject}
        </div>
        <div className="text-sm">
          <span className="font-medium">내용:</span>
          <p className="mt-1 text-muted-foreground">{message.message}</p>
        </div>

        {message.response && (
          <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
            <div className="text-sm font-medium text-green-800">답변:</div>
            <p className="text-sm text-green-700 mt-1">{message.response}</p>
            <div className="text-xs text-green-600 mt-2">
              {message.respondedAt && `답변일: ${new Date(message.respondedAt).toLocaleString("ko-KR")}`}
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        {message.status === "pending" && (
          <Button size="sm" variant="outline" onClick={() => updateMessageStatus(message.id, "in_progress")}>
            처리 시작
          </Button>
        )}
        {message.status !== "completed" && (
          <Button size="sm" onClick={() => setSelectedMessage(message)}>
            답변하기
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>문의사항 관리</span>
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending" className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>대기 ({filterMessages("pending").length})</span>
              </TabsTrigger>
              <TabsTrigger value="in_progress" className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4" />
                <span>처리중 ({filterMessages("in_progress").length})</span>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>완료 ({filterMessages("completed").length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {filterMessages("pending").length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">대기 중인 문의사항이 없습니다.</div>
              ) : (
                filterMessages("pending").map((message) => <MessageCard key={message.id} message={message} />)
              )}
            </TabsContent>

            <TabsContent value="in_progress" className="space-y-4">
              {filterMessages("in_progress").length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">처리 중인 문의사항이 없습니다.</div>
              ) : (
                filterMessages("in_progress").map((message) => <MessageCard key={message.id} message={message} />)
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {filterMessages("completed").length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">완료된 문의사항이 없습니다.</div>
              ) : (
                filterMessages("completed").map((message) => <MessageCard key={message.id} message={message} />)
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* 답변 작성 모달 */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>답변 작성</DialogTitle>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{selectedMessage.name}</span>
                    <span className="text-sm text-muted-foreground">{selectedMessage.email}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">유형:</span> {selectedMessage.subject}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">문의 내용:</span>
                    <p className="mt-1 text-muted-foreground">{selectedMessage.message}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="response">답변 내용</Label>
                <Textarea
                  id="response"
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="답변을 작성해주세요..."
                  rows={6}
                />
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleSendResponse} disabled={!response.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  답변 전송
                </Button>
                <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                  취소
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
