import React, { useEffect, useState, createContext } from 'react'
import PropTypes from 'prop-types'

import { activateInviteCode } from '../../../api'

import useIndentityState from '../IdentityProvider/identity-state'

export const InviteDispatchContext = createContext()
export const InviteStateContext = createContext()

export default function InviteProvider({ children }) {
  const [activationCode, setActivationCode] = useState()
  const [activeTx, setActivatonTx] = useState()

  const identity = useIndentityState()

  useEffect(() => {}, [])

  async function activateInvite(code) {
    const { address } = identity
    const response = await activateInviteCode(code, address)

    if (response === undefined) {
      console.log('error', response)
    }

    alert(response)

    if (code) {
      setActivationCode(code)
    }

    setActivatonTx(response)

    console.log(response)
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
