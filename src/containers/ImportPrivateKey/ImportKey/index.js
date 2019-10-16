import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  KeyboardAvoidingView,
  Text,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native'
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions'

import { Input, Button } from '../../../components'

import lockIcon from '../../../assets/icons/lock/lock2x.png'
import scannerIcon from '../../../assets/icons/scanner/scanner2x.png'

import globalImportStyles from '../styles'
import styles from './styles'

export default function ImportPrivateKey({ navigation }) {
  console.disableYellowBox = true
  const [value, setValue] = useState('')
  const textInputRef = useRef(null)

  const steps = [
    {
      step: 1,
      description: 'Open Settings in your Idena desktop app',
    },
    {
      step: 2,
      description: 'Setup one time password for private key export',
    },
    {
      step: 3,
      description: 'Scan QR code or input encoded private key',
    },
  ]

  async function handlePressScannerIcon() {
    try {
      await request(PERMISSIONS.IOS.CAMERA)
      const result = await check(PERMISSIONS.IOS.CAMERA)
      switch (result) {
        case RESULTS.UNAVAILABLE:
        case RESULTS.BLOCKED:
        case RESULTS.DENIED:
          try {
            await openSettings()
          } catch (error) {
            console.warn('Something went wrong')
          }
          break
        case RESULTS.GRANTED:
          navigation.navigate('QRCodeScanner', {
            onNext: event => {
              setValue(event.data || event.rawData)

              const timer = setTimeout(() => {
                navigation.navigate('EnterPassword', {
                  encodedPrivateKey: event.data || event.rawData,
                })
                clearTimeout(timer)
              }, 1000)
            },
          })
          return
        default: {
          return
        }
      }
    } catch (error) {
      console.info(error)
    }
  }

  function handleNavigateToPassword() {
    navigation.navigate('EnterPassword', {
      encodedPrivateKey: value,
    })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={[
          globalImportStyles.container,
          { justifyContent: 'flex-start', marginBottom: 0 },
        ]}
        behavior="position"
        keyboardVerticalOffset={
          // eslint-disable-next-line no-nested-ternary
          Platform.OS === 'ios'
            ? Dimensions.get('window').width > 375
              ? -200
              : -135
            : 0
        }
      >
        <View style={{ marginTop: 36 }}>
          <View
            style={{ marginTop: 10, marginBottom: 15, alignItems: 'center' }}
          >
            <Image source={lockIcon} style={{ width: 60, height: 60 }} />
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={[globalImportStyles.title, { fontSize: 17 }]}>
              Import private key
            </Text>
          </View>

          {steps.map(({ step, description }) => (
            <View style={styles.stepContainer}>
              <View style={styles.step}>
                <Text style={styles.stepText}>{step}</Text>
              </View>

              <View style={{ marginBottom: 14, maxWidth: 239 }}>
                <Text style={styles.description}>{description}</Text>
              </View>
            </View>
          ))}

          <View>
            <Input
              ref={textInputRef}
              placeholder="Encoded key"
              blurOnSubmit
              returnKeyType="done"
              onChange={text => setValue(text)}
              icon={scannerIcon}
              value={value}
              style={{ width: '90%' }}
              onPressIcon={handlePressScannerIcon}
            />
            <View style={{ marginTop: 16 }}>
              <Button
                title="Proceed"
                onPress={handleNavigateToPassword}
                disabled={!value}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

PropTypes.propTypes = {
  navigation: PropTypes.any,
}
