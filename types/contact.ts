export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactMessage extends ContactFormData {
  id: string
  createdAt: string
  status: "pending" | "in_progress" | "completed"
  response?: string
  respondedAt?: string
  respondedBy?: string
}
