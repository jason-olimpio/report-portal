import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {Pressable, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {MainTabs, LoginRegisterTabs} from '@components';

import {PersonalAreaScreen} from '@screens';

import {appColors} from '@config';
import {notificationData} from '@store';
import {useAuth, useTheme} from '@hooks';
import {MainAppStackParamList} from '@types';

const Drawer = createDrawerNavigator();

const headerRightStyle = {marginRight: 16};

const AppDrawer = () => {
  const {isDark} = useTheme();
  const {t} = useTranslation();
  const {logout, isAuthenticated} = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Drawer.Navigator
      screenOptions={{
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
        headerRight: isAuthenticated ? HeaderRight : undefined,
        swipeEnabled: true,
      }}>
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
              event.preventDefault();

              handleLogout();
            },
          }}
        />
      )}
    </Drawer.Navigator>
  );
};

const HeaderTitle = () => {
  const {t} = useTranslation();

  return (
    <Text className="text-white font-titillium-light text-[20px]">
      {t('appName')}
    </Text>
  );
};

const HeaderRight = () => {
  const navigation = useNavigation<NavigationProp<MainAppStackParamList>>();
  const handlePress = () => navigation.navigate('Notifications');
  const unreadCount = notificationData.filter(
    notification => !notification.read,
  ).length;

  return (
    <View className="w-10 items-end justify-center">
      <Pressable onPress={handlePress} className="relative">
        <MaterialIcons
          name="notifications"
          color="white"
          size={22}
          style={headerRightStyle}
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
  );
};

const EmptyComponent = () => null;

export default AppDrawer;
