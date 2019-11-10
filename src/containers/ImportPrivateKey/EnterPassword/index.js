import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  KeyboardAvoidingView,
  Keyboard,
  Text,
  NativeModules,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Toast } from '../../../utils'

import { Input, Button } from '../../../components'

import globalImportStyles from '../styles'

export default function EnterPassword({ navigation }) {
  const [textInputValue, onChangeText] = useState('')
  const [isLoading, setLoading] = useState(false)

  async function handlePress() {
    const { IdenaNode } = NativeModules
    setLoading(true)
    try {
      const message = await IdenaNode.provideMobileKey(
        navigation.state.params.encodedPrivateKey,
        textInputValue
      )
      if (message !== 'done') {
        Toast.showToast(
          message.includes('error while decoding key')
            ? 'Invalid private key or password'
            : message
        )
      } else {
        await AsyncStorage.setItem('hasPrivateKey', '1')
        navigation.navigate('App')
      }
    } catch (error) {
      Toast.showToast(error.message)
    } finally {
      Keyboard.dismiss()
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={globalImportStyles.container}
      behavior="padding"
    >
      <>
        <View>
          <View style={{ marginBottom: 9 }}>
            <Text style={globalImportStyles.title}>Password</Text>
          </View>

          <View style={{ marginBottom: 27 }}>
            <Text style={globalImportStyles.description}>
              Enter password to decode private key
            </Text>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Input
              placeholder="Password"
              blurOnSubmit
              style={{ width: '100%' }}
              secureTextEntry
              onChange={text => {
                onChangeText(text)
              }}
            />
          </View>

          <View>
            <Button
              title="Import"
              onPress={handlePress}
              disabled={!textInputValue && true}
              loading={isLoading}
            />
          </View>
        </View>
      </>
    </KeyboardAvoidingView>
  )
}

EnterPassword.propTypes = {
  navigation: PropTypes.any,
}
