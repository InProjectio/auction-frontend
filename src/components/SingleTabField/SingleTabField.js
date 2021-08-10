import React, { Component } from 'react'
import classNames from 'classnames'
import classes from './SingleTabField.module.scss';
import { renderField } from '../../Form';

class SingleTabField extends Component {
  handleClickTab = (option) => () => {
    const { value, onChange } = this.props.input
    if (value !== option) {
      onChange(option)
    }
  }

  render() {
    const { input, options } = this.props
    return (
      <div className={classes.container}>
        { options && options.map((option) => (
          <div
            key={option.value}
            className={classNames(classes.option, input.value === option.value && classes.active)}
            onClick={this.handleClickTab(option.value)}
          >
            { option.label }
          </div>
        )) }
      </div>
    )
  }
}

export default renderField(SingleTabField)
