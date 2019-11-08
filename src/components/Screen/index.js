import React from 'react'
import { View, StatusBar } from 'react-native'
import PropTypes from 'prop-types'

import { Provider as PaperProvider } from 'react-native-paper'

import { AppProviders, WithValidation } from '../../../App'

import styles from './styles'

export default function Screen({ children }) {
  return (
    <PaperProvider>
      <AppProviders>
        <View style={styles.full}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.scrollView}>
            <WithValidation>{children}</WithValidation>
          </View>
        </View>
      </AppProviders>
    </PaperProvider>
  )
}

Screen.propTypes = {
  children: PropTypes.element.isRequired,
}
