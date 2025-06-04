import React from 'react';
import {View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {ReportList, SectionHeader, TabsParamList} from '@components';

import {reportData} from '@store';

const RecentReports = () => {
  const navigation = useNavigation<NavigationProp<TabsParamList>>();
  const recentReports = reportData.slice(0, 3);

  return (
    <View className="mb-2">
      <SectionHeader
        title="Segnalazioni recenti"
        action="Vedi tutte"
        onPress={() => navigation.navigate('Reports')}
        className="mb-6"
      />

      <ReportList reports={recentReports} />
    </View>
  );
};

export default RecentReports;
