import {
  call,
  put,
  takeLatest
} from 'redux-saga/effects'
import * as Api from 'api/api'
import {
  GET_EMPLOYEES,
  getEmployeesSuccess,
  CANCEL_REQUEST,
  getEmployees
} from './Slices'

function* handleGetEmployees({ query }) {
  try {
    const result = yield call(Api.auction.get, {
      url: '/api/company/user-mapping/find-mappings',
      params: {
        ...query,
        sourceType: 'INVITE',
        companyId: localStorage.getItem('companyId')
      }
    })
    yield put(getEmployeesSuccess(result.data))
  } catch (e) {
    Promise.reject(e)
  }
}

function* cancelRequest({ query, employee }) {
  try {
    yield call(Api.auction.put, {
      url: `/api/company/user-mapping/update/${employee._id}`,
      data: {
        state: 'REJECT'
      }
    })
    yield put(getEmployees({ query }))
  } catch (e) {
    Promise.reject(e)
  }
}

export default function* watchEmployee() {
  yield takeLatest(GET_EMPLOYEES, handleGetEmployees)
  yield takeLatest(CANCEL_REQUEST, cancelRequest)
}
