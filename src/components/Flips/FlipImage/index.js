import React from 'react'
import PropTypes from 'prop-types'
import { Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

// import {} from '..'
import styles from './styles'

export default function FlipImage({
  src,
  isActiveImage,
  onPress,
  index,
  isLast,
  move,
  moveEnd,
}) {
  return (
    <>
      <TouchableOpacity
        onLongPress={move}
        onPressOut={moveEnd}
        activeOpacity={0.8}
        onPress={() => onPress(index)}
        style={[
          styles.flipImageContainer,
          index === 0 && { borderTopLeftRadius: 8, borderTopRightRadius: 8 },
          isLast && {
            marginBottom: 0,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          },
          isActiveImage && { borderColor: 'blue', borderWidth: 5 },
        ]}
      >
        {src ? (
          <Image
            source={{ uri: src }}
            resizeMode="cover"
            style={[
              styles.flipImage,
              index === 0 && {
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              },
              isLast && {
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
              },
            ]}
          />
        ) : (
          <Icon name="camera-alt" size={20} color="#fff" />
        )}
      </TouchableOpacity>
    </>
  )
}

FlipImage.propTypes = {
  src: PropTypes.any,
  isActiveImage: PropTypes.bool,
  onPress: PropTypes.func,
  index: PropTypes.number,
  isLast: PropTypes.bool,
  move: PropTypes.func,
  moveEnd: PropTypes.func,
}
