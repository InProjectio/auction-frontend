import {
  call,
  put,
  takeLatest
} from 'redux-saga/effects'
import * as Api from 'api/api'
import {
  GET_INVITING_PACKAGES,
  getInvitingPackagesSuccess,
  GET_COMPLETE_PACKAGES,
  getCompletePackagesSuccess,
  getEntitiesSuccess,
  GET_ENTITIES
} from './Slices'

function* fetchEntities() {
  try {
    const result = yield call(Api.auction.get, {
      url: '/api/company/entity/find-entity',
      params: {
        companyId: localStorage.getItem('companyId'),
        state: 'TODO,PROCESS,DONE',
        entityType: 'TENDERER',
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

function* fetchInvitingPackages({ query }) {
  try {
    const companyId = localStorage.getItem('companyId')
    const result = yield call(Api.auction.post, {
      url: '/api/bidding/package/find-list',
      data: {
        ...query,
        companyId,
        state: 'ACCEPT',
        sourceType: 'INVITE,REQUEST',
        status: query.status || 'BIDDING,SELECTING'
      }
    })
    yield put(getInvitingPackagesSuccess(result.data))
  } catch (e) {
    Promise.reject(e)
  }
}

function* fetchCompletePackages({ query }) {
  try {
    const companyId = localStorage.getItem('companyId')
    const result = yield call(Api.auction.post, {
      url: '/api/bidding/package/find-list',
      data: {
        ...query,
        companyId,
        state: 'ACCEPT',
        sourceType: 'INVITE,REQUEST',
        status: query.status || 'CLOSING,CANCEL'
      }
    })
    yield put(getCompletePackagesSuccess(result.data))
  } catch (e) {
    Promise.reject(e)
  }
}

export default function* watchEmployee() {
  yield takeLatest(GET_INVITING_PACKAGES, fetchInvitingPackages)
  yield takeLatest(GET_COMPLETE_PACKAGES, fetchCompletePackages)
  yield takeLatest(GET_ENTITIES, fetchEntities)
}
