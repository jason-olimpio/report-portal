import {ComponentProps} from 'react';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

import {IconActionButton} from '@components';
import type {AuthenticatedCompositeNavigationProp} from '@types';

import {appColors} from '@config';
import {useTheme} from '@hooks';

export type QuickAction = {
  icon: ComponentProps<typeof MaterialIcons>['name'];
  iconColor: string;
  title: string;
  bgColor: string;
  onPress: () => void;
};

export const QuickActions = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<AuthenticatedCompositeNavigationProp>();
  const {isDark} = useTheme();

  const actions: QuickAction[] = [
    {
      icon: 'report',
      iconColor: isDark
        ? appColors.system.orange[600].dark
        : appColors.system.orange[600].light,
      title: t('quickActions.addReport'),
      bgColor: isDark
        ? appColors.system.orange[50].dark
        : appColors.system.orange[50].light,
      onPress: () => navigation.navigate('NewReport'),
    },
    {
      icon: 'calendar-month',
      iconColor: isDark
        ? appColors.system.teal[600].dark
        : appColors.system.teal[600].light,
      title: t('quickActions.calendar'),
      bgColor: isDark
        ? appColors.system.teal[50].dark
        : appColors.system.teal[50].light,
      onPress: () => navigation.navigate('Calendar'),
    },
    {
      icon: 'bar-chart',
      iconColor: isDark
        ? appColors.system.emerald[600].dark
        : appColors.system.emerald[600].light,
      title: t('quickActions.analysis'),
      bgColor: isDark
        ? appColors.system.emerald[50].dark
        : appColors.system.emerald[50].light,
      onPress: () =>
        navigation.navigate('Drawer', {
          screen: 'Tabs',
          params: {screen: 'Stats'},
        }),
    },
  ];

  return (
    <>
      <Text className="text-xl font-titillium-light dark:text-white mb-2 mt-6">
        {t('quickActions.title')}
      </Text>

      <View className="flex-row justify-between mt-2 mb-6">
        {actions.map(({icon, iconColor, title, bgColor, onPress}) => (
          <IconActionButton
            key={title}
            icon={icon}
            iconColor={iconColor}
            title={title}
            bgColor={bgColor}
            onPress={onPress}
          />
        ))}
      </View>
    </>
  );
};
