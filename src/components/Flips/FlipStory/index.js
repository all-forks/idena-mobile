import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'

import AsyncStorage from '@react-native-community/async-storage'
import FlipImage from '../FlipImage'
import FlipNotification from '../FlipNotification'
import FlipGoogleSearch from '../FlipGoogleSearch'

export default function FlipStory({ pics, onUpdateFlip, onNextOrder }) {
  const [, setActiveImageIndex] = useState(0)
  const [, setPickedUrl] = useState('')
  const [googleSearchWindow, setToggle] = useState({
    isOpened: false,
    currentIdx: 0,
  })
  const [isNotificationVisible, setNotificationVisible] = useState(false)

  const [images, setImages] = useState(pics)

  useEffect(() => {
    if (isNotificationVisible) {
      const timer = setTimeout(() => {
        setNotificationVisible(false)
      }, 5000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [isNotificationVisible])

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

    setNotificationVisible(true)

    AsyncStorage.setItem('@isFirstTour', {
      selectImage: true,
      shuffleImages: false,
    })

    onUpdateFlip(images)
  }

  function handleDrag(data) {
    const res = []
    pics.forEach((item, i) => {
      if (data[i] !== item) {
        const idx = data.indexOf(item)
        res.push(idx)
      } else {
        res.push(i)
      }
    })
    onNextOrder(res)
    setImages(data)
    onUpdateFlip(data)
  }

  async function checkTour() {
    try {
      const isFirstTourSelectImage = !(await AsyncStorage.getItem(
        '@isFirstTour'
      )).selectedImage
      console.info(isFirstTourSelectImage)
      return isFirstTourSelectImage
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {isNotificationVisible && checkTour() && (
          <FlipNotification title="Drag the image to reorder the sequence. Tap the image to replace it" />
        )}
        <DraggableFlatList
          data={images}
          renderItem={({ item, index, isActive, move, moveEnd }) => (
            <>
              <FlipImage
                src={item}
                index={index}
                onPress={idx => handlePress(idx)}
                isActiveImage={isActive}
                isLast={index === images.length - 1}
                move={move}
                moveEnd={moveEnd}
              />
            </>
            // </View>
          )}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
          onMoveEnd={({ data }) => handleDrag(data)}
        />
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
  pics: PropTypes.arrayOf(PropTypes.string),
  onNextOrder: PropTypes.func,
}
