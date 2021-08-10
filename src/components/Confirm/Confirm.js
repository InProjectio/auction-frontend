import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import classes from './Confirm.module.scss'

export default class Confirm extends Component {
  handleCancel = () => {
    const { confirmData, handleClose } = this.props
    handleClose()
    if (confirmData.handleCancel) {
      confirmData.handleCancel()
    }
  }

  handleOk = () => {
    const { confirmData, handleClose } = this.props
    handleClose()
    if (confirmData.handleOk) {
      confirmData.handleOk()
    }
  }

  render() {
    const { confirmData } = this.props
    return (
      <div className={classes.container}>
        { confirmData.title
          && (
          <p className={classes.title}>
            {confirmData.title}
          </p>
          )}

        <p className={classes.description}>
          {confirmData.description}
        </p>
        <div className={classes.actions}>
          { confirmData.type !== 'ALERT'
            && (
            <a
              className={classes.btnCancel}
              onClick={this.handleCancel}
            >
              <FormattedMessage
                id="Confirm.cancel"
                defaultMessage="Cancel"
              />
            </a>
            )}

          <a
            className={classes.btnOk}
            onClick={this.handleOk}
          >
            <FormattedMessage
              id="Confirm.ok"
              defaultMessage="Ok"
            />
          </a>
        </div>
      </div>
    )
  }
}
