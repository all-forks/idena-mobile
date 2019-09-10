// Default imports
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button, ActivityIndicator } from 'react-native'

import styles from './styles'

export default function FlipStep({
  key,
  title,
  activeStep,
  onPrev,
  onNext,
  onClose,
  children,
  isLoading,
}) {
  return (
    <View style={styles.container}>
      <View key={key} style={styles.header}>
        <Button onPress={activeStep === 0 ? onClose : onPrev} title="Cancel" />
        <Text style={{ color: 'white' }}>{title}</Text>
        <Button onPress={onNext} title="Next" />
      </View>

      {isLoading ? (
        <View style={{ marginVertical: 25 }}>
          <ActivityIndicator size="small" color="blue" />
        </View>
      ) : (
        <View>{children}</View>
      )}
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
  isLoading: PropTypes.bool,
}
