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

export const getMarkedDatesWithSelection = (
  reportsByDate: ReportsByDate,
  isDark: boolean,
  selectedDate?: DateString | null,
): MarkedDates => {
  const markedDates = getMarkedDates(reportsByDate, isDark)

  if (!selectedDate) return markedDates

  const selectedReports = reportsByDate[selectedDate]
  const existingMarking = markedDates[selectedDate] || {}

  markedDates[selectedDate] = {
    ...existingMarking,
    selected: true,
    selectedColor:
      selectedReports && selectedReports.length > 0
        ? getDateStatusColor(selectedReports, isDark)
        : isDark
          ? appColors.primary.dark
          : appColors.primary.light,
    selectedTextColor: '#FFFFFF',
  }

  return markedDates
}

const getMarkedDates = (
  reportsByDate: ReportsByDate,
  isDark: boolean,
): MarkedDates => {
  const markedDates: MarkedDates = {}

  ;(Object.entries(reportsByDate) as [DateString, Report[]][]).forEach(
    ([date, reports]) =>
      (markedDates[date] = {
        dots: reports
          .filter(report => report.status !== StatusOption.All)
          .map(report => ({
            key: report.id,
            color: isDark
              ? STATUS_COLORS.dark[
                  report.status as Exclude<StatusOption, StatusOption.All>
                ]
              : STATUS_COLORS.light[
                  report.status as Exclude<StatusOption, StatusOption.All>
                ],
          })),
        marked: true,
      }),
  )

  return markedDates
}

const getDateStatusColor = (reports: Report[], isDark: boolean): string => {
  const primaryColors = isDark
    ? appColors.primary.dark
    : appColors.primary.light

  if (!reports?.length || reports[0].status === StatusOption.All)
    return primaryColors

  const statusColors = isDark ? STATUS_COLORS.dark : STATUS_COLORS.light
  const status = reports[0].status as Exclude<StatusOption, StatusOption.All>

  return statusColors[status]
}
