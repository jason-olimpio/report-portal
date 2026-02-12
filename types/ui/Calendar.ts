import type {Report} from '@types'

export type ReportsByDate = Record<DateString, Report[]>

export type MarkedDates = Record<DateString, DateMarkingStyle>

export type DateString = `${number}-${number}-${number}`

type DateMarkingStyle = {
  dots?: CalendarDot[]
  marked?: boolean
  selected?: boolean
  selectedColor?: string
  selectedTextColor?: string
  disabled?: boolean
  disableTouchEvent?: boolean
  dotColor?: string
  customStyles?: {
    container?: Record<string, any>
    text?: Record<string, any>
  }
}

type CalendarDot = {
  key: string
  color: string
}

export type CalendarTheme = {
  backgroundColor: string
  calendarBackground: string
  textSectionTitleColor: string
  dayTextColor: string
  todayTextColor: string
  selectedDayBackgroundColor: string
  selectedDayTextColor: string
  textDayFontWeight: FontWeight
  textMonthFontWeight: FontWeight
  textDayHeaderFontWeight: FontWeight
  textDayFontSize: number
  textMonthFontSize: number
  textDayHeaderFontSize: number
  monthTextColor: string
  arrowColor: string
}

type FontWeight =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'normal'
  | 'bold'
  | 'ultralight'
  | 'thin'
  | 'light'
  | 'medium'
