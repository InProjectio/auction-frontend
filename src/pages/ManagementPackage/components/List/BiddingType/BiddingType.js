import React from 'react'
import classNames from 'classnames'
import classes from './BiddingType.module.scss'

const BiddingType = ({ type }) => (
  <div className={classNames(classes.container, type === 'PRIVATE' && classes.private)}>
    {type?.toLowerCase()}
  </div>
)

export default BiddingType
