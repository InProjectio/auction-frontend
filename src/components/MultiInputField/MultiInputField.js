import React, { Component } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import classes from './MultiInputField.module.scss'
import { renderField } from '../../Form'

class MultiInputField extends Component {
  componentDidUpdate(prevProps) {
    const prevLength = prevProps.value ? prevProps.value.length : 0
    const currentLength = this.props.value ? this.props.value.length : 0
    if (currentLength > prevLength && currentLength > 0) {
      this[`inputRef${currentLength - 1}`].focus()
    }
  }

  handleChangeText = (pos) => (e) => {
    const text = e.target.value
    const { input } = this.props
    if (pos !== null && input.value) {
      const newValue = input.value.map((v, i) => {
        if (i === pos) {
          return text
        }
        return v
      })
      input.onChange(newValue)
    } else {
      input.onChange([text])
    }
  }

  handleAddInput = () => {
    const { input } = this.props
    if (input.value) {
      input.onChange([...input.value, ''])
    } else {
      input.onChange([''])
    }
  }

  handleRemoveInput = (pos) => () => {
    const { input } = this.props
    const newValue = input.value.filter((v, i) => i !== pos)
    input.onChange(newValue)
  }

  render() {
    const {
      input,
      btnLabel,
      disabled
    } = this.props
    return (
      <div className={classes.container}>
        { (input.value && input.value.length > 0)
          && input.value.map((text, i) => (
            <div
              className={classes.row}
              key={i}
            >
              <input
                type="text"
                value={text}
                onChange={this.handleChangeText(i)}
                ref={(inputRef) => this[`inputRef${i}`] = inputRef}
                className={classNames(classes.input, disabled && classes.disabled)}
              />
              <a
                className={classNames(classes.btnDelete, disabled && classes.noAction)}
                onClick={this.handleRemoveInput(i)}
              >
                <FontAwesomeIcon icon={faTrash} className={classes.deleteIcon} />
              </a>
            </div>
          ))}
        <div className={classes.actions}>
          <a
            className={classNames('btn btnBlue btnSmall', disabled && classes.noAction)}
            onClick={this.handleAddInput}
          >
            { btnLabel }
          </a>
        </div>

      </div>
    )
  }
}

export default renderField(MultiInputField)
