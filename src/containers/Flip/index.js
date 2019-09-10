// Default imports
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, SafeAreaView, StatusBar } from 'react-native'

import { FlipStep, FlipStepper, FlipHint, FlipStory } from '../../components'
import randomHint from '../../utils/components/flip/flip'

import styles from './styles'

function Flip({ navigation }) {
  console.disableYellowBox = true
  const [activeStep, setStep] = useState(0)
  const [localFlip, setFlip] = useState({
    hint: randomHint.getRandomHint(),
  })
  const [isLoading, setLoading] = useState(false)

  const steps = [
    {
      title: 'Choose the hints',
      children: <FlipHint {...localFlip} />,
    },
    {
      title: 'Create story',
      children: <FlipStory />,
    },
    {
      title: 'Shuffle',
      children: <View />,
    },
    {
      title: 'Flip',
      chidlren: <View />,
    },
  ]

  function handleClose() {
    navigation.pop()
  }

  function onNextControl() {
    if (activeStep === steps.length - 1) return
    setStep(activeStep + 1)
  }

  function onPrevControl() {
    if (activeStep === 0) return
    setStep(activeStep - 1)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlipStepper activeStep={activeStep}>
        {steps.map(({ title, children }, index) => (
          <FlipStep
            key={index}
            title={title}
            activeStep={activeStep}
            totalSteps={steps.length}
            onPrev={onPrevControl}
            onNext={onNextControl}
            onClose={handleClose}
            isLoading={isLoading}
          >
            {children}
          </FlipStep>
        ))}
      </FlipStepper>
    </SafeAreaView>
  )
}

File.propTypes = {
  navigation: PropTypes.object,
}

export default Flip
