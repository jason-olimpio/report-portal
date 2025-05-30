import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text} from 'react-native';

type CommunityImpactSectionProps = {
  reports: number;
  solvedReports: number;
  successRate: number;
};

type Stat = {
  value: number | string;
  label: string;
};

const CommunityImpactSection = ({
  reports,
  solvedReports,
  successRate,
}: CommunityImpactSectionProps) => {
  const {t} = useTranslation();

  const stats: Stat[] = [
    {value: reports, label: t('reports')},
    {value: solvedReports, label: t('solved')},
    {value: `${successRate}%`, label: t('successRate')},
  ];

  return (
    <View className="mb-6">
      <Text className="text-xl font-light mb-5">{t('communityImpact')}</Text>

      <View className="bg-white p-4 shadow-lg rounded-lg">
        <View className="flex-row flex-wrap justify-between mb-4">
          {stats.map(({value, label}) => (
            <View className="items-center" key={label}>
              <Text className="text-primary text-4xl">{value}</Text>
              <Text className="text-neutral-gray-500">{label}</Text>
            </View>
          ))}
        </View>

        <View className="h-2 bg-neutral-gray-100 rounded-full overflow-hidden w-full">
          <View
            className="bg-primary h-full"
            style={{width: `${successRate}%`}}
          />
        </View>
      </View>
    </View>
  );
};

export default CommunityImpactSection;
