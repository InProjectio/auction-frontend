import React, { useEffect, useMemo, useState } from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import {
  Field,
  reduxForm
} from 'redux-form'
import InputField from 'components/InputField'
import Button from 'components/Button'
import otpIcon from 'images/otp.svg'
import { convertSearchParamsToObject } from 'utils/utils'
import * as Api from 'api/api'
import history from 'utils/history'
import classes from './ActiveUser.module.scss'

const messages = defineMessages({
  otp: {
    id: 'ActiveUser.otp',
    defaultMessage: 'OTP'
  },
  otpPlaceholder: {
    id: 'ActiveUser.otpPlaceholder',
    defaultMessage: '_ _ _ _ _ _'
  },
  otpEmpty: {
    id: 'ActiveUser.otpEmpty',
    defaultMessage: 'Please enter OTP'
  },
})

const ActiveUser = ({ handleSubmit, location }) => {
  const [loading, setLoading] = useState(false)

  const { username, email, otp_code } = useMemo(() => convertSearchParamsToObject(location.search), [location.search])

  useEffect(() => {
    if (otp_code) {
      handleActiveUser({ otp_code })
    }
  }, [])

  const handleActiveUser = async ({ otp_code }) => {
    try {
      setLoading(true)

      await Api.app.get({
        url: '/user/active-user',
        params: {
          username,
          email,
          otp_code
        }
      })
      setLoading(false)
      history.push('/auth/active-user-success')
    } catch (e) {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleActiveUser)}
      className={classes.container}
    >
      <p className={classes.title}>
        <FormattedMessage
          id="ActiveUser.title"
          defaultMessage="Active user"
        />
      </p>

      <p className={classes.note}>
        Please check your email to get OTP code. If you do not receive the email within a few minutes, please check your spam folder.
      </p>

      <Field
        name="otp_code"
        component={InputField}
        label={messages.otp}
        icon={otpIcon}
        placeholder={messages.otpPlaceholder}
      />

      <Button
        className={classes.btnLogin}
        type="submit"
        loading={loading}
      >
        <FormattedMessage
          id="ActiveUser.active"
          defaultMessage="Active"
        />
      </Button>

    </form>
  )
}

const validate = (values) => {
  const errors = {}

  if (!values.otp) {
    errors.otp = messages.otpEmpty
  }

  return errors
}

export default reduxForm({
  form: 'ActiveUser',
  validate
})(ActiveUser)
