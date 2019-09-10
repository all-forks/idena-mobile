/* eslint-disable */

import { createBottomTabNavigator, createAppContainer } from 'react-navigation'

const MainNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: () => (
        <Screen>
          <Profile />
          <BeforeValidation />
        </Screen>
      ),
    },
    Contacts: () => (
      <Screen>
        <Text style={{ color: 'white' }}>Contacts</Text>
      </Screen>
    ),
    Chats: () => (
      <Screen>
        <Text style={{ color: 'white' }}>Chats</Text>
      </Screen>
    ),
    Validation: {
      screen: () => (
        <Screen>
          <ValidationProvider>
            <ValidationScreen />
          </ValidationProvider>
        </Screen>
      ),
    },
  },
  {
    defaultNavigationOptions: ({ navigation: { state } }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = state
        const IconComponent = Icon
        let iconName

        switch (routeName) {
          case 'Home':
            iconName = 'home'
            break
          case 'Contacts':
            iconName = 'contacts'
            break
          case 'Wallets':
            iconName = 'account-balance-wallet'
            break
          case 'Chats':
            iconName = 'chat'
            break
          case 'Validation':
            iconName = 'check'
            break
          default:
            break
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: 'rgb(87,143,255)',
      inactiveTintColor: 'rgb(210,212,217)',
    },
  }
)

export default createAppContainer(MainNavigator)
