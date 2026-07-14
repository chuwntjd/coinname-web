"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, XCircle, Clock, FileText, User, Calendar, AlertTriangle } from "lucide-react"
import type { AssetVerificationRequest } from "@/types/asset-verification"
import { useAuth } from "@/contexts/auth-context"

interface AdminVerificationPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminVerificationPanel({ isOpen, onClose }: AdminVerificationPanelProps) {
  const { user } = useAuth()
  const [requests, setRequests] = useState<AssetVerificationRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<AssetVerificationRequest | null>(null)
  const [adminNote, setAdminNote] = useState("")

  // 관리자 권한 확인
  const isAdmin = user?.email === "winner031128@gmail.com"

  useEffect(() => {
    if (isOpen && isAdmin) {
      loadRequests()
    }
  }, [isOpen, isAdmin])

  const loadRequests = () => {
    try {
      const stored = localStorage.getItem("asset_verifications")
      if (stored) {
        const data = JSON.parse(stored)
        setRequests(data)
      }
    } catch (error) {
      console.error("Failed to load verification requests:", error)
    }
  }

  const updateRequestStatus = (requestId: string, status: "approved" | "rejected", note?: string) => {
    const updatedRequests = requests.map((req) => {
      if (req.id === requestId) {
        return {
          ...req,
          status,
          adminNote: note || req.adminNote,
          reviewedAt: new Date().toISOString(),
          reviewedBy: user?.email || "admin",
        }
      }
      return req
    })

    setRequests(updatedRequests)
    localStorage.setItem("asset_verifications", JSON.stringify(updatedRequests))
    setSelectedRequest(null)
    setAdminNote("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            대기중
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            승인
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            거부
          </Badge>
        )
      default:
        return <Badge variant="secondary">알 수 없음</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ko-KR")
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount)
  }

  const pendingRequests = requests.filter((req) => req.status === "pending")
  const approvedRequests = requests.filter((req) => req.status === "approved")
  const rejectedRequests = requests.filter((req) => req.status === "rejected")

  if (!isAdmin) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>접근 권한 없음</span>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <p className="text-gray-600">관리자 권한이 필요합니다.</p>
            <Button onClick={onClose} className="mt-4">
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>자산 인증 관리</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>대기중 ({pendingRequests.length})</span>
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>승인됨 ({approvedRequests.length})</span>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center space-x-2">
              <XCircle className="h-4 w-4" />
              <span>거부됨 ({rejectedRequests.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-4">
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {pendingRequests.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">대기중인 인증 요청이 없습니다.</div>
                ) : (
                  pendingRequests.map((request) => (
                    <Card key={request.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>{request.userName}</span>
                          </CardTitle>
                          {getStatusBadge(request.status)}
                        </div>
                        <CardDescription className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(request.submittedAt)}</span>
                          </span>
                          <span>유형: {request.assetType}</span>
                          <span>금액: {formatAmount(request.assetAmount)}원</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p>
                            <strong>설명:</strong> {request.proofDescription}
                          </p>
                          {request.proofImages && request.proofImages.length > 0 && (
                            <p>
                              <strong>첨부파일:</strong> {request.proofImages.length}개
                            </p>
                          )}
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button
                            size="sm"
                            onClick={() => updateRequestStatus(request.id, "approved")}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            승인
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedRequest(request)}
                            className="border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            거부
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="approved" className="mt-4">
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {approvedRequests.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">승인된 인증 요청이 없습니다.</div>
                ) : (
                  approvedRequests.map((request) => (
                    <Card key={request.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>{request.userName}</span>
                          </CardTitle>
                          {getStatusBadge(request.status)}
                        </div>
                        <CardDescription className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>승인: {request.reviewedAt ? formatDate(request.reviewedAt) : "N/A"}</span>
                          </span>
                          <span>유형: {request.assetType}</span>
                          <span>금액: {formatAmount(request.assetAmount)}원</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>
                          <strong>설명:</strong> {request.proofDescription}
                        </p>
                        {request.adminNote && (
                          <div className="mt-2 p-2 bg-green-50 rounded">
                            <p className="text-sm">
                              <strong>관리자 메모:</strong> {request.adminNote}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="rejected" className="mt-4">
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {rejectedRequests.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">거부된 인증 요청이 없습니다.</div>
                ) : (
                  rejectedRequests.map((request) => (
                    <Card key={request.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>{request.userName}</span>
                          </CardTitle>
                          {getStatusBadge(request.status)}
                        </div>
                        <CardDescription className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>거부: {request.reviewedAt ? formatDate(request.reviewedAt) : "N/A"}</span>
                          </span>
                          <span>유형: {request.assetType}</span>
                          <span>금액: {formatAmount(request.assetAmount)}원</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>
                          <strong>설명:</strong> {request.proofDescription}
                        </p>
                        {request.adminNote && (
                          <div className="mt-2 p-2 bg-red-50 rounded">
                            <p className="text-sm">
                              <strong>거부 사유:</strong> {request.adminNote}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* 거부 사유 입력 모달 */}
        {selectedRequest && (
          <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>인증 거부</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">{selectedRequest.userName}님의 인증 요청을 거부하시겠습니까?</p>
                <Textarea
                  placeholder="거부 사유를 입력해주세요..."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={3}
                />
                <div className="flex space-x-2 justify-end">
                  <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                    취소
                  </Button>
                  <Button
                    onClick={() => updateRequestStatus(selectedRequest.id, "rejected", adminNote)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    거부
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  )
}
