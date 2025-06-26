import React from 'react';
import {View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {ReportList, SectionHeader, TabsParamList} from '@components';

import {reportData} from '@store';

const RecentReports = () => {
  const {t} = useTranslation();

  const navigation = useNavigation<NavigationProp<TabsParamList>>();
  const recentReports = reportData.slice(0, 3);

  const handleViewAllReports = () => navigation.navigate('Reports');

  return (
    <View className="mb-2">
      <SectionHeader
        title={t('recentReports')}
        action={t('viewAll')}
        onPress={handleViewAllReports}
        className="mb-6"
      />

      <ReportList reports={recentReports} />
    </View>
  );
};

export default RecentReports;
