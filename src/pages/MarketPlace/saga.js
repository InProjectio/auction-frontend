import {
  call,
  put,
  takeLatest
} from 'redux-saga/effects'
import * as Api from 'api/api'
import moment from 'moment'
import {
  GET_PACKAGES,
  getPackagesSuccess
} from './Slices'

function* fetchPackages({ query }) {
  try {
    const result = yield call(Api.auction.post, {
      url: '/api/bidding/package/find-list',
      data: {
        ...query,
        state: 'ACCEPT',
        sourceType: 'INVITE,REQUEST',
        biddingType: 'PUBLIC',
        status: 'BIDDING',
        currentTime: moment().format('YYYY-MM-DD HH:mm')
      }
    })
    yield put(getPackagesSuccess(result.data))
  } catch (e) {
    Promise.reject(e)
  }
}

export default function* watchEmployee() {
  yield takeLatest(GET_PACKAGES, fetchPackages)
}
