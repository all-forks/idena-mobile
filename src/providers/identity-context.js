import React, { useEffect, useReducer, createContext, useContext } from 'react'

import { callRpc } from '../../api'
import { useInterval } from '../../lib'

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

const IdentityStateContext = createContext()
const IdentityDispatchContext = createContext()

const IDENTITY_GET_REQUEST = 'IDENTITY_GET_REQUEST'
const IDENTITY_GET_SUCCESS = 'IDENTITY_GET_SUCCESS'
const IDENTITY_GET_FAILURE = 'IDENTITY_GET_FAILURE'

const initialState = {
  flipKeyWordPairs: [],
}

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

// eslint-disable-next-line react/prop-types
export function IdentityProvider({ children }) {
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
      <IdentityDispatchContext.Provider value={dispatch}>
        {children}
      </IdentityDispatchContext.Provider>
    </IdentityStateContext.Provider>
  )
}

export function useIdentityState() {
  const context = useContext(IdentityStateContext)
  if (context === undefined) {
    throw new Error('IdentityContext must be in IdentityStateProvider')
  }
  return context
}

export function useIdentityDispatch() {
  const context = useContext(IdentityDispatchContext)
  if (context === undefined) {
    throw new Error('IdentityDispatchContext must be within IdentityProvider')
  }
  return context
}
