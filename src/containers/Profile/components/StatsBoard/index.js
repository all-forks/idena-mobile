import React from 'react'
import { View, Text } from 'react-native'

import { useIdentity } from '../../../../providers/identity-context'
import { IdentityStatus } from '../../../../utils'

import styles from '../../styles'
import { useRpc, usePoll } from '../../../../../lib'

export default function IdentityStats() {
  const [
    { address, age, state, totalShortFlipPoints, totalQualifiedFlips },
  ] = useIdentity()
  const [{ result: balance }] = usePoll(useRpc('dna_getBalance', address), 1000)

  function calcScores() {
    return totalShortFlipPoints > 0 && totalQualifiedFlips > 0
      ? `${totalShortFlipPoints}/${totalQualifiedFlips} (${Math.round(
          (totalShortFlipPoints / totalQualifiedFlips) * 10000
        ) / 100}%)`
      : '0%'
  }

  function getFormattedNumber(number) {
    return Number(number).toFixed(
      Math.trunc(Number(number)) === Number(number) ? 2 : 8
    )
  }

  function renderBalanceData(data) {
    return data && Number(data) >= 0
      ? `${getFormattedNumber(data)} DNA`
      : '0.00 DNA'
  }

  const baseArr = [
    {
      title: 'Status',
      value:
        state === IdentityStatus.Undefined ||
        state === IdentityStatus.Invite ||
        state === IdentityStatus.Killed ||
        !state
          ? 'Not validated'
          : state,
    },
    {
      title: 'Balance',
      value: renderBalanceData(balance && balance.balance),
    },
    {
      title: 'Stake',
      value: renderBalanceData(balance && balance.stake),
    },
  ]

  const identityActivatedInfoArr = [
    {
      title: 'Total Score',
      value: calcScores(),
    },
    {
      title: 'Age',
      // eslint-disable-next-line no-nested-ternary
      value: age ? `${age} epoch(s)` : '0 epoch(s)',
    },
  ]

  const currentIdentityInfo =
    state === IdentityStatus.Undefined || state === IdentityStatus.Killed
      ? baseArr
      : [...baseArr, ...identityActivatedInfoArr]

  return (
    <View style={styles.card}>
      {currentIdentityInfo.map(({ title, value }, index) => (
        <View key={index} style={styles.profileInfoRow}>
          <Text style={styles.profileInfoRowTitle}>{title}</Text>
          <Text style={styles.profileInfoRowValue} numberOfLines={1}>
            {value && value}
          </Text>
        </View>
      ))}
    </View>
  )
}
