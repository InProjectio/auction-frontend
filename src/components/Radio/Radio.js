import React from 'react'
import classNames from 'classnames'
import classes from './Radio.module.scss'

const Radio = ({ active }) => (
  <div className={classNames(classes.container, active && classes.active)}>
    { active && <div className={classes.circle} />}
  </div>
)

export default Radio
