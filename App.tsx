import './global.css';

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import './i18n';

import './gesture-handler';

import {RootNavigator} from '@components';

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
