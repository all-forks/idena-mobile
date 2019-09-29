import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

export default function FlipNotification({ title, style, titleStyle }) {
  return (
    <View style={[styles.notification, style]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </View>
  )
}

FlipNotification.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
}
