import React from 'react'
import plusIcon from 'images/plus-purple.svg'
import { FormattedMessage } from 'react-intl'
import { SelectField } from 'components/SelectField/SelectField'
import SearchComponent from 'components/SearchComponent'
import classNames from 'classnames'
import history from 'utils/history'
import classes from './Header.module.scss'

const Header = ({ statuses, searchObj, handleSearch, totalDocs }) => (
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
      <a
        className={classes.btnInvite}
        onClick={() => {
          history.push('/company/group/form')
        }}
      >
        <div className={classes.iconWrapper}>
          <img src={plusIcon} className={classes.plusIcon} alt="invite" />
        </div>

        <FormattedMessage
          id="addGroup"
          defaultMessage="Create new group"
        />
      </a>
    </div>
  </div>
)

export default Header
