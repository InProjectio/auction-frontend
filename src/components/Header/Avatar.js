import React from 'react'
import defaultAvatar from 'images/defaultAvatar.svg'
import classes from './Header.module.scss'

const Avatar = React.memo(({ avatar }) => (
  <img
    className={classes.avatar}
    src={avatar || defaultAvatar}
    alt="avatar"
  />
))

export default Avatar
