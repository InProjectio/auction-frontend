import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import { formatStringToNumber, getFileName } from 'utils/utils'
import FileType from 'components/DropzoneUploader/FileType'
import { Link } from 'react-router-dom'
import chatIcon from 'images/chat-2.svg'
import history from 'utils/history'
import defaultCompanyLogo from 'images/defaultLogoCompany.jpg'
import Sort from 'components/Sort'
import { orderBy } from 'lodash'
import classes from './Bidders.module.scss'

const Bidders = ({ biddings, type }) => {
  const [bidders, setBidders] = useState(biddings)
  const [sort, setSort] = useState({})

  useEffect(() => {
    setBidders(biddings)
  }, [biddings])

  return (
    <div className={classNames('table-responsive table')}>
      <table className="table table-borderless">
        <thead>
          <tr className="tbHead">
            <th>
              <FormattedMessage
                id="Bidders.bidderName"
                defaultMessage="Bidder name"
              />
            </th>
            <th>
              <a onClick={() => {
                const sortType = (sort.sort === 'createdAt' && sort.sortType === 'asc') ? 'desc' : 'asc'
                setSort({
                  sort: 'createdAt',
                  sortType
                })
                const sortBidders = orderBy(bidders, 'createdAt', [sortType])
                setBidders(sortBidders)
              }}
              >
                <FormattedMessage
                  id="Bidders.submitTime"
                  defaultMessage="Submit time"
                />
                <Sort
                  sortType={sort.sortType}
                  active={sort.sort === 'createdAt'}
                />
              </a>

            </th>
            <th>
              <a onClick={() => {
                const sortType = (sort.sort === 'numberActionDay' && sort.sortType === 'asc') ? 'desc' : 'asc'
                setSort({
                  sort: 'numberActionDay',
                  sortType
                })
                const sortBidders = orderBy(bidders, 'numberActionDay', [sortType])
                setBidders(sortBidders)
              }}
              >
                <FormattedMessage
                  id="Bidders.executionPeriod"
                  defaultMessage="Execution period"
                />
                <Sort
                  sortType={sort.sortType}
                  active={sort.sort === 'numberActionDay'}
                />
              </a>

            </th>
            <th>
              <a onClick={() => {
                const sortType = (sort.sort === 'cost' && sort.sortType === 'asc') ? 'desc' : 'asc'
                setSort({
                  sort: 'cost',
                  sortType
                })
                const sortBidders = orderBy(bidders, 'cost', [sortType])
                setBidders(sortBidders)
              }}
              >
                <FormattedMessage
                  id="Bidders.cost"
                  defaultMessage="Cost"
                />
                <Sort
                  sortType={sort.sortType}
                  active={sort.sort === 'cost'}
                />
              </a>

            </th>
            <th>
              <FormattedMessage
                id="Bidders.attachmentField"
                defaultMessage="Attachment File"
              />
            </th>
            { type === 'OFFEREE'
            && (
            <th>
              &nbsp;
            </th>
            )}

          </tr>
        </thead>
        <tbody>
          {bidders && bidders.map((item) => (
            <tr
              className="tbRow"
              key={item._id}
            >
              <td>
                <div
                  className={classes.row}
                  onClick={() => {
                    history.push(`/entity-detail/${item.entity?._id}`)
                  }}
                >
                  <div className={classes.logoWrapper}>
                    <img src={item.entity?.company?.logo || defaultCompanyLogo} className={classes.avatar} alt="avatar" />
                  </div>

                  <div className={classes.info}>
                    <p className={classes.entityName}>
                      { item.entity?.entityName }
                    </p>
                    <p className={classes.company}>
                      {item.entity?.company?.companyName}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                { moment(item.createdAt).format('MM/DD/YYYY HH:mm') }
              </td>
              <td>
                { item.numberActionDay }
              </td>
              <td>
                { formatStringToNumber(item.cost) }
              </td>
              <td>
                <div className={classes.value}>
                  { item.attackFiles.map((item, i) => (
                    <div key={i} className={classes.attachment}>
                      <FileType item={{ url: item }} size="sm" />
                      <a
                        className={classes.link}
                        onClick={() => {
                          window.open(item)
                        }}
                      >
                        { getFileName(item) }
                      </a>
                    </div>
                  )) }
                </div>
              </td>
              { type === 'OFFEREE'
              && (
              <td>
                <Link
                  className={classes.btnChatNow}
                  to="/chat"
                >
                  <img src={chatIcon} className={classes.chatIcon} alt="chat" />
                  Chat now
                </Link>
              </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Bidders
