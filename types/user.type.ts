export interface UserBody {
  name: string
  email: string
  password: string
  created_at: number
}

export interface LoginBody {
  email: string
  password: string
}

export interface UserResponse {
  _id: string
  name: string
  email: string
  password: string
  __v: number
}