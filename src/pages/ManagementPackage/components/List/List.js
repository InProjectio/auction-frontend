import React from 'react'
import history from 'utils/history'
import defaultLogoCompany from 'images/defaultLogoCompany.jpg'
import eyeIcon from 'images/eye.svg'
import moment from 'moment'
import classes from './List.module.scss'
import Status from './Status'

const List = ({ data, fromMarketPlace }) => (
  <div className={classes.container}>
    { data && data.map((item) => (
      <div
        key={item._id}
        className={classes.item}
        onClick={() => {
          if (fromMarketPlace) {
            history.push(`/package-detail/${item._id}`)
          } else {
            history.push(`/company/auction/package-detail/${item._id}`)
          }
        }}
      >
        <div className={classes.content}>
          <div className={classes.logoWrapper}>
            <img src={item.company?.logo || defaultLogoCompany} className={classes.logo} alt="logo" />
          </div>
          <div className={classes.info}>
            <h2 className={classes.packageName}>
              { item.packageName }
            </h2>
            <p className={classes.entity}>
              { item.company?.companyName }
              {' '}
              |
              {' '}
              { item.offeree?.entityName }
            </p>
            <p className={classes.text}>
              {item.field}
              {' '}
              •
              {' '}
              {item.contractType}
              {' '}
              •
              {' '}
              {item.foundingSource}

            </p>
          </div>

          <Status status={item.status} />
        </div>

        <div className={classes.bottom}>
          <div className={classes.left}>
            <p className={classes.info}>
              Posting time:
              {' '}
              <b>{moment(item.createAt).format('MM/DD/YYYY')}</b>
            </p>
            <div className={classes.view}>
              <img src={eyeIcon} className={classes.eyeIcon} alt="view-icon" />
              Views:
              <b>{item.totalViews}</b>
            </div>
          </div>
          <p className={classes.totalBidders}>
            Total bidders:
            {' '}
            { item.biddings.length }
          </p>
        </div>
      </div>
    )) }
  </div>
)

export default List
