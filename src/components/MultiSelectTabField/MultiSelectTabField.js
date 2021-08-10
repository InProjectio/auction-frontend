import React, { Component } from 'react'
import classNames from 'classnames'
import { renderField } from 'Form'
import classes from './MultiSelectTabField.module.scss'

class MultiSelectTabField extends Component {
  handleClickOption = (option) => () => {
    const { input, single } = this.props
    const { onChange, value = [] } = input
    if (single) {
      onChange([option.value])
    } else if (value && value.indexOf(option.value) !== -1) {
      onChange(value.filter((item) => item !== option.value))
    } else {
      onChange([...value, option.value])
    }
  }

  render() {
    const {
      input,
      options,
      size
    } = this.props
    return (
      <div className={classes.container}>
        <div className={classNames(classes.options, size === 'sm' && classes.sm)}>
          { options && options.map((option) => (
            <div
              className={classNames(classes.option, input.value.indexOf(option.value) !== -1 && classes.active,
                option.disabled && classes.disabled)}
              key={option.value}
              onClick={this.handleClickOption(option)}
            >
              <span className={classes.label}>
                { option.label }
              </span>
            </div>
          )) }
        </div>
      </div>
    )
  }
}

export default renderField(MultiSelectTabField)
