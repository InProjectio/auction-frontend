import {
  call,
  put,
  takeLatest
} from 'redux-saga/effects'
import * as Api from 'api/api'
import {
  GET_EMPLOYEES,
  getEmployeesSuccess,
  CHANGE_STATUS,
  getEmployees
} from './Slices'

function* fetchEmployees({ query }) {
  try {
    const companyId = localStorage.getItem('companyId')
    const result = yield call(Api.auction.get, {
      url: '/api/company/user-mapping/find-mappings',
      params: {
        ...query,
        companyId,
        state: 'ACCEPT',
        sourceType: 'INVITE,REQUEST'
      }
    })
    yield put(getEmployeesSuccess(result.data))
  } catch (e) {
    Promise.reject(e)
  }
}

function* changeStatus({ status, employee, query }) {
  try {
    yield call(Api.auction.put, {
      url: `/api/company/user-mapping/update/${employee._id}`,
      data: {
        status: status ? 'ACTIVE' : 'INACTIVE'
      }
    })

    yield put(getEmployees(query))
  } catch (e) {
    Promise.reject(e)
  }
}

export default function* watchEmployee() {
  yield takeLatest(GET_EMPLOYEES, fetchEmployees)
  yield takeLatest(CHANGE_STATUS, changeStatus)
}
