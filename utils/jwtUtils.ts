import AsyncStorage from '@react-native-async-storage/async-storage'
import {jwtDecode} from 'jwt-decode'
import type {JWTPayload} from '@types'

const TOKEN_KEY = 'auth_token'

export const saveToken = async (token: string): Promise<void> => {
  try {
    const normalized = normalizeToken(token)
    await AsyncStorage.setItem(TOKEN_KEY, normalized)
  } catch (error) {
    console.error('Error saving token:', error)
    throw error
  }
}

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY)
    const normalized = normalizeToken(token)

    return normalized || null
  } catch (error) {
    console.error('Error getting token:', error)
    return null
  }
}

export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY)
  } catch (error) {
    console.error('Error removing token:', error)
    throw error
  }
}

export const isTokenValid = (token: string | null | undefined): boolean => {
  const payload = getTokenPayload(token)

  if (!payload) return false

  const exp = payload.exp
  if (typeof exp !== 'number') return false

  const now = Date.now() / 1000

  return exp > now
}

export const getTokenPayload = (
  token: string | null | undefined,
): JWTPayload | null => {
  const normalized = normalizeToken(token)
  if (!normalized || !looksLikeJwt(normalized)) return null

  try {
    return jwtDecode<JWTPayload>(normalized)
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

const normalizeToken = (raw: unknown): string => {
  if (typeof raw !== 'string') return ''

  return raw.replace(/^Bearer\s+/i, '').trim()
}

const looksLikeJwt = (token: string): boolean => token.split('.').length === 3
