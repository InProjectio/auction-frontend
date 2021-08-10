import React, { useState } from 'react'
import closeIcon from 'images/close.svg'
import Button from 'components/Button'
import { Field, reduxForm, FieldArray } from 'redux-form'
import InputField from 'components/InputField'
import SelectField from 'components/SelectField'
import { EMPLOYEE_ROLES } from 'utils/constants'
import { validateEmail } from 'utils/validators'
import deleteIcon from 'images/delete.svg'
import plusIcon from 'images/plus-white.svg'
import * as Api from 'api/api'
import history from 'utils/history'
import { useDispatch } from 'react-redux'
import { getEmployees } from 'pages/Employee/Inviting/Slices'
import smartContractCompany from 'utils/smartContract/company'
import { useSmartContract } from 'utils/smartContract/hooks'
import { convertSmartContractData } from 'utils/utils'
import classes from './AddEmployee.module.scss'

const renderEmployee = ({ fields, meta: { error, submitFailed, touched } }) => (
  <div>
    {(touched || submitFailed) && error && <span className={classes.errorMessage}>{error}</span>}
    {fields.map((item, index) => (
      <div
        key={index}
        className={classes.item}
      >
        <div className={classes.rowBetween}>
          <p className={classes.title}>
            Employee #
            {index + 1}
          </p>
          { fields.length > 1
            && (
            <a
              className={classes.btnDelete}
              onClick={() => fields.remove(index)}
            >
              <img src={deleteIcon} className={classes.deleteIcon} alt="icon" />
            </a>
            )}
        </div>

        <Field
          name={`${item}.email`}
          component={InputField}
          label="Email address"
        />
        <div className={classes.row}>
          <div className={classes.position}>
            <Field
              name={`${item}.position`}
              component={InputField}
              label="Position"
            />
          </div>
          <div className={classes.role}>
            <Field
              name={`${item}.roleType`}
              component={SelectField}
              label="Role"
              options={EMPLOYEE_ROLES}
            />
          </div>

        </div>

      </div>
    ))}
    {(touched || submitFailed) && error && <span className={classes.errorMessage}>{error}</span>}
    <div>
      <a
        type="button"
        onClick={() => fields.push({})}
        className={classes.addEmployee}
      >
        <div className={classes.iconWrapper}>
          <img src={plusIcon} className={classes.plusIcon} alt="icon" />

        </div>
        Add employee
      </a>

    </div>
  </div>
)

const SetEmployee = ({
  handleSubmit,
  handleClose,
  searchObj
}) => {
  const dispatch = useDispatch()

  const [loadingAdd, setLoadingAdd] = useState(false)

  const [loading, handleSubmitMetaMask] = useSmartContract()

  const submitInfo = async (values) => {
    try {
      setLoadingAdd(true)
      const companyId = localStorage.getItem('companyId')
      const result = await Api.auction.post({
        url: '/api/company/user-mapping/invite',
        data: {
          companyId,
          inviteUsers: values.employees.map((item) => ({
            ...item,
            roleType: item.roleType.value
          }))
        }
      })

      const smartContractData = result.data.map((item) => [companyId, item._id, item.position, item.roleType, 'n', 'n'])
      const userMappingData = result.data.map((item) => [item._id, convertSmartContractData(item), 9999999999])
      try {
        await handleSubmitMetaMask({
          transactionType: 'ADD',
          transactionSummary: 'Invite employees',
          smartContractCall: smartContractCompany.methods.addMultiUserToCompany(userMappingData, smartContractData),
          apiCall: () => {}
        })
      } catch (e) {
        Api.auction.post({
          url: '/api/company/user-mapping/deletes',
          data: {
            companyId,
            userMappingIds: result.data.map((item) => item._id)
          }
        })
        setLoadingAdd(false)
        return Promise.reject(e)
      }

      setLoadingAdd(false)

      if (location.pathname === '/company/employees/inviting') {
        // refresh data
        dispatch(getEmployees({
          ...searchObj,
          state: searchObj.status && searchObj.status.value,
          roleType: searchObj.roleType && searchObj.roleType.value,
          status: undefined,
          page: 1
        }))
      } else {
        history.push('/company/employees/inviting')
      }
      handleClose()
    } catch (e) {
      setLoadingAdd(false)
      return Promise.reject(e)
    }
  }

  return (
    <form
      className={classes.container}
      onSubmit={handleSubmit(submitInfo)}
    >
      <div className={classes.head}>
        <p className={classes.title}>
          Invite employees
        </p>
        <a
          className={classes.btnClose}
          onClick={handleClose}
        >
          <img src={closeIcon} className={classes.closeIcon} alt="close" />
        </a>
      </div>

      <div className={classes.content}>
        <FieldArray name="employees" component={renderEmployee} />
      </div>
      <div className={classes.actions}>
        <Button
          className="btn btnSmall btnMain"
          type="submit"
          loading={loadingAdd || loading}
        >
          Invite
        </Button>
      </div>
    </form>
  )
}

const validate = (values) => {
  const errors = {}
  if (values.employees) {
    const itemArrayErrors = []
    values.employees.forEach((item, i) => {
      const itemErrors = {}
      if (!item.position) {
        itemErrors.position = 'Please enter position'
        itemArrayErrors[i] = itemErrors
      }
      if (!item.roleType) {
        itemErrors.roleType = 'Please select role'
        itemArrayErrors[i] = itemErrors
      }
      if (!item.email) {
        itemErrors.email = 'Please enter email'
        itemArrayErrors[i] = itemErrors
      } else if (!validateEmail(item.email)) {
        itemErrors.email = 'Please enter valid email'
        itemArrayErrors[i] = itemErrors
      }
    })
    if (itemArrayErrors.length > 0) {
      errors.employees = itemArrayErrors
    }
  }

  return errors
}

export default reduxForm({
  form: 'ApproveEmployee',
  validate,
  enableReinitialize: true
})(SetEmployee)
