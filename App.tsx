import './global.css';

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import './i18n';

import './gesture-handler';

import {RootStack} from '@components';

const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default App;
