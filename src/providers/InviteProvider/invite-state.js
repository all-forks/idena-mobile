import { useContext } from 'react'
import { InviteStateContext } from './invite-context'

export default function useInviteState() {
  const context = useContext(InviteStateContext)
  if (context === undefined) {
    throw new Error('InviteStateContext must be within InviteStateProvider')
  }
  return context
}
