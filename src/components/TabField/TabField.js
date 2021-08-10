import React, { Component } from 'react'
import classNames from 'classnames'
import classes from './TabField.module.scss';
import { renderField } from '../../Form';

class TabField extends Component {
  handleClickTab = (option) => () => {
    const { value, changeValue } = this.props
    if (value !== option) {
      changeValue(option)
    }
  }

  render() {
    const { value, options } = this.props
    return (
      <div className={classes.container}>
        { options && options.map((option) => (
          <div
            key={option.value}
            className={classNames(classes.option, value === option.value && classes.active)}
            onClick={this.handleClickTab(option.value)}
          >
            { option.label }
          </div>
        )) }
      </div>
    )
  }
}

export default renderField(TabField)
