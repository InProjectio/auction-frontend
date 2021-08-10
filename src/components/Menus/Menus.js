import React from 'react'
import { NavLink } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import classNames from 'classnames'
import classes from './Menus.module.scss'

const Menus = (props) => {
  const { options, intl, mw1200, id } = props
  return (
    <div className={classNames(classes.container, mw1200 && classes.mw1200)}>
      <div className={classes.navs}>
        { options.map((option) => (
          <NavLink
            key={option.value}
            className={classes.nav}
            activeClassName={classes.active}
            to={id ? `${option.href}?id=${id}` : option.href}
            exact={option.exact}
          >
            <span>
              { intl.formatMessage(option.label) }
            </span>
          </NavLink>

        )) }
      </div>
    </div>
  )
}

export default injectIntl(Menus)
