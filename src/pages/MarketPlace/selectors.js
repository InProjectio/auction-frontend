import { createSelector } from 'reselect'
import { initialState } from './Slices'

export const selectPackages = (state) => state.marketPlace || initialState

export const makeSelectPackagesData = () => createSelector(
  selectPackages,
  (state) => state.packagesData
)
