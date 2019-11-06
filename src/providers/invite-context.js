import React, { useState, createContext, useContext } from 'react'

import { activateInviteCode, callRpc } from '../../api'
import { useInterval } from '../../lib'
import { HASH_IN_MEMPOOL } from '../utils/constants/tx'
import { useIdentityState } from './identity-context'

export const InviteDispatchContext = createContext()
export const InviteStateContext = createContext()

// eslint-disable-next-line react/prop-types
export function InviteProvider({ children }) {
  const [activationCode, setActivationCode] = useState()
  const [activeTx, setActivationTx] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [isMining, setMining] = useState(false)

  const { identity } = useIdentityState()

  useInterval(async () => {
    if (activeTx !== '') {
      setMining(true)
      const { result, error } = await callRpc('bcn_transaction', {
        activeTx,
      })

      if (error) {
        setMining(false)
      }

      const isMiningNow = result && result.blockHash === HASH_IN_MEMPOOL

      if (!isMiningNow) {
        setMining(false)
        setActivationTx('')
      }
    }
  })

  async function activateInvite(code) {
    const { address } = identity
    setLoading(true)

    let inviteCode = code

    if (code === '' || code === ' ') {
      inviteCode = undefined
    }

    try {
      const { result, error } = await activateInviteCode(address, inviteCode)

      if (error) {
        console.info(error)
        setLoading(false)
        throw error
      }

      if (code) {
        setActivationCode(code)
      }

      setLoading(false)

      setActivationTx(result)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  return (
    <InviteStateContext.Provider
      value={{ identity, activationCode, isLoading, isMining }}
    >
      <InviteDispatchContext.Provider value={{ activateInvite }}>
        {children}
      </InviteDispatchContext.Provider>
    </InviteStateContext.Provider>
  )
}

export function useInviteState() {
  const context = useContext(InviteStateContext)
  if (context === undefined) {
    throw new Error('InviteStateContext must be within InviteStateProvider')
  }
  return context
}

export function useInviteDispatch() {
  const context = React.useContext(InviteDispatchContext)
  if (context === undefined) {
    throw new Error('useInviteDisptach must be within InviteContextProvider')
  }
  return context
}
