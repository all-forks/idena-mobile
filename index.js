/**
 * @format
 */

import { AppRegistry, SafeAreaView } from 'react-native'
import React from 'react'
import Reactotron from 'reactotron-react-native'

import App from './App'
import { name as appName } from './app.json'

global.Buffer = require('buffer/').Buffer

function WrappedApp() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <App />
    </SafeAreaView>
  )
}

// eslint-disable-next-line no-undef
if (__DEV__) {
  Reactotron.configure() // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect() // let's connect!
  console.log('Reactotron Configured')
}
AppRegistry.registerComponent(appName, () => WrappedApp)
