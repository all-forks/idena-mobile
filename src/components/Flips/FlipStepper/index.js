// Default imports
import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

export default function FlipStepper({ activeStep, children, pair }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>{children[activeStep]}</View>
      {pair && <View style={{ flex: 1 }}>{children[activeStep + 1]}</View>}
    </View>
  )
}

FlipStepper.propTypes = {
  children: PropTypes.node.isRequired,
  activeStep: PropTypes.number,
  pair: PropTypes.bool,
}
