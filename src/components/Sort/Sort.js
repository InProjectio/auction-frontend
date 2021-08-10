import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import classes from './Sort.module.scss'

const Sort = (props) => {
  const { sortType, active } = props
  return (
    <div className={classes.container}>
      <FontAwesomeIcon
        icon={faArrowUp}
        className={classNames(classes.icon, active && sortType === 'asc' && classes.active)}
      />
      <FontAwesomeIcon
        icon={faArrowDown}
        className={classNames(classes.iconRight, active && sortType === 'desc' && classes.active)}
      />
    </div>
  )
}

export default Sort
