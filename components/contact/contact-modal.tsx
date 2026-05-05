"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send } from "lucide-react"
import type { ContactMessage, ContactFormData } from "@/types/contact"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const subjectOptions = [
    "일반 문의",
    "기술 지원",
    "계정 문제",
    "거래 문의",
    "자산 인증",
    "버그 신고",
    "제안사항",
    "기타",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 문의사항을 LocalStorage에 저장
      const newMessage: ContactMessage = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        status: "pending",
      }

      const existingMessages = JSON.parse(localStorage.getItem("contact_messages") || "[]")
      const updatedMessages = [newMessage, ...existingMessages]
      localStorage.setItem("contact_messages", JSON.stringify(updatedMessages))

      alert("문의사항이 성공적으로 접수되었습니다!")
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      onClose()
    } catch (error) {
      alert("문의사항 접수 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Send className="h-5 w-5" />
            <span>문의하기</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름 *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="홍길동"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일 *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">문의 유형 *</Label>
            <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
              <SelectTrigger>
                <SelectValue placeholder="문의 유형을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {subjectOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">문의 내용 *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="문의하실 내용을 자세히 작성해주세요..."
              rows={6}
              required
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>안내사항:</strong>
            </p>
            <ul className="text-xs text-blue-600 mt-1 space-y-1">
              <li>• 문의사항은 24시간 내에 답변드립니다.</li>
              <li>• 긴급한 문의는 텔레그램 채널을 이용해주세요.</li>
              <li>• 개인정보는 문의 처리 목적으로만 사용됩니다.</li>
            </ul>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              <Send className="h-4 w-4 mr-2" />
              {isLoading ? "접수 중..." : "문의 접수"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
