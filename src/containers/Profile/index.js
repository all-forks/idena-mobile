import React, { Fragment, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Clipboard,
  Linking,
} from 'react-native'
import Modal from 'react-native-modal'
import PropTypes from 'prop-types'

import { Card } from 'react-native-paper'
import QRCode from 'react-native-qrcode-svg'
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
  console.disableYellowBox = true
  const [{ result: identity }] = usePoll(useRpc('dna_identity'), 1000 * 1)
  const [{ result: epoch }] = usePoll(useRpc('dna_epoch'), 1000 * 10)
  const [{ result: accounts }] = usePoll(useRpc('account_list'), 1000 * 10)

  const { canActivateInvite } = useIdentityState()

  const [width, setWidth] = useState(0)
  const [balance, setBalance] = useState(0)
  const [isVisible, setToggleVisible] = useState(true)
  const [inputValue, onChange] = useState('')
  const { activateInvite, status } = useInviteDispatch()

  if (!identity) {
    return (
      <Card style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Loading...</Text>
      </Card>
    )
  }

  const { address } = identity

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

  function handleCreateNewFlip() {
    navigation.navigate('Flip')
  }

  if (accounts) {
    fetchBalance()
  }

  function handleLayout(event) {
    setWidth(Math.round(event.nativeEvent.layout.width / 2 - 35))
  }

  async function handlePress() {
    if (!identity) {
      return
    }

    try {
      await activateInvite(inputValue, address)
    } catch (error) {
      console.info(error)
    }
  }

  function handleNavigateToDrafts() {
    // const { navigation } = navigation
    navigation.navigate('Drafts')
  }

  function handleOpenInBrowser() {
    Linking.openURL(`https://scan.idena.io/address?address=${address}`).catch(
      error => console.info(error)
    )
  }

  function renderHeader() {
    const { totalQualifiedFlips, state } = identity

    return [IdentityStatus.Verified, IdentityStatus.Newbie].includes(state) ? (
      <View style={styles.flipsContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.flipItem, { width, padding: 10 }]}
          onPress={handleCreateNewFlip}
        >
          <View>
            <Icon name="play-arrow" color="white" size={20} />
            <Text style={styles.flipTitle}>New flip</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleNavigateToDrafts}
          style={[styles.flipItem, { width, flex: 0.67 }]}
        >
          <ImageBackground
            source={profileFlipAvatar}
            resizeMode="cover"
            borderRadius={16}
            style={styles.flipImage}
          >
            <View style={{ padding: 10 }}>
              <Text style={styles.flipTitle}>
                {totalQualifiedFlips === 1 ? 'Draft' : 'Drafts'}
              </Text>
              <Text style={styles.flipText}>{totalQualifiedFlips} flips</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    ) : null
  }

  function renderBoard() {
    const { age, state, madeFlips } = identity

    return (
      <View style={styles.card}>
        {[
          {
            title: 'Status',
            value: state,
          },
          {
            title: 'Balance',
            value: `${balance} DNA`,
          },
          {
            title: 'Total Score',
            value: '0%',
          },
          {
            title: 'Age',
            value: `${age} ${parseInt(age) === 1 ? 'epoch' : 'epochs'}`,
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

  function handleCopyAddress(address) {
    Clipboard.setString(address)
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

  function renderBodyQRCode() {
    return (
      <View style={styles.modalLg}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.qrCodeBorder}>
            <QRCode value={address} size={110} />
          </View>

          <View style={styles.addressPopupContainer}>
            <Text style={[styles.address, styles.gray]}>{address}</Text>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleCopyAddress(address)}
              style={{ flex: 1 }}
            >
              <Text style={[styles.address, { fontSize: 15 }]}>
                Copy Address
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleOpenInBrowser}
              style={{ flex: 1 }}
            >
              <Text style={styles.text}>Open in browser</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  function handlePressOk() {
    setToggleVisible(!isVisible)
  }

  function renderBodySynchronize() {
    // const { offline }
    return (
      <View style={[styles.modalLg, styles.modal]}>
        <Text style={[styles.text, { fontSize: 20, textAlign: 'left' }]}>
          Synchronize...
        </Text>

        <View style={{ marginTop: 10, marginBottom: 15 }}>
          <Text style={styles.profileInfoRowTitle}>
            Please, try again in a few minutes.
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.8} onPress={handlePressOk}>
          <Text style={[styles.address, { fontSize: 15 }]}>Okay</Text>
        </TouchableOpacity>
      </View>
    )
  }

  function renderCurrentTask() {
    const { madeFlips } = identity
    if (
      epoch &&
      epoch.nextValidation &&
      epoch.currentPeriod === EpochPeriod.None
    ) {
      const numOfFlipsToSubmit = madeFlips
      const shouldSendFlips = numOfFlipsToSubmit > 0
      return shouldSendFlips ? (
        <Text style={styles.currentTaskTitle}>
          Current task: create {numOfFlipsToSubmit} flips
        </Text>
      ) : (
        <Text style={styles.currentTaskTitle}>Wait for validation</Text>
      )
    }
  }

  const { name, avatar, online, state } = identity
  // const { syncing, offline } =

  return (
    <Screen>
      <ScrollView onLayout={handleLayout} style={styles.container}>
        <View>
          <View style={styles.header}>
            <View style={styles.userAvatarContainer}>
              <Avatar source={{ uri: avatar }} size={96} online={online} />
            </View>

            <Text style={styles.name}>{name}</Text>

            <View style={{ paddingHorizontal: 48 }}>
              <Text style={styles.address}>{address}</Text>
            </View>
          </View>

          <View style={styles.actionInfoContainer}>
            <View style={styles.nextValidationRow}>
              <Text style={styles.profileInfoRowTitle}>Next Validation</Text>
              <Text style={styles.time}>
                {epoch &&
                  epoch.nextValidation &&
                  epoch.currentPeriod === EpochPeriod.None &&
                  `${new Date(epoch.nextValidation).toDateString()}`}
              </Text>
              {/* {renderCurrentTask()} */}
            </View>

            <View style={styles.currentTasksContainer}>
              {renderCurrentTask()}
            </View>
          </View>

          {state === IdentityStatus.Invite && canActivateInvite
            ? renderActivationForm()
            : renderFlips()}
        </View>
      </ScrollView>

      <Modal
        isVisible={isVisible}
        style={{ justifyContent: 'flex-end' }}
        onBackdropPress={() => {
          setToggleVisible(!isVisible)
        }}
      >
        {renderBodySynchronize()}
      </Modal>
    </Screen>
  )
}

Profile.propTypes = {
  navigation: PropTypes.any,
}

export default Profile
