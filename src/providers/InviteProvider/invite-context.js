import React, { useEffect, useState, createContext } from 'react'
import PropTypes from 'prop-types'

import { activateInviteCode } from '../../../api'

import useIndentityState from '../IdentityProvider/identity-state'

export const InviteDispatchContext = createContext()
export const InviteStateContext = createContext()

export default function InviteProvider({ children }) {
  const [activationCode, setActivationCode] = useState()
  const [activeTx, setActivatonTx] = useState('')

  const identity = useIndentityState()

  useEffect(() => {}, [])

  async function activateInvite(code) {
    const { address } = identity
    const { result, error } = await activateInviteCode(code, address)

    if (error) {
      throw error
    }

    if (code) {
      setActivationCode(code)
    }

    setActivatonTx(result)
  }

  return (
    <InviteStateContext.Provider value={identity}>
      <InviteDispatchContext.Provider value={{ activateInvite }}>
        {children}
      </InviteDispatchContext.Provider>
    </InviteStateContext.Provider>
  )
}

InviteProvider.propTypes = {
  children: PropTypes.element.isRequired,
}
