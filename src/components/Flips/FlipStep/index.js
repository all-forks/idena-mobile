// Default imports
import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button } from 'react-native'

import styles from './styles'

export default function FlipStep({
  key,
  title,
  activeStep,
  onPrev,
  onNext,
  onClose,
  children,
}) {
  return (
    <View style={styles.container}>
      <View key={key} style={styles.header}>
        <Button onPress={activeStep === 0 ? onClose : onPrev} title="Cancel" />
        <Text style={{ color: 'white' }}>{title}</Text>
        <Button onPress={onNext} title="Next" />
      </View>

      <View style={{ flex: 1 }}>{children}</View>
    </View>
  )
}

FlipStep.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  key: PropTypes.number,
  activeStep: PropTypes.number,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onClose: PropTypes.func,
}
