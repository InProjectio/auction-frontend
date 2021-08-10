import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import Button from 'components/Button'
import * as Api from 'api/api'
import { Field, reduxForm } from 'redux-form'
import InputField from 'components/InputField'
import RadiosField from 'components/RadiosField'
import DropzoneUploader from 'components/DropzoneUploader'
import QuillField from 'components/QuillField'
import SelectEmployeesField from 'components/SelectEmployeesField'
import { useDispatch } from 'react-redux'
import { showNotification } from 'layout/CommonLayout/actions'
import history from 'utils/history'
import { useSmartContract } from 'utils/smartContract/hooks'
import SavingLoading from 'components/SavingLoading'
import smartContractEntity from 'utils/smartContract/entity'
import { convertSmartContractData } from 'utils/utils'
import classes from './EntityForm.module.scss'

const ENTITY_TYPES = [{
  label: 'Bidding',
  value: 'BIDDING'
}, {
  value: 'TENDERER',
  label: 'Tenderer'
}]

const EntityForm = ({ handleSubmit, match, change }) => {
  const [userCreated, setUserCreated] = useState(JSON.parse(localStorage.getItem('userInfo')))
  const [loadingEmployees, setLoadingEmployees] = useState(false)
  const [loading, handleSubmitMetaMask] = useSmartContract()
  const [employees, setEmployees] = useState([])

  const dispatch = useDispatch()

  const getEntityDetail = async () => {
    const entityId = match.params.entityId
    if (entityId) {
      const result = await Api.auction.get({
        url: '/api/company/entity/find-entity-detail',
        params: {
          entityId
        }
      })
      change('entityName', result.data.entityName)
      change('entityType', result.data.entityType)
      change('users', result.data.userMaps
        .filter((item) => item._id !== result.data.userCreated._id))
      change('attackFiles', result.data.attackFiles.map((item, i) => ({
        id: i,
        url: item
      })))
      change('content', result.data.content)
      return result.data
    }
    return null
  }

  const getEmployees = async () => {
    try {
      setLoadingEmployees(false)
      const companyId = localStorage.getItem('companyId')
      const result = await Api.auction.get({
        url: '/api/company/user-mapping/find-mappings',
        params: {
          companyId,
          state: 'ACCEPT',
          sourceType: 'INVITE,REQUEST',
          status: 'ACTIVE',
          page: 1,
          pageSize: 1000
        }
      })

      setLoadingEmployees(false)

      return result.data.docs
    } catch (e) {
      setLoadingEmployees(false)
    }
  }

  const initialData = async () => {
    const [entityDetail, employees] = await Promise.all([
      getEntityDetail(),
      getEmployees()
    ])

    let excludeUsers = []

    if (entityDetail) {
      excludeUsers = [entityDetail.userCreated._id]
      setUserCreated({
        ...entityDetail.userCreated,
        ...entityDetail.userCreated.user
      })
    } else {
      excludeUsers = [userCreated.userMapping._id]
    }

    setEmployees(employees
      .filter((item) => excludeUsers.indexOf(item._id) === -1)
      .map((item) => ({
        ...item,
        label: item.user.fullname || item.user.email,
        value: item._id
      })))
  }

  useEffect(() => {
    initialData()
  }, [])

  const submitEntity = async (values) => {
    try {
      if (match.params.entityId) {
        await handleSubmitMetaMask({
          transactionType: 'UPDATE',
          transactionSummary: 'Update entity',
          smartContractCall: smartContractEntity.methods.editEntity(
            match.params.entityId,
            convertSmartContractData({
              ...values,
              attackFiles: values.attackFiles.map((item) => item.url),
              users: values.users ? [...values.users.map((item) => item.user._id), userCreated._id] : [userCreated._id],
              entityId: match.params.entityId
            })
          ),
          apiCall: (transactionHash) => Api.auction.post({
            url: '/api/company/entity/save-entity',
            data: {
              ...values,
              attackFiles: values.attackFiles.map((item) => item.url),
              users: values.users ? [...values.users.map((item) => item.user._id), userCreated._id] : [userCreated._id],
              entityId: match.params.entityId,
              transactionHash
            }
          })
        })
      } else {
        const resultAdd = await Api.auction.post({
          url: '/api/company/entity/save-entity',
          data: {
            ...values,
            attackFiles: values.attackFiles.map((item) => item.url),
            users: values.users ? [...values.users.map((item) => item.user._id), userCreated._id] : [userCreated._id],
          }
        })

        try {
          const companyId = localStorage.getItem('companyId')
          await handleSubmitMetaMask({
            transactionType: 'ADD',
            transactionSummary: 'Add entity',
            smartContractCall: smartContractEntity.methods.addEntity(
              resultAdd.data._id,
              companyId,
              convertSmartContractData({
                ...values,
                attackFiles: values.attackFiles.map((item) => item.url),
                users: values.users ? [...values.users.map((item) => item.user._id), userCreated._id] : [userCreated._id],
                entityId: resultAdd.data._id
              })
            ),
            apiCall: (transactionHash) => Api.auction.post({
              url: '/api/company/entity/save-entity',
              data: {
                ...values,
                attackFiles: values.attackFiles.map((item) => item.url),
                users: values.users ? [...values.users.map((item) => item.user._id), userCreated._id] : [userCreated._id],
                entityId: resultAdd.data._id,
                transactionHash
              }
            })
          })
        } catch (e) {
          Api.auction.deleteData({
            url: `/api/company/entity/delete-entity/${resultAdd.data._id}`,
          })
          return Promise.reject(e)
        }
      }

      dispatch(showNotification({
        type: 'SUCCESS',
        message: 'Create entity successfully'
      }))

      if (values.entityType === 'BIDDING') {
        history.push('/company/group/bidding')
      } else {
        history.push('/company/group/inviting')
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }

  return (
    <form
      className={classes.container}
      onSubmit={handleSubmit(submitEntity)}
    >
      <div className={classes.content}>
        <div className={classes.head}>
          <p className={classes.title}>
            { match.params?.entityId
              ? (
                <FormattedMessage
                  id="EntityForm.updateEntity"
                  defaultMessage="Update entity"
                />
              ) : (
                <FormattedMessage
                  id="EntityForm.createNewEntity"
                  defaultMessage="Create new entity"
                />
              )}

          </p>
        </div>

        <div className={classes.fields}>
          <Field
            name="entityName"
            label="Entity name"
            component={InputField}
          />

          <Field
            name="entityType"
            label="Type of group"
            component={RadiosField}
            options={ENTITY_TYPES}
          />

          <Field
            name="users"
            label="Employees"
            component={SelectEmployeesField}
            options={employees}
            loading={loadingEmployees}
            userCreated={userCreated}
          />

          <Field
            name="attackFiles"
            label="Documents"
            component={DropzoneUploader}
            options={ENTITY_TYPES}
          />

          <Field
            name="content"
            label="Information"
            component={QuillField}
          />
        </div>

        <div className={classes.actions}>
          <div>
            { loading && <SavingLoading /> }
          </div>
          <Button
            className="btn btnMain"
            loading={loading}
            type="submit"
          >
            { match.params?.entityId
              ? (
                <FormattedMessage
                  id="EntityForm.updateEntity"
                  defaultMessage="Update entity"
                />
              ) : (
                <FormattedMessage
                  id="EntityForm.createEntity"
                  defaultMessage="Create entity"
                />
              )}
          </Button>
        </div>
      </div>

    </form>
  )
}

const validate = (values) => {
  const errors = {}

  if (!values.entityName || !values.entityName.trim()) {
    errors.entityName = 'Please enter entity name'
  }

  if (!values.entityType) {
    errors.entityType = 'Please select a entity type'
  }

  if (!values.content || !values.content.trim()) {
    errors.content = 'Please enter entity information'
  }

  return errors
}

export default reduxForm({
  form: 'EntityForm',
  validate
})(EntityForm)
