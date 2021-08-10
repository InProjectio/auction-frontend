import React, { useState } from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import {
  Field,
  reduxForm
} from 'redux-form'
import { validateEmail } from 'utils/validators'
import InputField from 'components/InputField'
import Button from 'components/Button'
import emailIcon from 'images/email.svg'
import * as Api from 'api/api'
import { showNotification } from 'layout/CommonLayout/actions'
import { connect } from 'react-redux'
import history from 'utils/history'
import classes from './GetLink.module.scss'

const messages = defineMessages({
  email: {
    id: 'GetLink.email',
    defaultMessage: 'Email'
  },
  emailPlaceholder: {
    id: 'GetLink.emailPlaceholder',
    defaultMessage: 'Enter your email address'
  },
  emailEmpty: {
    id: 'GetLink.emailEmpty',
    defaultMessage: 'Please enter your email'
  },
  emailInvalid: {
    id: 'GetLink.emailInvalid',
    defaultMessage: 'Please enter valid email'
  },
})

const GetLink = ({ handleSubmit, showNotification }) => {
  const [loading, setLoading] = useState(false)

  const handleGetLink = async (values) => {
    console.log(values)
    try {
      setLoading(true)

      await Api.post({
        url: '/user/forgot-password',
        data: values
      })

      showNotification({
        type: 'SUCCESS',
        message: 'Please check your email for change password'
      })

      history.push('/auth/get-link-success')

      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleGetLink)}
      className={classes.container}
    >
      <p className={classes.title}>
        <FormattedMessage
          id="GetLink.title"
          defaultMessage="Welcome back!"
        />
      </p>

      <Field
        name="email"
        component={InputField}
        label={messages.email}
        icon={emailIcon}
        placeholder={messages.emailPlaceholder}
      />

      <Button
        className={classes.btnLogin}
        type="submit"
        loading={loading}
      >
        <FormattedMessage
          id="GetLink.sendLink"
          defaultMessage="Send me the link"
        />
      </Button>

    </form>
  )
}

const validate = (values) => {
  const errors = {}

  if (!values.email) {
    errors.email = messages.emailEmpty
  } else if (!validateEmail(values.email)) {
    errors.email = messages.emailInvalid
  }

  return errors
}

const GetLinkForm = reduxForm({
  form: 'GetLink',
  validate
})(GetLink)

export default connect(null, {
  showNotification
})(GetLinkForm)
