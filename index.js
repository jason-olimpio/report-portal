/**
 * index.js
 *
 * @author Jason Olimpio
 * @date 11 August 2025
 *
 * @description Entry point for the application. Registers the main
 * App component with the AppRegistry.
 */

import {AppRegistry} from 'react-native'

import App from './App'

import {name as appName} from './app.json'

AppRegistry.registerComponent(appName, () => App)
