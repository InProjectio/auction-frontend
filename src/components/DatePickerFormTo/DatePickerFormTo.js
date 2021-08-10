import React from 'react'
import { renderField } from 'Form'
import arrowLeft from 'images/arrow-left.svg'
import classes from './DatePickerFormTo.module.scss'
import { DatePickerField } from '../DatePickerField/DatePickerField'

const DatePickerFieldFormTo = ({ input, timeFormat, hasError }) => (
  <div className={classes.container}>
    <div className={classes.col}>
      <DatePickerField
        input={{
          value: input.value?.from || '',
          onChange: (date) => {
            input.onChange({
              ...input.value,
              from: date
            })
          }

        }}
        placeholder="From (MM/DD/YYYY)"
        viewMode="days"
        timeFormat={timeFormat}
        hasError={hasError}
      />
    </div>
    <img
      src={arrowLeft}
      className={classes.arrow}
      alt="arrowLeft"
    />
    <div className={classes.col}>
      <DatePickerField
        input={{
          value: input.value?.to || '',
          onChange: (date) => {
            input.onChange({
              ...input.value,
              to: date
            })
          }
        }}
        placeholder="To (MM/DD/YYYY)"
        viewMode="days"
        timeFormat={timeFormat}
        hasError={hasError}
      />
    </div>
  </div>
)

export default renderField(DatePickerFieldFormTo)
