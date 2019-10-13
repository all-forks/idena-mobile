import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Clipboard,
  Linking,
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

import {
  useInviteDispatch,
  useIdentityState,
  useChainState,
  useEpochState,
} from '../../providers'

import { usePoll, useRpc } from '../../../lib'

import { getBalance } from '../../../api'

import { Toast, IdentityStatus, Colors } from '../../utils'

import styles from './styles'

function Profile({ navigation }) {
  // NativeModules.IdenaNode.start()

  const { canActivateInvite, identity } = useIdentityState()
  // const { epoch } = useEpochState()
  const [{ result: epoch }] = usePoll(useRpc('dna_epoch'), 1000 * 5)
  // console.info(epoch)
  const [{ result: accounts }] = usePoll(useRpc('account_list'), 1000 * 10)

  const { syncing } = useChainState()

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
      identity.state === IdentityStatus.Killed) &&
    canActivateInvite

  async function fetchBalance() {
    if (accounts) {
      if (accounts.length === 0) {
        try {
          const response = await getBalance(
            !identity.address
              ? '0xcf0cf37a6e4a8e76e26db95f9eb5f3c73d122257'
              : identity.address
          )
          setBalance(response.balance)
          return
        } catch (error) {
          console.info(error)
          return
        }
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
          <StatsBoard {...{ ...identity, balance }} />

          <View
            style={{
              marginBottom: 25,
              height: 1,
              width: '100%',
              backgroundColor: Colors.silver,
            }}
          />

          <MiningStatus status={online} />
        </View>
      </ScrollView>

      <Modal
        isVisible={syncing && !isForceClosedModal}
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
