import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import styles from './styles'

export default function Slider({ items, activePropsIndex }) {
  return (
    <View style={styles.container}>
      {Array.from({ length: items }, i => i).map((_, index) => (
        <View
          style={{
            backgroundColor:
              activePropsIndex === index ? 'white' : 'rgb(216, 216, 216)',
            height: 2,
            width: 25,
            marginHorizontal: 2.5,
          }}
        />
      ))}
    </View>
  )
}

Slider.propTypes = {
  activePropsIndex: PropTypes.number,
  items: PropTypes.number,
}
