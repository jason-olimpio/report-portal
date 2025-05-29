import {ALL_STATUSES} from '@constants';

export enum ReportStatus {
  Pending,
  Working,
  Completed,
}

export type StatusOption = (typeof ALL_STATUSES)[number];
