/**
 * pendingReportsDb.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Database functions for managing pending reports in AsyncStorage.
 * Provides functions for adding, removing, and retrieving pending reports that
 * were created while offline and need to be synced with the server when online.
 */

import AsyncStorage from '@react-native-async-storage/async-storage'

import {type Report} from '@types'

type PendingReport = {id: number; data: Report}

const PENDING_REPORTS_KEY = 'pending_reports'

export const addPendingReport = async (report: Report): Promise<void> => {
  const reports = await getPendingReportsFromStorage()
  const newReport: PendingReport = {
    id: generateId(),
    data: report,
  }

  reports.push(newReport)

  await savePendingReportsToStorage(reports)
}

export const removePendingReport = async (id: number): Promise<void> => {
  const reports = await getPendingReportsFromStorage()
  const filteredReports = reports.filter(report => report.id !== id)

  await savePendingReportsToStorage(filteredReports)
}

export const getPendingReportsFromStorage = async (): Promise<
  PendingReport[]
> => {
  try {
    const data = await AsyncStorage.getItem(PENDING_REPORTS_KEY)

    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error getting pending reports from storage:', error)
    return []
  }
}

const generateId = (): number => Date.now() + Math.floor(Math.random() * 1000)

const savePendingReportsToStorage = async (
  reports: PendingReport[],
): Promise<void> => {
  try {
    await AsyncStorage.setItem(PENDING_REPORTS_KEY, JSON.stringify(reports))
  } catch (error) {
    console.error('Error saving pending reports to storage:', error)
    throw error
  }
}
