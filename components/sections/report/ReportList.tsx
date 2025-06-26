import React from 'react';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {ReportCard} from '@components';
import {Report} from '@types';

type ReportListProps = {
  reports: Report[]
};

const ReportList = ({reports}: ReportListProps) => {
  const {t} = useTranslation();

  if (reports.length === 0) {
    return (
      <Text className="text-center mt-5 text-base text-gray-500">
        {t('noReportFound')}
      </Text>
    );
  }

  return (
    <View className="w-full">
      {reports.map(({image, title, address, date, status}) => (
        <ReportCard
          key={title + date.toISOString()}
          image={image}
          title={title}
          address={address}
          date={date}
          status={status}
        />
      ))}
    </View>
  );
};

export default ReportList;
