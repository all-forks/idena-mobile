import React, { useState, useEffect } from 'react'
import { Animated, Easing, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'
import PropTypes from 'prop-types'

import { ActivityIndicator } from 'react-native-paper'
import styles from './styles'

export default function FlipGoogleSearch({ onSelect, isOpened }) {
  const [heightS, _] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(heightS, {
      toValue: 1,
      duration: 600,
      easing: Easing.linear,
    }).start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpened])

  const height = heightS.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '120%'],
  })

  return (
    <Animated.View style={[styles.form, { height }]}>
      <WebView
        originWhiteList={['*']}
        source={{ uri: 'http://localhost:5555/demo' }}
        onMessage={event => {
          onSelect(event.nativeEvent.data)
        }}
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator
            color="blue"
            size="small"
            style={{ position: 'absolute', top: 0, left: '47%' }}
          />
        )}
        scalesPageToFit
        style={{
          height: '100%',
          width: '100%',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
        overScrollMode="content"
        scrollEnabled={false}
      />
    </Animated.View>
  )
}

FlipGoogleSearch.propTypes = {
  onSelect: PropTypes.func,
  isOpened: PropTypes.bool,
}
