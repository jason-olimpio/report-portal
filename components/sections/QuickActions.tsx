import React, { ComponentProps } from 'react';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";

import {IconActionButton, type RootStackParamList, TabsParamList} from '@components';

import {appColors} from '@config';

type QuickAction = {
  icon: ComponentProps<typeof MaterialIcons>['name'];
  iconColor: string;
  title: string;
  bgColorClass: string;
  onPress: () => void;
};

type NavigationProps = CompositeNavigationProp<
    StackNavigationProp<RootStackParamList>,
    BottomTabNavigationProp<TabsParamList>
>;

const QuickActions = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProps>();

  const actions: QuickAction[] = [
    {
      icon: 'report',
      iconColor: appColors.system.orange[600],
      title: t('quickActions.addReport'),
      bgColorClass: 'bg-system-orange-50',
      onPress: () => navigation.navigate('NewReport'),
    },
    {
      icon: 'calendar-month',
      iconColor: appColors.system.teal[600],
      title: t('quickActions.calendar'),
      bgColorClass: 'bg-system-teal-50',
      onPress: () => null,
    },
    {
      icon: 'bar-chart',
      iconColor: appColors.system.emerald[600],
      title: t('quickActions.analysis'),
      bgColorClass: 'bg-system-emerald-50',
      onPress: () => navigation.navigate('Stats'),
    },
  ];

  return (
    <>
      <Text className="text-xl font-titillium-light mb-2 mt-6">
        {t('quickActions.title')}
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
