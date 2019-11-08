import {
  createStackNavigator,
  StackViewTransitionConfigs,
} from 'react-navigation'
import React from 'react'
import { Image } from 'react-native'

import { EnterPassword, ImportKey, QRCodeScanner } from '../containers'
import backIcon from '../assets/icons/back/back-button2x.png'

export default createStackNavigator(
  {
    ImportPrivateKey: {
      screen: ImportKey,
      navigationOptions: {
        header: null,
      },
    },
    EnterPassword: {
      screen: EnterPassword,
      navigationOptions: {
        headerBackImage: (
          <Image source={backIcon} style={{ width: 24, height: 24 }} />
        ),
        headerBackTitle: null,
      },
      headerStyle: {
        borderBottomWidth: 0,
      },
    },
    QRCodeScanner: {
      screen: QRCodeScanner,
      navigationOptions: {
        header: null,
      },
    },
    initialRouteName: 'ImportPrivateKey',
  },
  {
    transitionConfig: (transitionProps, prevTransitionProps) => {
      const isModal =
        transitionProps.scene.route.routeName === 'QRCodeScanner' ||
        (prevTransitionProps &&
          prevTransitionProps.scene.route.routeName === 'QRCodeScanner')

      const { defaultTransitionConfig } = StackViewTransitionConfigs

      return defaultTransitionConfig(
        transitionProps,
        prevTransitionProps,
        isModal
      )
    },
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerStyle: {
        marginHorizontal: 16,
        borderBottomWidth: 0,
      },
    },
  }
)
