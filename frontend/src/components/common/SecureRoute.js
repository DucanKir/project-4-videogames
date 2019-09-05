import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

import Auth from '../../lib/Auth'

const SecureRoute = (props) => {
  if(Auth.isAuthenticated()) return <Route {...props} />
  toast.error('You need to log in to perform this action')
  return <Redirect to="/login" />
}

export default SecureRoute
