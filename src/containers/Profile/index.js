import React, { Fragment, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'

import { Card } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import profileFlipAvatar from '../../assets/images/profile_flip_avatar.jpeg'

import { Avatar, Button, Screen, Input } from '../../components'

import { useInviteDispatch, useIdentityState } from '../../providers'

import { usePoll, useRpc } from '../../../lib'

import { EpochPeriod } from '../../../validation'

import { getBalance } from '../../../api'

import { IdentityStatus } from '../../utils'

import styles from './styles'

function Profile({ navigation }) {
  const [{ result: identity }] = usePoll(useRpc('dna_identity'), 1000 * 1)
  const [{ result: epoch }] = usePoll(useRpc('dna_epoch'), 1000 * 10)
  const [{ result: accounts }] = usePoll(useRpc('account_list'), 1000 * 10)

  const { canActivateInvite } = useIdentityState()

  const [width, setWidth] = useState(0)
  const [balance, setBalance] = useState(0)
  const [inputValue, onChange] = useState('')
  const { activateInvite, status } = useInviteDispatch()

  if (!identity) {
    return (
      <Card style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Loading...</Text>
      </Card>
    )
  }

  function fetchBalance() {
    if (accounts) {
      const balancePromises = accounts.map(account =>
        getBalance(account).then(response => ({ account, ...response }))
      )

      Promise.all(balancePromises)
        .then(resp => {
          setBalance(
            resp.map(item => item.balance).reduce((acc, amount) => acc + amount)
          )
        })
        .catch(error => console.log('err:', error))
    }
  }

  function handlePressButton(index) {
    switch (index) {
      case 0: {
        break
      }

      case 1: {
        break
      }

      case 2: {
        navigation.navigate('Flip')
        break
      }

      default: {
        break
      }
    }
  }

  if (accounts) {
    fetchBalance()
  }

  function handleLayout(event) {
    setWidth(Math.round(event.nativeEvent.layout.width / 2 - 35))
  }

  async function handlePress() {
    const { address } = identity

    if (
      identity === '' ||
      identity === ' ' ||
      identity === null ||
      identity === undefined
    ) {
      return
    }

    try {
      await activateInvite(inputValue, address)
    } catch (error) {
      console.info(error)
    }
  }

  const { state } = identity

  function renderHeader() {
    const { totalQualifiedFlips } = identity

    return (
      <View style={styles.flipsContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.flipItem, { width, padding: 10 }]}
        >
          <View>
            <Icon name="play-arrow" color="white" size={20} />
            <Text style={styles.flipTitle}>Run flips</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.flipItem, { width }]}
        >
          <ImageBackground
            source={profileFlipAvatar}
            resizeMode="cover"
            borderRadius={16}
            style={styles.flipImage}
          >
            <View style={{ padding: 10 }}>
              <Icon name="play-arrow" color="white" size={20} />
              <Text style={styles.flipTitle}>Samples</Text>
              <Text style={styles.flipText}>
                Total {totalQualifiedFlips} flips
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    )
  }

  function renderBoard() {
    const { age, madeFlips, address } = identity

    return (
      <View style={styles.card}>
        {[
          {
            title: 'Status',
            value: state,
          },
          {
            title: 'Public Address',
            value: `${address}`,
          },
          {
            title: 'Balance',
            value: `${balance} DNA`,
          },
          {
            title: 'Age',
            value: `${age} epoches`,
          },
          {
            title: 'Next validation',
            value:
              epoch &&
              epoch.nextValidation &&
              epoch.currentPeriod === EpochPeriod.None &&
              `${new Date(epoch.nextValidation).toDateString()}`,
          },
          {
            title: 'Current task',
            value: `Create ${madeFlips} flips`,
          },
        ].map(({ title, value }, index) => (
          <View key={index} style={styles.profileInfoRow}>
            <Text style={styles.profileInfoRowTitle}>{title}</Text>
            <Text
              style={styles.profileInfoRowValue}
              numberOfLines={1}
              ellipsizeMode="head"
            >
              {title === 'Public Address'
                ? `${value.slice(0, 13)}...`
                : value && value}
            </Text>
          </View>
        ))}
      </View>
    )
  }

  function renderFlips() {
    return (
      <Fragment>
        {renderHeader()}
        {renderBoard()}
      </Fragment>
    )
  }

  function renderActivationForm() {
    return (
      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          <Text style={styles.activateTitle}>Activate</Text>
          <Text style={styles.activateNoticement}>
            Please enter your invite code to become part of Idena
          </Text>
        </View>

        <View style={styles.formActionsHandlers}>
          <Input onChange={onChange} />
          <Button onPress={handlePress} title="Activate" />
        </View>
      </View>
    )
  }

  const { name, nickname, avatar } = identity

  return (
    <Screen>
      <ScrollView onLayout={handleLayout} style={styles.container}>
        <View>
          <View style={styles.header}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.nickname}>{nickname}</Text>

            <View style={styles.userAvatarContainer}>
              <Avatar source={{ uri: avatar }} size={150} />
            </View>
          </View>

          <View style={styles.mainButtons}>
            {[
              { icon: 'account-balance', title: 'Share' },
              { icon: 'account-balance', title: 'Invite' },
              { icon: 'account-balance', title: 'Flip' },
            ].map(({ icon, title }, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePressButton(index)}
                style={{ alignItems: 'center', width: 50 }}
              >
                <View style={styles.menuImageItemContainer}>
                  <Icon name={icon} size={30} color="rgb(87, 143, 255)" />
                </View>
                <Text style={styles.menuItem}>{title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {state === IdentityStatus.Invite && canActivateInvite
            ? renderActivationForm()
            : renderFlips()}
        </View>
      </ScrollView>
    </Screen>
  )
}

export default Profile
