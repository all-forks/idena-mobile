import { useContext } from 'react'
import { IdentityStateContext } from './identity-context'

export default function useIdentityState() {
  const context = useContext(IdentityStateContext)
  if (context === undefined) {
    throw new Error('IdentityContext must be in IdentityStateProvider')
  }
  return context
}
