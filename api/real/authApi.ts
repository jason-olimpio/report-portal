/**
 * authApi.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Authentication API functions.
 * Provides login, register, and logout functionality using the configured
 * axios instance.
 */

import axiosInstance from './apiClient'
import type {LoginCredentials, RegisterData, AuthResponse} from '@types'

export const login = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  const {data} = await axiosInstance.post<AuthResponse>(
    '/auth/login',
    credentials,
  )

  return data
}

export const register = async (
  userData: RegisterData,
): Promise<AuthResponse> => {
  const {data} = await axiosInstance.post<AuthResponse>(
    '/auth/register',
    userData,
  )

  return data
}

export const logout = async (): Promise<void> =>
  await axiosInstance.post('/auth/logout')
