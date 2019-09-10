import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import Button from '../../Button'
import DividerLine from '../../DividerLine'
import Slider from '../../Slider'

import styles from './styles'
import FlipStepper from '../FlipStepper'

export default function FlipHint({ onPress, hint }) {
  const [activeIndex, setActiveIndex] = useState(0)

  // warn that current pair of renderer words  is last
  const isLast = activeIndex === hint.length - 2

  function handlePressMoreWords() {
    if (isLast) return
    setActiveIndex(activeIndex + 2)
  }

  return (
    <View style={{ paddingHorizontal: 24, height: '100%' }}>
      <FlipStepper activeStep={activeIndex} pair>
        {hint.map(({ name, desc }, index) => (
          <Fragment key={index}>
            <View
              style={{
                height: '37%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.description}>{desc}</Text>
            </View>

            {index % 2 === 0 && <DividerLine />}
          </Fragment>
        ))}
      </FlipStepper>

      <View style={{ marginVertical: 10 }}>
        <Slider items={hint.length / 2} activePropsIndex={activeIndex} />
      </View>

      <View style={{ paddingHorizontal: 24, paddingBottom: 15 }}>
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
  onPress: PropTypes.func,
  hint: PropTypes.array,
}
