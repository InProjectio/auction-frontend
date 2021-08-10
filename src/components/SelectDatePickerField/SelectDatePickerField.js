import React, { Component } from 'react'
import moment from 'moment'
import SelectDatepicker from './DatePickerSelect'
import classes from './SelectDatePickerField.module.scss'
import { renderField } from '../../Form';

class SelectDatePickerField extends Component {
  onDateChange = (date) => {
    // console.log('onDateChange', date)
    if (date) {
      this.props.changeValue(date)
    }
  }

  render() {
    const { value } = this.props
    // console.log(value)
    const date = (value && typeof value === 'string') ? moment(value).toDate() : (value || null)
    // console.log(date)
    return (
      <div className={classes.container}>
        <SelectDatepicker
          value={date}
          onDateChange={this.onDateChange}
          minDate={new Date(1900, 0, 1)}
          maxDate={new Date()}
          format="day/month/year"
        />
      </div>
    )
  }
}

export default renderField(SelectDatePickerField)
