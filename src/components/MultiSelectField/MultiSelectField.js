import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { renderField } from '../../Form'
import classes from './MultiSelectField.module.scss'
import { SelectField } from '../SelectField/SelectField';

class MultiSelect extends Component {
  handleChangevalue = (pos) => (data) => {
    const { value, changeValue } = this.props
    const newValue = value.map((v, i) => {
      if (i === pos) {
        return data
      }
      return v
    })
    changeValue(newValue)
  }

  handleAddMore = () => {
    const { value, changeValue } = this.props
    changeValue([...value, ''])
  }

  handleDeleteCategory = (pos) => () => {
    const { value, changeValue } = this.props
    const newValue = value.filter((v, i) => i !== pos)
    changeValue(newValue)
  }

  render() {
    const { value,
      note,
      intl,
      options,
      max,
      disabled
    } = this.props
    let numberSelect = 0
    if (value && value.length > 0) {
      numberSelect = value.length
    }
    return (
      <div className={classNames(classes.container, 'multiSelectField')}>
        { value && value.map((v, i) => (
          <div
            key={i}
            className={classNames(classes.selectWrapper,
              (numberSelect === i + 1 && i + 1 < max) && classes.selectWrapperMobile,
              numberSelect === i + 1 && i + 1 < max && i !== 0 && classes.selectWithDelete,
              max === 1 && classes.singleSelect)}
          >
            <div className={classes.select}>
              <SelectField
                value={v}
                changeValue={this.handleChangevalue(i)}
                options={options}
                disabled={disabled}
              />
            </div>
            { max > 1
              && (
              <>
                { numberSelect === i + 1 && i + 1 < max && i !== 0
                && (
                <a
                  className={classNames(classes.btnDelete, classes.btnDeleteMobile)}
                  onClick={this.handleDeleteCategory(i)}
                >
                  <FontAwesomeIcon icon={faTrash} className={classes.deleteIcon} />
                </a>
                )}
                <div className={classes.actions}>
                  { (numberSelect === i + 1 && i + 1 < max)
                    ? (
                      <div className={classes.rowActions}>
                        { i !== 0
                      && (
                      <a
                        className={classNames(classes.btnDelete, classes.btnDeleteWeb)}
                        onClick={this.handleDeleteCategory(i)}
                      >
                        <FontAwesomeIcon icon={faTrash} className={classes.deleteIcon} />
                      </a>
                      )}
                        <a
                          className={classNames('btn btnBlue btnSmall', classes.btn)}
                          onClick={this.handleAddMore}
                        >
                          <FormattedMessage
                            defaultMessage="Add another one"
                            id="MultiSelect.addMore"
                          />
                        </a>
                      </div>
                    )
                    : (
                      <a
                        className={classes.btnDelete}
                        onClick={this.handleDeleteCategory(i)}
                      >
                        <FontAwesomeIcon icon={faTrash} className={classes.deleteIcon} />
                      </a>
                    )}
                </div>
              </>
              )}
          </div>
        )) }

        { note && (
        <p className={classes.note}>
          {typeof note === 'string' ? note : intl.formatMessage(note)}
        </p>
        )}
      </div>
    )
  }
}

export default renderField(MultiSelect)
