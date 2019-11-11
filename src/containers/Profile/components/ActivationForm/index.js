import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import { Input, Button } from '../../../../components'
import { useInviteState } from '../../../../providers/invite-context'

import styles from '../../styles'

export default function ActivationForm({ onActivate }) {
  const { isMining } = useInviteState()
  const [code, setCode] = React.useState()
  return (
    <View style={styles.formContainer}>
      <View style={styles.formActionsHandlers}>
        <View style={{ marginBottom: 16 }}>
          <Input
            placeholder="Invitation code"
            style={{ width: '100%' }}
            onChange={setCode}
            value={code}
          />
        </View>
        <Button
          onPress={() => onActivate(code)}
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
