import React from 'react'
import classNames from 'classnames'
import ModalComponent from 'components/ModalComponent'
import { defineMessage, FormattedMessage } from 'react-intl'
import Button from 'components/Button'
import InputField from 'components/InputField'
import classes from './SelectCode.module.scss'
import VoucherItem from '../VoucherItem'

const messages = defineMessage({
  title: {
    id: 'SelectCode.title',
    defaultMessage: 'Chọn Voucher'
  }
})

const SelectCode = ({
  handleClose,
  show,
}) => {
  const codes = [{
    title: 'MIỄN PHÍ VẬN CHUYỂN',
    description: 'Thanh toán qua ví Momo',
    expireDate: '31/2/2021',
    selected: true,
    id: 1
  }, {
    title: 'MIỄN PHÍ VẬN CHUYỂN',
    description: 'Thanh toán qua ví Momo',
    expireDate: '31/2/2021',
    selected: false,
    id: 2
  }, {
    title: 'MIỄN PHÍ VẬN CHUYỂN',
    description: 'Thanh toán qua ví Momo',
    expireDate: '31/2/2021',
    selected: false,
    id: 3
  }]
  return (
    <ModalComponent
      show={show}
      title={messages.title}
      size="md"
      handleClose={handleClose}
      className={classes.advanceSearch}
      headClass={classes.headClass}
    >
      <div className={classes.container}>
        <div className={classes.row}>
          <div className={classes.inputWrapper}>
            <InputField
              h50
              input={{
                value: '',
                onChange: () => {

                }
              }}
            />

            <Button className={classes.btnApply}>
              <FormattedMessage
                id="SelectCode.apply"
                defaultMessage="Áp dụng"
              />
            </Button>
          </div>
        </div>
        <div className={classes.rowBetween}>
          <p className={classes.label}>
            <FormattedMessage
              id="SelectCode.label"
              defaultMessage="Voucher của bạn"
            />
          </p>
          <p className={classes.note}>
            <FormattedMessage
              id="SelectCode.note"
              defaultMessage="* Chỉ có thể chọn 1 Voucher"
            />
          </p>
        </div>

        <div className={classes.codes}>
          { codes.map((code) => (
            <VoucherItem code={code} key={code.id} />
          )) }
        </div>
        <div className={classes.actions}>
          <Button className={classes.btnCancel}>
            <FormattedMessage
              id="SelectCode.cancel"
              defaultMessage="Huỷ"
            />
          </Button>
          <Button className={classNames('btn btnRed btnLarge', classes.btnConfirm)}>
            <FormattedMessage
              id="SelectCode.confirm"
              defaultMessage="Xác nhận"
            />
          </Button>
        </div>
      </div>
    </ModalComponent>

  )
}

export default SelectCode
