import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-community/async-storage'
import { Colors, IdentityStatus } from '../../../../utils'

import newIcon from '../../../../assets/icons/new/new2x.png'

import styles from '../../styles'

export default function FlipActions({
  state,
  width,
  createNewFlip,
  handleNavigateToDrafts,
}) {
  const [countDrafts, setCountDrafts] = useState(0)

  useEffect(() => {
    async function fetchDrafts() {
      const response = await AsyncStorage.getItem('@drafts')
      if (!response) return
      setCountDrafts(response.length || response)
    }

    fetchDrafts()
  }, [])

  return [IdentityStatus.Verified, IdentityStatus.Newbie].includes(state) ? (
    <View style={styles.flipsContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.flipItem, { width, padding: 10 }]}
        onPress={createNewFlip}
      >
        <View>
          <Image
            source={newIcon}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
          <Text style={styles.flipTitle}>New flip</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleNavigateToDrafts}
        style={[
          styles.flipItem,
          { width, flex: 0.67, backgroundColor: Colors.grey },
        ]}
      >
        <View style={{ backgroundColor: Colors.gray }}>
          <View style={{ padding: 10 }}>
            <Text style={styles.flipTitle}>Drafts</Text>
            <Text style={styles.flipText}>
              {countDrafts} flip{countDrafts > 1 ? 's' : ''}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  ) : null
}

FlipActions.propTypes = {
  state: PropTypes.string,
  width: PropTypes.number,
  createNewFlip: PropTypes.func,
  handleNavigateToDrafts: PropTypes.func,
}
