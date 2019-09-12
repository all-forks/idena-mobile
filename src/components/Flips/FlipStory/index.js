import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import FlipImage from '../FlipImage'

import styles from './styles'

export default function FlipStory({ choosenWordPairs: { name, desc } }) {
  const [isActiveImage, setActiveImage] = useState(0)
  const [images, setImages] = useState([
    { url: '' },
    { url: '' },
    { url: '' },
    { url: '' },
  ])

  function handlePress(idx) {
    setActiveImage(idx)
    setImages(prevState => {
      prevState[idx].url = '1'
      return [...prevState]
    })
    console.info(images)
  }

  return (
    <View style={styles.flipStoryContainer}>
      <Text style={{ color: 'white', textAlign: 'center' }}>
        {name} / {desc}
      </Text>

      {images.map(({ url }, i) => (
        <View key={i}>
          <FlipImage
            index={i}
            src={url}
            isActiveImage={isActiveImage === i}
            isLast={i === images.length - 1}
            onPress={idx => handlePress(idx)}
          />
        </View>
      ))}
    </View>
  )
}

FlipStory.propTypes = {
  choosenWordPairs: PropTypes.object,
}
