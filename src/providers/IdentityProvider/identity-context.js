import React, { useEffect, useState, createContext } from 'react'
import PropTypes from 'prop-types'

import { usePoll, useRpc } from '../../../lib'

import { callRpc } from '../../../api'

export const IdentityStateContext = createContext()
export const IdentityDispatchContext = createContext()

export default function IdentityProvider({ children }) {
  const [identity, setIdentity] = useState(null)

  useEffect(() => {
    async function fetchIdentity() {
      const { result } = await callRpc('dna_identity')

      if (result) {
        setIdentity(result)
      }
    }

    fetchIdentity()
  }, [])

  return (
    <IdentityStateContext.Provider value={identity}>
      {children}
    </IdentityStateContext.Provider>
  )
}

IdentityProvider.propTypes = {
  children: PropTypes.element.isRequired,
}
