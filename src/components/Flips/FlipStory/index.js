import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'

import FlipImage from '../FlipImage'
import FlipGoogleSearch from '../FlipGoogleSearch'
import { dataUrl } from '../../../utils'

import styles from './styles'

export default function FlipStory({
  pics,
  choosenWordPairs: { name, desc },
  onUpdateFlip,
}) {
  const [isActiveImageIndex, setActiveImageIndex] = useState(0)
  const [pickedUrl, setPickedUrl] = useState('')
  const [googleSearchWindow, setToggle] = useState({
    isOpened: false,
    currentIdx: 0,
  })

  useEffect(() => {
    if (pickedUrl) {
      dataUrl.convertToBase64Url(pickedUrl, base64Url => {
        onUpdateFlip([
          ...pics.slice(0, isActiveImageIndex),
          base64Url,
          ...pics.slice(isActiveImageIndex + 1),
        ])
      })
    }
  }, [pickedUrl, isActiveImageIndex, onUpdateFlip, pics])

  const [images, setImages] = useState(pics)

  const { isOpened, currentIdx } = googleSearchWindow

  async function handlePress(idx) {
    setActiveImageIndex(idx)

    setToggle({ isOpened: true, currentIdx: idx })

    onUpdateFlip(images)
  }

  function handleEndSelection(selectedImageUrl) {
    // eslint-disable-next-line no-shadow
    setToggle(({ currentIdx }) => ({
      isOpened: false,
      currentIdx,
    }))
    setPickedUrl(selectedImageUrl)
    setImages(prevState => {
      prevState[currentIdx] = selectedImageUrl
      return prevState
    })
    console.info(images)
  }

  return (
    <View>
      <View style={styles.flipStoryContainer}>
        <Text style={{ color: 'white', textAlign: 'center' }}>
          {name} / {desc}
        </Text>

        {images.map((url, i) => (
          <FlipImage
            src={url}
            index={i}
            onPress={idx => handlePress(idx)}
            isActiveImage={isActiveImageIndex === i}
            isLast={i === images.length - 1}
          />
        ))}
      </View>
      {isOpened && (
        <FlipGoogleSearch
          isOpened={isOpened}
          onSelect={selectedImageUrl => handleEndSelection(selectedImageUrl)}
        />
      )}
    </View>
  )
}

FlipStory.propTypes = {
  onUpdateFlip: PropTypes.func,
  choosenWordPairs: PropTypes.object,
  pics: PropTypes.arrayOf(PropTypes.string),
}
