import {
  type Report,
  StatusOption,
  type MarkedDates,
  type ReportsByDate,
  type DateString,
} from '@types'
import {appColors} from '@config'

export const STATUS_COLORS: {
  light: Record<Exclude<StatusOption, StatusOption.All>, string>
  dark: Record<Exclude<StatusOption, StatusOption.All>, string>
} = {
  light: {
    [StatusOption.Pending]: appColors.system.orange[600].light,
    [StatusOption.Working]: appColors.system.emerald[600].light,
    [StatusOption.Completed]: appColors.system.teal[600].light,
  },
  dark: {
    [StatusOption.Pending]: appColors.system.orange[600].dark,
    [StatusOption.Working]: appColors.system.emerald[600].dark,
    [StatusOption.Completed]: appColors.system.teal[600].dark,
  },
}

const STATUS_PRIORITY: Status[] = [
  StatusOption.Pending,
  StatusOption.Working,
  StatusOption.Completed,
]

type Status = Exclude<StatusOption, StatusOption.All>

export const getMarkedDatesWithSelection = (
  reportsByDate: ReportsByDate,
  isDark: boolean,
  selectedDate?: DateString | null,
): MarkedDates => {
  const markedDates = getMarkedDates(reportsByDate, isDark)
  if (!selectedDate) return markedDates

  const selectedReports = reportsByDate[selectedDate] ?? []
  const existingMarking = markedDates[selectedDate] ?? {}

  markedDates[selectedDate] = {
    ...existingMarking,
    selected: true,
    selectedColor: selectedReports.length
      ? getDateDotColor(selectedReports, isDark)
      : getPrimaryColor(isDark),
    selectedTextColor: '#FFFFFF',
  }

  return markedDates
}

const getMarkedDates = (reports: ReportsByDate, isDark: boolean): MarkedDates =>
  Object.fromEntries(
    (Object.entries(reports) as [DateString, Report[]][])
      .filter(([, reports]) => !!reports?.length)
      .map(([date, reports]) => [
        date,
        {marked: true, dotColor: getDateDotColor(reports, isDark)},
      ]),
  ) as MarkedDates

const getDateDotColor = (reports: Report[], isDark: boolean): string => {
  const status = getDominantStatus(reports)

  if (!status) return getPrimaryColor(isDark)

  const palette = isDark ? STATUS_COLORS.dark : STATUS_COLORS.light

  return palette[status]
}

const getDominantStatus = (reports: Report[]): Status | null =>
  STATUS_PRIORITY.find(status =>
    reports.some(report => report.status === status),
  ) ?? null

const getPrimaryColor = (isDark: boolean) =>
  isDark ? appColors.primary.dark : appColors.primary.light
