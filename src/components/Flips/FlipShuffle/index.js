import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { View, Image, Dimensions } from 'react-native'

import Carousel from 'react-native-snap-carousel'
import { algorithms } from '../utils'

import Button from '../../Button'

// eslint-disable-next-line react/prop-types
export default function FlipShuffle({ order, nextOrder, pics, onShuffleFlip }) {
  const [shiffledPics, setShuffledPics] = useState(pics)

  // eslint-disable-next-line no-unused-vars
  let carouselRef = useRef()

  function handleShuffle() {
    const nextUserOrder = [...algorithms.shuffle(order)]
    console.info(nextUserOrder)
    const shuffledImages = shiffledPics.map(
      (_, i) => shiffledPics[nextUserOrder[i]]
    )
    setShuffledPics(shuffledImages)
    onShuffleFlip(nextUserOrder)
  }

  // eslint-disable-next-line react/prop-types
  function _renderItem({ item, idx }) {
    return Array.isArray ? (
      <View key={idx}>
        {item.map((carouselItem, i) => (
          <View key={i}>
            <Image
              source={{ uri: carouselItem }}
              style={{ width: 200, height: 125 }}
              resizeMode="cover"
            />
          </View>
        ))}
      </View>
    ) : null
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 25,
        }}
      >
        <Carousel
          ref={c => {
            carouselRef = c
          }}
          layoutCardOffset={40}
          inactiveSlideOpacity={1}
          inactiveSlideScale={0.8}
          data={[pics, shiffledPics]}
          renderItem={_renderItem}
          sliderWidth={Dimensions.get('window').width - 30}
          itemWidth={125}
        />
      </View>

      <View style={{ marginTop: 25 }}>
        <Button title="Shuffle" onPress={handleShuffle} />
      </View>
    </View>
  )
}

PropTypes.propTypes = {
  onShuffleFlip: PropTypes.func,
  order: PropTypes.arrayOf(PropTypes.number),
  nextOrder: PropTypes.arrayOf(PropTypes.number),
}
