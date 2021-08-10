import React from 'react'
import { FormattedMessage } from 'react-intl'
import backIcon from 'images/back.svg'
import Button from '../Button'
import classes from './ButtonBack.module.scss'

const ButtonBack = ({ onClick }) => (
  <Button
    className={classes.container}
    onClick={onClick}
  >
    <img
      src={backIcon}
      className={classes.backIcon}
      alt="back-icon"
    />
    <FormattedMessage
      id="ButtonBack.back"
      defaultMessage="Back"
    />
  </Button>
)

export default ButtonBack
