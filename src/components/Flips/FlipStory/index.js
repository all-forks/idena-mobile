import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'

import FlipImage from '../FlipImage'
import FlipGoogleSearch from '../FlipGoogleSearch'

import styles from './styles'
import Button from '../../Button'

export default function FlipStory({
  pics,
  choosenWordPairs: { name, desc },
  onSubmit,
}) {
  const [isActiveImageIndex, setActiveImageIndex] = useState(0)
  const [googleSearchWindow, setToggle] = useState({
    isOpened: false,
    currentIdx: 0,
  })

  // useEffect(() => {
  //   // const result = await fetch(
  //   //   'https://www.googleapis.com/customsearch/v1?key=AIzaSyAC5JbFvQ14H4ExaOtpFYJ_pfnd26eiuz0&cx=017576662512468239146:omuauf_lfve&q=car'
  //   // )
  //   // const client = new GoogleImages(
  //   //   '017512647261346726039:jct9zpubrlh',
  //   //   'AIzaSyAC5JbFvQ14H4ExaOtpFYJ_pfnd26eiuz0'
  //   // )
  //   // client.search('lectures').then(resp => {
  //   //   console.info('Response', resp)
  //   // })
  //   async function fetchImages() {
  //     const resp = await fetch(
  //       'https://www.googleapis.com/customsearch/v1?key=AIzaSyAC5JbFvQ14H4ExaOtpFYJ_pfnd26eiuz0&cx=017512647261346726039:jct9zpubrlh&q=car'
  //     )
  //     const response = await resp.json()

  //     console.info(response.items[1].pagemap.cse_image[0].src)
  //   }

  //   fetchImages()
  // }, [])
  const [images, setImages] = useState(pics)

  const { isOpened, currentIdx } = googleSearchWindow

  async function handlePress(idx) {
    setActiveImageIndex(idx)

    setToggle({ isOpened: true, currentIdx: idx })

    const resp = await fetch(
      'https://www.googleapis.com/customsearch/v1?key=AIzaSyAC5JbFvQ14H4ExaOtpFYJ_pfnd26eiuz0&cx=017512647261346726039:jct9zpubrlh&q=car'
    )
    const response = await resp.json()

    console.info(response.items[1].pagemap.cse_image[0].src)

    setImages(prevState => {
      prevState[currentIdx] = response.items[1].pagemap.cse_image[0].src
      return prevState
    })

    console.info(images)
    onSubmit(images)
  }

  function handleEndSelection(selectedImageUrl) {
    setImages(prevState => {
      prevState[currentIdx] = selectedImageUrl
      return prevState
    })
  }

  return (
    <View style >
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
      <FlipGoogleSearch
        onSelect={selectedImageUrl => handleEndSelection(selectedImageUrl)}
      />
      {/* {isOpened && (
        <>
          <Button title="Select" onPress />
        </>
      )} */}
    </View>
  )
}

FlipStory.propTypes = {
  onSubmit: PropTypes.func,
  choosenWordPairs: PropTypes.object,
  pics: PropTypes.arrayOf(PropTypes.string),
}
