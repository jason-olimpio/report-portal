import React from 'react';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import {getStatusLabel} from '@utils';

import {StatusOption} from '@types';

type StatusColor = Exclude<StatusOption, StatusOption.All>;

const REPORT_STATUS_COLORS: Record<StatusColor, {bg: string; text: string}> = {
  [StatusOption.Pending]: {
    bg: 'bg-system-orange-50',
    text: 'text-system-orange-600',
  },
  [StatusOption.Completed]: {
    bg: 'bg-system-emerald-50',
    text: 'text-system-emerald-600',
  },
  [StatusOption.Working]: {
    bg: 'bg-system-teal-50',
    text: 'text-system-teal-600',
  },
};

type ReportStatusBadgeProps = {
  status: StatusOption;
};

const ReportStatusBadge = ({status}: ReportStatusBadgeProps) => {
  const {t} = useTranslation();

  const colors =
    status in REPORT_STATUS_COLORS
      ? REPORT_STATUS_COLORS[status as StatusColor]
      : {bg: 'bg-gray-600', text: 'text-white'};

  const label = getStatusLabel(status, t) || t('unknown');

  return (
    <View
      className={`flex-row items-center ${colors.bg} px-3 py-0.5 rounded-full`}>
      <Text className={`${colors.text} text-sm`}>{label}</Text>
    </View>
  );
};

export default ReportStatusBadge;
