import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'

import { ActivityIndicator } from 'react-native-paper'
import Button from '../../Button'
import DividerLine from '../../DividerLine'
import Slider from '../../Slider'

import styles from './styles'
import FlipStepper from '../FlipStepper'

export default function FlipHint({ onChange, hint, isLoading }) {
  const [activeIndex, setActiveIndex] = useState(0)

  console.info(hint)

  // warn that current pair of renderer words  is last
  const isLast = activeIndex === hint.words.length - 2

  function handlePressMoreWords() {
    if (isLast) return
    setActiveIndex(activeIndex + 2)
  }

  return (
    <View style={{ paddingHorizontal: 24, height: '100%' }}>
      <FlipStepper activeStep={activeIndex} pair>
        {!isLoading ? (
          hint &&
          hint.words &&
          Object.values(hint.words)
            .reduce((acc, curr) => acc.concat(curr), [])
            .map(({ name, desc }, index) => (
              <Fragment key={index}>
                <TouchableOpacity
                  style={styles.wordPair}
                  onPress={() => onChange({ name, desc })}
                >
                  <Text style={styles.title}>{name}</Text>
                  <Text style={styles.description}>{desc}</Text>
                </TouchableOpacity>

                {index % 2 === 0 && <DividerLine />}
              </Fragment>
            ))
        ) : (
          <ActivityIndicator size="small" color="blue" />
        )}
      </FlipStepper>

      <View style={{ marginVertical: 10 }}>
        <Slider
          items={Object.keys(hint.words).length}
          activePropsIndex={activeIndex}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="More words"
          onPress={handlePressMoreWords}
          style={[
            styles.button,
            isLast && {
              backgroundColor: 'transparent',
            },
          ]}
        />
      </View>
    </View>
  )
}

FlipHint.propTypes = {
  onChange: PropTypes.func,
  hint: PropTypes.object,
  isLoading: PropTypes.bool,
}
