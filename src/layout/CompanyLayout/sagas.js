import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'
import * as Api from 'api/api'
import {
  GET_COMPANY,
  getCompanySuccess
} from './slices'

function* getCompany() {
  try {
    const companyId = localStorage.getItem('companyId')
    const result = yield call(Api.auction.get, {
      url: '/api/company/find-detail',
      params: {
        companyId
      }
    })
    console.log('test ===> ', companyId, result.data)
    yield put(getCompanySuccess(result.data || {}))
  } catch (e) {
    Promise.reject(e)
  }
}

export default function* watchCompanyData() {
  yield takeLatest(GET_COMPANY, getCompany)
}
