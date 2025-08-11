/**
 * useTheme.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Custom hook for accessing theme context.
 * Provides access to current theme settings and toggle functionality.
 */

import {useContext} from 'react'
import {ThemeContext} from '@contexts'

const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) throw new Error('useTheme must be used within a ThemeProvider')

  return context
}

export default useTheme
