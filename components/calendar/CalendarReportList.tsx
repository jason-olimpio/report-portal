/**
 * CalendarReportList.tsx
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Component for displaying a list of reports for a selected date
 * in the calendar view. Shows either a message when no reports are available
 * or a list of CalendarReportItem components.
 */

import {View, Text} from 'react-native'
import {useTranslation} from 'react-i18next'

import CalendarReportItem from './CalendarReportItem'

import type {Report} from '@types'

type CalendarReportListProps = {
  reports: Report[] | null
  selectedDate: string | null
}

const CalendarReportList = ({
  reports,
  selectedDate,
}: CalendarReportListProps) => {
  const {t} = useTranslation()

  if (!selectedDate || !reports || reports.length === 0)
    return (
      <View className="w-full mb-16">
        <Text className="text-center font-titillium-regular text-neutral-gray-400 mt-6">
          {t('calendar.noReports')}
        </Text>
      </View>
    )

  return (
    <View className="w-full p-4 mb-10">
      {reports.map(report => (
        <CalendarReportItem key={report.id} report={report} />
      ))}
    </View>
  )
}

export default CalendarReportList
