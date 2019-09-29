// Default imports
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, StatusBar } from 'react-native'
import {
  FlipStep,
  FlipStepper,
  FlipHint,
  FlipStory,
  FlipShuffle,
  FlipSubmit,
  useFlips,
} from '../../components'

import { FlipType } from '../../components/Flips/utils/use-flips'
import randomHint from '../../utils/components/flip/flip'

import { useIdentityState } from '../../providers'

import styles from './styles'

function Flip({ navigation }) {
  console.disableYellowBox = true
  const [activeStep, setStep] = useState(0)
  const identity = useIdentityState()

  const { flips } = useFlips()

  const publishedFlips = flips.filter(({ type }) => type === FlipType.Published)

  console.info(identity)

  const [localFlip, setFlip] = useState({
    pics: [
      'https://placehold.it/480?text=1',
      'https://placehold.it/480?text=2',
      'https://placehold.it/480?text=3',
      'https://placehold.it/480?text=4',
    ],
    nextOrder: [],
    order: Array.from({ length: 4 }, (_, i) => i),
    hint: randomHint.getNextKeyWordsHint(
      identity.flipKeyWordPairs,
      publishedFlips
    ),
    selectedWordPairs: null,
  })

  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (!identity) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [identity, localFlip, publishedFlips])

  // const canPublish =
  //   identity && localFlip.pics.every(hasDataUrl) && identity.canSubmitFlip

  const { selectedWordPairs } = localFlip

  async function handleSubmitFlip() {}

  const steps = [
    {
      title: 'Think up a story',
      description: 'Think up a short story related to the keywords below',
      children: (
        <FlipHint
          {...localFlip}
          isLoading={isLoading}
          onChange={wordsPair => {
            console.table(wordsPair)
            setFlip({ ...localFlip, selectedWordPairs: wordsPair })
          }}
        />
      ),
    },
    {
      title: 'Select Images',
      description:
        selectedWordPairs && selectedWordPairs.name
          ? selectedWordPairs.name
          : '/',
      children: (
        <FlipStory
          {...localFlip}
          onUpdateFlip={pics => setFlip({ ...localFlip, pics })}
          onNextOrder={nextOrder => setFlip({ ...localFlip, nextOrder })}
        />
      ),
    },
    {
      title: 'Shuffle images',
      description: 'Make a nonsense story',
      children: (
        <FlipShuffle
          {...localFlip}
          onShuffleFlip={nextOrder => setFlip({ ...localFlip, nextOrder })}
        />
      ),
    },
    {
      title: 'Review Flip',
      description: selectedWordPairs
        ? `Make sure the flip matches the keywords ${selectedWordPairs.name}`
        : '/',
      children: <FlipSubmit {...localFlip} />,
    },
  ]

  function handleClose() {
    navigation.pop()
  }

  function onNextControl() {
    if (activeStep === steps.length - 1) return

    if (!localFlip.selectedWordPairs) {
      alert('Choose pair')
      return
    }

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
        {steps.map(({ title, description, children }, index) => (
          <FlipStep
            key={index}
            title={title}
            description={description}
            activeStep={activeStep}
            totalSteps={steps.length}
            onPrev={onPrevControl}
            onNext={onNextControl}
            onClose={handleClose}
            onSubmitFlip={handleSubmitFlip}
            // allowSubmit={canPublish}
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
