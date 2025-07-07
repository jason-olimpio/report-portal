import './global.css';

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
