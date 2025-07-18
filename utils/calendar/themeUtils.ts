import {appColors} from '@config'
import type {CalendarTheme} from '@types'

export const getCalendarTheme = (isDark: boolean): CalendarTheme => ({
  backgroundColor: isDark
    ? appColors.background.dark
    : appColors.background.light,
  calendarBackground: isDark
    ? appColors.background.dark
    : appColors.background.light,
  textSectionTitleColor: isDark
    ? appColors.neutral.gray[300]
    : appColors.neutral.gray[800],
  dayTextColor: isDark
    ? appColors.neutral.gray[300]
    : appColors.neutral.gray[800],
  todayTextColor: isDark ? appColors.primary.dark : appColors.primary.light,
  selectedDayBackgroundColor: isDark
    ? appColors.primary.dark
    : appColors.primary.light,
  selectedDayTextColor: '#fff',
  textDayFontWeight: '400',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '500',
  textDayFontSize: 14,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 12,
  monthTextColor: isDark
    ? appColors.neutral.gray[200]
    : appColors.neutral.gray[800],
  arrowColor: isDark ? appColors.primary.light : appColors.primary.dark,
})
