/**
 * useReportFilters.ts
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Custom hook for filtering reports based on status,
 * date range, and priority. Provides filtered report data and
 * filter state management.
 */

import {useState} from 'react'

import useReports from './useReports'
import {type DateRange, StatusOption, PriorityOption} from '@types'

const useReportFilters = () => {
  const {reports} = useReports()
  const [selectedStatus, setSelectedStatus] = useState<StatusOption>(
    StatusOption.All,
  )
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  })
  const [selectedPriority, setSelectedPriority] = useState<PriorityOption>(
    PriorityOption.All,
  )

  const filteredReports = reports.filter(({status, date, priority}) => {
    const isStatusMatch =
      selectedStatus === StatusOption.All || status === selectedStatus
    const isStartDateValid = !dateRange.start || date >= dateRange.start
    const isEndDateValid = !dateRange.end || date <= dateRange.end
    const isPriorityMatch =
      selectedPriority === PriorityOption.All || priority === selectedPriority

    return (
      isStatusMatch && isStartDateValid && isEndDateValid && isPriorityMatch
    )
  })

  return {
    filteredReports,
    selectedStatus,
    setSelectedStatus,
    dateRange,
    setDateRange,
    selectedPriority,
    setSelectedPriority,
  }
}

export default useReportFilters
