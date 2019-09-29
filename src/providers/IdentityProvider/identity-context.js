import React, { useEffect, useState, createContext } from 'react'
import PropTypes from 'prop-types'

import { usePoll, useRpc } from '../../../lib'

import { callRpc } from '../../../api'
import { killIdentity } from '../../api'

export const IdentityStatus = {
  Undefined: 'Undefined',
  Invite: 'Invite',
  Candidate: 'Candidate',
  Newbie: 'Newbie',
  Verified: 'Verified',
  Suspended: 'Suspended',
  Zombie: 'Zombie',
  Killed: 'Killed',
}

export const IdentityStateContext = createContext()
export const IdentityDispatchContext = createContext()

export default function IdentityProvider({ children }) {
  const [identity, setIdentity] = useState({
    flipKeyWordPairs: [
      {
        words: [2000, 1377],
        used: true,
        id: 0,
      },
      {
        words: [2210, 3223],
        used: false,
        id: 1,
      },
      {
        words: [176, 2865],
        used: false,
        id: 2,
      },
      {
        words: [998, 1263],
        used: false,
        id: 3,
      },
      {
        words: [328, 2101],
        used: false,
        id: 4,
      },
      {
        words: [1350, 427],
        used: false,
        id: 5,
      },
      {
        words: [504, 2537],
        used: false,
        id: 6,
      },
      {
        words: [2342, 1979],
        used: false,
        id: 7,
      },
      {
        words: [1952, 2221],
        used: false,
        id: 8,
      },
    ],
  })

  useEffect(() => {
    async function fetchIdentity() {
      const { result } = await callRpc('dna_identity')

      if (result) {
        console.info(result)
        setIdentity(result)
      }
    }

    fetchIdentity()
  }, [])

  const canSubmitFlip =
    identity &&
    [
      IdentityStatus.Candidate,
      IdentityStatus.Newbie,
      IdentityStatus.Verified,
    ].includes(identity.state) &&
    identity.requiredFlips > 0 &&
    (identity.flips || []).length < identity.requiredFlips

  const canActivateInvite = [
    IdentityStatus.Undefined,
    IdentityStatus.Killed,
    IdentityStatus.Invite,
  ].includes(identity && identity.state)

  const canValidate =
    identity &&
    [
      IdentityStatus.Candidate,
      IdentityStatus.Newbie,
      IdentityStatus.Verified,
      IdentityStatus.Suspended,
      IdentityStatus.Zombie,
    ].includes(identity.state)

  const canMine =
    identity &&
    [IdentityStatus.Newbie, IdentityStatus.Verified].includes(identity.state)

  const killMe = () => {
    const { result, error } = killIdentity(identity.address)
    if (result) {
      setIdentity({ ...identity, state: IdentityStatus.Killed })
    } else {
      throw new Error(error.message)
    }
  }

  return (
    <IdentityStateContext.Provider
      value={{
        ...identity,
        canSubmitFlip,
        canActivateInvite,
        canValidate,
        canMine,
      }}
    >
      <IdentityDispatchContext.Provider value={{ killMe }}>
        {children}
      </IdentityDispatchContext.Provider>
    </IdentityStateContext.Provider>
  )
}

IdentityProvider.propTypes = {
  children: PropTypes.element.isRequired,
}
