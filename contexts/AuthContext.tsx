/**
 * AuthContext.tsx
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Provides user authentication state management, login/logout functionality,
 * and token validation. Handles user session persistence and authentication
 * state across the application.
 */

import {createContext, ReactNode, useEffect, useState} from 'react'

import {type AuthUser, UserRank} from '@types'
import {
  getToken,
  isTokenValid,
  getTokenPayload,
  removeToken,
  saveToken,
} from '@utils'

export type AuthContextType = {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: AuthUser, token: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthState().then(response => response)
  }, [])

  const checkAuthState = async () => {
    setIsLoading(true)

    try {
      const token = await getToken()

      if (!token || !isTokenValid(token)) {
        await clearUserSession()
        return
      }

      const payload = getTokenPayload(token)

      if (!payload) {
        console.warn('Invalid token payload')
        await clearUserSession()

        return
      }

      const {userId, email, rank = UserRank.User} = payload

      setUser({
        id: userId,
        name: '',
        email,
        rank,
      })
    } catch (error) {
      console.error('Error checking auth state:', error)

      await clearUserSession()
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (authUser: AuthUser, token: string): Promise<void> => {
    try {
      await saveToken(token)
      setUser(authUser)
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }

  const logout = async (): Promise<void> => await clearUserSession()

  const clearUserSession = async () => {
    try {
      await removeToken()
    } catch (error) {
      console.error('Error removing token:', error)
    } finally {
      setUser(null)
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
