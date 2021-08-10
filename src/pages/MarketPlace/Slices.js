export const GET_PACKAGES = 'auction/marketPlace/getPackages'
export const GET_PACKAGES_SUCCESS = 'auction/marketPlace/getPackagesSuccess'

export const getPackages = (query) => ({
  type: GET_PACKAGES,
  query
})

export const getPackagesSuccess = (packagesData) => ({
  type: GET_PACKAGES_SUCCESS,
  packagesData
})

export const initialState = {
  packagesData: {
    page: 1,
    totalPages: 1,
    docs: []
  },
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PACKAGES_SUCCESS:
      return {
        ...state,
        packagesData: action.packagesData
      }
    default:
      return state
  }
}
