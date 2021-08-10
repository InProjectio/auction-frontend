import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import classes from './PhonesField.module.scss'
import { renderField } from '../../Form';
// import { InputField } from '../InputField/InputField';
import { FormattedField } from '../FormatedField/FormattedField';

class PhonesField extends Component {
  handleChange = (i) => (v) => {
    const { value, changeValue } = this.props
    const newValue = value.map((text, index) => {
      if (index === i) {
        return v
      }
      return text
    })
    changeValue(newValue)
  }

  handleAddAnother = () => {
    const { value, changeValue } = this.props
    changeValue([...value, ''])
  }

  handleRemove = () => {
    const { value, changeValue } = this.props
    changeValue([value[0]])
  }

  render() {
    const { value } = this.props
    return (
      <div className={classes.container}>
        { value && value.map((text, i) => (
          <div
            key={i}
            className={classes.field}
          >
            <FormattedField
              value={text}
              changeValue={this.handleChange(i)}
              options={{
                prefix: '+48',
                delimiter: '-',
                blocks: [6, 3, 3],
                numericOnly: true,
              }}
            />
            { i === 1
              && (
              <a
                onClick={this.handleRemove}
                className={classes.btnRemove}
              >
                <FontAwesomeIcon icon={faMinus} className={classes.closeIcon} />
              </a>
              )}
          </div>
        )) }
        { value.length < 2
          && (
          <a
            className="btn btnBlue"
            onClick={this.handleAddAnother}
          >
            <FormattedMessage
              id="PhoneFields.addAnother"
              defaultMessage="Add another"
            />
          </a>
          )}
      </div>
    )
  }
}

export default renderField(PhonesField)
