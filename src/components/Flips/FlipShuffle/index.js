import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { View, Image, Dimensions, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import Carousel from 'react-native-snap-carousel'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { algorithms } from '../utils'
import FlipNotification from '../FlipNotification'

// eslint-disable-next-line react/prop-types
export default function FlipShuffle({ order, nextOrder, pics, onShuffleFlip }) {
  const [shiffledPics, setShuffledPics] = useState(pics)
  const [isNotificationVisible, setNotificationVisible] = useState(false)

  // eslint-disable-next-line no-unused-vars
  let carouselRef = useRef()

  useEffect(() => {
    if (checkTour()) {
      setNotificationVisible(true)

      const timer = setTimeout(() => {
        setNotificationVisible(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [])

  async function checkTour() {
    try {
      const isFirstTourShuffleImage = !(await AsyncStorage.getItem(
        '@isFirstTour'
      ).shuffleImage)

      return isFirstTourShuffleImage
      // return isFirstTourShuffleImage
    } catch (error) {
      console.error(error)
    }
  }

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
  function _renderItem({ item, index }) {
    console.info(index)
    return Array.isArray ? (
      <View key={index} style={{ opacity: index === 0 ? 0.8 : 1 }}>
        <View>
          {index === 1 && (
            <View
              style={{
                position: 'absolute',
                left: -75,
              }}
            >
              <TouchableOpacity onPress={handleShuffle}>
                <Icon name="shuffle" size={25} color="#fff" />
              </TouchableOpacity>
            </View>
          )}

          {item.map((carouselItem, i) => (
            <View key={i}>
              <Image
                source={{ uri: carouselItem }}
                style={[
                  {
                    width: 171,
                    height: 125,
                  },
                  i === 0 && {
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  },
                  i === item.length - 1 && {
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                  },
                ]}
                resizeMode="cover"
              />
            </View>
          ))}
        </View>
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
          paddingHorizontal: 20,
        }}
      >
        {isNotificationVisible && (
          <FlipNotification
            title="Use the Shuffle button or drag&drop images to reorder the sequence to make a nonsense story"
            titleStyle={{ fontSize: 14 }}
            style={{ top: 50, width: '100%' }}
          />
        )}

        <Carousel
          ref={c => {
            carouselRef = c
          }}
          layoutCardOffset={0}
          inactiveSlideOpacity={0.3}
          inactiveSlideScale={0.8}
          activeSlideOffset={0}
          inactiveSlideShift={0}
          data={[pics, shiffledPics]}
          renderItem={_renderItem}
          sliderWidth={Dimensions.get('window').width - 30}
          itemWidth={90}
        />
      </View>
    </View>
  )
}

FlipShuffle.propTypes = {
  onShuffleFlip: PropTypes.func,
  order: PropTypes.arrayOf(PropTypes.number),
  nextOrder: PropTypes.arrayOf(PropTypes.number),
}
