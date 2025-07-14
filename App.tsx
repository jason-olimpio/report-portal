import './global.css';

import {useEffect, useState} from 'react';

import {useTranslation} from 'react-i18next';
import NetInfo from '@react-native-community/netinfo';

import 'react-native-gesture-handler';

import './i18n';

import {ThemeProvider, AuthProvider} from '@contexts';
import {AppNavigator, Snackbar} from '@components';
import {ReportSyncManager} from '@db';

import {isOnline} from '@utils';

const App = () => {
  const {t} = useTranslation();
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      setIsConnected(await isOnline());
      await ReportSyncManager.start();
    };

    initialize();

    const unsubscribe = NetInfo.addEventListener(state =>
      setIsConnected(!!state.isConnected),
    );

    return () => unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <AppNavigator />

        <Snackbar
          visible={!isConnected}
          message={t('general.noInternetConnection')}
        />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
