import React from 'react'
import { FormattedMessage } from 'react-intl'
import { SelectField } from 'components/SelectField/SelectField'
import SearchComponent from 'components/SearchComponent'
import classNames from 'classnames'
import { BIDDING_STATUS } from 'utils/constants'
import classes from './Header.module.scss'

const Header = ({ type, searchObj, handleSearch, entities, totalDocs }) => (
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
        <div className={classNames(classes.row)}>
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
        { type === 'HISTORY'
          && (
          <div className={classNames(classes.row, classes.ml32)}>
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
                options={BIDDING_STATUS}
                h40
                placeholder="All"
              />
            </div>
          </div>
          )}

      </div>
    </div>
  </div>
)

export default Header
