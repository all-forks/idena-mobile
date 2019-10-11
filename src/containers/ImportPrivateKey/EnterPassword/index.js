import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, KeyboardAvoidingView, Text, NativeModules } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Toast } from '../../../utils'

import { Input, Button } from '../../../components'

import globalImportStyles from '../styles'
import callRpc from '../../../api/api'

export default function EnterPassword({ navigation }) {
  const [textInputValue, onChangeText] = useState('')
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    // fetchRequest()
  }, [])

  async function fetchRequest() {
    try {
      const result = await callRpc('dna_activateInvite', {
        key: '3213212',
        address: '0xcf0cf37a6e4a8e76e26db95f9eb5f3c73d122257',
      })
      console.info(result)
    } catch (error) {
      console.info(error)
    }
  }

  async function handlePress() {
    const { IdenaNode } = NativeModules
    setLoading(true)

    try {
      const message = await IdenaNode.provideMobileKey(
        navigation.state.params.encodedPrivateKey,
        textInputValue
      )
      console.info(message)
      if (message !== 'done') {
        Toast.showToast(message)
        setLoading(false)
        return
      }
    } catch (error) {
      Toast.showToast(error.message)
      setLoading(false)
      return
    }

    try {
      const message = await IdenaNode.start()

      if (message !== 'started') {
        Toast.showToast(message)
        setLoading(false)
        return
      }

      console.info(message)

      // setLoading(false)

      navigation.navigate('App')

      try {
        await AsyncStorage.setItem(
          '@private_key',
          navigation.state.params.encodedPrivateKey
        )
      } catch (error) {
        console.info(error)
      }
    } catch (error) {
      Toast.showToast(error.message)
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
