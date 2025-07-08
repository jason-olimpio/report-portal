import './global.css';

import {NavigationContainer} from '@react-navigation/native';

import 'react-native-gesture-handler';

import './i18n';

import {ThemeProvider} from '@contexts';
import {RootStack} from '@components';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
