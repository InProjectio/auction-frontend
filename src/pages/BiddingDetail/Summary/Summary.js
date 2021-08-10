import React from 'react'
import BiddingType from 'pages/ManagementPackage/components/List/BiddingType'
import Status from 'pages/ManagementPackage/components/List/Status'
import eyeIcon from 'images/eye.svg'
import moment from 'moment'
import history from 'utils/history'
import defaultCompanyLogo from 'images/defaultLogoCompany.jpg'
import classes from './Summary.module.scss'

const Summary = ({ detail }) => (
  <div className={classes.summary}>
    <div
      className={classes.logoWrapper}
      onClick={() => {
        history.push(`/entity-detail/${detail.offeree._id}`)
      }}
    >
      <img className={classes.logo} alt="logo" src={detail?.company?.logo || defaultCompanyLogo} />
    </div>

    <div className={classes.info}>
      <div className={classes.row}>
        <a
          className={classes.entityName}
          onClick={() => {
            history.push(`/entity-detail/${detail.offeree._id}`)
          }}
        >
          { detail.offeree?.entityName }
        </a>
        <BiddingType type={detail.biddingType} />
        <Status status={detail.status} />
      </div>

      <p className={classes.packageName}>
        { detail.packageName }
      </p>

    </div>

    <div className={classes.right}>
      <p className={classes.info}>
        Notification form:
        {' '}
        <b>First time</b>
      </p>
      <p className={classes.info}>
        Posting time:

        {' '}
        <b>{moment(detail.createdAt).format('MM/DD/YYYY')}</b>
      </p>
      <p className={classes.info}>
        Bidding ID:
        {' '}
        <b>{detail._id}</b>
      </p>
      <div className={classes.view}>
        <img src={eyeIcon} className={classes.eyeIcon} alt="eye" />
        Views:
        {' '}
        <b>{detail.totalViews}</b>
      </div>
    </div>

  </div>
)

export default Summary
