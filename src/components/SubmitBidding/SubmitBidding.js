import React, { useEffect, useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import closeIcon from 'images/close.svg'
import { FormattedMessage } from 'react-intl'
import SelectField from 'components/SelectField'
import FormattedField from 'components/FormatedField'
import DropzoneUploader from 'components/DropzoneUploader/DropzoneUploader'
import Button from 'components/Button'
import * as Api from 'api/api'
import DatePickerFormTo from 'components/DatePickerFormTo'
import { useDispatch } from 'react-redux'
import { showNotification } from 'layout/CommonLayout/actions'
import smartContractBidding from 'utils/smartContract/bidding'
import { useSmartContract } from 'utils/smartContract/hooks'
import SavingLoading from 'components/SavingLoading'
import { convertSmartContractData } from 'utils/utils'
import moment from 'moment'
import classes from './SubmitBidding.module.scss'

const SubmitBidding = ({ handleClose,
  packageId,
  handleSubmit,
  bidding,
  handleRefershPackageDetail,
}) => {
  const [entities, setEntities] = useState([])

  const [loadingEntities, setLoadingEntities] = useState(false)

  const [loading, handleSubmitMetaMask] = useSmartContract()

  const dispatch = useDispatch()

  const getEntities = async () => {
    try {
      setLoadingEntities(true)
      const result = await Api.auction.get({
        url: '/api/company/entity/find-entity',
        params: {
          companyId: localStorage.getItem('companyId'),
          state: 'TODO,PROCESS,DONE',
          entityType: 'BIDDING',
          pageSize: 1000,
          page: 1
        }
      })
      setEntities(result.data.docs.map((item) => ({
        label: item.entityName,
        value: item._id
      })))
      setLoadingEntities(false)
    } catch (e) {
      setLoadingEntities(false)
    }
  }

  const submitForm = async (values) => {
    try {
      const submitData = {
        packageId,
        entityId: values.entity?.value,
        cost: values.cost,
        startDate: values.date.from,
        endDate: values.date.to,
        attackFiles: values.attackFiles.map((item) => item.url),
      }
      if (bidding) {
        await handleSubmitMetaMask({
          transactionType: 'UPDATE',
          transactionSummary: 'Update bidding',
          smartContractCall: smartContractBidding.methods.editBidding(
            bidding._id,
            convertSmartContractData({
              ...submitData,
              biddingId: bidding._id
            })
          ),
          apiCall: (transactionHash) => Api.auction.post({
            url: '/api/bidding/save-bidding',
            data: {
              ...submitData,
              biddingId: bidding._id,
              transactionHash
            }
          })
        })
      } else {
        const resultAdd = await Api.auction.post({
          url: '/api/bidding/save-bidding',
          data: {
            ...submitData,
          }
        })

        try {
          await handleSubmitMetaMask({
            transactionType: 'ADD',
            transactionSummary: 'Add bidding',
            smartContractCall: smartContractBidding.methods.addBidding(
              resultAdd.data._id,
              packageId,
              submitData.entityId,
              convertSmartContractData({
                ...submitData,
                biddingId: resultAdd.data._id
              })
            ),
            apiCall: (transactionHash) => Api.auction.post({
              url: '/api/bidding/save-bidding',
              data: {
                ...submitData,
                biddingId: resultAdd.data._id,
                transactionHash
              }
            })
          })
        } catch (e) {
          Api.auction.deleteData({
            url: `/api/bidding/delete-bidding/${resultAdd.data._id}`,
          })
          return Promise.reject(e)
        }
      }

      dispatch(showNotification({
        type: 'SUCCESS',
        message: 'Submit bidding successfully!'
      }))

      handleRefershPackageDetail()

      handleClose()
    } catch (e) {
      return Promise.reject(e)
    }
  }

  useEffect(() => {
    getEntities()
  }, [])

  return (
    <form
      className={classes.container}
      onSubmit={handleSubmit(submitForm)}
    >
      <div className={classes.header}>
        <p className={classes.title}>
          <FormattedMessage
            id="registerBidding"
            defaultMessage="Submit tender documents"
          />
        </p>
        <a
          className={classes.btnClose}
          onClick={handleClose}
        >
          <img src={closeIcon} className={classes.closeIcon} alt="close" />
        </a>
      </div>
      <div className={classes.content}>
        <Field
          name="entity"
          label="Entity bids"
          component={SelectField}
          options={entities}
          loading={loadingEntities}
        />
        <Field
          label="Cost"
          placeholder="Value"
          name="cost"
          component={FormattedField}
          options={{
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
          }}
        />
        <div className={classes.row}>
          <Field
            label="Execution period"
            name="date"
            placeholder="Days"
            component={DatePickerFormTo}
          />
        </div>
        <Field
          label="Related documents"
          name="attackFiles"
          component={DropzoneUploader}
        />
      </div>

      <div className={classes.actions}>
        <div>
          { loading && <SavingLoading /> }
        </div>
        <Button
          className="btn btnMain"
          type="submit"
          loading={loading}
        >
          <FormattedMessage
            id="submit"
            defaultMessage="Submit"
          />
        </Button>
      </div>
    </form>
  )
}

const validate = (values) => {
  const errors = {}
  if (!values.entity) {
    errors.entity = 'Please select a entity'
  }

  if (!values.cost) {
    errors.cost = 'Please enter cost'
  }

  if (!values.date || !values.date.from || !values.date.to) {
    errors.date = 'Please select from date and to date'
  } else {
    const minDate = moment(values.minDate).format('YYYY-MM-DD')
    const fromDate = moment(values.date.from).format('YYYY-MM-DD')
    const toDate = moment(values.date.to).format('YYYY-MM-DD')
    if (fromDate < minDate) {
      errors.date = `Please select from date >= ${values.minDate}`
    } else if (fromDate >= toDate) {
      errors.date = 'Please select to date > from date'
    }
    return errors
  }
}

export default reduxForm({
  form: 'SubmitBidding',
  validate,
  enableReinitialize: true,
})(SubmitBidding)
