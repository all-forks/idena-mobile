import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { IdentityStatus } from '../../../../utils'

import styles from '../../styles'

export default function StatsBoard({
  age,
  state,
  stake,
  totalShortFlipPoints,
  totalQualifiedFlips,
  balance,
}) {
  function calcScores() {
    return totalShortFlipPoints > 0 && totalQualifiedFlips > 0
      ? `${totalShortFlipPoints}/${totalQualifiedFlips} (${Math.round(
          (totalShortFlipPoints / totalQualifiedFlips) * 10000
        ) / 100}%)`
      : '0/0 0%'
  }

  const baseArr = [
    {
      title: 'Status',
      value: state === IdentityStatus.Undefined ? 'Not validated' : state,
    },
    {
      title: 'Balance',
      value: `${balance >= 0 && balance.toString().slice(0, 8)} DNA`,
    },
    {
      title: 'Stake',
      value: `${stake >= 0 && stake.toString().slice(0, 8)} DNA`,
    },
  ]

  const identityActivatedInfoArr = [
    {
      title: 'Total Score',
      value: calcScores(),
    },
    {
      title: 'Age',
      value: `${age} ${parseInt(age) === 1 ? 'epoch' : 'epochs'}`,
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

StatsBoard.propTypes = {
  age: PropTypes.number,
  state: PropTypes.string,
  stake: PropTypes.number,
  totalShortFlipPoints: PropTypes.number,
  totalQualifiedFlips: PropTypes.number,
  balance: PropTypes.number,
}
