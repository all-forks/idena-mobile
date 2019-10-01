import React from 'react'
import { Image, View } from 'react-native'
import PropTypes from 'prop-types'

export default function Avatar({
  size,
  online,
  username,
  nodeStatus: { offline, syncing },
  ...otherProps
}) {
  function renderColor() {
    if (offline) return '#ff6666'
    if (syncing !== null && syncing) return '#ffa366'
    if (!offline && !syncing) return '#27d980'
  }

  const src = username
    ? `https://robohash.org/${username}`
    : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='

  return (
    <View>
      <Image
        source={{ uri: src }}
        width={size}
        height={size}
        backgroundColor="gray"
        borderRadius={size / 3}
        style={{ width: size, height: size }}
        {...otherProps}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 5,
          right: -25,
          width: 20,
          height: 20,
          padding: 2,
          borderRadius: 10,
          backgroundColor: 'white',
          borderWidth: 0.5,
          borderColor: 'gray',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      >
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: renderColor(),
            borderRadius: 10,
          }}
        />
      </View>
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
  username: PropTypes.string,
  online: PropTypes.bool,
  nodeStatus: PropTypes.object,
}

Avatar.defaultProps = {
  size: 75,
  online: false,
}
