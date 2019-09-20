import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'
import SortableList from 'react-native-sortable-list'
import DraggableFlatList from 'react-native-draggable-flatlist'

import FlipImage from '../FlipImage'
import FlipGoogleSearch from '../FlipGoogleSearch'
import { dataUrl } from '../../../utils'

import styles from './styles'

export default function FlipStory({
  pics,
  choosenWordPairs: { name, desc },
  onUpdateFlip,
  onNextOrder,
}) {
  const [isActiveImageIndex, setActiveImageIndex] = useState(0)
  const [pickedUrl, setPickedUrl] = useState('')
  const [googleSearchWindow, setToggle] = useState({
    isOpened: false,
    currentIdx: 0,
  })

  // useEffect(() => {
  //   if (pickedUrl) {
  //     dataUrl.convertToBase64Url(pickedUrl, base64Url => {
  //       onUpdateFlip([
  //         ...pics.slice(0, isActiveImageIndex),
  //         base64Url,
  //         ...pics.slice(isActiveImageIndex + 1),
  //       ])
  //     })
  //   }
  // }, [pickedUrl, isActiveImageIndex, onUpdateFlip, pics])

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
    onUpdateFlip(images)
    console.info(images)
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <DraggableFlatList
          data={images}
          renderItem={({ item, index, isActive, move, moveEnd }) => (
            <FlipImage
              src={item}
              index={index}
              onPress={idx => handlePress(idx)}
              isActiveImage={isActive}
              isLast={index === images.length - 1}
              move={move}
              moveEnd={moveEnd}
            />
          )}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
          onMoveEnd={({ data }) => {
            const res = []
            pics.forEach((item, i) => {
              if (data[i] !== item) {
                const idx = data.indexOf(item)
                res.push(idx)
              } else {
                res.push(i)
              }
            })
            console.info(data, res)
            onNextOrder(res)
            setImages(data)
            onUpdateFlip(data)
          }}
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
  choosenWordPairs: PropTypes.object,
  pics: PropTypes.arrayOf(PropTypes.string),
  onNextOrder: PropTypes.func,
}
