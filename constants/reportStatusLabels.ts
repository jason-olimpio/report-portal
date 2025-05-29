import {ReportStatus} from '@types';

const REPORT_STATUS_LABELS: Record<ReportStatus, string> = {
  [ReportStatus.Pending]: 'In attesa',
  [ReportStatus.Working]: 'In lavorazione',
  [ReportStatus.Completed]: 'Completata',
};

export default REPORT_STATUS_LABELS;
