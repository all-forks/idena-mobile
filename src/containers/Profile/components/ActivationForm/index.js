import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import { Input, Button } from '../../../../components'
import { useInviteState } from '../../../../providers/invite-context'

import styles from '../../styles'

export default function ActivationForm({ onPress, onChange }) {
  const { isMining } = useInviteState()

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
        />
      </View>
    </View>
  )
}

ActivationForm.propTypes = {
  onPress: PropTypes.func,
  onChange: PropTypes.func,
}
