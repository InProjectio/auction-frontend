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

function* handleGetEmployees({ query }) {
  try {
    const companyId = localStorage.getItem('companyId')
    const result = yield call(Api.auction.get, {
      url: '/api/company/user-mapping/find-mappings',
      params: {
        ...query,
        companyId,
        sourceType: 'REQUEST'
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
        state: status
      }
    })
    yield put(getEmployees(query))
  } catch (e) {
    Promise.reject(e)
  }
}

export default function* watchEmployee() {
  yield takeLatest(GET_EMPLOYEES, handleGetEmployees)
  yield takeLatest(CHANGE_STATUS, changeStatus)
}
