/**
 * @format
 */

import { AppRegistry } from 'react-native'
import Reactotron from 'reactotron-react-native'

import App from './App'
import { name as appName } from './app.json'

global.Buffer = require('buffer/').Buffer

// eslint-disable-next-line no-undef
if (__DEV__) {
  Reactotron.configure() // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect() // let's connect!
  console.log('Reactotron Configured')
}
AppRegistry.registerComponent(appName, () => App)
