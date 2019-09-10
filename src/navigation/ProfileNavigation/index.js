import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Profile from '../../containers/Profile'

import { Screen } from '../../components'

const ProfileContainer = () => (
  <Screen>
    <Profile />
  </Screen>
)
export default createStackNavigator({
  Profile: {
    // eslint-disable-next-line react/display-name
    screen: ProfileContainer,
    navigationOptions: {
      headerStyle: {
        marginHorizontal: 16,
        borderBottomWidth: 0,
      },
      headerRight: (
        <View>
          <Icon name="sort" size={20} color="rgb(87,143,255)" />
        </View>
      ),
    },
  },
})
