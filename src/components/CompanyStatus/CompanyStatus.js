import React from 'react'
import classNames from 'classnames'
import verify from 'images/verify.svg'
import unverify from 'images/unverify.svg'
import classes from './CompanyStatus.module.scss'

const CompanyStatus = ({ status }) => (
  <div className={classNames(classes.container, status === 'UNVERIFY' && classes.unverify)}>
    <img src={status === 'UNVERIFY' ? unverify : verify} className={classes.icon} alt="icon" />
    <p className={classes.text}>
      {status === 'UNVERIFY' ? 'Unverify' : 'Verify'}
    </p>
  </div>
)

export default CompanyStatus
