import React, { useEffect, useReducer, createContext } from 'react'

import { usePoll, useRpc, useInterval } from '../../../lib'

import { fetchNodeState } from '../../api'

const FETCH_SYNC_REQUEST = 'FETCH_SYNC_REQUEST'
const FETCH_SYNC_SUCCESS = 'FETCH_SYNC_SUCCESS'
const FETCH_SYNC_FAILED = 'FETCH_SYNC_FAILED'

const initialState = {
  offline: null,
  syncing: null,
  currentBlock: null,
  highestBlock: null,
  progress: null,
  isFetching: false,
}

function chainReducer(state, action) {
  switch (action.type) {
    case FETCH_SYNC_REQUEST: {
      return {
        ...state,
        isFetching: true,
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
        isFetching: false,
      }
    }
    default: {
      throw new Error(`Unknown action ${action.type}`)
    }
  }
}

function ChainProvider({ children }) {
  const [state, dispatch] = useReducer(chainReducer, initialState)

  useEffect()

  useInterval(async () => {
    try {
      const sync = await fetchNodeState()
      dispatch({ type: FETCH_SYNC_SUCCESS, payload: sync })
    } catch (error) {
      dispatch({ type: FETCH_SYNC_FAILED })
    }
  })
}
