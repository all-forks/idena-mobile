import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import { Avatar } from '../../../../components'
import { EpochPeriod, useValidationState } from '../../../../../validation'

import { useChainState, useIdentityState } from '../../../../providers'
import { useEpochState } from '../../../../../epoch'
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
  const { identity, canActivateInvite } = useIdentityState()
  // const { isValidationRunning } = useEpochState()
  const { shortAnswers, longAnswers } = useValidationState()

  function renderCurrentTask() {
    if (!epoch || !epoch.currentPeriod || !identity || !identity.state) {
      return null
    }

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
    }

    if (
      epoch &&
      [EpochPeriod.ShortSession, EpochPeriod.LongSession].includes(
        epoch.currentPeriod
      )
    ) {
      if (
        (epoch.currentPeriod === EpochPeriod.ShortSession &&
          shortAnswers.length) ||
        (epoch.currentPeriod === EpochPeriod.LongSession && longAnswers.length)
      ) {
        return (
          <View style={styles.currentTasksContainer}>
            <Text style={styles.currentTaskTitle}>
              Wait for {epoch.currentPeriod} end
            </Text>
          </View>
        )
      }

      return (
        <View style={styles.currentTasksContainer}>
          <Text style={styles.currentTaskTitle}>Solve flips now!</Text>
        </View>
      )
    }

    if (
      [
        IdentityStatus.Candidate,
        IdentityStatus.Suspend,
        IdentityStatus.Zombie,
      ].includes(identity.state)
    ) {
      if (epoch.currentPeriod === EpochPeriod.None) {
        return (
          <View style={styles.currentTasksContainer}>
            <Text style={styles.currentTaskTitle}>Wait for validation</Text>
          </View>
        )
      }

      if (shortAnswers.length && longAnswers.length) {
        return (
          <View style={styles.currentTasksContainer}>
            <Text style={styles.currentTaskTitle}>Wait for validation end</Text>
          </View>
        )
      }

      return (
        <View style={styles.currentTasksContainer}>
          <Text style={styles.currentTaskTitle}>Solve flips now!</Text>
        </View>
      )
    }

    if (epoch.currentPeriod === EpochPeriod.FlipLottery) {
      return (
        <View style={styles.currentTasksContainer}>
          <Text style={styles.currentTaskTitle}>Flip lottery</Text>
        </View>
      )
    }

    if (epoch.currentPeriod === EpochPeriod.AfterLongSession) {
      return (
        <View style={styles.currentTasksContainer}>
          <Text style={styles.currentTaskTitle}>Wait for validation end</Text>
        </View>
      )
    }

    if (
      (state === IdentityStatus.Undefined ||
        state === IdentityStatus.Killed ||
        state === IdentityStatus.Invite) &&
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

      {epoch && epoch.currentPeriod === EpochPeriod.None && (
        <View style={styles.actionInfoContainer}>
          <View style={styles.nextValidationRow}>
            <Text style={styles.profileInfoRowTitle}>Next validation</Text>
            <Text style={styles.time}>
              {dayjs(epoch.nextValidation).format('DD MMM[,] HH:mm')}
            </Text>
          </View>
        </View>
      )}
      {renderCurrentTask()}
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
