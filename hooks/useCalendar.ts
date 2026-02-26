import {useState, useMemo} from 'react'
import {LocaleConfig} from 'react-native-calendars'
import {useTranslation} from 'react-i18next'

import {useReports, useTheme} from '@hooks'
import type {ReportsByDate, DateString} from '@types'
import {
  getReportsByDate,
  getMarkedDatesWithSelection,
  getLocalizedCalendarLabels,
} from '@utils'

export const useCalendar = () => {
  const {t} = useTranslation()
  const {isDark} = useTheme()
  const {reports} = useReports()

  const [selectedDate, setSelectedDate] = useState<DateString | null>(null)

  const reportsByDate: ReportsByDate = getReportsByDate(reports)

  const markedDates = useMemo(
    () => getMarkedDatesWithSelection(reportsByDate, isDark, selectedDate),
    [reportsByDate, isDark, selectedDate],
  )

  const configureCalendarLocale = () => {
    const {months, weekdays} = getLocalizedCalendarLabels(t)

    LocaleConfig.locales['custom'] = {
      monthNames: months,
      monthNamesShort: months.map(month => month.slice(0, 3)),
      dayNames: weekdays,
      dayNamesShort: weekdays.map(day => day.slice(0, 3)),
      today: t('calendar.today'),
    }

    LocaleConfig.defaultLocale = 'custom'
  }

  const handleDayPress = (day: {dateString: string}) =>
    setSelectedDate(day.dateString as DateString)

  const selectedReports = selectedDate
    ? reportsByDate[selectedDate] || null
    : null

  return {
    selectedDate,
    selectedReports,
    markedDates,
    handleDayPress,
    configureCalendarLocale,
  }
}

export default useCalendar
