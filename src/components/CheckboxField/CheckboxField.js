import React, { Component } from 'react'
import classNames from 'classnames'
import check from 'images/check.svg'
import checked from 'images/checked.svg'
import { renderField } from '../../Form'
import classes from './CheckboxField.module.scss'

export class CheckboxField extends Component {
  handleChange = () => {
    const { input } = this.props
    input.onChange(!input.value)
  }

  render() {
    const { input,
      childrenComponent,
      customContainer
    } = this.props
    return (
      <div>
        <div
          className={classNames(classes.container, customContainer)}
          onClick={this.handleChange}
        >
          <div className={classNames(classes.checkboxWrapper)}>
            <img
              src={input.value ? checked : check}
              className={classNames(classes.checked, !input.value && classes.check)}
              alt="check"
            />
          </div>

          {childrenComponent}
        </div>
      </div>
    );
  }
}

export default renderField(CheckboxField)
