import {
  call,
  put,
  select,
  takeLatest
} from 'redux-saga/effects'
import * as Api from 'api/api'
import {
  getBrandsSuccess,
  getCarNamesSuccess,
  getCitiesSuccess,
  hideLoadingBrands,
  hideLoadingCities,
  addBookMarkSuccess,
  getBookMarkIdsSuccess,
  getProfileSuccess
} from './actions'
import { GET_BRANDS,
  GET_CAR_NAMES,
  GET_CITIES,
  GET_BOOKMARK_IDS,
  ADD_BOOMARK,
  GET_TOKEN,
  GET_PROFILE
} from './constants'
import {
  selectBrands,
  // selectCarNames,
  selectCities,
  selectBookMarkIds
} from './selectors'

export function* getBrands() {
  try {
    const oldBrands = yield select(selectBrands())
    if (oldBrands && oldBrands.length > 0) {
      yield put(hideLoadingBrands())
      return
    }
    const result = yield call(Api.get, {
      url: '/dynamic/public/find-all-make'
    })

    const brandObj = {}

    const brands = result.data.map((item) => {
      brandObj[item._id] = item.makeName
      return ({ ...item, value: item._id, label: item.makeName })
    })
    yield put(getBrandsSuccess(brands, brandObj))
  } catch (e) {
    console.log(e)
  }
}

export function* getCities() {
  try {
    const oldCities = yield select(selectCities())
    if (oldCities && oldCities.length > 0) {
      yield put(hideLoadingCities())
      return
    }
    const result = yield call(Api.get, {
      url: '/public/find-cities'
    })

    const cityObj = {}

    const city = result.data.map((item) => {
      cityObj[item.cityCode] = item.cityName
      return ({ value: item.cityCode, label: item.cityName })
    })
    yield put(getCitiesSuccess(city, cityObj))
  } catch (e) {
    console.log(e)
  }
}

export function* getCarNames({ brandId }) {
  try {
    const result = yield call(Api.get, {
      url: '/dynamic/public/find-all-model-by-make',
      params: {
        makeId: brandId
      }
    })
    const carNameObj = {}
    const carNames = result.data.map((item) => {
      carNameObj[item._id] = item.modelName
      return ({ value: item._id, label: item.modelName })
    })
    yield put(getCarNamesSuccess(carNames, carNameObj))
  } catch (e) {
    return Promise.reject()
  }
}

function* getBookMarkIds() {
  try {
    const bookMarkIds = yield select(selectBookMarkIds())
    if (bookMarkIds && bookMarkIds.length > 0) {
      return
    }
    const result = yield call(Api.get, {
      url: '/dynamic/user/find-bmIds',
    })

    yield put(getBookMarkIdsSuccess(result.data))
  } catch (e) {
    console.log(e)
  }
}

function* addBookMark({ data, productType }) {
  // console.log('addBookMark', data, productType)
  let values = {}
  if (productType === 'Unit') {
    values = {
      unit: data._id
    }
  } else {
    values = {
      item: data._id
    }
  }
  try {
    yield call(Api.post, {
      url: '/dynamic/user/save-bm',
      data: {
        ...values,
        productType: productType || 'Car'
      }
    })

    yield put(addBookMarkSuccess(data))
  } catch (e) {
    console.log(e)
  }
}

function* getToken() {
  try {
    yield call(Api.get, {
      url: '/public/csrf',
    })
  } catch (e) {
    console.log(e)
  }
}

function* getProfile() {
  try {
    const result = yield call(Api.get, {
      url: '/customer/find-profile',
    })

    const profile = {
      ...result.data,
      city: result.data.city && {
        ...result.data.city,
        label: result.data.city.cityName,
        value: result.data.city.cityCode,
      },
      province: result.data.district && {
        ...result.data.district,
        label: result.data.district.districtName,
        value: result.data.district.districtId,
      },
      ward: result.data.ward && {
        ...result.data.ward,
        label: result.data.ward.communeName,
        value: result.data.ward._id,
      },
      gender: [result.data.gender],
      unit: result.data.unit && {
        ...result.data.unit,
        label: result.data.unit.unitName,
        value: result.data.unit._id,
      },
    }

    localStorage.setItem('userInfo', JSON.stringify(profile))

    yield put(getProfileSuccess(profile))
  } catch (e) {
    console.log(e)
  }
}

export default function* watchHomeData() {
  yield takeLatest(GET_BRANDS, getBrands)
  yield takeLatest(GET_CAR_NAMES, getCarNames)
  yield takeLatest(GET_CITIES, getCities)
  yield takeLatest(GET_BOOKMARK_IDS, getBookMarkIds)
  yield takeLatest(ADD_BOOMARK, addBookMark)
  yield takeLatest(GET_TOKEN, getToken)
  yield takeLatest(GET_PROFILE, getProfile)
}
