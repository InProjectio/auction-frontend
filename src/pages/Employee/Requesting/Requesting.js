import React, { useEffect, useState, useMemo } from 'react'

import GooglePaging from 'components/GooglePaging'
import { REQUESTING_STATUS_SELECT,
  REQUESTING_STATUS_OBJ,
} from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { handleShowConfirm } from 'layout/CommonLayout/actions'
import { convertSearchParamsToObject, convertObjectToSearchParams } from 'utils/utils'
import history from 'utils/history'
import { Modal } from 'react-bootstrap'
import classes from './Requesting.module.scss'
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
  const userInfo = useMemo(() => JSON.parse(localStorage.getItem('userInfo')), [])
  const viewOnly = useMemo(() => {
    const roleType = userInfo?.userMapping?.roleType
    return roleType !== 'PROFILE' && roleType !== 'OWNER'
  }, [])
  const [searchObj, setSearchObj] = useState({})
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  useInjectReducer({ key: 'employeesRequesting', reducer })
  useInjectSaga({ key: 'employeesRequesting', saga })

  const dispatch = useDispatch()

  const { employeesData } = useSelector(mapStateToProps)

  useEffect(() => {
    const query = convertSearchParamsToObject(location.search)
    setSearchObj({
      ...query,
      textSearch: query.textSearch && decodeURIComponent(query.textSearch),
      status: query.state && {
        label: REQUESTING_STATUS_OBJ[query.state],
        value: query.state
      },
    })
    dispatch(getEmployees(query))
  }, [location.search])

  const handleSearch = (searchObj) => {
    history.replace({
      pathname: location.pathname,
      search: convertObjectToSearchParams({
        ...searchObj,
        state: searchObj.status && searchObj.status.value,
        page: 1,
        status: undefined
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

  const handleChangeStatus = (status, employee) => {
    if (status === 'REJECT') {
      dispatch(handleShowConfirm({
        title: 'Confirm',
        description: 'Do you want reject this request?',
        handleOk: () => {
          dispatch(changeStatus(status, employee))
        }
      }))
    } else {
      setSelectedEmployee(employee)
    }
  }

  const refreshEmployees = () => {
    const query = convertSearchParamsToObject(location.search)
    dispatch(getEmployees(query))
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Header
          statuses={REQUESTING_STATUS_SELECT}
          searchObj={searchObj}
          handleSearch={handleSearch}
          totalDocs={employeesData?.totalDocs}
          viewOnly={viewOnly}
        />
      </div>

      <div className={classes.content}>
        <EmployeesTable
          employees={employeesData.docs}
          handleChangeStatus={handleChangeStatus}
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
          title="Approve Employee"
          selectedEmployee={selectedEmployee}
          btnText="Approve"
          handleClose={() => setSelectedEmployee(null)}
          refreshEmployees={refreshEmployees}
          from="requesting"
        />
      </Modal>
    </div>
  )
}

export default Employees
