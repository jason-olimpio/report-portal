import React, {ComponentProps} from 'react';
import {View} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {useTranslation} from 'react-i18next';

import {SectionHeader, InfoCardWidget} from '@components';

import {appColors} from '@config';

type Card = {
  icon: ComponentProps<typeof FontAwesome6>['name'];
  iconColor: string;
  title: string;
  value: string;
  subInfo: string;
  bgColorClass: string;
  valueColorClass: string;
};

const CARDS: Card[] = [
  {
    icon: 'wind',
    iconColor: appColors.system.red[600],
    title: 'Qualità aria',
    value: 'Buona',
    subInfo: 'PM 2.5: 12μg/m³',
    bgColorClass: 'bg-system-red-50',
    valueColorClass: 'text-system-red-600',
  },
  {
    icon: 'leaf',
    iconColor: appColors.system.emerald[600],
    title: 'Zone verdi',
    value: '85%',
    subInfo: '+2% questo mese',
    bgColorClass: 'bg-system-emerald-50',
    valueColorClass: 'text-system-emerald-600',
  },
  {
    icon: 'recycle',
    iconColor: appColors.system.orange[600],
    title: 'Riciclo',
    value: '73%',
    subInfo: 'Tasso mensile',
    bgColorClass: 'bg-system-orange-50',
    valueColorClass: 'text-system-orange-600',
  },
  {
    icon: 'water',
    iconColor: appColors.system.teal[600],
    title: 'Acqua',
    value: 'Ottima',
    subInfo: 'Qualità: 98%',
    bgColorClass: 'bg-system-teal-50',
    valueColorClass: 'text-system-teal-600',
  },
];

const EnvironmentalStatusSection = () => {
  const {t} = useTranslation();

  return (
    <View className="bg-white p-4 rounded-lg shadow-lg">
      <SectionHeader
        title={t('environmentalStatus')}
        action={t('updatedToday')}
        onPress={() => console.log('Section pressed')}
        className="mb-2"
      />

      <View className="flex-row flex-wrap">
        {CARDS.map(
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
