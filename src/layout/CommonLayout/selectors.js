import { createSelector } from 'reselect'
import { initialState } from './reducer'

export const selectCommon = (state) => state.common || initialState

export const makeSelectNotification = () => createSelector(
  selectCommon,
  (commonState) => commonState.notification
)

export const makeSelectShowConfirm = () => createSelector(
  selectCommon,
  (commonState) => commonState.showConfirm
)

export const makeSelectConfirm = () => createSelector(
  selectCommon,
  (commonState) => commonState.confirm
)

export const selectBrands = () => createSelector(
  selectCommon,
  (state) => state.brands
)

export const selectLoadingBrands = () => createSelector(
  selectCommon,
  (state) => state.loadingBrands
)

export const selectLoadingCarNames = () => createSelector(
  selectCommon,
  (state) => state.loadingCarNames
)

export const selectCarNames = () => createSelector(
  selectCommon,
  (state) => state.carNames
)

export const selectLoadingCities = () => createSelector(
  selectCommon,
  (state) => state.loadingCities
)

export const selectCities = () => createSelector(
  selectCommon,
  (state) => state.cities
)

export const selectCityObj = () => createSelector(
  selectCommon,
  (state) => state.cityObj
)

export const selectBrandObj = () => createSelector(
  selectCommon,
  (state) => state.brandObj
)

export const selectCarNameObj = () => createSelector(
  selectCommon,
  (state) => state.carNameObj
)

export const selectBookMarkIds = () => createSelector(
  selectCommon,
  (state) => state.bookMarkIds
)

export const selectProfile = () => createSelector(
  selectCommon,
  (state) => state.profile
)
