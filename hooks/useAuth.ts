/**
 * useAuth.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Custom hook for accessing authentication context.
 * Provides access to user authentication state and actions like login and logout.
 */

import {useContext} from 'react'

import {AuthContext, AuthContextType} from '@contexts'

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (!context) throw new Error('useAuth must be used within an AuthProvider')

  return context
}

export default useAuth
