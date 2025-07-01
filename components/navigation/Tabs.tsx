import React, {ComponentProps} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {useTranslation} from 'react-i18next';

import {HomeScreen, ReportsScreen, StatsScreen} from '@screens';

import {appColors} from '@config';

export type TabsParamList = {
  Home: undefined;
  Reports: undefined;
  Stats: undefined;
};

const Tab = createBottomTabNavigator();

const TAB_ICONS: Record<string, ComponentProps<typeof MaterialIcons>['name']> = {
  Home: 'house',
  Reports: 'list',
  Stats: 'bar-chart',
};

const getTabBarIcon = (routeName: string, focused: boolean) => {
  const iconName = TAB_ICONS[routeName] || 'circle';
  const color = focused ? appColors.primary : appColors.neutral.gray[500];

  return (
    <MaterialIcons
      name={iconName}
      size={25}
      color={color}
    />
  );
};

const Tabs = () => {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => getTabBarIcon(route.name, focused),
        headerShown: false,
        tabBarActiveTintColor: appColors.primary,
        tabBarInactiveTintColor: appColors.neutral.gray[500],
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

export default Tabs;
