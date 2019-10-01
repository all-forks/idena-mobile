import { useContext } from 'react'
import { ChainStateContext } from './chain-context'

export default function useChainState() {
  const context = useContext(ChainStateContext)
  if (context === undefined) {
    throw new Error('Context must be in Context Provider')
  }
  return context
}
