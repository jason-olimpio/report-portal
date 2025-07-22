import {ComponentProps} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import {useTranslation} from 'react-i18next'

import {HomeScreen, ReportsScreen, StatsScreen, MapScreen} from '@screens'
import {useAuth, useTheme} from '@hooks'

import {appColors} from '@config'
import {UserRank} from '@types'

const Tab = createBottomTabNavigator()

const TAB_ICONS: Record<string, ComponentProps<typeof MaterialIcons>['name']> =
  {
    Home: 'house',
    Reports: 'list',
    Stats: 'bar-chart',
    Notifications: 'notifications',
    Map: 'map',
  }

const getTabBarIcon = (routeName: string, color: string) => {
  const iconName = TAB_ICONS[routeName] || 'circle'

  return <MaterialIcons name={iconName} size={25} color={color} />
}

const MainTabs = () => {
  const {t} = useTranslation()
  const {isDark} = useTheme()
  const {user} = useAuth()

  const activeColor = isDark ? appColors.primary.light : appColors.primary.dark
  const inactiveColor = isDark
    ? appColors.neutral.gray[200]
    : appColors.neutral.gray[500]

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => getTabBarIcon(route.name, color),
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
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarLabel: 'Home'}}
      />

      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        options={{tabBarLabel: t('navigation.reports')}}
      />

      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{tabBarLabel: t('navigation.stats')}}
      />

      {user?.rank === UserRank.Admin && (
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{tabBarLabel: t('navigation.map')}}
        />
      )}
    </Tab.Navigator>
  )
}

export default MainTabs
