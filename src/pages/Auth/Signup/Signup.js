import React, { useState, useEffect } from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import {
  Field,
  reduxForm
} from 'redux-form'
import { validateEmail, validateUsername, validatePassword } from 'utils/validators'
import InputField from 'components/InputField'
import Button from 'components/Button'
import emailIcon from 'images/email.svg'
import lockIcon from 'images/padlock.svg'
import usernameIcon from 'images/username.png'
import * as Api from 'api/api'
import history from 'utils/history'
import { convertObjectToSearchParams, convertSearchParamsToObject } from 'utils/utils'
import classes from './Signup.module.scss'

const messages = defineMessages({
  email: {
    id: 'Signup.email',
    defaultMessage: 'Email'
  },
  emailEmpty: {
    id: 'Signup.emailEmpty',
    defaultMessage: 'Please enter your email'
  },
  emailPlaceholder: {
    id: 'Signup.emailPlaceholder',
    defaultMessage: 'Enter your email address'
  },
  emailInvalid: {
    id: 'Signup.emailInvalid',
    defaultMessage: 'Please enter valid email'
  },
  password: {
    id: 'Signup.password',
    defaultMessage: 'Password'
  },
  passwordPlaceholder: {
    id: 'Signup.passwordPlaceholder',
    defaultMessage: 'Enter your password'
  },
  passwordEmpty: {
    id: 'Signup.passwordEmpty',
    defaultMessage: 'Please enter your password'
  },
  username: {
    id: 'Signup.username',
    defaultMessage: 'Username'
  },
  usernamePlaceholder: {
    id: 'Signup.username',
    defaultMessage: 'Enter username from 6 - 15 charactors'
  },
  usernameEmpty: {
    id: 'Signup.passwordEmpty',
    defaultMessage: 'Please enter your username'
  },
  usernameInvalid: {
    id: 'Signup.usernameInvalid',
    defaultMessage: 'Please enter valid username'
  },
  passwordInvalid: {
    id: 'Signup.passwordInvalid',
    defaultMessage: 'Password must be at least 8 characters and contain: uppercase, lowercase, numbers, special characters.'
  }
})

const Signup = ({ handleSubmit, change, location }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const query = convertSearchParamsToObject(location.search)
    if (query.email) {
      change('email', query.email)
    }
  }, [location.search])

  const handleSignup = async (values) => {
    try {
      setLoading(true)

      await Api.app.post({
        url: '/user/sign-up',
        data: values
      })
      setLoading(false)
      history.push({
        pathname: '/auth/active-user',
        search: convertObjectToSearchParams({
          username: values.username,
          email: values.email
        })
      })
    } catch (e) {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      className={classes.container}
    >
      <p className={classes.title}>
        <FormattedMessage
          id="Signup.letgo"
          defaultMessage="Let’s go!"
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
        name="email"
        component={InputField}
        label={messages.email}
        icon={emailIcon}
        placeholder={messages.emailPlaceholder}
      />

      <Field
        name="password"
        component={InputField}
        label={messages.password}
        type="password"
        icon={lockIcon}
        placeholder={messages.passwordPlaceholder}
        note="Password must be at least 8 characters and contain: uppercase, lowercase, numbers, special characters."
      />

      <Button
        className={classes.btnRegister}
        type="submit"
        loading={loading}
      >
        <FormattedMessage
          id="Signup.register"
          defaultMessage="Register"
        />
      </Button>

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

  if (!values.email) {
    errors.email = messages.emailEmpty
  } else if (!validateEmail(values.email)) {
    errors.email = messages.emailInvalid
  }

  if (!values.password) {
    errors.password = messages.passwordEmpty
  } else if (!validatePassword(values.password)) {
    errors.password = messages.passwordInvalid
  }

  return errors
}

export default reduxForm({
  form: 'Signup',
  validate
})(Signup)
