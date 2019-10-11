/**
 * @format
 */

import { AppRegistry } from 'react-native'
import React, { useEffect } from 'react'
import Reactotron from 'reactotron-react-native'

import GlobalFont from 'react-native-global-font'

import App from './App'
import { name as appName } from './app.json'

global.Buffer = require('buffer/').Buffer

function WrappedApp() {
  console.disableYellowBox = true
  useEffect(() => {
    GlobalFont.applyGlobal('SFUIText-Regular')
  }, [])
  return <App />
}

// eslint-disable-next-line no-undef
if (__DEV__) {
  Reactotron.configure() // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect() // let's connect!
  console.log('Reactotron Configured')
}
AppRegistry.registerComponent(appName, () => WrappedApp)
