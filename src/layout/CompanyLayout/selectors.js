import { createSelector } from 'reselect'
import { initialState } from './slices'

export const selectCompanyLayout = (state) => state.companyLayout || initialState

export const makeSelectCompany = () => createSelector(
  selectCompanyLayout,
  (state) => state.company
)
