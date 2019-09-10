import React, { useEffect, useState, createContext } from 'react'
import PropTypes from 'prop-types'

import { usePoll, useRpc } from '../../../lib'

export const IdentityStateContext = createContext()
export const IdentityDispatchContext = createContext()

export default function IdentityProvider({ children }) {
  const [state, setIdentity] = useState(null)
  // const [{ result: identity }] = usePoll(useRpc('dna_identity', 1000 * 5))
  return (
    <IdentityStateContext.Provider value={{}}>
      {children}
    </IdentityStateContext.Provider>
  )
}

IdentityProvider.propTypes = {
  children: PropTypes.element.isRequired,
}
