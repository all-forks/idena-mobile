import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text } from 'react-native'

export default function FlipSubmit({ nextOrder, pics }) {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginHorizontal: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          {pics.map((url, i) => (
            <View key={i}>
              <Image
                source={{ uri: url }}
                style={[
                  { width: 144, height: 125 },
                  i === 0 && { borderTopLeftRadius: 8, borderTopRightRadius: 8 },
                  i === pics.length - 1 && { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }
                ]}
              />
            </View>
          ))}
        </View>

        <View>
          {pics
            // eslint-disable-next-line react/prop-types
            .map((_, i) => pics[nextOrder[i]])
            .map((url, idx) => (
              <View key={idx}>
                <Image
                  source={{ uri: url }}
                  style={[
                    { width: 144, height: 125 },
                    idx === 0 && { borderTopLeftRadius: 8, borderTopRightRadius: 8 },
                    idx === pics.length - 1 && { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }
                  ]}
                />
              </View>
            ))}
        </View>
      </View>
    </View>
  )
}

FlipSubmit.propTypes = {
  pics: PropTypes.arrayOf(PropTypes.string),
  //   order: PropTypes.arrayOf(PropTypes.number),
  nextOrder: PropTypes.arrayOf(PropTypes.number),
  onSubmitFlip: PropTypes.func.isRequired,
}
