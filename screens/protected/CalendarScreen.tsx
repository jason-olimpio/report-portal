import {useEffect} from 'react'
import {ScrollView, View} from 'react-native'
import {Calendar} from 'react-native-calendars'
import {useTranslation} from 'react-i18next'

import {BackButton, CalendarReportsList} from '@components'

import {useTheme, useCalendar} from '@hooks'

import {getCalendarTheme} from '@utils'

const CalendarScreen = () => {
  const {isDark} = useTheme()
  const {t} = useTranslation()

  const {
    selectedDate,
    selectedReports,
    markedDates,
    handleDayPress,
    configureCalendarLocale,
  } = useCalendar(t, isDark)

  useEffect(() => {
    configureCalendarLocale(t)
  }, [t, configureCalendarLocale])

  return (
    <ScrollView className="flex-1 p-6 pt-10 bg-background-light dark:bg-background-dark">
      <BackButton />

      <View className="mt-10">
        <Calendar
          markingType="multi-dot"
          markedDates={markedDates}
          onDayPress={handleDayPress}
          theme={getCalendarTheme(isDark)}
          firstDay={1}
          enableSwipeMonths={true}
        />

        <CalendarReportsList
          reports={selectedReports}
          selectedDate={selectedDate}
        />
      </View>
    </ScrollView>
  )
}

export default CalendarScreen
