import { createSelector } from 'reselect'
import { initialState } from './Slices'

export const selectGroup = (state) => state.group || initialState

export const makeSelectBiddingGroupsData = () => createSelector(
  selectGroup,
  (state) => state.biddingGroupsData
)

export const makeSelectInvitingGroupsData = () => createSelector(
  selectGroup,
  (state) => state.invitingGroupsData
)
