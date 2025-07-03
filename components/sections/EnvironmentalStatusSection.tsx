import React, {ComponentProps} from 'react';
import {View} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {useTranslation} from 'react-i18next';

import {SectionHeader, InfoCardWidget} from '@components';

import {appColors} from '@config';

type StatusData = {
  icon: ComponentProps<typeof MaterialIcons>['name'];
  iconColor: string;
  title: string;
  value: string;
  subInfo: string;
  bgColorClass: string;
  valueColorClass: string;
};

const EnvironmentalStatusSection = () => {
  const {t} = useTranslation();

  const statusData: StatusData[] = [
    {
      icon: 'park',
      iconColor: appColors.system.emerald[600],
      title: t('environmentalStatus.greenAreas'),
      value: '85%',
      subInfo: t('environmentalStatus.growthThisMonth', {value: '+2%'}),
      bgColorClass: 'bg-system-emerald-50',
      valueColorClass: 'text-system-emerald-600',
    },
    {
      icon: 'recycling',
      iconColor: appColors.system.orange[600],
      title: t('environmentalStatus.recycling'),
      value: '73%',
      subInfo: t('environmentalStatus.monthlyRate'),
      bgColorClass: 'bg-system-orange-50',
      valueColorClass: 'text-system-orange-600',
    },
    {
      icon: 'water',
      iconColor: appColors.system.teal[600],
      title: t('environmentalStatus.water'),
      value: t('environmentalStatus.waterQualityValue'),
      subInfo: t('environmentalStatus.waterQuality', {value: '98%'}),
      bgColorClass: 'bg-system-teal-50',
      valueColorClass: 'text-system-teal-600',
    },
    {
      icon: 'air',
      iconColor: appColors.system.red[600],
      title: t('environmentalStatus.air'),
      value: t('environmentalStatus.airQualityValue'),
      subInfo: t('environmentalStatus.airQuality', {value: 'PM 2.5: 12μg/m³'}),
      bgColorClass: 'bg-system-red-50',
      valueColorClass: 'text-system-red-600',
    },
  ];

  return (
    <View className="bg-white p-4 rounded-lg shadow-lg">
      <SectionHeader
        title={t('environmentalStatus.title')}
        action={t('environmentalStatus.updatedToday')}
        onPress={() => console.log('Section pressed')}
        className="mb-2"
      />

      <View className="flex-row flex-wrap">
        {statusData.map(
          ({
            icon,
            iconColor,
            title,
            value,
            subInfo,
            bgColorClass,
            valueColorClass,
          }) => (
            <InfoCardWidget
              key={title}
              icon={icon}
              iconColor={iconColor}
              title={title}
              value={value}
              subInfo={subInfo}
              bgColorClass={bgColorClass}
              valueColorClass={valueColorClass}
            />
          ),
        )}
      </View>
    </View>
  );
};

export default EnvironmentalStatusSection;
