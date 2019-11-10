import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Clipboard,
  Linking,
  NativeModules,
} from 'react-native'
import Modal from 'react-native-modal'
import QRCode from 'react-native-qrcode-svg'

import { LoadingIndicator, Button } from '../../components'
import {
  ProfileHeader,
  ActivationForm,
  IdentityStats,
  FlipActions,
  MiningStatus,
} from './components'

import { useInviteDispatch } from '../../providers/invite-context'
import { useIdentity } from '../../providers/identity-context'
import { useChain } from '../../providers/chain-context'
import { useEpoch } from '../../providers/epoch'
import { Toast, Colors } from '../../utils'
import styles from './styles'
import { useThunk } from '../../../lib'

const ProfileContext = React.createContext()

// eslint-disable-next-line react/prop-types
function Profile({ navigation }) {
  const [{ syncing }] = useChain()
  const [epoch] = useEpoch()
  const [
    { canActivateInvite, canMine, madeFlips, state: identityState, online },
  ] = useIdentity()
  const { activateInvite } = useInviteDispatch()

  const [state, dispatch] = useThunk(
    React.useReducer(
      // eslint-disable-next-line no-shadow
      (state, [type, ...action]) => {
        switch (type) {
          case 'fetch_started':
            return {
              ...state,
              idle: false,
              pending: true,
            }
          case 'fetched':
            return { ...state, pending: false }
          case 'fetch_failed':
            return { ...state, pending: false }
          case 'layout':
            return {
              ...state,
              width: Math.round(action.width / 2 - 35),
            }
          case 'address_copied':
            return {
              ...state,
              isQRAddressVisible: false,
            }
          case 'address_tapped':
            return {
              ...state,
              isQRAddressVisible: true,
            }
          case 'flips_done':
            return {
              ...state,
              isFlipVisible: true,
            }
          case 'flips_dismissed':
            return { ...state, isFlipVisible: false }
          case 'address_dismissed':
            return { ...state, isQRAddressVisible: false }
          default:
            return state
        }
      },
      {
        width: 0,
        balance: null,
        isQRAddressVisible: false,
        isFlipVisible: false,
        idle: true,
        pending: false,
      }
    )
  )

  if (!epoch) return <LoadingIndicator />

  function handleCreateNewFlip() {
    if (madeFlips >= 3) {
      dispatch(['flips_done'])
    } else {
      navigation.navigate('Flip')
    }
  }

  async function handleNavigateToDrafts() {
    navigation.navigate('Drafts')
  }

  return (
    <ProfileContext.Provider value={{ dispatch }}>
      <ScrollView
        onLayout={event =>
          dispatch(['layout', { width: event.nativeEvent.layout.width }])
        }
        style={styles.container}
      >
        <View>
          <ProfileHeader
            {...identityState}
            epoch={epoch}
            handleTapAddress={() => dispatch(['address_tapped'])}
          />

          {canActivateInvite ? (
            <ActivationForm
              onActivate={async code => {
                const { error } = await activateInvite(code)
                if (error) {
                  Toast.showToast(error.message)
                }
              }}
            />
          ) : (
            <FlipActions
              {...identityState}
              width={state.width}
              createNewFlip={handleCreateNewFlip}
              handleNavigateToDrafts={handleNavigateToDrafts}
            />
          )}

          <IdentityStats />

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
          <MiningStatus status={online} />
          <Sync />
          <NodeLog />
        </View>
      </ScrollView>

      <Modal
        // eslint-disable-next-line no-undef
        isVisible={true || __DEV__ ? false : syncing}
        style={{ justifyContent: 'flex-end' }}
      >
        <Sync />
      </Modal>
      <Modal
        isVisible={state.isQRAddressVisible}
        style={{ justifyContent: 'flex-end' }}
        onBackdropPress={() => dispatch(['address_dismissed'])}
      >
        <QRAddress />
      </Modal>
      <Modal
        isVisible={state.isFlipVisible}
        style={{ justifyContent: 'flex-end' }}
        onBackdropPress={() => dispatch(['flip_dismissed'])}
      >
        <FlipEnough />
      </Modal>
    </ProfileContext.Provider>
  )
}

function QRAddress() {
  const [{ address }] = useIdentity()
  const { dispatch } = React.useContext(ProfileContext)
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
            onPress={() => {
              Clipboard.setString(address)
              Toast.showToast('Copied to Clipboard!')
              dispatch(['address_copied'])
            }}
            style={{ flex: 1 }}
          >
            <Text style={[styles.address, { fontSize: 15 }]}>Copy Address</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              Linking.openURL(
                `https://scan.idena.io/address?address=${address}`
              )
            }
            style={{ flex: 1 }}
          >
            <Text style={styles.text}>Open in browser</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

function Sync() {
  const [{ currentBlock, highestBlock }] = useChain()
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
    </View>
  )
}

function FlipEnough() {
  const [{ madeFlips }] = useIdentity()
  const { dispatch } = React.useContext(ProfileContext)
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
        onPress={() => dispatch(['flips_dismissed'])}
      >
        <Text style={[styles.address, { fontSize: 15 }]}>Okay</Text>
      </TouchableOpacity>
    </View>
  )
}

function NodeLog() {
  const [log, setLog] = React.useState('')
  return (
    <ScrollView>
      <Button
        onPress={async () => {
          setLog(await NativeModules.IdenaNode.readLog())
        }}
        title="Read log"
      ></Button>
      <View>
        <Text>{log}</Text>
      </View>
    </ScrollView>
  )
}

export default Profile
