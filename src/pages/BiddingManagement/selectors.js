import { createSelector } from 'reselect'
import { initialState } from './Slices'

export const selectBidding = (state) => state.biddingManagement || initialState

export const makeSelectBiddingsData = () => createSelector(
  selectBidding,
  (state) => state.biddingsData
)

export const makeSelectBiddingsCompleteData = () => createSelector(
  selectBidding,
  (state) => state.biddingsCompleteData
)

export const makeSelectEntities = () => createSelector(
  selectBidding,
  (state) => state.entities
)
