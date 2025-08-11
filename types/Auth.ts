/**
 * Auth.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Type definitions for authentication-related data structures.
 */

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type AuthUser = {
  id: string
  email: string
  name: string
  rank: UserRank
}

export enum UserRank {
  User,
  Admin,
}

export type AuthResponse = {
  user: AuthUser
  token: string
}

export type JWTPayload = {
  userId: string
  email: string
  rank: UserRank
  iat: number
  exp: number
}
