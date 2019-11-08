import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import {
  createStackNavigator,
  StackViewTransitionConfigs,
} from 'react-navigation'

import backIcon from '../assets/icons/back/back-button2x.png'
import { Screen, SafeArea } from '../components'
import { Profile, Flip, Drafts } from '../containers'
import { Colors } from '../utils'

export default createStackNavigator(
  {
    Profile: {
      // eslint-disable-next-line react/display-name
      screen: props => (
        <Screen>
          <SafeArea>
            <Profile {...props} />
          </SafeArea>
        </Screen>
      ),
      navigationOptions: {
        header: null,
      },
    },
    Flip: {
      // eslint-disable-next-line react/display-name
      screen: props => (
        <Screen>
          <Flip {...props} />
        </Screen>
      ),
      navigationOptions: {
        header: null,
      },
    },
    Drafts: {
      // eslint-disable-next-line react/display-name
      screen: props => (
        <Screen>
          <Drafts {...props} />
        </Screen>
      ),
      navigationOptions: ({ navigation }) => ({
        title: 'Drafts',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={backIcon}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ),
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: '700',
          color: Colors.grey,
        },
        headerStyle: {
          marginHorizontal: 16,
          borderBottomWidth: 0,
        },
      }),
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: ![
        navigation.state.routes[navigation.state.index].routeName,
      ].includes('Flip'),
      header: null,
    }),
    cardStyle: {
      backgroundColor: 'black',
    },
    transitionConfig: (transitionProps, prevTransitionProps) => {
      const isModal =
        transitionProps.scene.route.routeName === 'Flip' ||
        (prevTransitionProps &&
          prevTransitionProps.scene.route.routeName === 'Flip')

      const { defaultTransitionConfig } = StackViewTransitionConfigs

      return defaultTransitionConfig(
        transitionProps,
        prevTransitionProps,
        isModal
      )
    },
  }
)
