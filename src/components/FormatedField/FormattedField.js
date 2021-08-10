import React from 'react'
import classNames from 'classnames'
import Cleave from 'cleave.js/react';
// import FloatingLabelInput from 'react-floating-label-input'
import 'cleave.js/dist/addons/cleave-phone.pl';
import renderField from '../../Form/renderField'
import classes from './FormattedField.module.scss'

export class FormattedField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: false
    }
  }

  moveUpPlaceholder = () => {
    this.setState({
      focus: true
    })
  }

  moveDownPlaceholder = () => {
    this.setState({
      focus: false
    })
  }

  onChange = (e) => {
    e.preventDefault()
    const { focus } = this.state
    const { input, validate } = this.props
    if (focus) {
      if (validate) {
        if (validate(e.target.rawValue)) {
          input.onChange(e.target.rawValue)
        } else {
          input.onChange('0')
        }
      } else {
        input.onChange(e.target.rawValue)
      }
    }
  }

  render() {
    const {
      input,
      placeholder,
      name,
      type,
      disabled,
      options,
      customClass,
      fullBorder,
      label,
      hasError,
      maxLength,
      note,
      intl,
      h50
    } = this.props
    const { focus } = this.state
    let placeholderStr = ''
    if (placeholder) {
      placeholderStr = typeof placeholder === 'string' ? placeholder : intl.formatMessage(placeholder)
    }
    return (
      <div className={classes.inputContainer}>
        <Cleave
          label={label}
          onChange={this.onChange}
          value={input.value}
          name={name}
          className={classNames(classes.input,
            fullBorder && classes.fullBorder,
            customClass,
            hasError && classes.errorField,
            focus && classes.focus,
            disabled && classes.disabled,
            h50 && classes.h50)}
          type={type}
          disabled={disabled}
          onFocus={this.moveUpPlaceholder}
          onBlur={this.moveDownPlaceholder}
          options={options}
          placeholder={placeholderStr}
          maxLength={maxLength}
        />
        { note
          && (
          <p className={classes.note}>
            { note }
          </p>
          )}

      </div>

    )
  }
}

export default renderField(FormattedField)
