import {useEffect} from 'react'
import {ScrollView, View} from 'react-native'
import {Calendar} from 'react-native-calendars'

import {BackButton, CalendarReportList} from '@components'

import {useTheme, useCalendar} from '@hooks'

import {getCalendarTheme} from '@utils'

const CalendarScreen = () => {
  const {isDark} = useTheme()

  const {
    selectedDate,
    selectedReports,
    markedDates,
    handleDayPress,
    configureCalendarLocale,
  } = useCalendar()

  useEffect(() => configureCalendarLocale(), [configureCalendarLocale])

  return (
    <ScrollView className="flex-1 p-6 pt-10 bg-background-light dark:bg-background-dark">
      <BackButton />

      <View className="mt-10">
        <Calendar
          markingType="dot"
          markedDates={markedDates}
          onDayPress={handleDayPress}
          theme={getCalendarTheme(isDark)}
          firstDay={1}
          enableSwipeMonths={true}
        />

        <CalendarReportList
          reports={selectedReports}
          selectedDate={selectedDate}
        />
      </View>
    </ScrollView>
  )
}

export default CalendarScreen
