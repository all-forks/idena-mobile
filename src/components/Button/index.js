import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

export default function Button({
  title,
  onPress,
  disabled,
  style,
  loading,
  ...otherProps
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, style]}
      {...otherProps}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color="white"
          style={styles.buttonIndicator}
        />
      ) : (
        <Text style={[styles.title, disabled && styles.disabledTitle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}
Button.propTypes = {
  disabled: PropTypes.bool,
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  loading: PropTypes.bool,
}

Button.defaultProps = {
  title: 'Button',
}
