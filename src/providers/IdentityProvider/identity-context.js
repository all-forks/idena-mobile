import React, { useEffect, useReducer, createContext } from 'react'
import PropTypes from 'prop-types'

import { useInterval } from '../../../lib'

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

const IDENTITY_GET_REQUEST = 'IDENTITY_GET_REQUEST'
const IDENTITY_GET_SUCCESS = 'IDENTITY_GET_SUCCESS'
const IDENTITY_GET_FAILURE = 'IDENTITY_GET_FAILURE'

const initialState = null

function identityReducer(state, action) {
  switch (action.type) {
    case IDENTITY_GET_REQUEST:
      return { ...state, isFetching: true }
    case IDENTITY_GET_SUCCESS:
      return { ...state, isFetching: false, ...action.payload }
    case IDENTITY_GET_FAILURE:
      return { ...state, isFetching: false, error: action.payload }
    default:
      return state
  }
}

export default function IdentityProvider({ children }) {
  const [state, dispatch] = useReducer(identityReducer, initialState)

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: IDENTITY_GET_REQUEST })

      try {
        const { result, error } = await callRpc('dna_identity')

        if (error) {
          dispatch({ type: IDENTITY_GET_FAILURE, payload: error })
          return
        }

        dispatch({ type: IDENTITY_GET_SUCCESS, payload: result })
      } catch (error) {
        console.info(error)
        dispatch({ type: IDENTITY_GET_FAILURE, payload: error })
      }
    }

    fetchData()
  }, [])

  useInterval(async () => {
    dispatch({ type: IDENTITY_GET_REQUEST })

    try {
      const { result, error } = await callRpc('dna_identity')
      console.info(result)
      if (error) {
        dispatch({ type: IDENTITY_GET_FAILURE, payload: error })
        return
      }

      dispatch({ type: IDENTITY_GET_SUCCESS, payload: result })
    } catch (error) {
      console.info(error)
      dispatch({ type: IDENTITY_GET_FAILURE, payload: error })
    }
  }, 1000)

  const canSubmitFlip =
    state &&
    [
      IdentityStatus.Candidate,
      IdentityStatus.Newbie,
      IdentityStatus.Verified,
    ].includes(state.state) &&
    state.requiredFlips > 0 &&
    (state.flips || []).length < state.requiredFlips

  const canActivateInvite = [
    IdentityStatus.Undefined,
    IdentityStatus.Killed,
    IdentityStatus.Invite,
  ].includes(state && state.state)

  const canValidate =
    state &&
    [
      IdentityStatus.Candidate,
      IdentityStatus.Newbie,
      IdentityStatus.Verified,
      IdentityStatus.Suspended,
      IdentityStatus.Zombie,
    ].includes(state.state)

  const canMine =
    state &&
    [IdentityStatus.Newbie, IdentityStatus.Verified].includes(state.state)

  const killMe = () => {
    // const { result, error } = killIdentity(state.address)
    // if (result) {
    //   setIdentity({ ...identity, state: IdentityStatus.Killed })
    // } else {
    //   throw new Error(error.message)
    // }
  }

  return (
    <IdentityStateContext.Provider
      value={{
        identity: state,
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
