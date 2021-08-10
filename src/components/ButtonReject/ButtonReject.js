import React from 'react'
import { FormattedMessage } from 'react-intl'
import cancelIcon from 'images/cancel.svg'
import classNames from 'classnames'
import Button from '../Button'
import classes from './ButtonReject.module.scss'

const ButtonReject = ({ onClick, loading, btnStyle, disabled }) => (
  <Button
    className={classNames(classes.container, btnStyle)}
    onClick={onClick}
    loading={loading}
    disabled={disabled}
  >
    <img src={cancelIcon} className={classes.backIcon} alt="cancel" />
    <FormattedMessage
      id="ButtonReject.reject"
      defaultMessage="Reject"
    />
  </Button>
)

export default ButtonReject
