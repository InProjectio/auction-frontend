import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Field, reduxForm } from 'redux-form'
import InputField from 'components/InputField'
import DatePickerField from 'components/DatePickerField'
import FormattedField from 'components/FormatedField'
import MultiInputField from 'components/MultiInputField'
import saveIcon from 'images/save.svg'
import Button from 'components/Button'
import * as Api from 'api/api'
import { validatePhoneNumber, validateEmail } from 'utils/validators'
import { useSmartContract } from 'utils/smartContract/hooks'
import smartContractCompany from 'utils/smartContract/company'
import { convertSmartContractData } from 'utils/utils'
import SavingLoading from 'components/SavingLoading'
import classes from './CompanyInformation.module.scss'

const CompanyInformation = ({ isRegister, handleSubmit, submitFormSuccess, viewOnly }) => {
  const [loading, handleSubmitMetaMask] = useSmartContract()
  const submitForm = async (values) => {
    try {
      const { _id, ...data } = values
      let result;
      if (_id) {
        result = await handleSubmitMetaMask({
          transactionType: 'UPDATE',
          transactionSummary: 'Update company',
          smartContractCall: smartContractCompany.methods.editCompany(
            _id,
            convertSmartContractData({
              _id,
              ...data
            })
          ),
          apiCall: (transactionHash) => Api.auction.post({
            url: '/api/company/save-company',
            data: {
              ...data,
              companyId: _id,
              transactionHash
            }
          })
        })
      } else {
        const companyAdd = await Api.auction.post({
          url: '/api/company/save-company',
          data
        })
        try {
          result = await handleSubmitMetaMask({
            transactionType: 'ADD',
            transactionSummary: 'Add company',
            smartContractCall: smartContractCompany.methods.addCompany(
              companyAdd.data._id,
              convertSmartContractData({
                companyId: companyAdd.data._id,
                ...data
              }),
              companyAdd.data.userMapping?._id,
              convertSmartContractData({
                ...companyAdd.data.userMapping,
                userMappingId: companyAdd.data.userMapping?._id
              })

            ),
            apiCall: (transactionHash) => Api.auction.post({
              url: '/api/company/save-company',
              data: {
                ...data,
                companyId: companyAdd.data._id,
                transactionHash
              }
            })
          })
          result = companyAdd
        } catch (e) {
          Api.auction.deleteData({
            url: `/api/company/delete-company/${companyAdd.data._id}`,
            params: {
              mappingId: companyAdd.data.userMapping?._id
            }
          })
        }
      }

      submitFormSuccess(values, result.data)
    } catch (e) {
      Promise.reject()
    }
  }
  return (
    <form
      className={classes.container}
      onSubmit={handleSubmit(submitForm)}
    >
      <div className={classes.head}>
        <FormattedMessage
          id="CompanyInformation.businessProfile"
          defaultMessage="Business Profile"
        />
        { !viewOnly
          && (
          <Button
            className={classes.btnSave}
            type="submit"
            loading={loading}
          >
            <img src={saveIcon} className={classes.saveIcon} alt="save" />
            { isRegister
              ? (
                <FormattedMessage
                  id="CompanyInformation.register"
                  defaultMessage="Register company"
                />
              ) : (
                <FormattedMessage
                  id="CompanyInformation.save"
                  defaultMessage="Save information"
                />
              )}

          </Button>
          )}

      </div>
      <div className={classes.content}>
        <Field
          label="Company name"
          component={InputField}
          name="companyName"
          disabled={viewOnly}
        />
        <Field
          label="Short name"
          component={InputField}
          name="shortName"
          disabled={viewOnly}
        />
        <Field
          label="International company name"
          component={InputField}
          name="nationalName"
          disabled={viewOnly}
        />
        <Field
          label="Type of business"
          component={InputField}
          name="businessType"
          disabled={viewOnly}
        />
        <Field
          label="Tax code"
          component={InputField}
          name="taxCode"
          disabled={viewOnly}
        />
        <Field
          label="Address by Business Registration"
          component={InputField}
          name="registrationAddress"
          disabled={viewOnly}
        />
        <Field
          label="Trading address"
          component={InputField}
          name="tradingAddress"
          disabled={viewOnly}
        />
        <div className={classes.row}>
          <div className={classes.col}>
            <Field
              label="Phone number"
              component={InputField}
              name="phone"
              disabled={viewOnly}
              inputType="number"
            />
          </div>
          <div className={classes.col}>
            <Field
              label="Fax"
              component={InputField}
              name="fax"
              disabled={viewOnly}
              inputType="number"
            />
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.col}>
            <Field
              label="Email address"
              component={InputField}
              name="email"
              disabled={viewOnly}
            />
          </div>
          <div className={classes.col}>
            <Field
              label="Website"
              component={InputField}
              name="website"
              disabled={viewOnly}
            />
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.col}>
            <Field
              label="Founding"
              component={DatePickerField}
              name="founding"
              disabled={viewOnly}
              notFurture
            />
          </div>
          <div className={classes.col}>
            <Field
              label="Number of employees"
              component={FormattedField}
              name="numEmployee"
              options={{
                numeral: true,
                numeralThousandsGroupStyle: 'thousand'
              }}
              disabled={viewOnly}
            />
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.col}>
            <Field
              label="Representative name"
              component={InputField}
              name="representName"
              disabled={viewOnly}
            />
          </div>
          <div className={classes.col}>
            <Field
              label="Representative position"
              component={InputField}
              name="representPosition"
              disabled={viewOnly}
            />
          </div>
        </div>

        <Field
          label="Representative address"
          component={InputField}
          name="representAddress"
          disabled={viewOnly}
        />
        <Field
          label="Careers"
          component={MultiInputField}
          name="careers"
          btnLabel="Add Careers"
          disabled={viewOnly}
        />
      </div>
      { !viewOnly
        && (
        <div className={classes.actions}>
          <div>
            { loading && <SavingLoading /> }
          </div>
          <Button
            className={classes.btnSave}
            type="submit"
            loading={loading}
          >
            <img src={saveIcon} className={classes.saveIcon} alt="save" />
            { isRegister
              ? (
                <FormattedMessage
                  id="CompanyInformation.register"
                  defaultMessage="Register company"
                />
              ) : (
                <FormattedMessage
                  id="CompanyInformation.save"
                  defaultMessage="Save information"
                />
              )}
          </Button>
        </div>
        )}

    </form>
  )
}

const validate = (values) => {
  const errors = {}

  if (!values.companyName) {
    errors.companyName = 'Please enter company name'
  }

  if (!values.shortName) {
    errors.shortName = 'Please enter short name'
  }

  if (!values.nationalName) {
    errors.nationalName = 'Please enter international name'
  }

  if (!values.businessType) {
    errors.businessType = 'Please enter business type'
  }

  if (!values.taxCode) {
    errors.taxCode = 'Please enter tax code'
  }

  if (!values.registrationAddress) {
    errors.registrationAddress = 'Please enter registration address'
  }

  if (!values.tradingAddress) {
    errors.tradingAddress = 'Please enter trading address'
  }

  if (!values.phone) {
    errors.phone = 'Please enter phone number'
  } else if (!validatePhoneNumber) {
    errors.phone = 'Please enter valid phone number'
  }

  // if (!values.fax) {
  //   errors.fax = 'Please enter fax'
  // }

  if (!values.email) {
    errors.email = 'Please enter email address'
  } else if (!validateEmail(values.email)) {
    errors.email = 'Please enter valid email address'
  }

  if (!values.website) {
    errors.website = 'Please enter website'
  }

  if (!values.founding) {
    errors.founding = 'Please enter founding'
  }

  if (!values.numEmployee) {
    errors.numEmployee = 'Please enter number employees'
  }

  if (!values.representName) {
    errors.representName = 'Please enter represent name'
  }

  if (!values.representAddress) {
    errors.representAddress = 'Please enter represent address'
  }

  if (!values.representPosition) {
    errors.representPosition = 'Please enter represent position'
  }

  if (!values.careers || values.careers.length === 0) {
    errors.careers = 'Please enter careers'
  }

  return errors
}

export default reduxForm({
  validate,
  enableReinitialize: true,
})(CompanyInformation)
