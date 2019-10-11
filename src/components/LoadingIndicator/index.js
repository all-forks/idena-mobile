import React from 'react'
import { View, ActivityIndicator as Indicator } from 'react-native'
import PropTypes from 'prop-types'

import { Colors } from '../../utils'
import styles from './styles'

export default function LoadingIndicator({ color, size }) {
  return (
    <View style={styles.container}>
      <Indicator size={size} color={color} />
    </View>
  )
}

LoadingIndicator.defaultProps = {
  color: Colors.accent,
  size: 'large',
}

LoadingIndicator.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOf(['large', 'small']),
}
