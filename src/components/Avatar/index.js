import React from 'react'
import { Image } from 'react-native'
import PropTypes from 'prop-types'

import profileAvatar from '../../assets/images/profile_flip_avatar.jpeg'

export default function Avatar({ size, source, ...otherProps }) {
  return (
    <Image
      source={source}
      width={size}
      height={size}
      backgroundColor="green"
      borderRadius={size / 3}
      style={{ width: size, height: size }}
      {...otherProps}
    />
  )
}

Avatar.propTypes = {
  size: PropTypes.number,
  source: PropTypes.any,
}

Avatar.defaultProps = {
  size: 75,
  source: profileAvatar,
}
