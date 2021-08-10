import React from 'react'
import closeIcon from 'images/close.svg'
import classes from './ChatHeader.module.scss'

const ChatHeader = ({ handleCloseChatBox }) => (
  <div className={classes.container}>
    <div className={classes.left}>
      <div className={classes.logoWrapper} />
      <div className={classes.info}>
        <p className={classes.name}>
          CarClick tư vấn
        </p>
      </div>
    </div>

    <a
      className={classes.btnClose}
      onClick={handleCloseChatBox}
    >
      <img src={closeIcon} className={classes.closeIcon} alt="close-icon" />
    </a>
  </div>
)

export default ChatHeader
