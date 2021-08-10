import React, { useState } from 'react'
import inviteIcon from 'images/invite.svg'
import { FormattedMessage } from 'react-intl'
import { SelectField } from 'components/SelectField/SelectField'
import SearchComponent from 'components/SearchComponent'
import classNames from 'classnames'
import { Modal } from 'react-bootstrap'
import classes from './Header.module.scss'
import AddEmployee from '../AddEmployee'

const Header = ({ statuses, roles, searchObj, handleSearch, totalDocs, viewOnly }) => {
  const [showAddEmployee, setShowAddEmployee] = useState(false)
  return (
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
          { roles
        && (
        <div className={classNames(classes.row)}>
          <span className={classes.label}>
            <FormattedMessage
              id="Role"
              defaultMessage="Role"
            />
          </span>
          <div className={classes.role}>
            <SelectField
              input={{
                value: searchObj.roleType,
                onChange: (roleType) => {
                  handleSearch({ ...searchObj, roleType })
                }
              }}
              options={roles}
              h40
              placeholder="All"
            />
          </div>
        </div>
        )}

        </div>
        { !viewOnly
          && (
          <a
            className={classes.btnInvite}
            onClick={() => { setShowAddEmployee(true) }}
          >
            <img src={inviteIcon} className={classes.inviteIcon} alt="invite" />
            <FormattedMessage
              id="addEmployee"
              defaultMessage="Add employee"
            />
          </a>
          )}

      </div>
      <Modal show={showAddEmployee}>
        <AddEmployee
          handleClose={() => setShowAddEmployee(false)}
          title="Invite employees"
          initialValues={{
            employees: [{}]
          }}
          searchObj={searchObj}
        />
      </Modal>
    </div>
  )
}

export default Header
