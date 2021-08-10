import React from 'react'
import classNames from 'classnames'
import classes from './MenuButton.module.scss'

const MenuButton = (props) => {
  const { handleToggleMenu, active, color } = props
  return (
    <div className={classNames(classes.container,
      active && classes.active,
      color === 'white' && classes.white)}
    >
      <button
        className={classNames(classes.hamburger, classes.closeSidebarBtn, classes.hamburgerElastic)}
        onClick={handleToggleMenu}
      >
        <span className={classes.hamburgerBox}>
          <span className={classes.hamburgerInner} />
        </span>
      </button>
    </div>
  )
}

export default MenuButton
