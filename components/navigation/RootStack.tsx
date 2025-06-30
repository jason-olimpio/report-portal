import {createStackNavigator} from '@react-navigation/stack';
import {NewReportScreen} from '@screens';
import DrawerNavigator from './DrawerNavigator';

export type RootStackParamList = {
  Drawer: undefined;
  NewReport: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Drawer" component={DrawerNavigator} />
    <Stack.Screen name="NewReport" component={NewReportScreen} />
  </Stack.Navigator>
);
