import React from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import classes from './Path.module.scss'

const Path = ({ options }) => (
  <div className={classes.container}>
    { options && options.map((option, i) => (
      <div
        className={classes.option}
        key={i}
      >
        <NavLink
          to={option.to}
          className={classNames(classes.link, option.active && classes.active)}
        >
          { option.name }
        </NavLink>
        { !option.active
            && <span className={classes.splash}>/</span>}

      </div>
    )) }
  </div>
)

export default Path
