import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import { Avatar } from '../../../../components'
import { EpochPeriod } from '../../../../../validation'

import { useChainState, useIdentityState } from '../../../../providers'
import { IdentityStatus } from '../../../../utils'

import styles from '../../styles'

export default function ProfileHeader({
  state,
  requiredFlips,
  flips,
  address,
  epoch,
  handleTapAddress,
}) {
  const { syncing, offline } = useChainState()
  const { canActivateInvite } = useIdentityState()

  console.info(epoch)

  function renderCurrentTask() {
    if (
      epoch &&
      epoch.nextValidation &&
      epoch.currentPeriod === EpochPeriod.None
    ) {
      const numOfFlipsToSubmit = requiredFlips - (flips || []).length
      const shouldSendFlips = numOfFlipsToSubmit > 0

      if (shouldSendFlips) {
        return (
          <View style={styles.currentTasksContainer}>
            <Text style={styles.currentTaskTitle}>
              Current task: create {numOfFlipsToSubmit} flip
              {numOfFlipsToSubmit > 1 ? 's' : ''}
            </Text>
          </View>
        )
      }

      if (
        (state === IdentityStatus.Undefined ||
          state === IdentityStatus.Killed) &&
        canActivateInvite
      ) {
        return null
      }

      return (
        <View style={styles.currentTasksContainer}>
          <Text style={styles.currentTaskTitle}>Wait for validation</Text>
        </View>
      )
    }
  }

  return (
    <>
      <View style={styles.header}>
        <View style={styles.userAvatarContainer}>
          <Avatar
            address={address}
            size={96}
            nodeStatus={{ offline, syncing }}
          />
        </View>

        <Text style={styles.name}>My Identity</Text>

        <TouchableOpacity
          onPress={handleTapAddress}
          style={{ paddingHorizontal: 48 }}
        >
          <Text style={styles.address}>{address}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionInfoContainer}>
        <View style={styles.nextValidationRow}>
          <Text style={styles.profileInfoRowTitle}>Next validation</Text>
          <Text style={styles.time}>
            {epoch &&
              epoch.nextValidation &&
              epoch.currentPeriod === EpochPeriod.None &&
              `${dayjs(epoch.nextValidation).format('DD MMM[,] HH:mm')}`}
          </Text>
        </View>
        {renderCurrentTask()}
      </View>
    </>
  )
}

ProfileHeader.propTypes = {
  address: PropTypes.string,
  state: PropTypes.string,
  requiredFlips: PropTypes.number,
  flips: PropTypes.array,
  epoch: PropTypes.object,
  handleTapAddress: PropTypes.func,
}
