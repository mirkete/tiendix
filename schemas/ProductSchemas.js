import { z } from 'zod'

// Schemas
const UUID = z.object({
  id: z.string().uuid()
})

const User = z.object({
  email: z.string().email().max(255),
  password: z.string().max(36)
})

const UserRegister = z.object({
  email: z.string().email().max(255),
  password: z.string().max(36).min(8),
  shop_name: z.string().max(64)
})

// Validate functions
export function validateUUID (data) {
  return UUID.safeParse(data)
}

export function validateUser (data) {
  return User.safeParse(data)
}

export function validateUserRegister (data) {
  return UserRegister.safeParse(data)
}
