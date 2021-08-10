import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import sendEmailIcon from 'images/sendEmail.png'
import { Link } from 'react-router-dom'
import history from 'utils/history'
import classes from './ActiveUserSuccess.module.scss'

let interval = null

const ActiveUserSuccess = () => {
  const [count, setCount] = useState(5)

  useEffect(() => {
    interval = setInterval(() => {
      setCount((count) => {
        if (count === 1) {
          clearInterval(interval)
          history.push('/auth/login')
        }
        return count - 1
      })
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <div className={classes.container}>
      <img src={sendEmailIcon} className={classes.icon} alt="icon" />
      <p className={classes.title}>
        <FormattedMessage
          id="ActiveUserSuccess.title"
          defaultMessage="Register success!"
        />
      </p>
      <p className={classes.message}>
        <FormattedMessage
          id="ActiveUserSuccess.message"
          defaultMessage="Your account has been activated successfully"
        />
      </p>

      <Link
        to="/auth/login"
        className={classes.btnLogin}
      >
        <span className={classes.link}>
          <FormattedMessage
            id="ActiveUserSuccess.signin"
            defaultMessage="Sign in"
          />
        </span>
      </Link>

      <p className={classes.redirect}>
        <FormattedMessage
          id="redirect"
          defaultMessage="Redirect to sign in after: {count} seconds"
          values={{ count }}
        />
      </p>
    </div>
  )
}

export default ActiveUserSuccess
