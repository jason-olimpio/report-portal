import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTranslation} from 'react-i18next';
import {View, SafeAreaView} from 'react-native';

import {LoginScreen, RegisterScreen} from '@screens';
import {useTheme} from '@hooks';
import {appColors} from '@config';
import {AuthTabParamList} from '@types';

const Tab = createMaterialTopTabNavigator<AuthTabParamList>();

const LoginRegisterTabs = () => {
  const {t} = useTranslation();
  const {isDark} = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="flex-1">
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: isDark
                ? appColors.background.dark
                : appColors.background.light,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 1,
              borderBottomColor: isDark
                ? appColors.neutral.gray[700]
                : appColors.neutral.gray[200],
            },
            tabBarLabelStyle: {
              fontSize: 16,
              fontWeight: '600',
              textTransform: 'none',
            },
            tabBarActiveTintColor: isDark
              ? appColors.primary.light
              : appColors.primary.dark,
            tabBarInactiveTintColor: isDark
              ? appColors.neutral.gray[400]
              : appColors.neutral.gray[600],
            tabBarIndicatorStyle: {
              backgroundColor: isDark
                ? appColors.primary.light
                : appColors.primary.dark,
              height: 3,
            },
            swipeEnabled: true,
          }}>
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
              tabBarLabel: t('authentication.signIn'),
            }}
          />

          <Tab.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              tabBarLabel: t('authentication.signUp'),
            }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default LoginRegisterTabs;
