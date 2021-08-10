import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import {
  Switch,
  useRouteMatch,
  Route
} from 'react-router-dom'
import { compose } from 'redux'
import { injectSaga } from 'utils/injectSaga'
import { showNotification } from 'layout/CommonLayout/actions'
// import AdminPrivateRoute from 'routes/AdminPrivateRoute'
import Company from 'pages/Company'
import Employees from 'pages/Employee/Employees'
import Inviting from 'pages/Employee/Inviting'
import Requesting from 'pages/Employee/Requesting'
import ManageGroup from 'pages/ManageGroup'
import { useDispatch } from 'react-redux'
import EntityForm from 'pages/EntityForm'
import BiddingPackageForm from 'pages/BiddingPackageForm'
import ManagementPackage from 'pages/ManagementPackage'
import BiddingManagement from 'pages/BiddingManagement'
import BiddingDetail from 'pages/BiddingDetail'
import saga from './sagas'
import Header from '../../components/Header'
import SideBar from '../../components/SideBar'
import classes from './CompanyLayout.module.scss'
import { getCompany } from './slices'

const CompanyLayout = (props) => {
  const { path } = useRouteMatch()

  const dispatch = useDispatch()

  // console.log(props)

  useEffect(() => {
    dispatch(getCompany())
  }, [])

  /**
   * state quản lý việc show menu hay không
   */
  const [showMenu, setShowMenu] = useState('FULL')
  const [noTransition, setNoTransition] = useState(true)
  const [showMenuClass, setShowMenuClass] = useState(false)

  /**
   * xử lý toggle menu
   */
  const handleToggleMenu = () => {
    let newShowMenu = null
    if (showMenu === 'FULL' || !showMenu) {
      newShowMenu = 'COLLAPSE'
    } else if (showMenu === 'COLLAPSE') {
      newShowMenu = 'FULL'
    }
    localStorage.setItem('showMenu', newShowMenu)
    setShowMenu(newShowMenu)
    setNoTransition(false)
  }

  /**
   * xử lý show menu
   */
  const handleShowMenuMobile = () => {
    setShowMenuClass(true)
  }

  /**
   * xử lý hide menu
   */
  const handleHideMenuMobile = () => {
    setShowMenu(false)
    setTimeout(() => {
      setShowMenuClass(false)
    }, 400)
  }

  return (
    <div
      className={classNames(classes.container)}
      id="outer-container"
    >

      <div className={classNames(classes.sideBar, showMenu === 'COLLAPSE' && classes.sideBarCollapseWrapper)}>
        <SideBar
          {...props}
          screen={screen}
          showMenu={!!showMenu}
          collapse={showMenu === 'COLLAPSE'}
          handleToggleMenu={handleToggleMenu}
          pathname={props.location.pathname}
        />
      </div>

      <div className={classes.content}>
        <div className={classNames(classes.header, showMenu === 'COLLAPSE' && classes.headerCollapse)}>
          <Header
            {...props}
            showMenu
            handleShowMenuMobile={handleShowMenuMobile}
            handleHideMenu={handleHideMenuMobile}
            handleToggleMenu={handleToggleMenu}
            collapse={showMenu === 'COLLAPSE'}
            showMenuClass={showMenuClass}
            showNotification={showNotification}
          />
        </div>
        <div
          className={classNames(classes.main,
            showMenu === 'FULL' && classes.showMenu,
            showMenu === 'COLLAPSE' && classes.showMenuCollapse,
            noTransition && classes.noTransition)}
          id="page-wrap"
        >
          <Switch>
            <Route path={`${path}`} component={Company} exact />
            <Route path={`${path}/employees`} component={Employees} exact />
            <Route path={`${path}/employees/inviting`} component={Inviting} />
            <Route path={`${path}/employees/requesting`} component={Requesting} exact />
            <Route
              path={`${path}/group/inviting`}
              render={(props) => (
                <ManageGroup {...props} entityType="TENDERER" />
              )}
            />
            <Route
              path={`${path}/group/bidding`}
              render={(props) => (
                <ManageGroup {...props} entityType="BIDDING" />
              )}
            />
            <Route path={`${path}/group/form`} component={EntityForm} exact />
            <Route path={`${path}/group/form/:entityId`} component={EntityForm} />
            <Route path={`${path}/auction/form`} component={BiddingPackageForm} exact />
            <Route path={`${path}/auction/form/:packageId`} component={BiddingPackageForm} />

            <Route
              path={`${path}/auction/bidding`}
              render={(props) => (
                <BiddingManagement {...props} type="BIDDING" />
              )}
            />

            <Route
              path={`${path}/auction/bidding-history`}
              render={(props) => (
                <BiddingManagement {...props} type="HISTORY" />
              )}
            />

            <Route
              path={`${path}/auction/offeree`}
              render={(props) => (
                <ManagementPackage {...props} type="INVITING" />
              )}
            />
            <Route
              path={`${path}/auction/offeree-history`}
              render={(props) => (
                <ManagementPackage {...props} type="HISTORY" />
              )}
            />
            <Route
              path={`${path}/auction/package-detail/:packageId`}
              render={(props) => (
                <BiddingDetail {...props} type="OFFEREE" />
              )}
            />
          </Switch>
        </div>
      </div>

    </div>
  )
}

const withSaga = injectSaga({ key: 'companyLayout', saga });

const ComposeCompanyLayout = compose(withSaga)(CompanyLayout)

export default ComposeCompanyLayout
