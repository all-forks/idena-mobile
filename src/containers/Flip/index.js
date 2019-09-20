// Default imports
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, SafeAreaView } from 'react-native'
import {
  FlipStep,
  FlipStepper,
  FlipHint,
  FlipStory,
  FlipShuffle,
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

  const [localFlip, setFlip] = useState({
    pics: [
      'https://placehold.it/480?text=1',
      'https://placehold.it/480?text=2',
      'https://placehold.it/480?text=3',
      'https://placehold.it/480?text=4',
    ],
    nextOrder: [],
    order: Array.from({ length: 4 }, (_, i) => i),
    hint:
      identity && identity.flipKeyWordPairs
        ? randomHint.getNextKeyWordsHint(
            identity.flipKeyWordPairs,
            publishedFlips
          )
        : randomHint.getRandomHint(),
    choosenWordPairs: null,
  })

  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (!identity) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [identity, localFlip, publishedFlips])

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

  // const canPublish =
  //   identity && localFlip.pics.every(hasDataUrl) && identity.canSubmitFlip

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
          onUpdateFlip={pics => setFlip({ ...localFlip, pics })}
          onNextOrder={nextOrder => setFlip({ ...localFlip, nextOrder })}
        />
      ),
    },
    {
      title: 'Shuffle',
      children: (
        <FlipShuffle
          {...localFlip}
          onShuffleFlip={nextOrder => setFlip({ ...localFlip, nextOrder })}
        />
      ),
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

    if (!localFlip.choosenWordPairs) {
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
