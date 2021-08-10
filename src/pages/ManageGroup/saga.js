import {
  call,
  put,
  takeLatest
} from 'redux-saga/effects'
import * as Api from 'api/api'
import {
  GET_BIDDING_GROUPS,
  getBiddingGroupsSuccess,
  GET_INVITING_GROUPS,
  getInvitingGroupsSuccess,
  CHANGE_STATUS,
  getBiddingGroups,
  getInvitingGroups
} from './Slices'

function* fetchBiddingGroups({ query }) {
  try {
    const result = yield call(Api.auction.get, {
      url: '/api/company/entity/find-entity',
      params: {
        ...query,
        companyId: localStorage.getItem('companyId'),
        state: 'TODO,PROCESS,DONE',
        entityType: 'BIDDING'
      }
    })

    const data = {
      ...result.data,
      docs: result.data.docs.map((item) => ({
        ...item,
        userMappingIds: item.userMaps.map((ite) => ite._id)
      }))
    }

    yield put(getBiddingGroupsSuccess(data))
  } catch (e) {
    Promise.reject(e)
  }
}

function* fetchInvitingGroups({ query }) {
  try {
    const result = yield call(Api.auction.get, {
      url: '/api/company/entity/find-entity',
      params: {
        ...query,
        companyId: localStorage.getItem('companyId'),
        state: 'TODO,PROCESS,DONE',
        entityType: 'TENDERER'
      }
    })
    yield put(getInvitingGroupsSuccess(result.data))
  } catch (e) {
    Promise.reject(e)
  }
}

function* changeStatus({ status, entity, query, entityType }) {
  try {
    yield call(Api.auction.put, {
      url: `/api/company/entity/change-status/${entity._id}`,
      data: {
        status: status ? 'ACTIVE' : 'INACTIVE'
      }
    })
    if (entityType === 'BIDDING') {
      yield put(getBiddingGroups(query))
    } else {
      yield put(getInvitingGroups(query))
    }
  } catch (e) {
    Promise.reject(e)
  }
}

export default function* watchEmployee() {
  yield takeLatest(GET_BIDDING_GROUPS, fetchBiddingGroups)
  yield takeLatest(GET_INVITING_GROUPS, fetchInvitingGroups)
  yield takeLatest(CHANGE_STATUS, changeStatus)
}
