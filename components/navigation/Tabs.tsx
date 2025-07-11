import {ComponentProps} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {useTranslation} from 'react-i18next';

import {HomeScreen, ReportsScreen, StatsScreen} from '@screens';

import {appColors} from '@config';
import {useTheme} from '@hooks';

export type TabsParamList = {
  Home: undefined;
  Reports: undefined;
  Stats: undefined;
};

const Tab = createBottomTabNavigator();

const TAB_ICONS: Record<string, ComponentProps<typeof MaterialIcons>['name']> =
  {
    Home: 'house',
    Reports: 'list',
    Stats: 'bar-chart',
    Notifications: 'notifications',
  };

const getTabBarIcon = (routeName: string, focused: boolean, color: string) => {
  const iconName = TAB_ICONS[routeName] || 'circle';

  return <MaterialIcons name={iconName} size={25} color={color} />;
};

export const Tabs = () => {
  const {t} = useTranslation();
  const {isDark} = useTheme();
  const activeColor = isDark ? appColors.primary.light : appColors.primary.dark;
  const inactiveColor = isDark
    ? appColors.neutral.gray[200]
    : appColors.neutral.gray[500];

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) =>
          getTabBarIcon(route.name, focused, color),
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: [
          {
            backgroundColor: isDark
              ? appColors.background.secondaryDark
              : appColors.background.secondaryLight,
          },
        ],
        swipeEnabled: true,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarLabel: 'Home'}}
      />

      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        options={{tabBarLabel: t('reports')}}
      />

      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{tabBarLabel: t('stats')}}
      />
    </Tab.Navigator>
  );
};
