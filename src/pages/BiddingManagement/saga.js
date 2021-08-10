import {
  call,
  put,
  takeLatest
} from 'redux-saga/effects'
import * as Api from 'api/api'
import {
  GET_BIDDINGS,
  getBiddingsSuccess,
  GET_BIDDINGS_COMPLETE,
  getBiddingsCompleteSuccess,
  GET_ENTITIES,
  getEntitiesSuccess
} from './Slices'

function* fetchEntities() {
  try {
    const result = yield call(Api.auction.get, {
      url: '/api/company/entity/find-entity',
      params: {
        companyId: localStorage.getItem('companyId'),
        state: 'TODO,PROCESS,DONE',
        entityType: 'BIDDING',
        page: 1,
        pageSize: 1000
      }
    })

    yield put(getEntitiesSuccess(result.data.docs.map((item) => ({
      label: item.entityName,
      value: item._id
    }))))
  } catch (e) {
    Promise.reject(e)
  }
}

function* fetchBiddings({ query }) {
  try {
    const companyId = localStorage.getItem('companyId')
    const result = yield call(Api.auction.get, {
      url: '/api/bidding/find-list',
      params: {
        ...query,
        status: 'DISCUSS',
        companyId,
      }
    })
    yield put(getBiddingsSuccess(result.data))
  } catch (e) {
    Promise.reject(e)
  }
}

function* fetchBiddingsComplete({ query }) {
  try {
    const companyId = localStorage.getItem('companyId')
    const result = yield call(Api.auction.get, {
      url: '/api/bidding/find-list',
      params: {
        ...query,
        companyId,
        status: query.status || 'ACCEPT,REJECT',
      }
    })
    yield put(getBiddingsCompleteSuccess(result.data))
  } catch (e) {
    Promise.reject(e)
  }
}

export default function* watchEmployee() {
  yield takeLatest(GET_BIDDINGS, fetchBiddings)
  yield takeLatest(GET_BIDDINGS_COMPLETE, fetchBiddingsComplete)
  yield takeLatest(GET_ENTITIES, fetchEntities)
}
