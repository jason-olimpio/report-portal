import React, { ComponentProps } from 'react';
import {View, Text} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import {IconActionButton} from '@components';

import { appColors } from '@config';

type Action = {
  icon: ComponentProps<typeof FontAwesome6>['name'];
  iconColor: string;
  title: string;
  bgColorClass: string;
  onPress: () => void;
};

const ACTIONS: Action[] = [
  {
    icon: 'list',
    iconColor: appColors.utility.blue[600],
    title: 'Le mie',
    bgColorClass: 'bg-utility-blue-50',
    onPress: () => console.log('Vento segnalato!'),
  },
  {
    icon: 'calendar',
    iconColor: appColors.utility.purple[600],
    title: 'Calendario',
    bgColorClass: 'bg-utility-purple-50',
    onPress: () => console.log('Area verde segnalata!'),
  },
  {
    icon: 'star',
    iconColor: appColors.utility.yellow[600],
    title: 'Preferiti',
    bgColorClass: 'bg-utility-yellow-50',
    onPress: () => console.log('Riciclo segnalato!'),
  },
  {
    icon: 'chart-line',
    iconColor: appColors.primary,
    title: 'Analisi',
    bgColorClass: 'bg-utility-green-50',
    onPress: () => console.log('Acqua segnalata!'),
  },
];

const QuickActions = () => {
  return (
    <>
      <Text className="text-xl font-light mb-2 mt-6">Azioni rapide</Text>

      <View className="flex-row justify-between mt-2 mb-6">
        {ACTIONS.map(({icon, iconColor, title, bgColorClass, onPress}) => (
          <IconActionButton
            key={title}
            icon={icon}
            iconColor={iconColor}
            title={title}
            bgColorClass={bgColorClass}
            onPress={onPress}
          />
        ))}
      </View>
    </>
  );
};

export default QuickActions;
