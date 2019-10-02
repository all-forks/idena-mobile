// Default imports
// import { SafeAreaView } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { EnterPassword, ImportKey } from '../../containers'

export default createStackNavigator({
  ImportPrivateKey: {
    screen: ImportKey,
    navigationOptions: {
      header: null,
    },
  },
  EnterPassword: {
    screen: EnterPassword,
    navigationOptions: {
      header: null,
    },
  },
  initialRouteName: 'ImportPrivateKey',
})
