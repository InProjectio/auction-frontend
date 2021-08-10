import React, { useState } from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { Field, reduxForm } from 'redux-form'
import * as Api from 'api/api'
import InputField from 'components/InputField';
import Button from 'components/Button';
import history from 'utils/history'
import classes from './ChangePassword.module.scss'

const messages = defineMessages({
  password: {
    id: 'ChangePassword.password',
    defaultMessage: 'New password'
  },
  confirmPassword: {
    id: 'ChangePassword.confirmPassword',
    defaultMessage: 'Confirm new password'
  },
  passwordEmpty: {
    id: 'ChangePassword.passwordEmpty',
    defaultMessage: 'Please enter password'
  },
  confirmPasswordNotMatch: {
    id: 'ChangePassword.confirmPasswordNotMatch',
    defaultMessage: 'Confirm new password and new password not match'
  },
  oldPassword: {
    id: 'ChangePassword.oldPassword',
    defaultMessage: 'Old password'
  },
  oldPasswordEmpty: {
    id: 'ChangePassword.oldPasswordEmpty',
    defaultMessage: 'Please enter old password'
  },
  newPasswordThemSameOldPassword: {
    id: 'ChangePassword.newPasswordThemSameOldPassword',
    defaultMessage: 'Please enter new password other old password'
  }
})

const ChangePassword = (props) => {
  const [loading, setLoading] = useState(false)

  const { handleSubmit } = props

  const handleChangePassword = async (values) => {
    try {
      setLoading(true)

      await Api.post({
        url: '/user/change-password',
        data: values
      })

      localStorage.clear()
      history.push('/auth/login')

      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.header}>
          <p className={classes.title}>
            <FormattedMessage
              id="ChangePassword.title"
              defaultMessage="Change password"
            />
          </p>
        </div>
        <form
          className={classes.wrapper}
          onSubmit={handleSubmit(handleChangePassword)}
        >

          <div className={classes.mb40}>
            <Field
              name="oldPassword"
              component={InputField}
              type="password"
              placeholder={messages.oldPassword}
              label={messages.oldPassword}
              h50
              customClassEye={classes.eye}
            />

          </div>
          <div className={classes.mb40}>
            <Field
              name="newPassword"
              component={InputField}
              type="password"
              placeholder={messages.password}
              label={messages.password}
              h50
              customClassEye={classes.eye}
            />

          </div>
          <Field
            name="confirmedNewPassword"
            component={InputField}
            placeholder={messages.confirmPassword}
            label={messages.confirmPassword}
            type="password"
            h50
            customClassEye={classes.eye}
          />

          <div className={classes.actions}>
            <div className={classes.btnLoginWrapper}>
              <Button
                className="btn btnMain btnLarge w100"
                type="submit"
                loading={loading}
              >
                <FormattedMessage
                  id="ChangePassword.send"
                  defaultMessage="Save"
                />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

const validate = (values) => {
  const errors = {}
  if (!values.oldPassword) {
    errors.oldPassword = messages.oldPasswordEmpty
  }

  if (!values.newPassword) {
    errors.newPassword = messages.passwordEmpty
  } if (values.newPassword === values.oldPassword) {
    errors.newPassword = messages.newPasswordThemSameOldPassword
  }

  if (!values.confirmedNewPassword) {
    errors.confirmedNewPassword = messages.passwordEmpty
  } else if (values.confirmedNewPassword !== values.newPassword) {
    errors.confirmedNewPassword = messages.confirmPasswordNotMatch
  }

  return errors
}

export default reduxForm({
  form: 'ChangePassword',
  validate
})(ChangePassword)
