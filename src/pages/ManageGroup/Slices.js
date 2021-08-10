export const GET_BIDDING_GROUPS = 'company/ManageGroup/getBiddingGroups'
export const GET_BIDDING_GROUPS_SUCCESS = 'company/ManageGroup/getBiddingGroupsSuccess'
export const GET_INVITING_GROUPS = 'company/ManageGroup/getInvitingGroups'
export const GET_INVITING_GROUPS_SUCCESS = 'company/ManageGroup/getInvitingGroupsSuccess'
export const CHANGE_STATUS = 'company/ManageGroup/changeStatus'

export const changeStatus = ({ status, query, entity, entityType }) => ({
  type: CHANGE_STATUS,
  status,
  query,
  entity,
  entityType
})

export const getBiddingGroups = (query) => ({
  type: GET_BIDDING_GROUPS,
  query
})

export const getBiddingGroupsSuccess = (biddingGroupsData) => ({
  type: GET_BIDDING_GROUPS_SUCCESS,
  biddingGroupsData
})

export const getInvitingGroups = (query) => ({
  type: GET_INVITING_GROUPS,
  query
})

export const getInvitingGroupsSuccess = (invitingGroupsData) => ({
  type: GET_INVITING_GROUPS_SUCCESS,
  invitingGroupsData
})

export const initialState = {
  invitingGroupsData: {
    page: 1,
    totalPages: 1,
    docs: []
  },
  biddingGroupsData: {
    page: 1,
    totalPages: 1,
    docs: []
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_INVITING_GROUPS_SUCCESS:
      return {
        ...state,
        invitingGroupsData: action.invitingGroupsData
      }
    case GET_BIDDING_GROUPS_SUCCESS:
      return {
        ...state,
        biddingGroupsData: action.biddingGroupsData
      }
    default:
      return state
  }
}
