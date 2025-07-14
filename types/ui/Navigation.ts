import type {
  NavigatorScreenParams,
  CompositeNavigationProp,
} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import type {DrawerNavigationProp} from '@react-navigation/drawer';
import type {RouteProp} from '@react-navigation/native';

export type AuthStackParamList = {
  AuthTabs: undefined;
};

export type AuthTabParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Reports: undefined;
  Stats: undefined;
  Notifications: undefined;
};

export type DrawerParamList = {
  Tabs: NavigatorScreenParams<MainTabParamList>;
  PersonalArea: undefined;
  Logout: undefined;
};

export type MainAppStackParamList = {
  Drawer: NavigatorScreenParams<DrawerParamList>;
  NewReport: undefined;
  ReportDetails: {reportId: string};
  Calendar: undefined;
  Notifications: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainAppStackParamList>;
};

export type AuthenticatedCompositeNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainAppStackParamList>,
  CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList>,
    BottomTabNavigationProp<MainTabParamList>
  >
>;

export type LoginScreenNavigationProp = MaterialTopTabNavigationProp<
  AuthTabParamList,
  'Login'
>;
export type RegisterScreenNavigationProp = MaterialTopTabNavigationProp<
  AuthTabParamList,
  'Register'
>;

export type HomeScreenNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  'Home'
>;
export type ReportsScreenNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  'Reports'
>;
export type StatsScreenNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  'Stats'
>;

export type PersonalAreaScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  'PersonalArea'
>;

export type ReportCardNavigationProp =
  StackNavigationProp<MainAppStackParamList>;

export type LoginScreenRouteProp = RouteProp<AuthTabParamList, 'Login'>;
export type RegisterScreenRouteProp = RouteProp<AuthTabParamList, 'Register'>;
export type HomeScreenRouteProp = RouteProp<MainTabParamList, 'Home'>;
export type ReportsScreenRouteProp = RouteProp<MainTabParamList, 'Reports'>;
export type StatsScreenRouteProp = RouteProp<MainTabParamList, 'Stats'>;
export type PersonalAreaScreenRouteProp = RouteProp<
  DrawerParamList,
  'PersonalArea'
>;
export type ReportDetailsScreenRouteProp = RouteProp<
  MainAppStackParamList,
  'ReportDetails'
>;
export type CalendarRouteProp = StackNavigationProp<
  MainAppStackParamList,
  'Calendar'
>;

export type NavigationAndRoute<
  TNavigation extends object,
  TRoute extends object,
> = {
  navigation: TNavigation;
  route: TRoute;
};
