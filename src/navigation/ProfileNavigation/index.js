import React from 'react'
import { View } from 'react-native'
import {
  createStackNavigator,
  StackViewTransitionConfigs,
} from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Screen } from '../../components'
import { Profile, Flip, Drafts } from '../../containers'

export default createStackNavigator(
  {
    Profile: {
      // eslint-disable-next-line react/display-name
      screen: props => (
        <Screen>
          <Profile {...props} />
        </Screen>
      ),
      navigationOptions: {
        header: null,
        headerStyle: {
          marginHorizontal: 16,
          borderBottomWidth: 0,
          backgroundColor: 'white',
        },
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
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: ![
        navigation.state.routes[navigation.state.index].routeName,
      ].includes('Flip'),
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
