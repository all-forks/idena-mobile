import React from 'react'
import { Image, View } from 'react-native'
import PropTypes from 'prop-types'

import Colors from '../../utils'

export default function Avatar({
  size,
  address,
  nodeStatus: { offline, syncing },
  ...otherProps
}) {
  function renderColor() {
    if (offline) return '#ff6666'
    if (syncing !== null && syncing) return '#ffa366'
    if (!offline && !syncing) return '#27d980'
  }

  const src = address
    ? `https://robohash.org/${address}`
    : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='

  return (
    <View>
      <Image
        source={{ uri: src }}
        width={size}
        height={size}
        backgroundColor={Colors.white}
        borderRadius={size / 3}
        style={{ width: size, height: size }}
        {...otherProps}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          right: 0,
          backgroundColor: renderColor(),
          width: 10,
          height: 10,
          borderRadius: 5,
        }}
      />
    </View>
  )
}

Avatar.propTypes = {
  size: PropTypes.number,
  address: PropTypes.string,
  online: PropTypes.bool,
  nodeStatus: PropTypes.object,
}

Avatar.defaultProps = {
  size: 75,
  online: false,
}
