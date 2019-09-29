import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'

import styles from './styles'

export default function FlipStepperControls({
  onNextStep,
  onPrevStep,
  activeStep,
  totalSteps,
}) {
  return (
    <View style={styles.controls}>
      <TouchableOpacity
        onPress={onPrevStep}
        style={[
          styles.controlButton,
          { marginRight: 12 },
          activeStep === 1 && { backgroundColor: 'transparent' },
        ]}
      >
        <Icon name="left" size={14} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onNextStep}
        style={[
          styles.controlButton,
          activeStep === totalSteps && { backgroundColor: 'transparent' },
        ]}
      >
        <Icon name="right" size={14} color="white" />
      </TouchableOpacity>
    </View>
  )
}

FlipStepperControls.propTypes = {
  onNextStep: PropTypes.func.isRequired,
  onPrevStep: PropTypes.func.isRequired,
  activeStep: PropTypes.number,
  totalSteps: PropTypes.number,
}
