import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {useAuth} from '@hooks';

import {AppDrawer, MainAppStack} from '@components';

import type {RootStackParamList} from '@types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const {isAuthenticated, isLoading} = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-background-light dark:bg-background-dark">
        <ActivityIndicator
          size="large"
          className="text-primary-light dark:text-primary-dark"
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Main"
          component={isAuthenticated ? MainAppStack : AppDrawer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
