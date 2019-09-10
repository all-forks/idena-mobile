import React from 'react'
import { SafeAreaView, View, StatusBar } from 'react-native'
import PropTypes from 'prop-types'

import { Provider as PaperProvider } from 'react-native-paper'

// eslint-disable-next-line import/no-cycle
import { AppProviders, WithValidation } from '../../../App'

import styles from './styles'

export default function Screen({ children }) {
  return (
    <PaperProvider>
      <AppProviders>
        <View style={styles.full}>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={styles.full}>
            <View style={styles.scrollView}>
              <WithValidation>{children}</WithValidation>
            </View>
          </SafeAreaView>
        </View>
      </AppProviders>
    </PaperProvider>
  )
}

Screen.propTypes = {
  children: PropTypes.element.isRequired,
}
