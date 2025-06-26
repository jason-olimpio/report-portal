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
  const {i18n} = useTranslation();

  const currentDate = new Date();

  const formattedDate = new Intl.DateTimeFormat(i18n.language, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(currentDate);

  return (
    <>
      <ScrollView className="px-8">
        <Text className="text-neutral-gray-500 text-center font-titillium-light text-sm mt-4 mb-6">
          {formattedDate}
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
