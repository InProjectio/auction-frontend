import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FormattedMessage } from 'react-intl'
// import FloatingLabelInput from 'react-floating-label-input'
import renderField from '../../Form/renderField'
import classes from './InputField.module.scss'

export class InputField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: false,
      currentType: props.type,
      disabled: props.disabled
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.disabled !== prevProps.disabled) {
      this.setState({
        disabled: this.props.disabled
      })
    }
  }

  moveUpPlaceholder = () => {
    this.setState({
      focus: true
    })
    const { input } = this.props
    if (input && input.onFocus) {
      input.onFocus()
    }
  }

  moveDownPlaceholder = () => {
    this.setState({
      focus: false
    })
    const { input } = this.props
    if (input && input.onBlur) {
      input.onBlur()
    }
  }

  toggleShowPassword = () => {
    this.setState((prevState) => ({
      ...prevState,
      currentType: prevState.currentType === 'password' ? 'text' : 'password'
    }))
  }

  handleEnableInput = () => {
    this.setState({
      disabled: false
    })
  }

  onChange = (e) => {
    const { inputType, input } = this.props
    const value = e.target.value
    if (inputType === 'number') {
      if (!value || !isNaN(value)) {
        input.onChange(value)
      }
    } else {
      input.onChange(value)
    }
  }

  focus = () => {
    this.inputRef.focus()
    setTimeout(() => {
      if (this.inputRef) {
        this.inputRef.select()
      }
    }, 0)
  }

  render() {
    const {
      name,
      type,
      options,
      customClass,
      intl,
      note,
      maxLength,
      hasError,
      placeholder,
      showEnableInput,
      input,
      customClassEye,
      h50
    } = this.props
    const { focus, currentType, disabled } = this.state
    let placeholderStr = ''
    if (placeholder) {
      placeholderStr = typeof placeholder === 'string' ? placeholder : intl.formatMessage(placeholder)
    }
    return (
      <div>
        <div className={classes.inputWrapper}>
          <div className={classes.inputContainer}>
            <input
              {...options}
              {...input}
              onChange={this.onChange}
              name={name}
              className={classNames(
                classes.input,
                customClass,
                hasError && classes.errorField,
                focus && classes.focus,
                disabled && classes.disabled,
                h50 && classes.h50,
                'inputField'
              )}
              type={currentType}
              disabled={disabled}
              onFocus={this.moveUpPlaceholder}
              onBlur={this.moveDownPlaceholder}
              maxLength={maxLength}
              placeholder={placeholderStr}
              ref={(ref) => this.inputRef = ref}

            />
            { type === 'password'
              && (
              <a
                className={classNames(classes.btnEye, customClassEye)}
                onClick={this.toggleShowPassword}
              >
                <FontAwesomeIcon
                  icon={currentType !== 'password' ? faEyeSlash : faEye}
                  className={classes.eyeIcon}
                />
              </a>
              )}
            {/* { maxLength > 0
              && <p className={classes.remainCharactor}>
                { remainCharactor }
              </p>
            } */}
          </div>
          { showEnableInput
             && (
             <a
               className="btn btnSmall btnBlue ml20"
               onClick={this.handleEnableInput}
             >
               <FormattedMessage
                 id="InputField.change"
                 defaultMessage="Change"
               />
             </a>
             )}
        </div>
        { note && (
        <p className={classes.note}>
          {typeof note === 'string' ? note : intl.formatMessage(note)}
        </p>
        ) }
      </div>
    )
  }
}

export default renderField(InputField)
