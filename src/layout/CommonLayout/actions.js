import {
  SHOW_CONFIRM,
  HIDE_CONFIRM,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  GET_BRANDS,
  GET_BRANDS_SUCCESS,
  GET_CAR_NAMES,
  GET_CAR_NAMES_SUCCESS,
  GET_CITIES,
  GET_CITIES_SUCCESS,
  HIDE_LOADING_BRANDS,
  HIDE_LOADING_CAR_NAMES,
  HIDE_LOADING_CITIES,
  GET_BOOKMARK_IDS,
  GET_BOOKMARK_IDS_SUCCESS,
  ADD_BOOMARK,
  ADD_BOOMARK_SUCCESS,
  GET_TOKEN,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  SET_PROFILE,
  CLEAR_DATA
} from './constants'

export const clearData = () => ({
  type: CLEAR_DATA
})

export const setProfile = (profile) => ({
  type: SET_PROFILE,
  profile
})

export const getProfile = () => ({
  type: GET_PROFILE
})

export const getProfileSuccess = (profile) => ({
  type: GET_PROFILE_SUCCESS,
  profile
})

export const getToken = () => ({
  type: GET_TOKEN
})

export const getBookMarkIds = () => ({
  type: GET_BOOKMARK_IDS
})

export const getBookMarkIdsSuccess = (bookMarkIds) => ({
  type: GET_BOOKMARK_IDS_SUCCESS,
  bookMarkIds
})

export const addBookMark = (data, productType) => ({
  type: ADD_BOOMARK,
  data,
  productType
})

export const addBookMarkSuccess = (data) => ({
  type: ADD_BOOMARK_SUCCESS,
  data
})

export const showNotification = (notification) => ({
  type: SHOW_NOTIFICATION,
  notification
})

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION
})

export const handleShowConfirm = (confirm) => {
  console.log('showConfirm', confirm)
  return {
    type: SHOW_CONFIRM,
    confirm
  }
}

export const handleHideConfirm = () => ({
  type: HIDE_CONFIRM
})

export const getBrands = () => ({
  type: GET_BRANDS
})

export const getBrandsSuccess = (brands, brandObj) => ({
  type: GET_BRANDS_SUCCESS,
  brands,
  brandObj
})

export const getCarNames = (brandId) => ({
  type: GET_CAR_NAMES,
  brandId
})

export const getCarNamesSuccess = (carNames, carNameObj) => ({
  type: GET_CAR_NAMES_SUCCESS,
  carNames,
  carNameObj
})

export const getCities = () => ({
  type: GET_CITIES,
})

export const getCitiesSuccess = (cities, cityObj) => ({
  type: GET_CITIES_SUCCESS,
  cities,
  cityObj
})

export const hideLoadingBrands = () => ({
  type: HIDE_LOADING_BRANDS,
})

export const hideLoadingCities = () => ({
  type: HIDE_LOADING_CITIES,
})

export const hideLoadingCarNames = () => ({
  type: HIDE_LOADING_CAR_NAMES,
})
