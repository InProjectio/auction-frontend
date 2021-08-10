import React from 'react'
import cancelIcon from 'images/cancel.svg'
import editIcon from 'images/edit.svg'
import classNames from 'classnames'
import ButtonApprove from 'components/ButtonApprove'
import ButtonReject from 'components/ButtonReject'
import SwitchField from 'components/SwitchField'
import classes from './TableAction.module.scss'

const TableAction = ({
  handleRemove,
  handleEdit,
  handleCopy,
  handleApprove,
  handleReject,
  handleChangeStatus,
  status,
  direction,
  handleViewDetail,
  size
}) => (
  <div className={classNames('tbAction', direction === 'col' && classes.col, size === 'lg' && classes.containerLg)}>
    { handleCopy
        && (
        <a
          className={classes.btnCopy}
          onClick={handleCopy}
        >
          Sao chép
        </a>
        )}
    { handleViewDetail
        && (
        <a
          className={classes.btnCopy}
          onClick={handleViewDetail}
        >
          Chi tiết
        </a>
        )}
    { handleRemove
        && (
        <a
          className="btnRemove"
          onClick={handleRemove}
        >
          <img
            src={cancelIcon}
            className="removeIcon"
            alt="remove"
          />
        </a>
        )}
    { handleEdit
        && (
        <a
          className="btnEdit"
          onClick={handleEdit}
        >
          <img
            src={editIcon}
            alt="edit"
          />
        </a>
        )}
    { handleApprove
        && (
        <ButtonApprove
          onClick={handleApprove}
          btnStyle={classNames(size === 'lg' && classes.btnLg)}
        />
        )}

    { handleReject
        && (
        <ButtonReject
          onClick={handleReject}
          btnStyle={classNames(size === 'lg' && classes.btnLg)}
        />
        )}

    { handleChangeStatus
        && (
        <div className={classes.ml10}>
          <SwitchField input={{
            value: status,
            onChange: handleChangeStatus
          }}
          />
        </div>
        )}

  </div>
)

export default TableAction
