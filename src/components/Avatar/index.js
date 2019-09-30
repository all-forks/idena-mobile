import React from 'react'
import { Image, View } from 'react-native'
import PropTypes from 'prop-types'

import profileAvatar from '../../assets/images/profile_flip_avatar.jpeg'

export default function Avatar({ size, source, online, ...otherProps }) {
  return (
    <View>
      <Image
        source={source}
        width={size}
        height={size}
        backgroundColor="green"
        borderRadius={size / 3}
        style={{ width: size, height: size }}
        {...otherProps}
      />
      {online && (
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            right: 0,
            backgroundColor: 'rgb(39,217,128)',
            width: 10,
            height: 10,
            borderRadius: 5,
          }}
        />
      )}
    </View>
  )
}

Avatar.propTypes = {
  size: PropTypes.number,
  source: PropTypes.any,
  online: PropTypes.bool,
}

Avatar.defaultProps = {
  size: 75,
  source: profileAvatar,
  online: false,
}
