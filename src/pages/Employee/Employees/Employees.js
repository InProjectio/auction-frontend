import React, { useEffect, useState, useMemo } from 'react'

import GooglePaging from 'components/GooglePaging'
import { EMPLOYEE_STATUS_SELECT,
  EMPLOYEE_ROLES_SELECT,
  EMPLOYEE_STATUS_OBJ,
  EMPLOYEE_ROLE_OBJ } from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { handleShowConfirm } from 'layout/CommonLayout/actions'
import { convertSearchParamsToObject, convertObjectToSearchParams } from 'utils/utils'
import history from 'utils/history'
import { Modal } from 'react-bootstrap'
import classes from './Employees.module.scss'
import EmployeesTable from './EmployeesTable'
import Header from '../components/Header'
import reducer, {
  getEmployees,
  changeStatus
} from './Slices'
import saga from './saga'
import { makeSelectEmployeesData } from './selectors'
import SetEmployee from '../components/SetEmployee'

const mapStateToProps = createStructuredSelector({
  employeesData: makeSelectEmployeesData()
})

const Employees = ({ location }) => {
  const viewOnly = useMemo(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const roleType = userInfo?.userMapping?.roleType
    return roleType !== 'PROFILE' && roleType !== 'OWNER'
  }, [])
  const [searchObj, setSearchObj] = useState({})
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  useInjectReducer({ key: 'employees', reducer })
  useInjectSaga({ key: 'employees', saga })

  const dispatch = useDispatch()

  const { employeesData } = useSelector(mapStateToProps)

  useEffect(() => {
    const query = convertSearchParamsToObject(location.search)
    setSearchObj({
      ...query,
      textSearch: query.textSearch && decodeURIComponent(query.textSearch),
      status: query.status && {
        label: EMPLOYEE_STATUS_OBJ[query.status],
        value: query.status
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
        status: searchObj.status && searchObj.status.value,
        roleType: searchObj.roleType && searchObj.roleType.value,
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

  const refreshEmployees = () => {
    const query = convertSearchParamsToObject(location.search)
    dispatch(getEmployees(query))
  }

  const handleChangeStatus = (status, employee) => {
    const query = convertSearchParamsToObject(location.search)
    dispatch(handleShowConfirm({
      title: 'Confirm',
      description: 'Do you want change status?',
      handleOk: () => {
        dispatch(changeStatus(status, employee, query))
      }
    }))
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Header
          statuses={EMPLOYEE_STATUS_SELECT}
          roles={EMPLOYEE_ROLES_SELECT}
          searchObj={searchObj}
          handleSearch={handleSearch}
          totalDocs={employeesData?.totalDocs}
          viewOnly={viewOnly}
        />
      </div>

      <div className={classes.content}>
        <EmployeesTable
          employees={employeesData?.docs}
          handleChangeStatus={handleChangeStatus}
          setSelectedEmployee={setSelectedEmployee}
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

      <Modal
        show={!!selectedEmployee}
        size="md"
        onHide={() => setSelectedEmployee(null)}
      >
        <SetEmployee
          title="Update"
          selectedEmployee={selectedEmployee}
          btnText="Update"
          initialValues={{
            position: selectedEmployee?.position,
            roleType: {
              label: EMPLOYEE_ROLE_OBJ[selectedEmployee?.roleType],
              value: selectedEmployee?.roleType
            }
          }}
          refreshEmployees={refreshEmployees}
          handleClose={() => setSelectedEmployee(null)}
        />
      </Modal>
    </div>
  )
}

export default Employees
