import {useState} from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native'
import CalendarPicker, {DateParsable} from 'react-native-calendar-picker'
import {useTranslation} from 'react-i18next'

import {useTheme} from '@hooks'
import {appColors} from '@config'
import {getLocalizedCalendarLabels} from '@utils'
import type {DateRange} from '@types'

type DateRangeSelectorProps = {
  dateRange: DateRange
  setDateRange: (range: DateRange) => void
  toggleDatePicker: () => void
}

const DateRangeSelector = ({
  dateRange,
  setDateRange,
  toggleDatePicker,
}: DateRangeSelectorProps) => {
  const {isDark} = useTheme()
  const {t} = useTranslation()

  const [tempDateRange, setTempDateRange] = useState(dateRange)

  const screenWidth = Dimensions.get('window').width
  const calendarWidth = Math.min(screenWidth - 75, 350)
  const calendarHeight = Math.min(calendarWidth, 350)

  const handleDateChange = (date: Date, type: 'START_DATE' | 'END_DATE') =>
    setTempDateRange(previousRange => ({
      ...previousRange,
      start: type === 'START_DATE' ? date : previousRange.start,
      end: type === 'START_DATE' ? null : date,
    }))

  const confirmDateRange = () => {
    setDateRange(tempDateRange)
    toggleDatePicker()
  }

  const {weekdays, months} = getLocalizedCalendarLabels(t)

  const getTextStyle = () => ({
    ...styles.text,
    color: isDark ? appColors.text.primary.dark : appColors.text.primary.light,
  })

  const getMonthTitleStyle = () => ({
    ...styles.monthTitle,
    color: isDark ? appColors.text.primary.dark : appColors.text.primary.light,
  })

  const getYearTitleStyle = () => ({
    ...styles.yearTitle,
    color: isDark ? appColors.text.primary.dark : appColors.text.primary.light,
  })

  const getNavigationTitleStyle = () => ({
    ...styles.navigationTitle,
    color: isDark ? appColors.primary.light : appColors.primary.dark,
  })

  return (
    <ScrollView>
      <Text className="text-lg font-titillium-semibold mb-6 dark:text-white text-center px-4">
        {t('filter.selectDateRange')}
      </Text>

      <View className="max-h-96 w-full px-5">
        <CalendarPicker
          allowRangeSelection={true}
          minDate={new Date(2020, 1, 1)}
          maxDate={new Date()}
          todayBackgroundColor={
            isDark ? appColors.primary.dark : appColors.primary.light
          }
          selectedDayColor={
            isDark ? appColors.primary.dark : appColors.primary.light
          }
          selectedDayTextColor="#FFFFFF"
          textStyle={getTextStyle()}
          dayShape="circle"
          monthTitleStyle={getMonthTitleStyle()}
          yearTitleStyle={getYearTitleStyle()}
          previousTitleStyle={getNavigationTitleStyle()}
          nextTitleStyle={getNavigationTitleStyle()}
          weekdays={weekdays.map(day => day.slice(0, 3))}
          months={months}
          previousTitle={t('pagination.previous')}
          nextTitle={t('pagination.next')}
          onDateChange={handleDateChange}
          selectedStartDate={tempDateRange.start as DateParsable}
          selectedEndDate={tempDateRange.end as DateParsable}
          width={calendarWidth}
          height={calendarHeight}
        />
      </View>

      <View className="flex-row justify-between items-center mt-4 px-4">
        <TouchableOpacity onPress={toggleDatePicker} className="flex-1">
          <Text className="text-center font-titillium-regular text-medium text-red-500">
            {t('forms.cancel')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={confirmDateRange} className="flex-1">
          <Text className="text-center font-titillium-regular text-medium text-primary-dark dark:text-primary-light">
            {t('forms.confirm')}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 10,
  },
  monthTitle: {
    fontSize: 14,
  },
  yearTitle: {
    fontSize: 12,
  },
  navigationTitle: {
    fontSize: 12,
  },
})

export default DateRangeSelector
