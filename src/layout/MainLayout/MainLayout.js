import React from 'react'
import Header from 'components/Header'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
// import HomePage from 'pages/HomePage'
import RegisterCompany from 'pages/RegisterCompany'
import AdminPrivateRoute from 'routes/AdminPrivateRoute'
import AcceptInvite from 'pages/AcceptInvite'
import ChangePassword from 'pages/ChangePassword/ChangePassword'
import MyAccount from 'pages/MyAccount'
import ChatPage from 'pages/ChatPage'
import BiddingDetail from 'pages/BiddingDetail'
import MarketPlace from 'pages/MarketPlace'
import EntityDetail from 'pages/EntityDetail'
import classes from './MainLayout.module.scss'

const MainLayout = () => {
  const { path } = useRouteMatch()
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Header showLogo />
      </div>
      <div className={classes.content}>
        <Switch>
          <Route path={`${path}`} component={MarketPlace} exact />
          <Route path={`${path}market-place`} component={MarketPlace} />
          <Route path={`${path}register-company`} component={RegisterCompany} exact />
          <AdminPrivateRoute path={`${path}accept-invite/:token`} component={AcceptInvite} />
          <AdminPrivateRoute path={`${path}settings/change-password`} component={ChangePassword} />
          <AdminPrivateRoute path={`${path}settings/account`} component={MyAccount} />
          <AdminPrivateRoute path={`${path}chat`} component={ChatPage} />
          <Route path={`${path}package-detail/:packageId`} component={BiddingDetail} />
          <Route path={`${path}entity-detail/:entityId`} component={EntityDetail} />
        </Switch>
      </div>
    </div>
  )
}

export default MainLayout
