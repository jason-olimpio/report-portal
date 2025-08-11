/**
 * AppSos - Main Application Entry Point
 *
 * @author Jason Olimpio
 * @date August 11, 2025
 *
 * @description Root component of the application.
 */

import './global.css'

import {useEffect, useState} from 'react'

import {useTranslation} from 'react-i18next'
import NetInfo from '@react-native-community/netinfo'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

import './i18n'

import {AppNavigator, Snackbar} from '@components'

import AppProviders from './AppProviders'

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
      <AppProviders>
        <AppNavigator />

        <Snackbar
          visible={!isConnected}
          message={t('general.noInternetConnection')}
        />
      </AppProviders>
    </GestureHandlerRootView>
  )
}

export default App
