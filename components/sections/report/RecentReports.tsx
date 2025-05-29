import React from 'react';
import { View } from 'react-native';

import {ReportList, SectionHeader} from '@components';

import {reportData} from '@store';

const RecentReports = () => {
  const recentReports = reportData.slice(0, 3);

  return (
    <View className="mb-2">
      <SectionHeader
        title="Segnalazioni recenti"
        action="Vedi tutte"
        onPress={() => console.log('Section pressed')}
        className="mb-6"
      />

      <ReportList reports={recentReports} />
    </View>
  );
};

export default RecentReports;
