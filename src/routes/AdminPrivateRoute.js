import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLoggedIn } from 'utils/utils'

const AdminPrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (isLoggedIn()) {
        // const pageRoles = localStorage.getItem('pageRoles') ? JSON.parse(localStorage.getItem('pageRoles')) : null
        const roles = localStorage.getItem('roles')
        if (roles === 'CUSTOMER') {
          return <Redirect to="/" />
        }
        return <Component {...rest} {...props} />
      }
      return <Redirect to={`/auth/login?redirect=${window.location.pathname}${window.location.search}`} />
    }}
  />
)

export default AdminPrivateRoute
