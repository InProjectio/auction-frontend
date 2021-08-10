import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLoggedIn } from 'utils/utils'

const CompanyPrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (isLoggedIn()) {
        // const pageRoles = localStorage.getItem('pageRoles') ? JSON.parse(localStorage.getItem('pageRoles')) : null
        const companyId = localStorage.getItem('companyId')
        if (!companyId) {
          return <Redirect to="/" />
        }
        return <Component {...rest} {...props} />
      }
      return <Redirect to={`/auth/login?redirect=${window.location.pathname}${window.location.search}`} />
    }}
  />
)

export default CompanyPrivateRoute
