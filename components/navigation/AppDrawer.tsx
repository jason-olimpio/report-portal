import {createDrawerNavigator} from '@react-navigation/drawer'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {NavigationProp, useNavigation} from '@react-navigation/native'

import {displayName} from '../../app.json'

import {LoginRegisterTabs, MainTabs} from './tabs'

import {PersonalAreaScreen} from '@screens'

import {appColors} from '@config'
import {notificationData} from '@store'
import {useAuth, useTheme} from '@hooks'
import type {MainAppStackParamList} from '@types'

const Drawer = createDrawerNavigator()

const styles = StyleSheet.create({
  headerLeftContainer: {
    marginLeft: 8,
  },
  headerRightIcon: {
    marginRight: 16,
  },
})

const AppDrawer = () => {
  const {isDark} = useTheme()
  const {t} = useTranslation()
  const {logout, isAuthenticated} = useAuth()

  return (
    <Drawer.Navigator
      screenOptions={({navigation}) => ({
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: isDark
            ? appColors.primary.dark
            : appColors.primary.light,
        },
        drawerStyle: {
          backgroundColor: isDark
            ? appColors.background.secondaryDark
            : appColors.background.secondaryLight,
        },
        drawerActiveTintColor: isDark
          ? appColors.primary.light
          : appColors.primary.dark,
        drawerInactiveTintColor: isDark
          ? appColors.text.primary.dark
          : appColors.text.primary.light,
        headerTitle: HeaderTitle,
        headerTintColor: 'white',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={styles.headerLeftContainer}>
            <MaterialIcons name="menu" size={28} color="white" />
          </TouchableOpacity>
        ),
        headerRight: isAuthenticated ? HeaderRight : undefined,
        swipeEnabled: true,
      })}>
      <Drawer.Screen
        name="Tabs"
        component={isAuthenticated ? MainTabs : LoginRegisterTabs}
        options={{
          drawerLabel: t('navigation.home'),
        }}
      />

      <Drawer.Screen
        name="PersonalArea"
        component={PersonalAreaScreen}
        options={{
          drawerLabel: t('navigation.personalArea'),
        }}
      />

      {isAuthenticated && (
        <Drawer.Screen
          name="Logout"
          component={EmptyComponent}
          options={{
            drawerLabel: t('authentication.logout'),
          }}
          listeners={{
            drawerItemPress: event => {
              event.preventDefault()

              logout()
            },
          }}
        />
      )}
    </Drawer.Navigator>
  )
}

const HeaderTitle = () => (
  <Text className="text-white font-titillium-light text-[20px]">
    {displayName}
  </Text>
)

const HeaderRight = () => {
  const navigation = useNavigation<NavigationProp<MainAppStackParamList>>()
  const handlePress = () => navigation.navigate('Notifications')
  const unreadCount = notificationData.filter(
    notification => !notification.read,
  ).length

  return (
    <View className="w-10 items-end justify-center">
      <Pressable onPress={handlePress} className="relative">
        <MaterialIcons
          name="notifications"
          color="white"
          size={22}
          style={styles.headerRightIcon}
        />

        {unreadCount > 0 && (
          <View
            className="absolute bg-system-red-600-light dark:bg-system-red-600-dark 
          -top-1.5 right-1 rounded-full w-5 h-5 items-center justify-center">
            <Text className="text-xs text-white font-titillium-bold">
              {unreadCount}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  )
}

const EmptyComponent = () => null

export default AppDrawer
