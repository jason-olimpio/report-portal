import { ReportStatus } from '@types';

const ALL_STATUSES = [
  'All',
  ReportStatus.Pending,
  ReportStatus.Working,
  ReportStatus.Completed,
] as const;

export default ALL_STATUSES;
