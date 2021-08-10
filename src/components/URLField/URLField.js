import React from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
// import FloatingLabelInput from 'react-floating-label-input'
import * as Api from 'api/api'
import checkIcon from 'images/check.png'
import failIcon from 'images/fail.svg'
import renderField from '../../Form/renderField'
import classes from './URLField.module.scss'
import Button from '../Button'

export class URLField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: false,
      currentType: props.type,
      disabled: props.disabled,
      checkStatus: '',
      loadingCheck: false
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
    console.log('test')
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

  handleCheck = async () => {
    const { input } = this.props
    try {
      this.setState({
        loadingCheck: true
      })
      const result = await Api.get({
        url: '/public/partner/check-domain',
        params: {
          domainName: input.value
        }
      })

      this.setState({
        checkStatus: result.data.status,
        loadingCheck: false
      })
    } catch (e) {
      this.setState({
        loadingCheck: false
      })
    }
  }

  render() {
    const {
      name,
      options,
      customClass,
      intl,
      maxLength,
      hasError,
      placeholder,
      input,
      h50
    } = this.props
    const { focus, currentType, disabled,
      loadingCheck,
      checkStatus
    } = this.state
    let placeholderStr = ''
    if (placeholder) {
      placeholderStr = typeof placeholder === 'string' ? placeholder : intl.formatMessage(placeholder)
    }
    return (
      <div>
        <div className={classes.inputWrapper}>
          <div className={classes.inputContainer}>
            <div className={classNames(
              classes.input,
              customClass,
              hasError && classes.errorField,
              focus && classes.focus,
              disabled && classes.disabled,
              h50 && classes.h50Domain,
              classes.donmain
            )}
            >
              https://carclick.vn/
            </div>
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
                'URLField'
              )}
              type={currentType}
              disabled={disabled}
              onFocus={this.moveUpPlaceholder}
              onBlur={this.moveDownPlaceholder}
              maxLength={maxLength}
              placeholder={placeholderStr}
              ref={(ref) => this.inputRef = ref}

            />

            { checkStatus
              && (
              <>
                <img src={checkStatus === 'OK' ? checkIcon : failIcon} alt="icon" className={classes.icon} />
              </>
              )}

          </div>
          <Button
            className={classNames(classes.btnApply, h50 && classes.btn50)}
            onClick={this.handleCheck}
            loading={loadingCheck}
          >
            <FormattedMessage
              id="URLField.check"
              defaultMessage="Kiểm tra"
            />
          </Button>
        </div>
      </div>
    )
  }
}

export default renderField(URLField)
