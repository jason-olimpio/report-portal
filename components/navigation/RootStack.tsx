import {createStackNavigator} from '@react-navigation/stack';
import {NewReportScreen, ReportDetailScreen} from '@screens';
import DrawerNavigator from './DrawerNavigator';

export type RootStackParamList = {
  Drawer: undefined;
  NewReport: undefined;
  ReportDetail: {reportId: string};
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Drawer" component={DrawerNavigator} />
    <Stack.Screen name="NewReport" component={NewReportScreen} />
    <Stack.Screen name="ReportDetail" component={ReportDetailScreen} />
  </Stack.Navigator>
);
