export const GET_BIDDING_PACKAGES = 'company/ManagementPackage/getBiddingPackages'
export const GET_BIDDING_PACKAGES_SUCCESS = 'company/ManagementPackage/getBiddingPackagesSuccess'
export const GET_INVITING_PACKAGES = 'company/ManagementPackage/getInvitingPackages'
export const GET_INVITING_PACKAGES_SUCCESS = 'company/ManagementPackage/getInvitingPackagesSuccess'
export const GET_COMPLETE_PACKAGES = 'company/ManagementPackage/getCompletePackages'
export const GET_COMPLETE_PACKAGES_SUCCESS = 'company/ManagementPackage/getCompletePackagesSuccess'
export const GET_ENTITIES = 'company/ManagementPackage/getEntities'
export const GET_ENTITIES_SUCCESS = 'company/ManagementPackage/getEntitiesSuccess'

export const getBiddingPackages = (query) => ({
  type: GET_BIDDING_PACKAGES,
  query
})

export const getBiddingPackagesSuccess = (biddingPackagesData) => ({
  type: GET_BIDDING_PACKAGES_SUCCESS,
  biddingPackagesData
})

export const getInvitingPackages = (query) => ({
  type: GET_INVITING_PACKAGES,
  query
})

export const getInvitingPackagesSuccess = (invitingPackagesData) => ({
  type: GET_INVITING_PACKAGES_SUCCESS,
  invitingPackagesData
})

export const getCompletePackages = (query) => ({
  type: GET_COMPLETE_PACKAGES,
  query
})

export const getCompletePackagesSuccess = (completePackagesData) => ({
  type: GET_COMPLETE_PACKAGES_SUCCESS,
  completePackagesData
})

export const getEntities = (query) => ({
  type: GET_ENTITIES,
  query
})

export const getEntitiesSuccess = (entities) => ({
  type: GET_ENTITIES_SUCCESS,
  entities
})

export const initialState = {
  biddingPackagesData: {
    page: 1,
    totalPages: 1,
    docs: []
  },
  invitingPackagesData: {
    page: 1,
    totalPages: 1,
    docs: []
  },
  completePackagesData: {
    page: 1,
    totalPages: 1,
    docs: []
  },
  entities: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BIDDING_PACKAGES_SUCCESS:
      return {
        ...state,
        biddingPackagesData: action.biddingPackagesData
      }
    case GET_INVITING_PACKAGES_SUCCESS:
      return {
        ...state,
        invitingPackagesData: action.invitingPackagesData
      }
    case GET_COMPLETE_PACKAGES_SUCCESS:
      return {
        ...state,
        completePackagesData: action.completePackagesData
      }
    case GET_ENTITIES_SUCCESS:
      return {
        ...state,
        entities: action.entities
      }
    default:
      return state
  }
}
