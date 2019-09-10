import React from 'react'
import { View, TextInput } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

export default function Input({ onChange, ...otherProps }) {
  function handleChangeText(text) {
    if (text !== undefined) onChange(text)
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={handleChangeText}
        placeholder="Enter invite code"
        {...otherProps}
      />
    </View>
  )
}

Input.propTypes = {
  onChange: PropTypes.func,
}
