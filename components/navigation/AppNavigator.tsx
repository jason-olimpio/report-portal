import {ActivityIndicator, View} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {useAuth} from '@hooks'

import AppDrawer from './AppDrawer'
import MainAppStack from './MainAppStack'

import type {RootStackParamList} from '@types'

const Stack = createNativeStackNavigator<RootStackParamList>()

const AppNavigator = () => {
  const {isAuthenticated, isLoading} = useAuth()

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center bg-background-light dark:bg-background-dark">
        <ActivityIndicator
          size="large"
          className="text-primary-light dark:text-primary-dark"
        />
      </View>
    )

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Main"
          component={isAuthenticated ? MainAppStack : AppDrawer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
