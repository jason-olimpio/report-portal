import {Text, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';

import {
  CommunityImpactSection,
  EnvironmentalStatusSection,
  QuickActions,
  RecentReports,
  SpeedDial,
} from '@components';

const HomeScreen = () => {
  const {t} = useTranslation();

  return (
    <>
      <ScrollView className="px-8">
        <Text className="text-neutral-gray-500 text-center font-light text-sm mt-4 mb-6">
          {t('welcome')},
          Mercoledì 23 aprile 2025
        </Text>

        <EnvironmentalStatusSection />

        <QuickActions />

        <RecentReports />

        <CommunityImpactSection
          reports={127}
          solvedReports={89}
          successRate={70}
        />
      </ScrollView>

      <SpeedDial />
    </>
  );
};

export default HomeScreen;
