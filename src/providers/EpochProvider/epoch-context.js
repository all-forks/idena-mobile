import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import { useInterval } from '../../../lib'
import { callRpc } from '../../../api'

export const EpochStateContext = createContext()
const { Provider } = EpochStateContext
// export const EpochDispatchContext = createContext()

const initialState = null

const EPOCH_GET_REQUEST = 'EPOCH_GET_REQUEST'
const EPOCH_GET_SUCCESS = 'EPOCH_GET_SUCCESS'
const EPOCH_GET_FAILURE = 'EPOCH_GET_FAILURE'

function epochReducer(state = initialState, action) {
  switch (action.type) {
    case EPOCH_GET_REQUEST:
      return { ...state, isFetching: true }
    case EPOCH_GET_SUCCESS:
      return { ...state, isFetching: false, ...action.payload }
    case EPOCH_GET_FAILURE:
      return { ...state, isFetching: false, error: action.payload }
    default:
      return state
  }
}

export default function EpochProvider({ children }) {
  const [state, dispatch] = useReducer(epochReducer, initialState)

  useInterval(
    async () => {
      try {
        const { result, error } = await callRpc('dna_epoch')
        dispatch({ type: EPOCH_GET_SUCCESS, payload: result })
        if (error) {
          dispatch({ type: EPOCH_GET_FAILURE, payload: error })
        }
      } catch (error) {
        console.info(error)
        dispatch({ type: EPOCH_GET_FAILURE, payload: error })
      }
    },
    1 * 1000,
    true
  )

  return <Provider value={state}>{children}</Provider>
}

EpochProvider.propTypes = {
  children: PropTypes.node,
}
