import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {Pressable, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {Tabs, RootStackParamList} from '@components';

import {PersonalAreaScreen} from '@screens';

import {appColors} from '@config';
import {notificationData} from '@store';

const Drawer = createDrawerNavigator();

const headerRightStyle = {marginRight: 16};

const HeaderTitle = () => {
  const {t} = useTranslation();

  return (
    <Text className="text-white font-titillium-light text-[20px]">
      {t('appName')}
    </Text>
  );
};

const HeaderRight = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const handlePress = () => navigation.navigate('Notifications');
    const unreadCount = notificationData.filter(notification => !notification.read).length;

    return (
      <View className="w-10 items-end justify-center">
        <Pressable onPress={handlePress} className="relative">
          <MaterialIcons
            name="notifications"
            color="white"
            size={25}
            style={headerRightStyle}
          />

          {unreadCount > 0 && (
            <View className="absolute bg-system-red-600 -top-1.5 right-1 rounded-full w-5 h-5 items-center justify-center">
              <Text className="text-xs text-white font-titillium-bold">{unreadCount}</Text>
            </View>
          )}
        </Pressable>
      </View>
    );
};

const DrawerNavigator = () => {
  const {t} = useTranslation();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: appColors.primary,
        },
        headerTitle: HeaderTitle,
        headerTintColor: 'white',
        headerRight: HeaderRight,
        swipeEnabled: true,
      }}>
      <Drawer.Screen
        name="Tabs"
        component={Tabs}
        options={{
          drawerLabel: 'Home',
        }}
      />

      <Drawer.Screen
        name="PersonalArea"
        component={PersonalAreaScreen}
        options={{
          drawerLabel: t('personalArea'),
        }}
      />

      <Drawer.Screen
        name="Logout"
        options={{
          drawerLabel: 'Logout',
        }}>
        {() => null}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
