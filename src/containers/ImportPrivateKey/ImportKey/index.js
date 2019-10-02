import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  KeyboardAvoidingView,
  Text,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'

import { Input, Button } from '../../../components'

import lockIcon from '../../../assets/icons/lock/lock2x.png'
import scannerIcon from '../../../assets/icons/scanner/scanner2x.png'

import globalImportStyles from '../styles'
import styles from './styles'

export default function ImportPrivateKey({ navigation }) {
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={[
          globalImportStyles.container,
          { justifyContent: 'flex-start', marginBottom: 0 },
        ]}
        behavior="position"
        keyboardVerticalOffset={-160}
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
              placeholder="Encoded key"
              onChange={() => {}}
              returnKeyType="done"
              icon={scannerIcon}
              onPressIcon={() => {}}
            />
            <View style={{ marginTop: 16 }}>
              <Button title="Proceed" onPress={() => {}} />
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
