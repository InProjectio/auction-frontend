import React, { useEffect, useState, useMemo } from 'react'

import GooglePaging from 'components/GooglePaging'
import { INVITING_STATUS_SELECT,
  EMPLOYEE_ROLES_SELECT,
  INVITING_STATUS_OBJ,
  EMPLOYEE_ROLE_OBJ } from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { handleShowConfirm } from 'layout/CommonLayout/actions'
import { convertSearchParamsToObject, convertObjectToSearchParams } from 'utils/utils'
import history from 'utils/history'
import classes from './Inviting.module.scss'
import EmployeesTable from './EmployeesTable'
import Header from '../components/Header'
import reducer, {
  getEmployees,
  cancelRequest
} from './Slices'
import saga from './saga'
import { makeSelectEmployeesData } from './selectors'

const mapStateToProps = createStructuredSelector({
  employeesData: makeSelectEmployeesData()
})

const EmployeesInviting = ({ location }) => {
  const viewOnly = useMemo(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const roleType = userInfo?.userMapping?.roleType
    return roleType !== 'PROFILE' && roleType !== 'OWNER'
  }, [])
  const [searchObj, setSearchObj] = useState({})

  useInjectReducer({ key: 'employeesInviting', reducer })
  useInjectSaga({ key: 'employeesInviting', saga })

  const dispatch = useDispatch()

  const { employeesData } = useSelector(mapStateToProps)

  useEffect(() => {
    const query = convertSearchParamsToObject(location.search)
    setSearchObj({
      ...query,
      textSearch: query.textSearch && decodeURIComponent(query.textSearch),
      status: query.state && {
        label: INVITING_STATUS_OBJ[query.state],
        value: query.state
      },
      roleType: query.roleType && {
        label: EMPLOYEE_ROLE_OBJ[query.roleType],
        value: query.roleType
      }
    })
    dispatch(getEmployees(query))
  }, [location.search])

  const handleSearch = (searchObj) => {
    history.replace({
      pathname: location.pathname,
      search: convertObjectToSearchParams({
        ...searchObj,
        state: searchObj.status && searchObj.status.value,
        roleType: searchObj.roleType && searchObj.roleType.value,
        status: undefined,
        page: 1
      })
    })
  }

  const handleChangePage = ({ page }) => {
    const query = convertSearchParamsToObject(location.search)
    history.replace({
      pathname: location.pathname,
      search: convertObjectToSearchParams({
        ...query,
        page
      })
    })
  }

  const handleCancelRequest = (employee) => {
    dispatch(handleShowConfirm({
      title: 'Confirm',
      description: 'Do you want cancel this request?',
      handleOk: () => {
        const query = convertSearchParamsToObject(location.search)
        dispatch(cancelRequest({ employee, query }))
      }
    }))
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Header
          statuses={INVITING_STATUS_SELECT}
          roles={EMPLOYEE_ROLES_SELECT}
          searchObj={searchObj}
          handleSearch={handleSearch}
          totalDocs={employeesData?.totalDocs}
          viewOnly={viewOnly}
        />
      </div>

      <div className={classes.content}>
        <EmployeesTable
          employees={employeesData.docs}
          cancelRequest={handleCancelRequest}
          viewOnly={viewOnly}
        />
        <GooglePaging
          pageInfo={{
            page: employeesData.page,
            totalPages: employeesData.totalPages
          }}
          changePage={handleChangePage}
        />
      </div>
    </div>
  )
}

export default EmployeesInviting
