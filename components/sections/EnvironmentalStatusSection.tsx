import React, { ComponentProps } from 'react';
import {View} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

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
    iconColor: appColors.utility.blue[600],
    title: 'Qualità aria',
    value: 'Buona',
    subInfo: 'PM 2.5: 12μg/m³',
    bgColorClass: 'bg-utility-blue-50',
    valueColorClass: 'text-utility-blue-600',
  },
  {
    icon: 'leaf',
    iconColor: appColors.primary,
    title: 'Zone verdi',
    value: '85%',
    subInfo: '+2% questo mese',
    bgColorClass: 'bg-utility-green-50',
    valueColorClass: 'text-primary',
  },
  {
    icon: 'recycle',
    iconColor: appColors.utility.yellow[600],
    title: 'Riciclo',
    value: '73%',
    subInfo: 'Tasso mensile',
    bgColorClass: 'bg-utility-yellow-50',
    valueColorClass: 'text-utility-yellow-600',
  },
  {
    icon: 'water',
    iconColor: appColors.utility.purple[600],
    title: 'Acqua',
    value: 'Ottima',
    subInfo: 'Qualità: 98%',
    bgColorClass: 'bg-utility-purple-50',
    valueColorClass: 'text-utility-purple-600',
  },
];

const EnvironmentalStatusSection = () => {
  return (
    <View className="bg-white p-4 rounded-lg shadow-lg">
      <SectionHeader
        title="Stato ambientale"
        action="Aggiornato oggi"
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
