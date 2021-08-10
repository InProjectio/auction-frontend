import React from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import classNames from 'classnames'
import { NavLink, Link } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import companyIcon from 'images/sidebar/company.svg'
import companyActiveIcon from 'images/sidebar/company_active.svg'
import auctionIcon from 'images/sidebar/auction.svg'
import auctionActiveIcon from 'images/sidebar/auction_active.svg'
import bidIcon from 'images/sidebar/bid.svg'
import bidActiveIcon from 'images/sidebar/bid_active.svg'
import usersIcon from 'images/sidebar/users.svg'
import usersActiveIcon from 'images/sidebar/users_active.svg'
import groupIcon from 'images/sidebar/group-management.svg'
import groupActiveIcon from 'images/sidebar/group-management-active.svg'
import logo from 'images/logo.png'
import logoMobile from 'images/logo-mobile.png'
import createBidding from 'images/create-bidding.svg'
import linkedin from 'images/icons8-linkedin.svg'
import twitter from 'images/icons8-twitter.svg'
import facebook from 'images/icons8-facebook.svg'
import youtube from 'images/icons8-youtube_play_button.svg'
import home from 'images/icons8-dashboard_layout.svg'
import ExpandMenus from './ExpandMenus'

import classes from './SideBar.module.scss'

const messages = defineMessages({
  employeeManagement: {
    id: 'SideBar.employeeManagement',
    defaultMessage: 'Employee Management'
  },
  listEmployee: {
    id: 'SideBar.listEmployee',
    defaultMessage: 'List Employee'
  },
  invaitations: {
    id: 'SideBar.invitations',
    defaultMessage: 'Invitation List'
  },
  requests: {
    id: 'SideBar.requests',
    defaultMessage: 'Request List'
  },
  procerementManagement: {
    id: 'SideBar.procerementManagement',
    defaultMessage: 'Procurement Management'
  },
  biddingInProgess: {
    id: 'SideBar.biddingInProgess',
    defaultMessage: 'Bidding'
  },
  invitingBids: {
    id: 'SideBar.invitingBids',
    defaultMessage: 'Offering Bids'
  },
  bidingHistory: {
    id: 'SideBar.bidingHistory',
    defaultMessage: 'Bidding History'
  },
  groupManagement: {
    id: 'SideBar.groupManagement',
    defaultMessage: 'Group Management'
  },
  biddingGroup: {
    id: 'SideBar.biddingGroup',
    defaultMessage: 'Biding Group'
  },
  invitingGroup: {
    id: 'SideBar.invitingGroup',
    defaultMessage: 'Offerer Group'
  },
  offerreeHistory: {
    id: 'SideBar.offerreeHistory',
    defaultMessage: 'Offeree History'
  },
  offereeManagement: {
    id: 'SideBar.offereeManagement',
    defaultMessage: 'Offeree Management'
  }
})

const SideBar = ({ collapse }) => (
  <div className={classNames(classes.wrapper, collapse && classes.wrapperCollapse, collapse && classes.collapse)}>
    <PerfectScrollbar
      className={classNames(classes.container)}
      options={{ wheelPropagation: false }}
    >
      <div className={classes.menuContainer}>
        <div
          className={classes.logoWrapper}
          onClick={() => {
            window.open('https://app.inproject.io')
          }}
        >
          <img src={logo} className={classes.logo} alt="logo" />
          <img src={logoMobile} className={classes.logoMobile} alt="logo" />
        </div>

        <Link
          className={classes.btnCreateBidding}
          to="/company/auction/form"
        >
          <img src={createBidding} className={classes.createBidding} alt="icon" />
          <span>
            <FormattedMessage
              id="SideBar.createBidding"
              defaultMessage="Create bidding"
            />
          </span>
        </Link>

        <NavLink
          to="/company"
          className={classNames(classes.menuItem, classes.divider)}
          activeClassName={classes.active}
          exact
        >
          <div className={classes.iconWrapper}>
            <img
              src={companyIcon}
              alt="icon"
              className={classes.icon}
            />
            <img
              src={companyActiveIcon}
              alt="icon"
              className={classes.iconActive}
            />
          </div>
          <span>
            <FormattedMessage
              id="SideBar.company"
              defaultMessage="Company Information"
            />
          </span>

        </NavLink>

        <div className={classes.menu}>
          <ExpandMenus
            menu={{
              image: usersIcon,
              imageActive: usersActiveIcon,
              label: messages.employeeManagement,
              value: 'MANAGEMENT_STAFF',
              iconStyle: classes.icon
            }}
            subMenus={[{
              label: messages.listEmployee,
              value: 'STAFFS',
              href: '/company/employees',
              exact: true
            }, {
              label: messages.invaitations,
              value: 'INVITATION',
              href: '/company/employees/inviting',
            }, {
              label: messages.requests,
              value: 'REQUEST',
              href: '/company/employees/requesting',
            }]}
            screen={location.pathname.indexOf('/employees') !== -1 ? 'MANAGEMENT_STAFF' : screen}
            collapse={collapse}
            active={location.pathname.indexOf('/employees') !== -1}
          />
        </div>

        <div className={classes.menu}>
          <ExpandMenus
            menu={{
              image: groupIcon,
              imageActive: groupActiveIcon,
              label: messages.groupManagement,
              value: 'MANAGEMENT_GROUP',
              iconStyle: classes.icon
            }}
            subMenus={[{
              label: messages.invitingGroup,
              value: 'STAFFS',
              href: '/company/group/inviting',
            }, {
              label: messages.biddingGroup,
              value: 'INVITATION',
              href: '/company/group/bidding',
            }]}
            screen={location.pathname.indexOf('/group/') !== -1 ? 'MANAGEMENT_GROUP' : screen}
            collapse={collapse}
            active={location.pathname.indexOf('/group/') !== -1}
          />
        </div>

        <div className={classes.menu}>
          <ExpandMenus
            menu={{
              image: auctionIcon,
              imageActive: auctionActiveIcon,
              label: messages.procerementManagement,
              value: 'procerementManagement',
              iconStyle: classes.icon,
            }}
            subMenus={[{
              label: messages.biddingInProgess,
              value: 'STAFFS',
              href: '/company/auction/bidding',
            }, {
              label: messages.bidingHistory,
              value: 'BIDDING_HISTORY',
              href: '/company/auction/bidding-history',
            }]}
            screen={location.pathname.indexOf('/auction/bidding') !== -1 ? 'procerementManagement' : screen}
            collapse={collapse}
            active={location.pathname.indexOf('/auction/bidding') !== -1}
          />
        </div>

        <div className={classes.menu}>
          <ExpandMenus
            menu={{
              image: bidIcon,
              imageActive: bidActiveIcon,
              label: messages.offereeManagement,
              value: 'offereeManagement',
              iconStyle: classes.icon,
            }}
            subMenus={[{
              label: messages.invitingBids,
              value: 'INVITATION',
              href: '/company/auction/offeree',
            }, {
              label: messages.offerreeHistory,
              value: 'OFFEREE_HISTORY',
              href: '/company/auction/offeree-history',
            }]}
            screen={location.pathname.indexOf('/auction/offeree') !== -1 ? 'offereeManagement' : screen}
            collapse={collapse}
            active={location.pathname.indexOf('/auction/offeree') !== -1}
          />
        </div>
        <div className={classes.space} />

      </div>

    </PerfectScrollbar>
    <div className={classes.bottom}>
      <a
        className={classNames(classes.btn, 'btn btnSmall btnMain')}
        onClick={() => {
          window.open('https://app.inproject.io')
        }}
      >
        <img src={home} className={classes.marketPlaceIcon} alt="icon" />
        <span>
          Dashboard
        </span>
      </a>
      <div className={classes.socials}>
        <a className={classes.social}>
          <img src={linkedin} className={classes.icon} alt="icon" />
        </a>
        <a className={classes.social}>
          <img src={facebook} className={classes.icon} alt="icon" />
        </a>
        <a className={classes.social}>
          <img src={twitter} className={classes.icon} alt="icon" />
        </a>
        <a className={classes.social}>
          <img src={youtube} className={classes.icon} alt="icon" />
        </a>
      </div>
      <p className={classes.copyright}>
        © 2021, InProject All rights reserved.
      </p>
    </div>
  </div>
)

export default SideBar
