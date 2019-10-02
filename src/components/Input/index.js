import React from 'react'
import { View, TextInput, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

export default function Input({
  onChange,
  placeholder,
  icon,
  onPressIcon,
  ...otherProps
}) {
  function handleChangeText(text) {
    if (text !== undefined) onChange(text)
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={handleChangeText}
        placeholder={placeholder}
        {...otherProps}
      />
      {icon && (
        <TouchableOpacity onPress={onPressIcon}>
          <Image source={icon} style={{ width: 28, height: 28 }} />
        </TouchableOpacity>
      )}
    </View>
  )
}

Input.propTypes = {
  onChange: PropTypes.func,
  onPressIcon: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.any,
}
