import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import defaultAvatar from 'images/defaultAvatar.svg'
import editIcon from 'images/edit-info.svg'
import { SwitchField } from 'components/SwitchField/SwitchField'
import moment from 'moment'
import history from 'utils/history'
import Members from '../Members'
import classes from './TableData.module.scss'

const TableData = ({ data, handleChangeStatus, viewOnly, userInfo }) => (
  <div className={classNames('table-responsive table')}>
    <table className="table table-borderless">
      <thead>
        <tr className="tbHead">
          <th>
            <FormattedMessage
              id="GroupTable.entityName"
              defaultMessage="Entity name"
            />
          </th>
          <th>
            <FormattedMessage
              id="GroupTable.createdAt"
              defaultMessage="Created at"
            />
          </th>
          <th>
            <FormattedMessage
              id="GroupTable.creator"
              defaultMessage="Creator"
            />
          </th>
          <th>
            <FormattedMessage
              id="GroupTable.members"
              defaultMessage="Members"
            />
          </th>
          <th>
            <FormattedMessage
              id="GroupTable.status"
              defaultMessage="Status"
            />
          </th>
          <th>
            &nbsp;
          </th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((item) => (
          <tr
            className="tbRow"
            key={item._id}
          >
            <td>
              <p className={classes.entityName}>
                { item.entityName }
              </p>
              <p className={classes.subName}>
                { item.subName }
              </p>
            </td>
            <td>
              { moment(item.createdAt).format('DD/MM/YYYY') }
            </td>
            <td>
              <div className={classes.row}>
                <img src={item?.userCreated?.user?.avatar_url || defaultAvatar} className={classes.avatar} alt="avatar" />
                <div className={classes.info}>
                  <p className={classes.fullname}>
                    { item?.userCreated?.user?.fullname }
                  </p>
                  <p className={classes.text}>
                    {item?.userCreated?.user?.email}
                  </p>
                  <p className={classes.position}>
                    {item?.userCreated?.position}
                  </p>
                </div>
              </div>
            </td>
            <td>
              <Members members={item.userMaps} />
            </td>
            <td>
              <SwitchField
                size="md"
                input={{
                  value: item.status === 'ACTIVE',
                  onChange: (status) => handleChangeStatus(status, item)
                }}
                disabled={viewOnly && item.userMappingIds?.indexOf(userInfo?.userMapping?._id) === -1}
              />
            </td>
            <td>
              <a
                className={classNames(classes.btnEdit,
                  viewOnly && item.userMappingIds?.indexOf(userInfo?.userMapping?._id) === -1 && classes.disabled)}
                onClick={() => {
                  if (viewOnly && item.userMappingIds?.indexOf(userInfo?.userMapping?._id) === -1) {
                    return
                  }
                  history.push(`/company/group/form/${item._id}`)
                }}
              >
                <img src={editIcon} className={classes.editIcon} alt="edit" />
                <FormattedMessage
                  id="Edit"
                  defaultMessage="Edit"
                />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default TableData
