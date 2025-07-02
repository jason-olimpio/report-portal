import {createStackNavigator} from '@react-navigation/stack';

import {NewReportScreen, ReportDetailsScreen, NotificationScreen} from '@screens';
import {DrawerNavigator} from '@components';

export type RootStackParamList = {
  Drawer: undefined;
  NewReport: undefined;
  ReportDetails: {reportId: string};
  Notifications: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Drawer" component={DrawerNavigator} />
    <Stack.Screen name="NewReport" component={NewReportScreen} />
    <Stack.Screen name="ReportDetails" component={ReportDetailsScreen} />
    <Stack.Screen name="Notifications" component={NotificationScreen} />
  </Stack.Navigator>
);
