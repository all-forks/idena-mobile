import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Clipboard,
  Linking,
  NativeModules,
} from 'react-native'
import PropTypes from 'prop-types'
import Modal from 'react-native-modal'
import QRCode from 'react-native-qrcode-svg'

import { LoadingIndicator } from '../../components'
import {
  ProfileHeader,
  ActivationForm,
  StatsBoard,
  FlipActions,
  MiningStatus,
} from './components'

import { useInviteDispatch } from '../../providers/invite-context'
import { useIdentityState } from '../../providers/identity-context'
import { useChainState } from '../../providers/chain-context'

import { usePoll, useRpc } from '../../../lib'

import { Toast, IdentityStatus, Colors } from '../../utils'

import styles from './styles'

function Profile({ navigation }) {
  useEffect(() => {
    // NativeModules.IdenaNode.start()
    // NativeModules.IdenaNode.start()
    NativeModules.IdenaNode.readLog().then(value => console.info(value))
  }, [])

  const { canActivateInvite, canMine, identity } = useIdentityState()
  const [{ result: epoch }] = usePoll(useRpc('dna_epoch'), 1000 * 5)
  const [{ result: accounts }] = usePoll(useRpc('account_list'), 1000 * 10)

  const { syncing, currentBlock, highestBlock } = useChainState()

  const [width, setWidth] = useState(0)
  const [balance, setBalance] = useState(0)
  const [isVisible, setToggleVisible] = useState(false)
  const [isVisibleQRCode, setToggleVisibleQRCode] = useState(false)
  const [isVisibleFlipModal, setToggleVisibleFlipModal] = useState(false)
  const [isForceClosedModal, setForceCloseModal] = useState(false)
  const [inputValue, onChange] = useState('')

  const { activateInvite } = useInviteDispatch()

  if (!identity && !epoch && !accounts) return <LoadingIndicator />

  const isNeedActivateInvite =
    (identity.state === IdentityStatus.Undefined ||
      identity.state === IdentityStatus.Killed ||
      identity.state === IdentityStatus.Invite) &&
    canActivateInvite

  if (accounts) {
    // fetchBalance()
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
    if (!identity) return

    try {
      const { error } = await activateInvite(inputValue)
      if (error) {
        Toast.showToast(error.message)
        return
      }
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

  function handleCopyAddress(address) {
    Clipboard.setString(address)

    Toast.showToast('Copied to Clipboard!')

    setToggleVisibleQRCode(!isVisibleQRCode)
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
        setForceCloseModal(true)
        break
      }
      default: {
        break
      }
    }
  }

  function renderBodySynchronize() {
    return (
      <View style={[styles.modalLg, styles.modal]}>
        <Text style={[styles.text, { fontSize: 20, textAlign: 'left' }]}>
          Synchronizing {currentBlock} out of {highestBlock}
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

  function handleTapAddress() {
    setToggleVisibleQRCode(true)
  }

  const { state, online } = identity

  return (
    <>
      <ScrollView onLayout={handleLayout} style={styles.container}>
        <View>
          <ProfileHeader
            {...{ ...identity, epoch }}
            handleTapAddress={handleTapAddress}
          />

          {isNeedActivateInvite ? (
            <ActivationForm
              onChange={text => onChange(text)}
              onPress={handlePress}
              inputValue={inputValue}
            />
          ) : (
            <FlipActions
              {...{ state, width }}
              createNewFlip={handleCreateNewFlip}
              handleNavigateToDrafts={handleNavigateToDrafts}
            />
          )}

          <StatsBoard balance={balance} identity={identity} />

          {canMine && online && (
            <View
              style={{
                marginBottom: 25,
                height: 1,
                width: '100%',
                backgroundColor: Colors.silver,
              }}
            />
          )}

          <MiningStatus status={online} identity={identity} />
        </View>
      </ScrollView>

      <Modal
        isVisible={__DEV__ ? false : syncing && !isForceClosedModal}
        style={{ justifyContent: 'flex-end' }}
        onBackdropPress={() => {
          setToggleVisible(!isVisible)
        }}
      >
        {renderBodySynchronize()}
      </Modal>

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
