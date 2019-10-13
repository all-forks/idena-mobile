import React from 'react'
import { Image, View } from 'react-native'
import PropTypes from 'prop-types'

import { Colors } from '../../utils'

export default function Avatar({
  size,
  address,
  nodeStatus: { offline, syncing },
  ...otherProps
}) {
  function renderColor() {
    if (offline) return Colors.danger
    if (syncing !== null && syncing) return Colors.orange
    if (!offline && !syncing) return Colors.green
  }

  const src = address ? `https://robohash.org/${address}` : ''

  return (
    <View
      style={{
        borderRadius: size / 3,
        borderWidth: 0.5,
        borderColor: Colors.lightGrey,
        padding: 5,
      }}
    >
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
