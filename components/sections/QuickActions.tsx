import React, { ComponentProps } from 'react';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import {IconActionButton, type RootStackParamList} from '@components';

import {appColors} from '@config';

type QuickAction = {
  icon: ComponentProps<typeof FontAwesome6>['name'];
  iconColor: string;
  title: string;
  bgColorClass: string;
  onPress: () => void;
};

const QuickActions = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const actions: QuickAction[] = [
    {
      icon: 'plus',
      iconColor: appColors.system.orange[600],
      title: 'Agg. segnalazione',
      bgColorClass: 'bg-system-orange-50',
      onPress: () => navigation.navigate('NewReport'),
    },
    {
      icon: 'calendar',
      iconColor: appColors.system.teal[600],
      title: 'Calendario',
      bgColorClass: 'bg-system-teal-50',
      onPress: () => console.log('Area verde segnalata!'),
    },
    {
      icon: 'chart-line',
      iconColor: appColors.system.emerald[600],
      title: 'Analisi',
      bgColorClass: 'bg-system-emerald-50',
      onPress: () => console.log('Acqua segnalata!'),
    },
  ];

  return (
    <>
      <Text className="text-xl font-titillium-light mb-2 mt-6">
        {t('quickActions')}
      </Text>

      <View className="flex-row justify-between mt-2 mb-6">
        {actions.map(({icon, iconColor, title, bgColorClass, onPress}) => (
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
