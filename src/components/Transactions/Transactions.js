import React, { useState } from 'react'
import classNames from 'classnames'
import timeIcon from 'images/time.svg'
import timeGrayIcon from 'images/time-gray.svg'
import Dropdown from '../Dropdown'
import ListTransactions from './ListTransactions'
import classes from './Transactions.module.scss'

const Transactions = () => {
  const [show, setShow] = useState(false)
  return (
    <Dropdown
      mainComponent={(
        <a className={classNames(classes.btn, show && classes.active)}>
          <img src={timeIcon} className={classes.timeIcon} alt="icon" />
          <img src={timeGrayIcon} className={classes.timeGrayIcon} alt="icon" />
        </a>
    )}
      childrenComponent={() => (
        <ListTransactions />
      )}
      customMenu={classes.customMenu}
      onToggle={setShow}
    />
  )
}

export default Transactions
