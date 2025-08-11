/**
 * useReports.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Custom hook for accessing report context.
 * Provides access to report data and state management.
 */

import {useContext} from 'react'

import {ReportContext} from '@contexts'

const useReports = () => {
  const context = useContext(ReportContext)

  if (!context)
    throw new Error('useReports must be used within a ReportProvider')

  return context
}

export default useReports
