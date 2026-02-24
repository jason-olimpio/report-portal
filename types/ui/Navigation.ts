import type {
  NavigatorScreenParams,
  CompositeNavigationProp,
} from '@react-navigation/native'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import type {DrawerNavigationProp} from '@react-navigation/drawer'
import type {RouteProp} from '@react-navigation/native'

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>
  Main: NavigatorScreenParams<MainAppStackParamList>
}

export type AuthStackParamList = {
  AuthTabs: undefined
}

export type AuthenticatedCompositeNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MainAppStackParamList>,
  CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList>,
    BottomTabNavigationProp<MainTabParamList>
  >
>

export type AuthTabParamList = {
  Login: undefined
  Register: undefined
}

export type ReportCardNavigationProp =
  NativeStackNavigationProp<MainAppStackParamList>

export type ReportDetailsScreenRouteProp = RouteProp<
  MainAppStackParamList,
  'ReportDetails'
>
export type CalendarRouteProp = NativeStackNavigationProp<
  MainAppStackParamList,
  'Calendar'
>

export type MainAppStackParamList = {
  Drawer: NavigatorScreenParams<DrawerParamList>
  NewReport: undefined
  ReportDetails: {reportId: string}
  Calendar: undefined
  Notifications: undefined
}

export type DrawerParamList = {
  Tabs: NavigatorScreenParams<MainTabParamList>
  PersonalArea: undefined
  Logout: undefined
}

export type MainTabParamList = {
  Home: undefined
  Reports: undefined
  Stats: undefined
  Notifications: undefined
}
