import { useReducer, useRef, useEffect } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import reactotron from 'reactotron-react-native'
import { URL } from './config'

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
            isReady: true,
          }
        case 'fail':
          return {
            ...state,
            isLoading: false,
            error: action.error.message,
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
    }
  )

  useDeepCompareEffect(() => {
    let ignore = false

    async function fetchData() {
      try {
        const resp = await fetch(URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(rpcBody),
        })
        const json = await resp.json()
        if (!ignore) {
          dataDispatch({ type: 'done', ...json })
        }
      } catch (error) {
        if (!ignore) {
          dataDispatch({ type: 'error', error })
        }
      }
    }

    if (rpcBody.method) {
      fetchData(ignore)
    }

    return () => {
      ignore = true
    }
  }, [rpcBody])

  return [
    dataState,
    rpcBody,
    (method, ...params) => dispatchRpc([method, ...params]),
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

export function usePoll([state, rpcBody, callRpc], delay) {
  useInterval(() => callRpc(rpcBody.method, ...rpcBody.params), delay)
  return [state, rpcBody, callRpc]
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
      reactotron.log(action)
      reactotron.log(state)
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
