import {createDrawerNavigator} from '@react-navigation/drawer';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {Text} from 'react-native';

import Tabs from './Tabs';

import {PersonalAreaScreen} from '@screens';

import {appColors} from '@config';

const Drawer = createDrawerNavigator();

const headerRightStyle = {marginRight: 16};

const HeaderTitle = () => (
  <Text className="text-white font-light text-[20px]">SOS Segnalazioni</Text>
);

const HeaderRight = () => (
  <FontAwesome6
    name="bell"
    color="white"
    size={20}
    iconStyle="solid"
    style={headerRightStyle}
  />
);

const RootNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: appColors.primary,
        },
        headerTitle: HeaderTitle,
        headerTintColor: 'white',
        headerRight: HeaderRight,
      }}>
      <Drawer.Screen
        name="Tabs"
        component={Tabs}
        options={{
          drawerLabel: 'Home',
        }}
      />

      <Drawer.Screen
        name="PersonalArea"
        component={PersonalAreaScreen}
        options={{
          drawerLabel: 'Area personale',
        }}
      />
    </Drawer.Navigator>
  );
};

export default RootNavigator;
