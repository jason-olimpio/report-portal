import {Report, StatusOption} from '@types';

const getMonthlyReportStats = (reports: Report[]) => {
  const stats = new Map<string, { open: number; closed: number }>();

  for (const report of reports) {
    const date = new Date(report.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!stats.has(key)) {
      stats.set(key, { open: 0, closed: 0 });
    }

    const entry = stats.get(key);

    if (!entry) {
      continue;
    }

    const isClosed = report.status === StatusOption.Completed;
    const isOpen = report.status === StatusOption.Pending || report.status === StatusOption.Working;

    entry.closed += Number(isClosed);
    entry.open += Number(isOpen);
  }

  const sortedKeys = Array.from(stats.keys()).sort();

  const monthNumbers = sortedKeys.map(key => {
    const parts = key.split('-');

    return parts.length > 1 ? parseInt(parts[1], 10) : undefined;
  });

  return {
    open: sortedKeys.map(key => stats.get(key)?.open ?? 0),
    closed: sortedKeys.map(key => stats.get(key)?.closed ?? 0),
    monthNumbers,
  };
};

export default getMonthlyReportStats;
