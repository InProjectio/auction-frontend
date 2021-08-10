import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLoggedIn } from 'utils/utils'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isLoggedIn()
      ? <Component {...rest} {...props} />
      : <Redirect to={`/auth/login?redirect=${window.location.pathname}${window.location.search}`} />)}
  />
)

export default PrivateRoute
