import React, { useEffect, useState } from 'react'
import { View, Text, Switch } from 'react-native'
import PropTypes from 'prop-types'
import { callRpc } from '../../../../../api'
import { Toast, Colors } from '../../../../utils'

import styles from './styles'
import { useIdentityState } from '../../../../providers/identity-context'

export default function MiningStatus({ status }) {
  const [miningStatus, toggleMiningStatus] = useState(status)
  const { canMine } = useIdentityState()

  useEffect(() => {
    toggleMiningStatus(status)
  }, [status])

  async function onChangeSwitchStatus(value) {
    // it's exactly toggle in off status
    if (value !== miningStatus) {
      // TODO: send request
      try {
        const { error } = await callRpc('dna_becomeOffline')
        if (error) {
          Toast.showToast(error.message)
          return
        }

        toggleMiningStatus(value)
      } catch (error) {
        Toast.showToast(error.message)
      }
    }
  }

  return canMine && status ? (
    <View style={styles.container}>
      <>
        <Text style={styles.miningStatusText}>Mining status:</Text>
      </>

      <>
        <Text style={styles.miningSwitcherText}>
          {miningStatus ? 'On' : 'Off'}
        </Text>
        <Switch
          value={miningStatus}
          disabled={!miningStatus}
          tintColor={Colors.accent}
          ios_backgroundColor={Colors.accent}
          onValueChange={onChangeSwitchStatus}
        />
      </>
    </View>
  ) : null
}

MiningStatus.propTypes = {
  status: PropTypes.bool,
  // identity: PropTypes.object,
}
