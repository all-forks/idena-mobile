import React, { useEffect, useState } from 'react'
import { View, Text, Switch } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

export default function MiningStatus({ status }) {
  const [miningStatus, toggleMiningStatus] = useState(status)

  useEffect(() => {
    toggleMiningStatus(status)
  }, [status])

  function onChangeSwitchStatus(value) {
    // it's exactly toggle in off status
    if (value !== miningStatus) {
      // TODO: send request
      toggleMiningStatus(value)
    }
  }

  return (
    <View style={styles.container}>
      <>
        <Text>Mining status:</Text>
      </>

      <>
        <Text>{miningStatus ? 'On' : 'Off'}</Text>
        <Switch
          value={miningStatus}
          disabled={!miningStatus}
          onValueChange={onChangeSwitchStatus}
        />
      </>
    </View>
  )
}

MiningStatus.propTypes = {
  status: PropTypes.bool,
}
