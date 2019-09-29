import React, { useRef, useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'

import Carousel from 'react-native-snap-carousel'

import Button from '../../Button'

import styles from './styles'

export default function FlipHint({ onChange, hint, isLoading }) {
  // eslint-disable-next-line no-unused-vars
  let carouselRef = useRef()
  console.info(hint)

  function handlePressMoreWords() {
    if (carouselRef.currentIndex === hint.length - 1) {
      carouselRef.snapToItem(0)
    } else {
      carouselRef.snapToNext()
    }
  }

  // useEffect(() => {
  //    setHint(hint)
  // },[hint])

  function _renderItem({ item, idx }) {
    return (
      <View key={idx} style={styles.itemContainer}>
        {Array.isArray(item) &&
          item.map(({ name, desc }, i) => (
            <Fragment key={i}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.wordPair,
                  i === 0 ? styles.topRadius : styles.bottomRadius,
                ]}
                onPress={() => {
                  console.info(item[0].name)
                  onChange({
                    name: `${item[0].name}/${item[1].name}`,
                    desc: `${item[0].desc}/${item[1].desc}`,
                  })
                }}
              >
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.description}>{desc}</Text>
              </TouchableOpacity>
            </Fragment>
          ))}
      </View>
    )
  }

  return (
    <>
      <View style={{ paddingHorizontal: 40 }}>
        <Text style={styles.exampleTitle}>
          Before > Something happens > After
        </Text>
      </View>

      <View style={styles.carouselContainer}>
        {!isLoading ? (
          <Carousel
            ref={c => {
              carouselRef = c
            }}
            activeSlideOffset={5}
            callbackOffsetMargin={0}
            layoutCardOffset={0}
            inactiveSlideOpacity={1}
            inactiveSlideScale={0.8}
            data={hint}
            renderItem={_renderItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width - 80}
            sliderHeight={250}
          />
        ) : (
          <Text>...Loading</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Change words"
          onPress={handlePressMoreWords}
          style={styles.button}
        />
      </View>
    </>
  )
}

FlipHint.propTypes = {
  onChange: PropTypes.func,
  hint: PropTypes.array,
  isLoading: PropTypes.bool,
}
