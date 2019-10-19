import React from 'react'
import { View, TextInput, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

export default function Input({
  onChange,
  placeholder,
  icon,
  style,
  onPressIcon,
  ...otherProps
}) {
  function handleChangeText(text) {
    onChange(text)
  }

  return (
    <View style={styles.inputContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TextInput
          onChangeText={handleChangeText}
          placeholder={placeholder}
          style={[styles.input, style]}
          {...otherProps}
        />
        {icon && (
          <TouchableOpacity onPress={onPressIcon}>
            <Image source={icon} style={{ width: 28, height: 28 }} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

Input.propTypes = {
  onChange: PropTypes.func,
  onPressIcon: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.any,
  style: PropTypes.object,
}
