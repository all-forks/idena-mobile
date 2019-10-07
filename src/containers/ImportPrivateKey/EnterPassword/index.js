import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, KeyboardAvoidingView, Text } from 'react-native'

import { Input, Button } from '../../../components'

import globalImportStyles from '../styles'

export default function EnterPassword({ navigation }) {
  const [textInputValue, onChangeText] = useState('')

  function handlePress() {
    console.info('Import')
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
              title="Password"
              placeholder="Password"
              blurOnSubmit
              value={textInputValue}
              secureTextEntry
              onChange={text => onChangeText(text)}
            />
          </View>

          <View>
            <Button
              title="Import"
              onPress={handlePress}
              disabled={textInputValue === '' && true}
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
