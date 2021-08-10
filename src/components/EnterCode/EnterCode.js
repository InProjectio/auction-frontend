import React, { useState, useEffect } from 'react'
import InputField from 'components/InputField'
import {
  defineMessages,
  FormattedMessage
} from 'react-intl'
import Button from 'components/Button'
import * as Api from 'api/api'
import classes from './EnterCode.module.scss'

const messages = defineMessages({
  enterCode: {
    id: 'EnterCode.enterCode',
    defaultMessage: 'Nhập mã'
  }
})

const EnterCode = ({ applyCode, totalPrice, promotion }) => {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(async () => {
    if (code && !error && promotion.promotionCode === code) {
      const result = await Api.post({
        url: '/dynamic/customer/private/check-promote',
        data: {
          promotionCode: code,
          totalPrice
        }
      })

      applyCode(result.data)
    }
  }, [totalPrice])

  const handleCheckCode = async () => {
    try {
      setLoading(true)

      // console.log('totalPrice', totalPrice)

      const result = await Api.post({
        url: '/dynamic/customer/private/check-promote',
        data: {
          promotionCode: code,
          totalPrice
        }
      })

      applyCode(result.data)

      setLoading(false)
      setError(false)
    } catch (e) {
      setLoading(false)
      setError(true)
    }
  }

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.inputWrapper}>
          <InputField
            h50
            input={{
              value: code,
              onChange: (value) => {
                setCode(value)
              }
            }}
            placeholder={messages.enterCode}
          />
          { error && (
          <p className={classes.error}>
            <FormattedMessage
              defaultMessage="Mã khuyến mãi không hợp lệ."
              id="EnterCode.codeInvalid"
            />
          </p>
          )}

        </div>
        <Button
          className={classes.btnApply}
          loading={loading}
          onClick={handleCheckCode}
        >
          <FormattedMessage
            defaultMessage="Áp dụng"
            id="EnterCode.apply"
          />
        </Button>
      </div>
    </div>

  )
}

export default EnterCode
