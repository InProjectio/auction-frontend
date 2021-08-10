export const GET_COMPANY = 'company/getCompany'
export const GET_COMPANY_SUCCESS = 'company/getCompanySuccess'

export const getCompany = () => ({
  type: GET_COMPANY
})

export const getCompanySuccess = (company) => ({
  type: GET_COMPANY_SUCCESS,
  company
})

export const initialState = {
  company: {}
}

export default function companyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANY_SUCCESS:
      return {
        ...state,
        company: action.company
      }
    default:
      return state
  }
}
