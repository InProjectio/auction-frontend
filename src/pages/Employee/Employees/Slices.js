export const GET_EMPLOYEES = 'company/employee/getEmployees'
export const GET_EMPLOYEES_SUCCESS = 'company/employee/getEmployeesSuccess'
export const CHANGE_STATUS = 'company/employee/changeStatus'
export const CHANGE_STATUS_SUCCESS = 'company/employee/changeStatusSuccess'

export const getEmployees = (query) => ({
  type: GET_EMPLOYEES,
  query
})

export const getEmployeesSuccess = (employeesData) => ({
  type: GET_EMPLOYEES_SUCCESS,
  employeesData
})

export const changeStatus = (status, employee, query) => ({
  type: CHANGE_STATUS,
  status,
  employee,
  query
})

export const initialState = {
  employeesData: {
    page: 1,
    totalPages: 1,
    docs: []
  }
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
