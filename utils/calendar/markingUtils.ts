import {Report, StatusOption, MarkedDates, ReportsByDate} from '@types';
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

export const getMarkedDatesWithSelection = (
  reportsByDate: ReportsByDate,
  isDark: boolean,
  selectedDate?: string | null,
): MarkedDates => {
  const markedDates = getMarkedDates(reportsByDate, isDark);

  if (!selectedDate) {
    return markedDates;
  }

  const selectedReports = reportsByDate[selectedDate];
  const existingMarking = markedDates[selectedDate] || {};

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
  };

  return markedDates;
};

export const getMarkedDates = (
  reportsByDate: ReportsByDate,
  isDark: boolean,
): MarkedDates => {
  const markedDates: MarkedDates = {};

  Object.entries(reportsByDate).forEach(
    ([date, reports]: [string, Report[]]) =>
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

export const getDateStatusColor = (
  reports: Report[],
  isDark: boolean,
): string => {
  if (!reports || reports.length === 0) {
    return isDark ? appColors.primary.dark : appColors.primary.light;
  }

  const primaryReport = reports[0];

  if (primaryReport.status === StatusOption.All) {
    return isDark ? appColors.primary.dark : appColors.primary.light;
  }

  return isDark
    ? STATUS_COLORS.dark[
        primaryReport.status as Exclude<StatusOption, StatusOption.All>
      ]
    : STATUS_COLORS.light[
        primaryReport.status as Exclude<StatusOption, StatusOption.All>
      ];
};
