import React from 'react'
import classNames from 'classnames'
import { injectIntl } from 'react-intl'
import Fade from 'react-reveal/Fade';
import classes from './renderField.module.scss'

export default function renderField(Component) {
  return injectIntl(({
    containerStyle,
    meta: { touched, error } = {},
    showErrorMessage,
    intl,
    label,
    smallLabel,
    note,
    required,
    hideError,
    labelStyle,
    subLabel,
    ...rest
  }) => (
    <div className={classNames(classes.container, containerStyle, label && classes.mb20)}>
      <div className={classes.labelWrapper}>
        { label
          && (
          <span className={classNames(classes.label, labelStyle)}>
            {typeof label === 'string' ? label : intl.formatMessage(label)}
            { required && <span className={classes.required}> *</span> }
          </span>
          )}
        { subLabel
          && (
          <span className={classNames(classes.subLabel)}>
            {typeof subLabel === 'string' ? subLabel : intl.formatMessage(subLabel)}
          </span>
          )}
      </div>

      { smallLabel
      && (
      <span className={classes.smallLabel}>
        {typeof smallLabel === 'string' ? smallLabel : intl.formatMessage(smallLabel)}
      </span>
      )}
      <Component
        {...rest}
        hasError={touched && error}
        errorMessage={error}
        intl={intl}
      />
      { touched && error && !hideError && (
      <Fade bottom>
        <span className={classes.errorMessage}>
          {typeof error === 'string' ? error : intl.formatMessage(error)}
        </span>
      </Fade>
      ) }
      { note && (
      <p className={classes.note}>
        {typeof note === 'string' ? note : intl.formatMessage(note)}
      </p>
      ) }
    </div>
  ))
}
