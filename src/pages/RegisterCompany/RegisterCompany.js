import React from 'react'
import CompanyInformation from 'pages/Company/components/CompanyInformation'
import Overview from 'pages/Company/components/Overview'
import { getFormValues } from 'redux-form'
import { useSelector, useDispatch } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { showNotification } from 'layout/CommonLayout/actions'
import history from 'utils/history'
import * as storage from 'utils/storage'
import classes from './RegisterCompany.module.scss'

const mapStateToProps = createStructuredSelector({
  formState: (state) => getFormValues('RegisterCompany')(state) || {},
});

const RegisterCompany = () => {
  const { formState } = useSelector(mapStateToProps)

  const dispatch = useDispatch()

  const handleSubmitFormSuccess = (values, result) => {
    dispatch(showNotification({
      type: 'SUCCESS',
      message: 'Register company successfully!'
    }))
    localStorage.setItem('companyId', result._id)
    storage.setItem('companyId', result._id)
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const userData = JSON.stringify({
      ...userInfo,
      userMapping: result.userMapping
    })
    localStorage.setItem('userInfo', userData)
    storage.setItem('userInfo', userData)
    history.push('/company')
  }

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.left}>
          <CompanyInformation
            initialValues={{
              careers: ['']
            }}
            isRegister
            form="RegisterCompany"
            submitFormSuccess={handleSubmitFormSuccess}
          />
        </div>
        <div className={classes.overview}>
          <Overview company={formState} />
        </div>
      </div>
    </div>
  )
}

export default RegisterCompany
