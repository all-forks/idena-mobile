import React from 'react'
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

export default function Input({
  onChange,
  placeholder,
  icon,
  title,
  onPressIcon,
  ...otherProps
}) {
  function handleChangeText(text) {
    if (!text) return
    onChange(text)
  }

  return (
    <View style={styles.inputContainer}>
      {title && (
        <View style={{ paddingTop: 5 }}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
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
}
