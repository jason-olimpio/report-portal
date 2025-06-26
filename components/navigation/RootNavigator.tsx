import {createDrawerNavigator} from '@react-navigation/drawer';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import Tabs from './Tabs';

import {PersonalAreaScreen} from '@screens';

import {appColors} from '@config';

const Drawer = createDrawerNavigator();

const headerRightStyle = {marginRight: 16};

const HeaderTitle = () => {
  const {t} = useTranslation();

  return (
    <Text className="text-white font-titillium-light text-[20px]">{t('appName')}</Text>
  );
};

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
  const {t} = useTranslation();

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
        swipeEnabled: true,
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
          drawerLabel: t('personalArea'),
        }}
      />
    </Drawer.Navigator>
  );
};

export default RootNavigator;
