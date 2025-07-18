import {createStackNavigator} from '@react-navigation/stack';

import {
  NewReportScreen,
  ReportDetailsScreen,
  NotificationScreen,
  CalendarScreen,
} from '@screens';
import {AppDrawer} from '@components';
import type {MainAppStackParamList} from '@types';

const Stack = createStackNavigator<MainAppStackParamList>();

const MainAppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Drawer" component={AppDrawer} />

      <Stack.Screen
        name="NewReport"
        component={NewReportScreen}
        options={{presentation: 'modal'}}
      />

      <Stack.Screen
        name="ReportDetails"
        component={ReportDetailsScreen}
        options={{presentation: 'modal'}}
      />

      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{presentation: 'modal'}}
      />

      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};

export default MainAppStack;
