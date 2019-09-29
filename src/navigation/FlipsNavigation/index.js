// Default imports
// import { SafeAreaView } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { Flip } from '../../containers'

export default createStackNavigator({
  Flip: {
    screen: Flip,
    navigationOptions: {
      header: null,
    },
  },
})
