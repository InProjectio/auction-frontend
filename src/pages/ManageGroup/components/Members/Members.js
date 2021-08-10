import React from 'react'
import defaultAvatar from 'images/defaultAvatar.svg'
import classes from './Members.module.scss'

const Members = ({ members }) => (
  <div
    className={classes.members}
    style={{ width: 32 + (members?.length - 1) * 24 }}
  >
    {members && members.slice(0, 4).map((member, i) => (
      <img
        src={member?.user?.avatar_url || defaultAvatar}
        className={classes.avatar}
        alt="avatar"
        key={member._id || i}
        style={{
          left: i * 24,
          zIndex: i + 1
        }}
      />
    ))}
    {members && members.length - 4 > 0
      && (
      <div className={classes.moreMember}>
        +
        { members.length - 4 }
      </div>
      )}

  </div>
)

export default Members
