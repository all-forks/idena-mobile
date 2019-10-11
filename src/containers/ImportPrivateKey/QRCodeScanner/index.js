import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native'
import PropTypes from 'prop-types'

import { RNCamera } from 'react-native-camera'

import { debounce } from '../../../utils'

import qrcodeScannerBorder from '../../../assets/icons/qrcodeScanner/qrcode_image_border2x.png'
import backButton from '../../../assets/icons/back/back-button2x.png'

import styles from './styles'

export default function QRCodeScanner({ navigation }) {
  function handleScan(event) {
    navigation.goBack()
    navigation.state.params.onNext(event)
  }

  function handlePressBack() {
    navigation.goBack()
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <RNCamera
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={debounce(handleScan, 750, true)}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: 24,
            left: 16,
          }}
          onPress={handlePressBack}
        >
          <Image
            source={backButton}
            resizeMode="contain"
            style={{
              alignSelf: 'flex-start',
              width: 24,
              height: 24,
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 60,
          }}
        >
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Find a code to scan</Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image source={qrcodeScannerBorder} resizeMode="contain" />
        </View>
      </RNCamera>
    </View>
  )
}

QRCodeScanner.propTypes = {
  navigation: PropTypes.any,
}
