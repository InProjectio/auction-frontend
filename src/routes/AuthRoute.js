import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLoggedIn, } from 'utils/utils'

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const firstPath = localStorage.getItem('firstPath')
      if (isLoggedIn()) {
        return <Redirect to={firstPath || '/'} />
      }
      return <Component {...rest} {...props} />
    }}
  />
)

export default AuthRoute
