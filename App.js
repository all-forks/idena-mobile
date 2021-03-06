import React, { useEffect } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  NativeModules,
} from 'react-native'

import { Card } from 'react-native-paper'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage'
import * as Sentry from '@sentry/react-native'

import { useInterval, useTimeout } from './lib'

import { LoadingIndicator } from './src/components'

import ProfileNavigation from './src/navigation/profile-navigation'
import ImportPrivateKeyNavigation from './src/navigation/import-pk-navigation'

import {
  useValidationState,
  ValidationProvider,
  useValidationDispatch,
  SessionType,
  fetchFlips,
  PICK,
  ANSWER,
  AnswerType,
  hasAnswer,
  submitShortAnswers,
  NEXT,
  REPORT_ABUSE,
  submitLongAnswers,
  START_FETCH_FLIPS,
  SHOW_EXTRA_FLIPS,
  EpochPeriod,
  useValidationTimer,
} from './src/providers/validation'

import { arrayBufferToBase64, reorderList } from './utils'

import {
  EpochProvider,
  useEpochState,
  TimingProvider,
  useEpoch,
} from './src/providers/epoch'

import { InviteProvider } from './src/providers/invite-context'
import { IdentityProvider } from './src/providers/identity-context'
import { ChainProvider } from './src/providers/chain-context'

import { Toast } from './src/utils'

Sentry.init({
  dsn: 'https://b712a008997745a3a5e6cb9799d708e8@sentry.io/1814600',
})

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
    flex: 1,
  },
  body: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  sectionContainer: {
    flex: 1,
    marginTop: 32,
    marginHorizontal: 24,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.black,
  },
  validationContainer: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 14,
  },
  validationHeading: {
    width: 190,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 13,
  },
  validationParagraph: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: 'rgb(150, 153, 158)',
  },
  validationTitle: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  validationScene: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
    position: 'relative',
    overflow: 'hidden',
  },
  thumbs: {
    width: '100%',
    marginBottom: 30,
  },
  thumbsScrollContainer: {
    width: '100%',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
  },
  thumbCol: {
    marginLeft: 4,
    marginRight: 4,
  },
  thumb: {
    width: 44,
    height: 44,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
  },
  thumbCurrent: {
    width: 44,
    height: 44,
    borderRadius: 16,
    marginLeft: 4,
    marginRight: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'white',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  thumbOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(89,89,89,0.8)',
    color: '#fff',
  },
  flipsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  flipsCol: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  flip: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: 'transparent',
  },
  flipActive: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: 'rgb(87,143,255)',
  },
  flipImage: {
    width: 140,
    height: 120,
    resizeMode: 'cover',
  },
  timer: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    color: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    width: 70,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    textAlign: 'center',
    transform: [{ translateX: -35 }],
  },
  buttonReject: {
    position: 'absolute',
    bottom: -96,
    left: -96,
    backgroundColor: 'rgba(255,102,102,.3)',
    borderRadius: 200,
    width: 192,
    height: 192,
  },
  buttonRejectInner: {
    textAlign: 'center',
    display: 'flex',
    position: 'absolute',
    top: 8,
    right: 10,
    width: 96,
    height: 96,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  buttonNext: {
    position: 'absolute',
    bottom: -96,
    right: -96,
    backgroundColor: 'rgba(87,143,255,.3)',
    borderRadius: 200,
    width: 192,
    height: 192,
  },
  buttonNextInner: {
    textAlign: 'center',
    display: 'flex',
    position: 'absolute',
    top: 8,
    left: 10,
    width: 96,
    height: 96,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  buttonText: {
    color: '#fff',
  },
})

// eslint-disable-next-line react/prop-types
export function AppProviders({ children }) {
  useEffect(() => {
    async function checkPrivateKey() {
      const hasPk = await AsyncStorage.getItem('hasPrivateKey')
      if (hasPk === '1') {
        NativeModules.IdenaNode.start()
      }
    }
    checkPrivateKey()
  }, [])
  return (
    <TimingProvider>
      <EpochProvider>
        <IdentityProvider>
          <InviteProvider>
            <ChainProvider>{children}</ChainProvider>
          </InviteProvider>
        </IdentityProvider>
      </EpochProvider>
    </TimingProvider>
  )
}

// eslint-disable-next-line react/prop-types
export function WithValidation({ children }) {
  const { isValidationRunning } = useEpochState()
  return (
    <View style={styles.body}>
      <ValidationProvider>
        {isValidationRunning ? <ValidationScreen /> : children}
      </ValidationProvider>
    </View>
  )
}

export const EXTRA_FLIPS_DELAY = 30 * 1000

function ValidationScreen() {
  const {
    flips,
    currentIndex,
    shortAnswersSubmitted,
    longAnswersSubmitted,
    ready,
  } = useValidationState()
  const dispatch = useValidationDispatch()

  const [{ result: epoch }] = useEpoch()

  React.useEffect(() => {
    if (!ready && !shortAnswersSubmitted) {
      dispatch({ type: START_FETCH_FLIPS })
    }
    if (!ready && !longAnswersSubmitted) {
      dispatch({ type: START_FETCH_FLIPS })
    }
  }, [dispatch, longAnswersSubmitted, ready, shortAnswersSubmitted])

  useInterval(
    () =>
      dispatch(
        fetchFlips(
          epoch &&
            epoch.currentPeriod === EpochPeriod.ShortSession &&
            !shortAnswersSubmitted
            ? SessionType.Short
            : SessionType.Long,
          flips
        )
      ),
    ready ? null : 1000 * 1,
    true
  )

  useTimeout(() => {
    if (!ready && !shortAnswersSubmitted) {
      dispatch({ type: SHOW_EXTRA_FLIPS })
    }
  }, EXTRA_FLIPS_DELAY)

  const isLast = currentIndex >= flips.length - 1

  if (shortAnswersSubmitted && longAnswersSubmitted) {
    return (
      <Card style={styles.sectionContainer}>
        <Text style={styles.sectionDescription}>
          Waiting for the end of validation
        </Text>
      </Card>
    )
  }

  return (
    <View style={[styles.validationContainer]}>
      <View style={styles.validationHeading}>
        <Text style={styles.validationTitle}>Validation session</Text>
        <Text style={styles.validationParagraph}>
          Select a meaningful story: left or right ({currentIndex + 1} of{' '}
          {flips.length})
        </Text>
      </View>
      <View style={styles.validationScene}>
        <ThumbList>
          {flips.map((flip, index) => (
            <Thumb
              key={flip.hash}
              index={index}
              isCurrent={index === currentIndex}
              {...flip}
            ></Thumb>
          ))}
        </ThumbList>
        <View style={styles.flipsContainer}>
          <View style={styles.flipsCol}>
            <Flip {...flips[currentIndex]} option={AnswerType.Left} />
          </View>
          <View style={styles.flipsCol}>
            <Flip {...flips[currentIndex]} option={AnswerType.Right} />
          </View>
        </View>

        <Timer
          type={shortAnswersSubmitted ? SessionType.Long : SessionType.Short}
        />

        <TouchableOpacity
          style={styles.buttonReject}
          onPress={() => dispatch({ type: REPORT_ABUSE })}
        >
          <View style={styles.buttonRejectInner}>
            <Icon name="flash-on" size={20} color="rgb(255,102,102)" />
            <Text style={styles.buttonText}>Reject</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonNext}
          onPress={async () => {
            if (isLast) {
              if (!shortAnswersSubmitted) {
                dispatch(submitShortAnswers(flips, epoch.epoch))
              } else {
                dispatch(submitLongAnswers(flips, epoch.epoch))
              }
            } else {
              dispatch({ type: NEXT })
            }
          }}
        >
          <View style={styles.buttonNextInner}>
            <Icon name="arrow-forward" size={20} color="rgb(87,143,255)" />
            <Text style={styles.buttonText}>{isLast ? 'Confirm' : 'Next'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

function ThumbList({ children }) {
  return (
    <View style={styles.thumbs}>
      <ScrollView
        horizontal
        style={styles.thumbsScrollContainer}
        contentContainerStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
      >
        {children}
      </ScrollView>
    </View>
  )
}

function Thumb({ pics, orders, index, ready, failed, answer, isCurrent }) {
  const dispatch = useValidationDispatch()
  return (
    <TouchableOpacity onPress={() => dispatch({ type: PICK, index })}>
      <View style={styles.thumbCol}>
        {failed ? (
          <View style={styles.thumb}>
            <View style={styles.thumbOverlay}>
              <Icon name="close" size={20} color="#fff" />
            </View>
          </View>
        ) : (
          <View style={isCurrent ? styles.thumbCurrent : styles.thumb}>
            {ready ? (
              <FlipImage
                source={{
                  uri: `data:image/png;base64,${arrayBufferToBase64(
                    reorderList(pics, orders[0])[0]
                  )}`,
                }}
                width={44}
                height={44}
                style={styles.thumbImage}
              />
            ) : (
              <ActivityIndicator />
            )}
            {hasAnswer(answer) && (
              <View style={styles.thumbOverlay}>
                <Icon
                  name={
                    answer === AnswerType.Inappropriate ? 'flash-on' : 'check'
                  }
                  size={20}
                  color="#fff"
                />
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

function Flip({ pics = [], answer, ready, orders, failed, option }) {
  const dispatch = useValidationDispatch()

  if (!ready && !failed) {
    return <ActivityIndicator />
  }

  if (failed) return <EmptyFlip />

  const isSelected = hasAnswer(answer) && answer === option
  if (ready && !failed) {
    return (
      <TouchableOpacity onPress={() => dispatch({ type: ANSWER, option })}>
        <View style={isSelected ? styles.flipActive : styles.flip}>
          <FlipImageList>
            {reorderList(pics, orders[option - 1]).map((src, idx) => (
              <FlipImage
                key={idx}
                source={{
                  uri: `data:image/png;base64,${arrayBufferToBase64(src)}`,
                }}
                width={144}
                height={120}
                style={styles.flipImage}
              />
            ))}
          </FlipImageList>
        </View>
      </TouchableOpacity>
    )
  }

  return null
}

function EmptyFlip() {
  return [1, 2, 3, 4].map((_, idx) => (
    <View key={`empty-${idx}`} style={styles.flip}>
      <FlipImage
        source={{ uri: 'https://placehold.it/144x120?text=No+data' }}
        width={144}
        height={120}
        style={styles.flipImage}
      />
    </View>
  ))
}

function FlipImageList({ children }) {
  return <View>{children}</View>
}

function FlipImage({ source, width, height, style }) {
  return (
    <Image
      source={source}
      style={{ ...style, width, height }}
      PlaceholderContent={<ActivityIndicator />}
    />
  )
}

function Timer({ type }) {
  const epoch = useEpochState()
  const {
    secondsLeftForShortSession: shortSeconds,
    secondsLeftForLongSession: longSeconds,
  } = useValidationTimer()
  const { shortAnswersSubmitted } = useValidationState()

  if (!epoch) {
    return null
  }

  const seconds =
    type === SessionType.Short && !shortAnswersSubmitted
      ? shortSeconds
      : longSeconds

  return (
    <View style={styles.timer}>
      <Icon
        name="timer"
        size={20}
        color="rgb(255,102,102)"
        style={{ marginRight: 5 }}
      />
      <Text style={{ color: 'rgb(255,102,102)' }}>
        {[Math.floor(seconds / 60), seconds % 60]
          .map(t => t.toString().padStart(2, 0))
          .join(':')}
      </Text>
    </View>
  )
}

function LoadingScreen({ navigation }) {
  useEffect(() => {
    async function fetchAsyncStorage() {
      try {
        const hasPrivateKey = await AsyncStorage.getItem('hasPrivateKey')
        navigation.navigate(hasPrivateKey === '1' ? 'App' : 'Auth')
      } catch (error) {
        Toast.showToast('Something went wrong')
      }
    }
    fetchAsyncStorage()
  }, [navigation])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoadingIndicator />
    </View>
  )
}

const MainNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Auth: ImportPrivateKeyNavigation,
    App: ProfileNavigation,
  },
  {
    initialRouteName: 'Loading',
  }
)

export default createAppContainer(MainNavigator)
