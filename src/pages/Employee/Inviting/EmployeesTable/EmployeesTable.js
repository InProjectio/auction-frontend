import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import defaultAvatar from 'images/defaultAvatar.svg'
import { EMPLOYEE_ROLE_OBJ, INVITING_STATUS_OBJ } from 'utils/constants'
import deleteIcon from 'images/delete.svg'
import Loader from 'react-loader-spinner'
import * as Api from 'api/api'
import { useDispatch } from 'react-redux'
import { showNotification } from 'layout/CommonLayout/actions'
import classes from './EmployeesTable.module.scss'

const EmployeesTable = ({ employees, cancelRequest, viewOnly }) => {
  const dispatch = useDispatch()

  const [loadingResendEmail, setLoadingResendEmail] = useState({})

  const handleResendEmail = async (employee) => {
    try {
      if (viewOnly) {
        return
      }
      setLoadingResendEmail((prev) => ({
        ...prev,
        [employee._id]: true
      }))
      await Api.auction.put({
        url: `/api/company/user-mapping/re-send-mail-active/${employee._id}`
      })

      dispatch(showNotification({
        type: 'SUCCESS',
        message: 'Resend email successfully!'
      }))

      setLoadingResendEmail((prev) => ({
        ...prev,
        [employee._id]: false
      }))
    } catch (e) {
      setLoadingResendEmail((prev) => ({
        ...prev,
        [employee._id]: false
      }))
    }
  }

  return (
    <div className={classNames('table-responsive table')}>
      <table className="table table-borderless">
        <thead>
          <tr className="tbHead">
            <th>
              <FormattedMessage
                id="Employees.Employee"
                defaultMessage="Employee"
              />
            </th>
            <th>
              <FormattedMessage
                id="Employees.position"
                defaultMessage="Position"
              />
            </th>
            <th>
              <FormattedMessage
                id="Employees.role"
                defaultMessage="Roles"
              />
            </th>
            <th>
              <FormattedMessage
                id="Employees.status"
                defaultMessage="Status"
              />
            </th>
            <th>
            &nbsp;
            </th>
          </tr>
        </thead>
        <tbody>
          {employees && employees.map((employee) => (
            <tr
              className="tbRow"
              key={employee._id}
            >
              <td>
                <div className={classes.row}>
                  <img src={employee.user?.avatar_url || defaultAvatar} className={classes.avatar} alt="avatar" />
                  <div className={classes.info}>
                    <p className={classes.fullname}>
                      { employee.user?.fullname }
                    </p>
                    <p className={classes.text}>
                      {employee.user?.email || employee.email}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                { employee.position }
              </td>
              <td>
                { EMPLOYEE_ROLE_OBJ[employee.roleType] }
              </td>
              <td>
                <div className={classNames(classes.status,
                  employee.state === 'PENDING' && classes.inactive,
                  employee.state === 'REJECT' && classes.reject)}
                >
                  { INVITING_STATUS_OBJ[employee.state] }
                </div>

              </td>
              <td>
                { employee.state === 'PENDING'
                && (
                <div className={classNames(classes.actions, viewOnly && classes.viewOnly)}>
                  { loadingResendEmail[employee._id]
                    ? (
                      <div
                        className={classes.loader}

                      >
                        <Loader type="Oval" color="#7B68EE" height={16} width={16} />
                      </div>
                    )
                    : (
                      <a
                        className={classes.rensendEmail}
                        onClick={() => handleResendEmail(employee)}
                      >
                        Resend email
                      </a>
                    )}

                  <a
                    className={classes.btnCancel}
                    onClick={() => {
                      if (!viewOnly) {
                        cancelRequest(employee)
                      }
                    }}
                  >
                    <img src={deleteIcon} className={classes.deleteIcon} alt="delete" />
                  </a>
                </div>
                )}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeesTable
