import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import { Input, Button } from '../../../../components'
import { useInviteState } from '../../../../providers'

import styles from '../../styles'

export default function ActivationForm({ onPress, onChange, inputValue }) {
  const { isLoading, isMining } = useInviteState()

  return (
    <View style={styles.formContainer}>
      <View style={styles.formActionsHandlers}>
        <View style={{ marginBottom: 16 }}>
          <Input
            onChange={onChange}
            placeholder="Invitation code"
            style={{ width: '100%' }}
          />
        </View>
        <Button
          onPress={() => onPress()}
          title={isMining ? 'Mining...' : 'Activate'}
          disabled={isMining}
          // loading={isLoading}
        />
      </View>
    </View>
  )
}

ActivationForm.propTypes = {
  onPress: PropTypes.func,
  onChange: PropTypes.func,
  inputValue: PropTypes.string,
}
