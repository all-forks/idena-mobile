import { useReducer, useRef, useEffect, useCallback } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import reactotron from 'reactotron-react-native'

import { callRpc } from './api'

/**
 * @typedef UseRpcResult
 * @param {string} method Method name
 * @param {string} params: Params
 * @param {string} id: Id
 * @param {string} result: Result
 * @param {string} error: Error, if thrown
 * @param {string} isLoading: Loading state
 * @param {string} isReady: Ready state
 */

/**
 * Call RPC with args
 * @param {string} initialMethod Method name
 * @param  {...any} initialParams Params passed as args
 * @returns {[UseRpcResult, *]} Result
 */
export function useRpc(initialMethod, ...initialParams) {
  const [rpcBody, dispatchRpc] = useReducer(
    (state, [method, ...params]) => ({
      ...state,
      method,
      params,
      id: state.id + 1,
    }),
    {
      method: initialMethod,
      params: initialParams,
      id: 0,
    }
  )

  const [dataState, dataDispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'start':
          return {
            ...state,
            isLoading: true,
            isReady: false,
          }
        case 'done':
          return {
            ...state,
            isLoading: false,
            result: action.result,
            error: action.error,
            isReady: true,
          }
        case 'fail':
          return {
            ...state,
            isLoading: false,
            error: action.error,
            isReady: true,
          }
        default:
          return state
      }
    },
    {
      result: null,
      error: null,
      isLoading: false,
      isReady: false,
    }
  )

  useDeepCompareEffect(() => {
    let ignore = false

    async function fetchData() {
      try {
        const resp = await callRpc(rpcBody.method, ...rpcBody.params)
        if (!ignore) {
          dataDispatch({ type: 'done', ...resp })
        }
      } catch (error) {
        if (!ignore) {
          dataDispatch({ type: 'fail', error })
        }
      }
    }

    if (rpcBody.method) {
      fetchData()
    }

    return () => {
      ignore = true
    }
  }, [rpcBody])

  return [
    { ...dataState, ...rpcBody },
    useCallback((method, ...params) => dispatchRpc([method, ...params]), []),
  ]
}

export function useInterval(callback, delay) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export function usePoll([{ method, params, ...rest }, fetch], delay) {
  useInterval(() => fetch(method, ...params), delay)
  return [{ method, params, ...rest }, fetch]
}

export function useLogger([state, dispatch]) {
  const actionRef = useRef()

  const newDispatchRef = useRef(action => {
    actionRef.current = action
    dispatch(action)
  })

  useEffect(() => {
    const action = actionRef.current
    if (action) {
      reactotron.log(action, state)
    }
  }, [state])

  return [state, newDispatchRef.current]
}

export function useThunk([state, dispatch]) {
  const newDispatchRef = useRef(action => {
    if (typeof action === 'function') {
      action(newDispatchRef.current)
    } else {
      dispatch(action)
    }
  })

  return [state, newDispatchRef.current]
}

export function useTimeout(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setTimeout(tick, delay)
      return () => clearTimeout(id)
    }
  }, [delay])
}
