export const GET_EMPLOYEES = 'company/invting/getEmployees'
export const GET_EMPLOYEES_SUCCESS = 'company/invting/getEmployeesSuccess'
export const CANCEL_REQUEST = 'company/invting/cancelRequest'
export const CANCEL_REQUEST_SUCCESS = 'company/invting/cancelRequestSuccess'

export const getEmployees = (query) => ({
  type: GET_EMPLOYEES,
  query
})

export const getEmployeesSuccess = (employeesData) => ({
  type: GET_EMPLOYEES_SUCCESS,
  employeesData
})

export const cancelRequest = ({ employee, query }) => ({
  type: CANCEL_REQUEST,
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
