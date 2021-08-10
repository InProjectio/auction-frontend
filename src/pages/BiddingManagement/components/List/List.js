import React from 'react'
import history from 'utils/history'
import defaultLogoCompany from 'images/defaultLogoCompany.jpg'
import eyeIcon from 'images/eye.svg'
import defaultAvatar from 'images/defaultAvatar.svg'
import moment from 'moment'
import Status from 'pages/ManagementPackage/components/List/Status'
import { FormattedMessage } from 'react-intl'
import classes from './List.module.scss'

const List = ({ data, setSelectedBidding }) => (
  <div className={classes.container}>
    { data && data.map((item) => (
      <div
        key={item._id}
        className={classes.item}

      >
        <div
          className={classes.left}
          onClick={() => {
            history.push(`/package-detail/${item.package._id}`)
          }}
        >
          <h2 className={classes.packageName}>
            { item.package?.packageName }
          </h2>
          <div className={classes.content}>
            <div className={classes.logoWrapper}>
              <img src={item.package?.company?.logo || defaultLogoCompany} className={classes.logo} alt="logo" />
            </div>
            <div className={classes.info}>

              <p className={classes.entity}>
                { item.package?.company?.companyName }
                {' '}
                |
                {' '}
                { item.package?.offeree?.entityName }
              </p>
              <p className={classes.text}>
                {item.package?.field}
                {' '}
                •
                {' '}
                {item.package?.contractType}
                {' '}
                •
                {' '}
                {item.package?.foundingSource}

              </p>
            </div>

          </div>

          <div className={classes.bottom}>
            <div className={classes.row}>
              <p className={classes.info}>
                Posting time:
                {' '}
                <b>{moment(item.package?.createAt).format('MM/DD/YYYY')}</b>
              </p>
              <div className={classes.view}>
                <img src={eyeIcon} className={classes.eyeIcon} alt="view-icon" />
                Views:
                <b>{item.package?.totalViews}</b>
              </div>
            </div>
            <Status status={item.package?.status} />
          </div>
        </div>

        <div className={classes.right}>
          <div className={classes.row}>
            <img src={item.userCreated?.user?.avatar_url || defaultAvatar} className={classes.avatar} alt="avatar" />
            <div className={classes.info}>
              <p className={classes.label}>
                <FormattedMessage
                  id="submittedBy"
                  defaultMessage="Submitted by"
                />
              </p>
              <p className={classes.name}>
                {item.userCreated?.user?.fullname || item.userCreated?.user?.email || 'No name'}
              </p>
            </div>
          </div>
          <div className={classes.rowBetween}>
            <p className={classes.smallLabel}>
              <FormattedMessage
                id="executionPeriod"
                defaultMessage="Execution period"
              />
            </p>
            <p className={classes.value}>
              {item.numberActionDay}
              {' '}
              days
            </p>
          </div>
          <div className={classes.rowBetween}>
            <p className={classes.smallLabel}>
              <FormattedMessage
                id="cost"
                defaultMessage="Cost"
              />
            </p>
            <p className={classes.value}>
              {item.cost}
              {' '}
              $
            </p>
          </div>
          <div className={classes.rowBetween}>
            <p className={classes.smallLabel}>
              <FormattedMessage
                id="attachmentFile"
                defaultMessage="Attachment file"
              />
            </p>
            <p className={classes.value}>
              {item.attackFiles.length}
              {' '}
              files
            </p>
          </div>
          <div className={classes.rowBetween}>
            <div>
              <p className={classes.smallLabel}>
                <FormattedMessage
                  id="submittedTime"
                  defaultMessage="Submit time"
                />
              </p>
              <p className={classes.value}>
                { moment(item.createAt).format('MM/DD/YYYY') }
              </p>
            </div>

            <a
              className="btn btnSmall btnMain"
              onClick={() => setSelectedBidding(item)}
            >
              Edit
            </a>
          </div>
        </div>
      </div>
    )) }
  </div>
)

export default List
