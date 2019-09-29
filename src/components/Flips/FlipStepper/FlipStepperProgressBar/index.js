import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'

export default function FlipStepperProgressBar({ totalSteps, activeStep }) {
  return (
    <View>
      <Text style={{ color: '#fff', paddingBottom: 11 }}>
        Step {activeStep} of {totalSteps}
      </Text>

      <View
        style={{
          width: 104,
          height: 3,
          backgroundColor: 'gray',
          marginBottom: 6,
        }}
      >
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            width: `${(100 / totalSteps) * activeStep}%`,
            backgroundColor: 'rgb(87,143,255)',
            height: 3,
          }}
        />
      </View>
    </View>
  )
}

FlipStepperProgressBar.propTypes = {
  totalSteps: PropTypes.number,
  activeStep: PropTypes.number,
}
