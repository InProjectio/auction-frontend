import { createSelector } from 'reselect'
import { initialState } from './Slices'

export const selectEmployees = (state) => state.employeesRequesting || initialState

export const makeSelectEmployeesData = () => createSelector(
  selectEmployees,
  (state) => state.employeesData
)
