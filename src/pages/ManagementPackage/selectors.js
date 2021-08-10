import { createSelector } from 'reselect'
import { initialState } from './Slices'

export const selectPackages = (state) => state.managePackages || initialState

export const makeSelectBiddingPackagesData = () => createSelector(
  selectPackages,
  (state) => state.biddingPackagesData
)

export const makeSelectInvitingPackagesData = () => createSelector(
  selectPackages,
  (state) => state.invitingPackagesData
)

export const makeSelectCompletePackagesData = () => createSelector(
  selectPackages,
  (state) => state.completePackagesData
)

export const makeSelectEntities = () => createSelector(
  selectPackages,
  (state) => state.entities
)
