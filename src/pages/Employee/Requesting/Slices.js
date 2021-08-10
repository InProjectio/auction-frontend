export const GET_EMPLOYEES = 'company/requesting/getEmployees'
export const GET_EMPLOYEES_SUCCESS = 'company/requesting/getEmployeesSuccess'
export const CHANGE_STATUS = 'company/requesting/changeStatus'
export const CHANGE_STATUS_SUCCESS = 'company/requesting/changeStatusSuccess'

export const getEmployees = (query) => ({
  type: GET_EMPLOYEES,
  query
})

export const getEmployeesSuccess = (employeesData) => ({
  type: GET_EMPLOYEES_SUCCESS,
  employeesData
})

export const changeStatus = (status, employee) => ({
  type: CHANGE_STATUS,
  status,
  employee
})

export const initialState = {
  employeesData: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employeesData: action.employeesData
      }
    default:
      return state
  }
}
