import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import defaultAvatar from 'images/defaultAvatar.svg'
import ButtonApprove from 'components/ButtonApprove'
import ButtonReject from 'components/ButtonReject'
import { REQUESTING_STATUS_OBJ } from 'utils/constants'
import classes from './EmployeesTable.module.scss'

const EmployeesTable = ({ employees, handleChangeStatus, viewOnly }) => (
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
            Email
          </th>
          <th>
            <FormattedMessage
              id="Employees.intro"
              defaultMessage="Introduction"
            />
          </th>
          <th>
            <FormattedMessage
              id="Employees.status"
              defaultMessage="Status"
            />
          </th>
          <th className="text-right">
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
                </div>
              </div>
            </td>
            <td>
              { employee.email }
            </td>
            <td className={classes.intro}>
              { employee?.user?.intro || '' }
            </td>
            <td>
              <div className={classNames(classes.status,
                (employee.state === 'PENDING' || employee.state === 'UNVERIFY') && classes.pending,
                employee.state === 'REJECT' && classes.reject)}
              >
                { REQUESTING_STATUS_OBJ[employee.state] }
              </div>

            </td>
            <td>
              { employee.state === 'UNVERIFY'
                && (
                  <div className={classes.rowend}>
                    <ButtonReject
                      onClick={() => handleChangeStatus('REJECT', employee)}
                      disabled={viewOnly}
                    />
                    <ButtonApprove
                      onClick={() => handleChangeStatus('ACCEPT', employee)}
                      disabled={viewOnly}
                    />
                  </div>
                )}

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default EmployeesTable
