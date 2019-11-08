import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import { Input, Button } from '../../../../components'
import { useInviteState } from '../../../../providers/invite-context'

import styles from '../../styles'

export default function ActivationForm({ onActivate }) {
  const { isMining } = useInviteState()
  const inputRef = React.useRef()
  return (
    <View style={styles.formContainer}>
      <View style={styles.formActionsHandlers}>
        <View style={{ marginBottom: 16 }}>
          <Input
            placeholder="Invitation code"
            style={{ width: '100%' }}
            ref={inputRef}
          />
        </View>
        <Button
          onPress={() => onActivate(inputRef.current.target.value)}
          title={isMining ? 'Mining...' : 'Activate'}
          disabled={isMining}
        />
      </View>
    </View>
  )
}

ActivationForm.propTypes = {
  onActivate: PropTypes.func,
}
