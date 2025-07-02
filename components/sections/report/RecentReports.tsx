import React from 'react';
import {View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {ReportList, SectionHeader, TabsParamList} from '@components';

import {reportData} from '@store';

const RecentReports = () => {
  const {t} = useTranslation();

  const navigation = useNavigation<NavigationProp<TabsParamList>>();
  const recentReports = [...reportData]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 3);

  const navigateToAllReports = () => navigation.navigate('Reports');

  return (
    <View className="mb-2">
      <SectionHeader
        title={t('recentReports')}
        action={t('viewAll')}
        onPress={navigateToAllReports}
        className="mb-6"
      />

      <ReportList reports={recentReports} />
    </View>
  );
};

export default RecentReports;
