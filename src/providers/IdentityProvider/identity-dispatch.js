import { useContext } from 'react'
import { IdentityDispatchContext } from './identity-context'

export default function useIdentityDispatch() {
  const context = useContext(IdentityDispatchContext)
  if (context === undefined) {
    throw new Error('IdentityDispatchContext must be within IdentityProvider')
  }
  return context
}
