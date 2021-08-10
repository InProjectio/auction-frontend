import React from 'react'
import { FormattedMessage } from 'react-intl'
import { SelectField } from 'components/SelectField/SelectField'
import SearchComponent from 'components/SearchComponent'
import classNames from 'classnames'
import createBidding from 'images/create-bidding.svg'
import { Link } from 'react-router-dom'
import classes from './Header.module.scss'

const Header = ({ statuses, entities, searchObj, handleSearch, totalDocs }) => (
  <div>
    <div className={classes.container}>
      <p className={classes.total}>
        Total:
        {' '}
        <b>{totalDocs}</b>
      </p>
      <div className={classNames(classes.row, classes.between)}>
        <div className={classNames(classes.text)}>
          <SearchComponent
            value={searchObj.textSearch || ''}
            handleSearch={(textSearch) => {
              handleSearch({ ...searchObj, textSearch })
            }}
          />
        </div>
        <div className={classNames(classes.row, classes.mr32)}>
          <span className={classes.label}>
            <FormattedMessage
              id="entity"
              defaultMessage="Entity"
            />
          </span>
          <div className={classes.entity}>
            <SelectField
              input={{
                value: searchObj.entity,
                onChange: (entity) => {
                  handleSearch({ ...searchObj, entity })
                }
              }}
              options={entities}
              h40
              placeholder="All"
              isClearable
            />
          </div>
        </div>
        <div className={classNames(classes.row)}>
          <span className={classes.label}>
            <FormattedMessage
              id="Status"
              defaultMessage="Status"
            />
          </span>
          <div className={classes.status}>
            <SelectField
              input={{
                value: searchObj.status,
                onChange: (status) => {
                  handleSearch({ ...searchObj, status })
                }
              }}
              options={statuses}
              h40
              placeholder="All"
            />
          </div>
        </div>

      </div>
      <Link
        className={classes.btnInvite}
        to="/company/auction/form"
      >
        <img src={createBidding} className={classes.inviteIcon} alt="invite" />
        <FormattedMessage
          id="createBidding"
          defaultMessage="Create bidding"
        />
      </Link>
    </div>
  </div>
)

export default Header
