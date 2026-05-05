export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
  lastLogin?: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  name: string
  confirmPassword: string
}
