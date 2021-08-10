import React from 'react'
import {
  Switch,
  useRouteMatch,
} from 'react-router-dom'
import Login from 'pages/Auth/Login'
import AuthRoute from 'routes/AuthRoute'
import logoIcon from 'images/logo.png'
import Signup from 'pages/Auth/Signup/Signup'
import GetLink from 'pages/Auth/GetLink'
import GetLinkSuccess from 'pages/Auth/GetLinkSuccess'
import SettupPassword from 'pages/Auth/SettupPassword'
import ActiveUser from 'pages/Auth/ActiveUser'
import ActiveUserSuccess from 'pages/Auth/ActiveUserSuccess'
import classes from './AuthLayout.module.scss'

const AuthLayout = () => {
  const { path } = useRouteMatch()

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <h2 className={classes.title}>
          Let’s make the world more
          {' '}
          <br />
          <span>PRODUCTIVE</span>
          {' '}
          together
        </h2>

      </div>
      <div className={classes.screen}>
        <img src={logoIcon} className={classes.logo} alt="logo" />
        <div className={classes.main}>
          <Switch>
            <AuthRoute path={`${path}/login`} component={Login} />
            <AuthRoute path={`${path}/register`} component={Signup} />
            <AuthRoute path={`${path}/get-link`} component={GetLink} />
            <AuthRoute path={`${path}/get-link-success`} component={GetLinkSuccess} />
            <AuthRoute path={`${path}/change-password`} component={SettupPassword} />
            <AuthRoute path={`${path}/active-user`} component={ActiveUser} />
            <AuthRoute path={`${path}/active-user-success`} component={ActiveUserSuccess} />
          </Switch>
        </div>

      </div>
    </div>
  )
}

export default AuthLayout
