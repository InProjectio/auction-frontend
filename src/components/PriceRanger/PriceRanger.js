import React, { useState, useEffect } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import InputRange from 'react-input-range';
import FormatedField from 'components/FormatedField'
import { renderField } from 'Form'
import classes from './PriceRanger.module.scss'

let timeout = null

const messages = defineMessages({
  from: {
    id: 'PriceRanger.from',
    defaultMessage: 'Từ'
  },
  to: {
    id: 'PriceRanger.to',
    defaultMessage: 'Đến'
  }

})

const PriceRanger = (props) => {
  const { input } = props

  const [value, setValue] = useState(input.value)

  useEffect(() => {
    setValue(input.value)
  }, [input.value.min, input.value.max])

  const displayValue = (value) => {
    if (value === 0) {
      return 0
    }
    if (value === 2000) {
      return '> 2 tỷ'
    }
    if (value >= 1000) {
      return `${value / 1000} tỷ`
    }
    return `${value} triệu`
  }

  return (
    <div className={classes.container}>
      <div className={classes.inputWrapper}>
        <div className={classes.left}>
          <FormatedField
            options={{
              numeral: true,
              numeralThousandsGroupStyle: 'thousand'
            }}
            validate={(min) => {
              console.log(min, value.max)
              if (+min > +value.max) {
                return false
              }
              return true
            }}
            defaultVal={0}
            input={{
              value: value.min,
              onChange: (min) => {
                setValue({
                  ...value,
                  min: +min
                })
                if (input.onChange) {
                  input.onChange({
                    ...value,
                    min: +min
                  })
                }

                clearTimeout(timeout)
                timeout = setTimeout(() => {
                  if (input.handleSearch) {
                    input.handleSearch({
                      ...value,
                      min
                    })
                  }
                }, 300)
              }
            }}
            placeholder={messages.from}
            customClass={classes.inputField}
          />
          <p className={classes.unit}>
            <FormattedMessage
              id="PriceRanger.unit"
              defaultMessage="triệu"
            />
          </p>
        </div>
        <div className={classes.right}>
          <FormatedField
            options={{
              numeral: true,
              numeralThousandsGroupStyle: 'thousand'
            }}
            input={{
              value: value.max,
              onChange: (max) => {
                if (isNaN(max) || +max < +value.min) {
                  return false
                }
                setValue({
                  ...value,
                  max: +max
                })
                if (input.onChange) {
                  input.onChange({
                    ...value,
                    max: +max
                  })
                }

                clearTimeout(timeout)
                timeout = setTimeout(() => {
                  if (input.handleSearch) {
                    input.handleSearch({
                      ...value,
                      max
                    })
                  }
                }, 300)
              }
            }}
            placeholder={messages.to}
            customClass={classes.inputField}
          />
          <p className={classes.unit}>
            <FormattedMessage
              id="PriceRanger.unit"
              defaultMessage="triệu"
            />
          </p>
        </div>
      </div>
      <div className={classes.inputRangerWrapper}>
        <InputRange
          maxValue={2000}
          minValue={0}
          value={value}
          onChange={(value) => {
            setValue(value)
            if (input.onChange) {
              input.onChange(value)
            }

            clearTimeout(timeout)
            timeout = setTimeout(() => {
              if (input.handleSearch) {
                input.handleSearch(value)
              }
            }, 300)
          }}
          draggableTrack
          formatLabel={displayValue}
          inputRange={classes.inputRanger}
        />
      </div>

    </div>
  )
}

export default renderField(PriceRanger)
