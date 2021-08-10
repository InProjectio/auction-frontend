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
  HIDE_LOADING_CITIES,
  GET_BOOKMARK_IDS_SUCCESS,
  ADD_BOOMARK_SUCCESS,
  GET_PROFILE_SUCCESS,
  SET_PROFILE,
  CLEAR_DATA
} from './constants'

export const initialState = {
  notification: null,
  showConfirm: false,
  confirm: {},
  brands: [],
  carNames: [],
  loadingBrands: false,
  loadingCarNames: false,
  loadingCities: false,
  cities: [],
  brandObj: {},
  carNameObj: {},
  cityObj: {},
  bookMarkIds: [],
  profile: {}
}

export default function commonReducer(state = initialState, action) {
  let bookMarkIds;
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        notification: action.notification
      }
    case HIDE_NOTIFICATION:
      return {
        ...state,
        notification: null
      }
    case SHOW_CONFIRM:
      return {
        ...state,
        showConfirm: true,
        confirm: action.confirm
      }
    case HIDE_CONFIRM:
      return {
        ...state,
        showConfirm: false,
        confirm: {}
      }
    case GET_BRANDS:
      return {
        ...state,
        loadingBrands: true
      }
    case GET_BRANDS_SUCCESS:
      return {
        ...state,
        loadingBrands: false,
        brands: action.brands,
        brandObj: action.brandObj
      }
    case GET_CITIES:
      return {
        ...state,
        loadingCities: true
      }
    case GET_CITIES_SUCCESS:
      return {
        ...state,
        loadingCities: false,
        cities: action.cities,
        cityObj: action.cityObj
      }
    case GET_CAR_NAMES:
      return {
        ...state,
        loadingCarNames: true
      }
    case GET_CAR_NAMES_SUCCESS:
      return {
        ...state,
        loadingCarNames: false,
        carNames: action.carNames,
        carNameObj: action.carNameObj
      }
    case HIDE_LOADING_CITIES:
      return {
        ...state,
        loadingCities: false
      }
    case HIDE_LOADING_BRANDS:
      return {
        ...state,
        loadingBrands: false
      }
    case GET_BOOKMARK_IDS_SUCCESS:
      // console.log('bookMarkIds', action.bookMarkIds)
      return {
        ...state,
        bookMarkIds: action.bookMarkIds
      }
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.profile
      }
    case SET_PROFILE:
      return {
        ...state,
        profile: { ...state.profile, ...action.profile }
      }
    case ADD_BOOMARK_SUCCESS:
      bookMarkIds = state.bookMarkIds
      if (bookMarkIds.indexOf(action.data._id) === -1) {
        bookMarkIds = [...bookMarkIds, action.data._id]
      } else {
        bookMarkIds = bookMarkIds.filter((item) => item !== action.data._id)
      }
      return {
        ...state,
        bookMarkIds
      }
    case CLEAR_DATA:
      return {
        ...state,
        bookMarkIds: []
      }
    default:
      return state
  }
}
