import {createStackNavigator} from '@react-navigation/stack';

import {NewReportScreen, ReportDetailScreen, NotificationScreen} from '@screens';
import {DrawerNavigator} from '@components';

export type RootStackParamList = {
  Drawer: undefined;
  NewReport: undefined;
  ReportDetail: {reportId: string};
  Notifications: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Drawer" component={DrawerNavigator} />
    <Stack.Screen name="NewReport" component={NewReportScreen} />
    <Stack.Screen name="ReportDetail" component={ReportDetailScreen} />
    <Stack.Screen name="Notifications" component={NotificationScreen} />
  </Stack.Navigator>
);
