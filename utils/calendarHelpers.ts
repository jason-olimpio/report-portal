import {Report, StatusOption} from '@types';
import {appColors} from '@config';

export const STATUS_COLORS: {
  light: Record<Exclude<StatusOption, StatusOption.All>, string>;
  dark: Record<Exclude<StatusOption, StatusOption.All>, string>;
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
};

export type ReportsByDate = Record<string, Report[]>;

export const getReportsByDate = (reports: Report[]): ReportsByDate =>
  reports.reduce((accumulator, report) => {
    const dateString = report.date.toISOString().split('T')[0];

    if (!accumulator[dateString]) {
      accumulator[dateString] = [];
    }

    accumulator[dateString].push(report);

    return accumulator;
  }, {} as ReportsByDate);

export type MarkedDates = Record<
  string,
  {
    dots: Array<{
      key: string;
      color: string;
    }>;
    marked: boolean;
  }
>;

export const getMarkedDates = (
  reportsByDate: ReportsByDate,
  isDark: boolean,
): MarkedDates => {
  const markedDates: MarkedDates = {};

  Object.entries(reportsByDate).forEach(
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
  );

  return markedDates;
};

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
  | 'medium';

type CalendarTheme = {
  backgroundColor: string;
  calendarBackground: string;
  textSectionTitleColor: string;
  dayTextColor: string;
  todayTextColor: string;
  selectedDayBackgroundColor: string;
  selectedDayTextColor: string;
  textDayFontWeight: FontWeight;
  textMonthFontWeight: FontWeight;
  textDayHeaderFontWeight: FontWeight;
  monthTextColor: string;
  arrowColor: string;
};

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
  monthTextColor: isDark
    ? appColors.neutral.gray[200]
    : appColors.neutral.gray[800],
  arrowColor: isDark ? appColors.primary.light : appColors.primary.dark,
});
