import type {Report, ReportsByDate, DateString} from '@types';

export const getReportsByDate = (reports: Report[]): ReportsByDate =>
  reports.reduce((accumulator, report) => {
    const dateString = report.date.toISOString().split('T')[0] as DateString;

    if (!accumulator[dateString]) {
      accumulator[dateString] = [];
    }

    accumulator[dateString].push(report);

    return accumulator;
  }, {} as ReportsByDate);
