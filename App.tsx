import './global.css'

import {useEffect, useState} from 'react'

import {useTranslation} from 'react-i18next'
import NetInfo from '@react-native-community/netinfo'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

import './i18n'

import {AppNavigator, Snackbar} from '@components'

import {ThemeProvider, AuthProvider, ReportProvider} from '@contexts'

import {startNetworkMonitor} from '@storage'

import {isOnline} from '@utils'

const App = () => {
  const {t} = useTranslation()
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    const initialize = async () => {
      setIsConnected(await isOnline())
      await startNetworkMonitor()
    }

    initialize()

    const unsubscribe = NetInfo.addEventListener(state =>
      setIsConnected(!!state.isConnected),
    )

    return () => unsubscribe()
  }, [])

  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <ThemeProvider>
          <ReportProvider>
            <AppNavigator />

            <Snackbar
              visible={!isConnected}
              message={t('general.noInternetConnection')}
            />
          </ReportProvider>
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  )
}

export default App
