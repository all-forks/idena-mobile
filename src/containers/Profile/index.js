import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Clipboard,
  Linking,
  Image,
} from 'react-native'
import PropTypes from 'prop-types'
import Modal from 'react-native-modal'
import dayjs from 'dayjs'
import QRCode from 'react-native-qrcode-svg'

import newIcon from '../../assets/icons/new/new2x.png'

import { Avatar, LoadingIndicator, Button, Input } from '../../components'
import ActivationForm from './components/ActivationForm/activation-form'
import StatsBoard from './components/StatsBoard/stats-board'

import {
  useInviteDispatch,
  useIdentityState,
  useChainState,
} from '../../providers'

import { usePoll, useRpc } from '../../../lib'

import { EpochPeriod } from '../../../validation'

import { getBalance } from '../../../api'

import { Toast, IdentityStatus, Colors } from '../../utils'

import styles from './styles'

function Profile({ navigation }) {
  // NativeModules.IdenaNode.start()

  const [{ result: identity }] = usePoll(useRpc('dna_identity'), 1000 * 1)
  const [{ result: epoch }] = usePoll(useRpc('dna_epoch'), 1000 * 10)
  const [{ result: accounts }] = usePoll(useRpc('account_list'), 1000 * 10)
  const { canActivateInvite } = useIdentityState()
  const { syncing, offline } = useChainState()

  const [width, setWidth] = useState(0)
  const [balance, setBalance] = useState(0)
  const [isVisible, setToggleVisible] = useState(false)
  const [isVisibleQRCode, setToggleVisibleQRCode] = useState(false)
  const [isVisibleFlipModal, setToggleVisibleFlipModal] = useState(false)
  const [inputValue, onChange] = useState('')
  const { activateInvite } = useInviteDispatch()

  if (!identity || !epoch || !accounts) return <LoadingIndicator />

  const isNeedActivateInvite =
    (identity.state === IdentityStatus.Undefined ||
      identity.state === IdentityStatus.Killed) &&
    canActivateInvite

  async function fetchBalance() {
    if (accounts) {
      if (accounts.length === 0) {
        const response = await getBalance(identity.address)
        setBalance(response.balance)
        return
      }

      const balancePromises = accounts.map(account =>
        getBalance(account).then(response => ({ account, ...response }))
      )

      try {
        const balances = await Promise.all(balancePromises)
        setBalance(
          balances
            .map(item => item.balance)
            .reduce((acc, amount) => acc + amount)
        )
      } catch (error) {
        console.info(error)
      }
    }
  }

  if (accounts) {
    fetchBalance()
  }

  function handleCreateNewFlip() {
    const { madeFlips } = identity

    if (madeFlips >= 3) {
      setToggleVisibleFlipModal(!isVisibleFlipModal)
      return
    }

    navigation.navigate('Flip')
  }

  function handleLayout(event) {
    setWidth(Math.round(event.nativeEvent.layout.width / 2 - 35))
  }

  async function handlePress() {
    const { address } = identity

    if (!identity) return

    try {
      await activateInvite(inputValue, address)
    } catch (error) {
      Toast.showToast(error.message)
    }
  }

  async function handleNavigateToDrafts() {
    navigation.navigate('Drafts')
  }

  async function handleOpenInBrowser() {
    const { address } = identity

    try {
      await Linking.openURL(`https://scan.idena.io/address?address=${address}`)
    } catch (error) {
      console.info(error)
    }
  }

  function renderFlipHeader() {
    const { totalQualifiedFlips, state } = identity

    return [IdentityStatus.Verified, IdentityStatus.Newbie].includes(state) ? (
      <View style={styles.flipsContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.flipItem, { width, padding: 10 }]}
          onPress={handleCreateNewFlip}
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
          style={[styles.flipItem, { width, flex: 0.67 }]}
        >
          <View style={{ backgroundColor: Colors.gray }}>
            <View style={{ padding: 10 }}>
              <Text style={styles.flipTitle}>
                {totalQualifiedFlips === 1 ? 'Draft' : 'Drafts'}
              </Text>
              <Text style={styles.flipText}>{totalQualifiedFlips} flips</Text>
            </View>
          </View>
          {/* {profileFlipAvatar ? (
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
          ) */}
        </TouchableOpacity>
      </View>
    ) : null
  }

  function handleCopyAddress(address) {
    Clipboard.setString(address)

    Toast.showToast('Copied to Clipboard!')

    setToggleVisibleQRCode(!isVisibleQRCode)
  }

  function renderActivationForm() {
    return (
      <View style={styles.formContainer}>
        <View style={styles.formActionsHandlers}>
          <View style={{ marginBottom: 16 }}>
            <Input
              onChange={onChange}
              placeholder="Invitation code"
              style={{ width: '100%' }}
            />
          </View>
          <Button
            onPress={handlePress}
            title="Activate"
            disabled={!inputValue}
          />
        </View>
      </View>
    )
  }

  function renderBodyQRCode() {
    const { address } = identity

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

  function handlePressOk(kindModal) {
    switch (kindModal) {
      case 'FlipModal': {
        setToggleVisibleFlipModal(!isVisibleFlipModal)
        break
      }
      case 'Synchronize': {
        setToggleVisible(!isVisible)
        break
      }
      default: {
        break
      }
    }
  }

  function renderBodySynchronize() {
    // const { offline }
    return (
      <View style={[styles.modalLg, styles.modal]}>
        <Text style={[styles.text, { fontSize: 20, textAlign: 'left' }]}>
          Synchronizing...
        </Text>

        <View style={{ marginTop: 10, marginBottom: 15 }}>
          <Text style={styles.profileInfoRowTitle}>
            Please, try again in a few minutes.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handlePressOk('Synchronize')}
        >
          <Text style={[styles.address, { fontSize: 15 }]}>Okay</Text>
        </TouchableOpacity>
      </View>
    )
  }

  function renderBodyFlipModal() {
    const { madeFlips } = identity

    return (
      <View style={[styles.modalLg, styles.modal]}>
        <Text style={[styles.text, { fontSize: 20, textAlign: 'left' }]}>
          {madeFlips} already submitted
        </Text>

        <View style={{ marginTop: 10, marginBottom: 15 }}>
          <Text style={styles.profileInfoRowTitle}>
            You cannot create flips for the next epoch now: the keywords are
            generated only for current epoch
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handlePressOk('FlipModal')}
        >
          <Text style={[styles.address, { fontSize: 15 }]}>Okay</Text>
        </TouchableOpacity>
      </View>
    )
  }

  function renderCurrentTask() {
    const { requiredFlips, flips, state } = identity

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

  function handleTapAddress() {
    setToggleVisibleQRCode(true)
  }

  const { state, address } = identity

  return (
    <>
      <ScrollView onLayout={handleLayout} style={styles.container}>
        <View>
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
                  `${dayjs(epoch.nextValidation).format('DD MMM [,] HH:mm')}`}
              </Text>
            </View>
            {renderCurrentTask()}
          </View>

          {isNeedActivateInvite ? (
            <ActivationForm
              onChange={text => onChange(text)}
              onPress={handlePress}
              inputValue={inputValue}
            />
          ) : (
            renderFlipHeader()
          )}
          <StatsBoard {...{ ...identity, balance }} />
        </View>
      </ScrollView>

      {/* <Modal
        isVisible={syncing}
        style={{ justifyContent: 'flex-end' }}
        onBackdropPress={() => {
          setToggleVisible(!isVisible)
        }}
      >
        {renderBodySynchronize()}
      </Modal> */}

      <Modal
        isVisible={isVisibleQRCode}
        style={{ justifyContent: 'flex-end' }}
        onBackdropPress={() => {
          setToggleVisibleQRCode(!isVisibleQRCode)
        }}
      >
        {renderBodyQRCode()}
      </Modal>
      <Modal>
        isVisible={isVisibleFlipModal}
        style={{ justifyContent: 'flex-end' }}
        onBackdropPress=
        {() => {
          setToggleVisibleFlipModal(false)
        }}
        {renderBodyFlipModal()}
      </Modal>
    </>
  )
}

Profile.propTypes = {
  navigation: PropTypes.any,
}

export default Profile
