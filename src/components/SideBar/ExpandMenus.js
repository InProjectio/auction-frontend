import React, { useState } from 'react'
import classNames from 'classnames'
import { injectIntl } from 'react-intl'
import { NavLink } from 'react-router-dom'
import Expand from 'react-expand-animated';
import breadcrumb from 'images/breadcrumb.svg'
import classes from './SideBar.module.scss'

const ExpandMenus = ({
  active,
  menu,
  subMenus,
  intl,
  collapse,
}) => {
  const [openSubMenus, setOpenSubMenus] = useState(active)

  return (
    <div className={classNames(collapse && classes.expandMenuCollapse)}>
      <a
        className={classNames(classes.menuItem,
          classes.divider, openSubMenus && classes.expandMenuActive,
          active && classes.active)}
        onClick={() => setOpenSubMenus((prevOpenSubMenus) => !prevOpenSubMenus)}
      >
        <div className={classes.iconWrapper}>
          <img
            className={classNames(classes.icon, menu.iconStyle)}
            src={menu.image}
            alt="img-sidebar"
          />
          <img
            className={classNames(classes.iconActive, menu.iconStyle)}
            src={menu.imageActive}
            alt="img-sidebar"
          />
        </div>

        <span>{intl.formatMessage(menu.label)}</span>
      </a>
      <Expand
        open={openSubMenus}
        duration={300}
      >
        <div className={classes.subMenus}>
          {subMenus && subMenus.map((item) => (
            <div key={item.value}>
              { !item.hide
                && (
                <NavLink
                  to={item.href}
                  className={classNames(classes.menuItem)}
                  activeClassName={classes.active}
                  exact={item.exact}
                >
                  <img src={breadcrumb} className={classes.breadcrumb} alt="icon" />
                  <p className={classes.text}>
                    {intl.formatMessage(item.label)}
                  </p>
                </NavLink>
                )}

            </div>
          ))}
        </div>
      </Expand>
    </div>
  )
}

export default injectIntl(ExpandMenus)
