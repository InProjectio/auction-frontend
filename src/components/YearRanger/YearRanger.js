import React from 'react'
import { defineMessages } from 'react-intl'
import { renderField } from 'Form'
import { YEARS } from 'utils/constants'
import classes from './YearRanger.module.scss'
import SelectField from '../SelectField'

const messages = defineMessages({
  from: {
    id: 'YearRanger.from',
    defaultMessage: 'Từ'
  },
  to: {
    id: 'YearRanger.to',
    defaultMessage: 'Đến'
  }
})

const YearRanger = (props) => {
  const { input } = props
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <SelectField
          options={YEARS}
          placeholder={messages.from}
          input={{
            value: input.value.from,
            onChange: (option) => {
              input.onChange({
                ...input.value,
                from: option
              })
            }
          }}
        />
      </div>
      <div className={classes.right}>
        <SelectField
          options={YEARS}
          placeholder={messages.to}
          input={{
            value: input.value.to,
            onChange: (option) => {
              input.onChange({
                ...input.value,
                to: option
              })
            }
          }}
        />
      </div>
    </div>
  )
}

export default renderField(YearRanger)
