import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import defaultAvatar from 'images/defaultAvatar.svg'
import editIcon from 'images/edit-info.svg'
import { SwitchField } from 'components/SwitchField/SwitchField'
import { EMPLOYEE_ROLE_OBJ } from 'utils/constants'
import classes from './EmployeesTable.module.scss'

const EmployeesTable = ({ employees, handleChangeStatus, setSelectedEmployee, viewOnly }) => (
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
                    {employee.user?.email}
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
              { employee.roleType !== 'OWNER'
                && (
                <SwitchField
                  size="md"
                  input={{
                    value: employee.status === 'ACTIVE',
                    onChange: (status) => handleChangeStatus(status, employee)
                  }}
                  disabled={viewOnly}
                />
                )}

            </td>
            <td>
              { employee.roleType !== 'OWNER'
              && (
              <a
                className={classNames(classes.btnEdit, viewOnly && classes.viewOnly)}
                onClick={() => setSelectedEmployee(employee)}
              >
                <img src={editIcon} className={classes.editIcon} alt="edit" />
                <FormattedMessage
                  id="Edit"
                  defaultMessage="Edit"
                />
              </a>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default EmployeesTable
