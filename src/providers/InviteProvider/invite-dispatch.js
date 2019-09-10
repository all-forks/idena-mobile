import React from 'react'
import { InviteDispatchContext } from './invite-context'

export default function useInviteDispatch() {
  const context = React.useContext(InviteDispatchContext)
  if (context === undefined) {
    throw new Error('useInviteDisptach must be within InviteContextProvider')
  }
  return context
}
