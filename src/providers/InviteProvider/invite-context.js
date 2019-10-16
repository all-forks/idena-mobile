import React, { useEffect, useState, createContext } from 'react'
import PropTypes from 'prop-types'

import { activateInviteCode, callRpc } from '../../../api'
import { useInterval } from '../../../lib'
import { HASH_IN_MEMPOOL } from '../../utils/constants/tx'

import useIndentityState from '../IdentityProvider/identity-state'

export const InviteDispatchContext = createContext()
export const InviteStateContext = createContext()

export default function InviteProvider({ children }) {
  const [activationCode, setActivationCode] = useState()
  const [activeTx, setActivatonTx] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [isMining, setMining] = useState(false)

  const { identity } = useIndentityState()

  useEffect(() => {}, [])

  useInterval(async () => {
    if (activeTx && !isMining) {
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
        setLoading(false)
        throw error
      }

      if (code) {
        setActivationCode(code)
      }

      setLoading(false)

      setActivatonTx(result)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  return (
    <InviteStateContext.Provider value={{ identity, isLoading, isMining }}>
      <InviteDispatchContext.Provider value={{ activateInvite }}>
        {children}
      </InviteDispatchContext.Provider>
    </InviteStateContext.Provider>
  )
}

InviteProvider.propTypes = {
  children: PropTypes.element.isRequired,
}
