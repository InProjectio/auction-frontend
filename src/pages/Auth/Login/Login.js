import React, { useState, useEffect } from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import {
  Field,
  reduxForm
} from 'redux-form'
import { validateUsername } from 'utils/validators'
import InputField from 'components/InputField'
import Button from 'components/Button'
import usernameIcon from 'images/username.png'
import lockIcon from 'images/padlock.svg'
import history from 'utils/history'
import * as Api from 'api/api'
import { Link } from 'react-router-dom'
import { convertSearchParamsToObject } from 'utils/utils'
import EventEmitter from 'utils/EventEmitter'
import * as storage from 'utils/storage'
import classes from './Login.module.scss'

const messages = defineMessages({
  username: {
    id: 'Login.username',
    defaultMessage: 'Username'
  },
  usernamePlaceholder: {
    id: 'Login.usernamePlaceholder',
    defaultMessage: 'Enter username from 6 - 15 charactors'
  },
  usernameEmpty: {
    id: 'Login.usernameEmpty',
    defaultMessage: 'Please enter your username'
  },
  usernameInvalid: {
    id: 'Login.usernameInvalid',
    defaultMessage: 'Please enter valid username'
  },
  emailInvalid: {
    id: 'Login.emailInvalid',
    defaultMessage: 'Please enter valid email'
  },
  password: {
    id: 'Login.password',
    defaultMessage: 'Password'
  },
  passwordEmpty: {
    id: 'Login.passwordEmpty',
    defaultMessage: 'Please enter your password'
  },

  passwordPlaceholder: {
    id: 'Login.passwordPlaceholder',
    defaultMessage: 'Enter your password'
  }
})

const Login = ({ handleSubmit, location }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (location.search && location.search.indexOf('redirect=') !== -1) {
      const { redirect } = convertSearchParamsToObject(location.search)
      localStorage.setItem('redirect', redirect)
    }
  }, [])

  const handleLogin = async (values) => {
    try {
      setLoading(true)
      const firebaseToken = localStorage.getItem('firebaseToken')
      const result = await Api.app.post({
        url: '/user/sign-in',
        data: {
          ...values,
          firebaseToken
        }
      })
      localStorage.setItem('userInfo', JSON.stringify(result.data))
      localStorage.setItem('accessToken', result.data.token)
      storage.login({
        userInfo: JSON.stringify(result.data),
        accessToken: result.data.token,
        companyId: result.data.userMapping?.company
      })

      if (result.data?.userMapping?.company) {
        localStorage.setItem('companyId', result.data?.userMapping?.company)
      } else {
        localStorage.removeItem('companyId')
      }

      setLoading(false)
      const redirect = localStorage.getItem('redirect')
      const navigateUrl = redirect || '/market-place'
      EventEmitter.emit('connectSocket')
      localStorage.removeItem('redirect')
      if (result.data.public_key) {
        history.push(navigateUrl)
      } else {
        history.push('/settings/account')
      }
    } catch (e) {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className={classes.container}
    >
      <p className={classes.title}>
        <FormattedMessage
          id="Login.title"
          defaultMessage="Welcome back!"
        />
      </p>

      <Field
        name="username"
        component={InputField}
        label={messages.username}
        icon={usernameIcon}
        placeholder={messages.usernamePlaceholder}
        maxLength={15}
      />

      <Field
        name="password"
        component={InputField}
        label={messages.password}
        type="password"
        icon={lockIcon}
        placeholder={messages.passwordPlaceholder}
      />

      <Button
        className={classes.btnLogin}
        type="submit"
        loading={loading}
      >
        <FormattedMessage
          id="Login.login"
          defaultMessage="Login"
        />
      </Button>

      <div className={classes.end}>
        <Link to="/auth/get-link" className={classes.forgotPassword}>
          Forgot password?
        </Link>
      </div>

      <Link to="/auth/register" className={classes.signup}>
        Don’t have an account?
        {' '}
        <span>Sign Up</span>
      </Link>

    </form>
  )
}

const validate = (values) => {
  const errors = {}

  if (!values.username) {
    errors.username = messages.usernameEmpty
  } else if (!validateUsername(values.username)) {
    errors.username = messages.usernameInvalid
  }

  if (!values.password) {
    errors.password = messages.passwordEmpty
  }

  return errors
}

export default reduxForm({
  form: 'Login',
  validate
})(Login)
