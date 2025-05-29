import React from 'react';
import {View, Text} from 'react-native';

import {ReportStatus} from '@types';
import {REPORT_STATUS_LABELS} from '@constants';

const REPORT_STATUS_COLORS: Record<ReportStatus, {bg: string; text: string}> = {
  [ReportStatus.Pending]: {
    bg: 'bg-utility-yellow-50',
    text: 'text-utility-yellow-600',
  },
  [ReportStatus.Completed]: {
    bg: 'bg-utility-green-50',
    text: 'text-primary',
  },
  [ReportStatus.Working]: {
    bg: 'bg-utility-blue-50',
    text: 'text-utility-blue-600',
  },
};

type ReportStatusBadgeProps = {
  status: ReportStatus;
};

const ReportStatusBadge = ({status}: ReportStatusBadgeProps) => {
  const colors = REPORT_STATUS_COLORS[status] || {
    bg: 'bg-gray-600',
    text: 'text-white',
  };

  const label = REPORT_STATUS_LABELS[status] || 'Sconosciuto';

  return (
    <View
      className={`flex-row items-center ${colors.bg} px-3 py-0.5 rounded-full`}>
      <Text className={`${colors.text} text-sm`}>{label}</Text>
    </View>
  );
};

export default ReportStatusBadge;
