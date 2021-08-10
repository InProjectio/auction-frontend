import React from 'react'
import closeIcon from 'images/close.svg'
import Button from 'components/Button'
import { Field, reduxForm } from 'redux-form'
import InputField from 'components/InputField'
import SelectField from 'components/SelectField'
import { EMPLOYEE_ROLES } from 'utils/constants'
import defaultAvatar from 'images/defaultAvatar.svg'
import * as Api from 'api/api'
import smartContractCompany from 'utils/smartContract/company'
import { useSmartContract } from 'utils/smartContract/hooks'
import { convertSmartContractData } from 'utils/utils'
import classes from './SetEmployee.module.scss'

const SetEmployee = ({
  title,
  selectedEmployee,
  btnText,
  handleSubmit,
  handleClose,
  refreshEmployees,
  from,
}) => {
  const [loading, handleSubmitMetaMask] = useSmartContract()
  const submitInfo = async (values) => {
    try {
      const companyId = localStorage.getItem('companyId')
      console.log([[companyId, selectedEmployee._id, values.position, values.roleType.value, 'n', 'n']])
      if (from === 'requesting') {
        await handleSubmitMetaMask({
          transactionType: 'ADD',
          transactionSummary: 'Approve employee',
          apiCall: (transactionHash) => Api.auction.put({
            url: `/api/company/user-mapping/update/${selectedEmployee._id}`,
            data: {
              state: 'ACCEPT',
              roleType: values.roleType.value,
              position: values.position,
              transactionHash
            }
          }),
          smartContractCall: smartContractCompany.methods.addMultiUserToCompany(
            [[selectedEmployee._id, convertSmartContractData(selectedEmployee), selectedEmployee.user?.user_id]],
            [[companyId, selectedEmployee._id, values.position, values.roleType.value, 'n', 'y']]
          )
        })
      } else {
        await handleSubmitMetaMask({
          transactionType: 'UPDATE',
          transactionSummary: 'Update employee',
          apiCall: (transactionHash) => Api.auction.put({
            url: `/api/company/user-mapping/update/${selectedEmployee._id}`,
            data: {
              state: 'ACCEPT',
              roleType: values.roleType.value,
              position: values.position,
              transactionHash
            }
          }),
          smartContractCall: smartContractCompany.methods.editCompanyUser(
            companyId, selectedEmployee._id, values.roleType.value, values.position,
          )
        })
      }
      refreshEmployees()
      handleClose()
    } catch (e) {
      Promise.reject(e)
    }
  }
  return (
    <form
      className={classes.container}
      onSubmit={handleSubmit(submitInfo)}
    >
      <div className={classes.head}>
        <p className={classes.title}>
          { title }
        </p>
        <a
          className={classes.btnClose}
          onClick={handleClose}
        >
          <img src={closeIcon} className={classes.closeIcon} alt="close" />
        </a>
      </div>

      <div className={classes.content}>
        <div className={classes.employeeInfo}>
          <img src={selectedEmployee?.user?.avatar_url || defaultAvatar} className={classes.avatar} alt="avatar" />
          <div className={classes.info}>
            <p className={classes.fullname}>
              { selectedEmployee?.user?.fullname }
            </p>
            <p className={classes.email}>
              { selectedEmployee?.email }
            </p>
            <p className={classes.position}>
              { selectedEmployee?.position }
            </p>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.position}>
            <Field
              name="position"
              component={InputField}
              label="Position"
            />
          </div>
          <div className={classes.role}>
            <Field
              name="roleType"
              component={SelectField}
              label="Role"
              options={EMPLOYEE_ROLES}
            />
          </div>

        </div>

      </div>
      <div className={classes.actions}>
        <Button
          className="btn btnSmall btnMain"
          type="submit"
          loading={loading}
        >
          { btnText }
        </Button>
      </div>
    </form>
  )
}

const validate = (values) => {
  const errors = {}

  if (!values.position) {
    errors.position = 'Please enter position'
  }

  if (!values.roleType) {
    errors.roleType = 'Please select role'
  }

  return errors
}

export default reduxForm({
  form: 'ApproveEmployee',
  validate,
  enableReinitialize: true
})(SetEmployee)
