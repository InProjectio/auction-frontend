import React, { Component } from 'react'
import { renderField } from '../../Form'
import classes from './RadiosField.module.scss'

class RadiosField extends Component {
  handleChange = (selectedValue) => () => {
    this.props.input.onChange(selectedValue)
  }

  render() {
    const { input, options } = this.props
    return (
      <div>
        <div className={classes.options}>
          { options && options.map((option) => (
            <label
              className={classes.container}
              key={option.value}
            >
              {' '}
              { option.label }
              <input
                type="radio"
                checked={input.value === option.value}
                name={option.value}
                onChange={this.handleChange(option.value)}
              />
              <span className={classes.checkmark} />
            </label>
          )) }
        </div>
      </div>
    )
  }
}

export default renderField(RadiosField)
