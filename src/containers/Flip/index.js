// Default imports
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, SafeAreaView, StatusBar } from 'react-native'
import { FlipStep, FlipStepper, FlipHint, FlipStory } from '../../components'
import randomHint from '../../utils/components/flip/flip'

import { useIdentityState } from '../../providers'

import styles from './styles'

function Flip({ navigation }) {
  console.disableYellowBox = true
  const [activeStep, setStep] = useState(0)
  const identity = useIdentityState()

  const [localFlip, setFlip] = useState({
    pics: ['', '', '', ''],
    order: Array.from({ length: 4 }, (_, i) => i),
    hint: randomHint.getRandomHint(),
    choosenWordPairs: {},
  })
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (!identity) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [identity, localFlip])

  /**
  const handleCheckDrafted = () => {
    if (flips && flips.length > 0) {
      const {
        choosenWordPairs: { name, desc },
      } = localFlip

      const draftedItem = flips.find(
        item => item.name === name && item.desc === desc
      )

      if (draftedItem)
        Alert.alert('Drafted data', '', [
          {
            text: 'Delete',
            onPress: () => {
              deleteFlip(draftedItem.id)
              setStep(activeStep + 1)
            },
          },
          {
            text: 'OK',
            onPress: () => {
              setFlip(draftedItem)
            },
          },
        ])
    }
  }
*/

  const steps = [
    {
      title: 'Choose the hints',
      children: (
        <FlipHint
          {...localFlip}
          isLoading={isLoading}
          onChange={wordsPair =>
            setFlip({ ...localFlip, choosenWordPairs: wordsPair })
          }
        />
      ),
    },
    {
      title: 'Create story',
      children: (
        <FlipStory
          {...localFlip}
          onSubmit={pics => setFlip({ ...localFlip, pics })}
        />
      ),
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
      <StatusBar barStyle="dark-content" backgroundColor="black" />
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
          >
            {children}
          </FlipStep>
        ))}
      </FlipStepper>
    </SafeAreaView>
  )
}

File.propTypes = {
  navigation: PropTypes.any,
}

export default Flip
