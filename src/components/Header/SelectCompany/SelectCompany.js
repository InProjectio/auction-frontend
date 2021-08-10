import React, { useState } from 'react'
import closeIcon from 'images/close.svg'
import Button from 'components/Button';
import * as Api from 'api/api'
import { useDispatch } from 'react-redux';
import { showNotification } from 'layout/CommonLayout/actions';
import SelectCompanyField from 'components/SelectCompanyField';
import classes from './SelectCompany.module.scss'

const SelectCompany = ({ handleClose }) => {
  const [loading, setLoading] = useState(false)

  const [selectedCompany, setSelectedCompany] = useState(null)

  const dispatch = useDispatch()

  const handleSelectCompany = async () => {
    try {
      if (!selectedCompany || !selectedCompany._id) {
        dispatch(showNotification({
          type: 'ERROR',
          message: 'Please slect a company'
        }))
        return
      }
      setLoading(true)

      await Api.auction.post({
        url: '/api/company/user-mapping/request',
        data: {
          companyId: selectedCompany._id
        }
      })

      setLoading(false)

      dispatch(showNotification({
        type: 'SUCCESS',
        message: 'Request is sent to company'
      }))

      handleClose()
    } catch (e) {
      setLoading(false)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.head}>
        <p className={classes.title}>
          Select company
        </p>
        <a
          className={classes.btnClose}
          onClick={handleClose}
        >
          <img src={closeIcon} className={classes.closeIcon} alt="closeIcon" />
        </a>
      </div>

      <div className={classes.content}>
        <p className={classes.label}>
          Company
        </p>
        <SelectCompanyField input={{
          onChange: (value) => setSelectedCompany(value)
        }}
        />
      </div>

      <div className={classes.actions}>
        <Button
          className="btn btnMain btnSmall"
          loading={loading}
          onClick={handleSelectCompany}
        >
          Select
        </Button>

      </div>
    </div>
  )
}

export default SelectCompany
