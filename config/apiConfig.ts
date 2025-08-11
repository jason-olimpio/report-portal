/**
 * apiConfig.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Configuration settings for the API client.
 * Defines API mode, base URL, timeout settings, and
 * mock delay parameters for development and testing.
 */

import {ApiMode, type ApiConfig} from '@types'

export const API_CONFIG: ApiConfig = {
  mode: ApiMode.Mock,

  baseUrl: 'https://your-api-endpoint.com/api',
  timeout: 10000,

  mockDelay: {
    min: 500,
    max: 2000,
  },

  axios: {
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
} as const

export const getApiDelay = (): number => {
  const {min, max} = API_CONFIG.mockDelay

  return Math.floor(Math.random() * (max - min + 1)) + min
}
