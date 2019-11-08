import React, { useReducer, createContext, useContext } from 'react'

import { useInterval } from '../../lib'

import { callRpc } from '../../api'

const FETCH_SYNC_REQUEST = 'FETCH_SYNC_REQUEST'
const FETCH_SYNC_SUCCESS = 'FETCH_SYNC_SUCCESS'
const FETCH_SYNC_FAILED = 'FETCH_SYNC_FAILED'

const ChainStateContext = createContext()
const { Provider } = ChainStateContext

const initialState = {
  offline: null,
  syncing: null,
  currentBlock: null,
  highestBlock: null,
  progress: null,
}

function chainReducer(state, action) {
  switch (action.type) {
    case FETCH_SYNC_REQUEST: {
      return {
        ...state,
        offline: false,
        syncing: false,
      }
    }
    case FETCH_SYNC_SUCCESS: {
      const { syncing, currentBlock, highestBlock } = action.payload
      return {
        ...state,
        currentBlock,
        highestBlock,
        syncing,
        offline: false,
      }
    }
    case FETCH_SYNC_FAILED: {
      return {
        ...state,
        syncing: false,
        offline: true,
      }
    }
    default: {
      throw new Error(`Unknown action ${action.type}`)
    }
  }
}

// eslint-disable-next-line react/prop-types
export function ChainProvider({ children }) {
  const [state, dispatch] = useReducer(chainReducer, initialState)

  function fetchSuccess(sync) {
    dispatch({ type: FETCH_SYNC_SUCCESS, payload: sync })
  }

  function fetchFailed() {
    dispatch({ type: FETCH_SYNC_FAILED })
  }

  useInterval(
    async () => {
      try {
        const { result, error } = await callRpc('bcn_syncing')
        if (error) {
          fetchFailed()
        } else {
          fetchSuccess(result)
        }
      } catch (error) {
        fetchFailed()
      }
    },
    !state.offline && state.syncing ? 1000 * 1 : 5000 * 1,
    true
  )

  return <Provider value={state}>{children}</Provider>
}

export function useChainState() {
  const context = useContext(ChainStateContext)
  if (context === undefined) {
    throw new Error('Context must be in Context Provider')
  }
  return context
}

export function useChain() {
  return [useChainState()]
}
