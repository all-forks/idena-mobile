import { useContext } from 'react'
import { EpochStateContext } from './epoch-context'

export default function useEpochState() {
  const context = useContext(EpochStateContext)
  console.info(context)
  if (context === undefined) {
    throw new Error('EpochStateContext must be in EpochStateProvider')
  }
  return context
}
