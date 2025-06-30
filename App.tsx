import './global.css';

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import './i18n';

import './gesture-handler';

import {AppStack} from '@components';

const App = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;
