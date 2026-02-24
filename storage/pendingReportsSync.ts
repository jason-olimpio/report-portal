import NetInfo, {NetInfoState} from '@react-native-community/netinfo'

import {getPendingReportsFromStorage, removePendingReport} from '@storage'

let isSending = false
let isInitialized = false

export const startNetworkMonitor = async (): Promise<void> => {
  if (isInitialized) {
    console.warn('PendingReportsSync is already initialized')
    return
  }

  try {
    setupNetworkListener()

    const {isConnected} = await NetInfo.fetch()
    await handleConnectionChange(isConnected)

    isInitialized = true
  } catch (error) {
    console.error('Failed to start PendingReportsSync:', error)
    throw error
  }
}

const setupNetworkListener = () =>
  NetInfo.addEventListener(
    async ({isConnected}: NetInfoState) =>
      await handleConnectionChange(isConnected),
  )

const handleConnectionChange = async (
  isConnected: boolean | null,
): Promise<void> => {
  if (!isConnected) return

  try {
    await flushPendingReports()
  } catch (error) {
    console.error('Error flushing pending reports:', error)
  }
}

const flushPendingReports = async (): Promise<void> => {
  if (isSending) return

  isSending = true

  try {
    const reports = await getPendingReportsFromStorage()

    if (reports.length === 0) return

    for (const {id} of reports)
      try {
        await simulateReportSync()
        await removePendingReport(id)
      } catch (error) {
        console.error(`Failed to sync report ${id}:`, error)
        break
      }
  } catch (error) {
    console.error('Error during pending reports flush:', error)
  } finally {
    isSending = false
  }
}

const simulateReportSync = async (): Promise<void> =>
  await new Promise(resolve => setTimeout(resolve, 1000))
