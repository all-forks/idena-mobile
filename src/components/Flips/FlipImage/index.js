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
}) {
  return (
    <>
      <TouchableOpacity
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
          isActiveImage && { borderColor: 'blue', borderWidth: 1 },
        ]}
      >
        {src ? (
          <Image
            source={{ uri: src }}
            resizeMode="cover"
            style={styles.flipImage}
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
}
