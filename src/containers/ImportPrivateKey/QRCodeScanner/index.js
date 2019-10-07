import React from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import PropTypes from 'prop-types'

import { RNCamera } from 'react-native-camera'

export default function QRCodeScanner({ navigation }) {
  function debounce(callback, wait, immediate = false) {
    let timeout = null

    return function() {
      const callNow = immediate && !timeout
      // eslint-disable-next-line prefer-rest-params
      const next = () => callback.apply(this, arguments)

      clearTimeout(timeout)
      timeout = setTimeout(next, wait)

      if (callNow) {
        next()
      }
    }
  }

  function handleScan(event) {
    navigation.goBack()
    navigation.state.params.onNext(event)
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <RNCamera
        style={{ ...StyleSheet.absoluteFillObject }}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={debounce(handleScan, 750, true)}
      >
        <Text>1111</Text>
      </RNCamera>
    </View>
  )
}

QRCodeScanner.propTypes = {
  navigation: PropTypes.any,
}
