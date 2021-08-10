import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeSelectCompany } from 'layout/CompanyLayout/selectors'
import { getCompanySuccess } from 'layout/CompanyLayout/slices'
import classes from './Company.module.scss'
import Overview from './components/Overview'
import CompanyInformation from './components/CompanyInformation'

const mapStateToProps = createStructuredSelector({
  company: makeSelectCompany()
})

const Company = () => {
  const viewOnly = useMemo(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const roleType = userInfo?.userMapping?.roleType
    return roleType !== 'PROFILE' && roleType !== 'OWNER'
  }, [])
  const { company } = useSelector(mapStateToProps)

  const dispatch = useDispatch()

  const submitFormSuccess = (values) => {
    const data = {
      ...company,
      ...values
    }
    dispatch(getCompanySuccess(data))
  }

  const handleSetLogo = (logo) => {
    const data = {
      ...company,
      logo
    }
    dispatch(getCompanySuccess(data))
  }

  const dataInitialForm = useMemo(() => {
    const { owner, userMaps, __v, ...data } = company
    return data
  }, [company])

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.left}>
          <CompanyInformation
            form="CompanyForm"
            initialValues={dataInitialForm}
            submitFormSuccess={submitFormSuccess}
            viewOnly={viewOnly}
          />
        </div>
        <div className={classes.overview}>
          <Overview
            company={company}
            setLogo={handleSetLogo}
          />
        </div>
      </div>
    </div>
  )
}

export default Company
