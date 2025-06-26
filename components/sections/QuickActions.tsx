import React, {ComponentProps} from 'react';
import {View, Text} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {useTranslation} from 'react-i18next';

import {IconActionButton} from '@components';

import {appColors} from '@config';

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
    iconColor: appColors.system.red[600],
    title: 'Le mie',
    bgColorClass: 'bg-system-red-50',
    onPress: () => console.log('Vento segnalato!'),
  },
  {
    icon: 'calendar',
    iconColor: appColors.system.emerald[600],
    title: 'Calendario',
    bgColorClass: 'bg-system-emerald-50',
    onPress: () => console.log('Area verde segnalata!'),
  },
  {
    icon: 'star',
    iconColor: appColors.system.orange[600],
    title: 'Preferiti',
    bgColorClass: 'bg-system-orange-50',
    onPress: () => console.log('Riciclo segnalato!'),
  },
  {
    icon: 'chart-line',
    iconColor: appColors.system.teal[600],
    title: 'Analisi',
    bgColorClass: 'bg-system-teal-50',
    onPress: () => console.log('Acqua segnalata!'),
  },
];

const QuickActions = () => {
  const {t} = useTranslation();

  return (
    <>
      <Text className="text-xl font-titillium-light mb-2 mt-6">{t('quickActions')}</Text>

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
