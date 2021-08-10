import React from 'react'
import { injectIntl } from 'react-intl'
import { Modal } from 'react-bootstrap'
import closeIcon from 'images/close.svg'
import classNames from 'classnames'
import classes from './ModalComponent.module.scss'

const ModalComponent = ({
  handleClose,
  show,
  title,
  intl,
  children,
  size = 'xs',
  headClass,
  centered
}) => (
  <Modal
    show={show}
    onHide={handleClose}
    size={size}
    centered={centered}
  >
    <div className={classes.container}>
      <div className={classNames(classes.row, headClass)}>
        <p className={classes.title}>
          {intl.formatMessage(title)}
        </p>
        <a
          className={classes.btnClose}
          onClick={handleClose}
        >
          <img src={closeIcon} className={classes.closeIcon} alt="close-icon" />
        </a>
      </div>
      <div className={classes.content}>
        { children }
      </div>
    </div>
  </Modal>
)

export default injectIntl(ModalComponent)
