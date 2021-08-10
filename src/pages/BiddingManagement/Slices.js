export const GET_BIDDINGS = 'company/BiddingManagement/getBiddings'
export const GET_BIDDINGS_SUCCESS = 'company/BiddingManagement/getBiddingsSuccess'
export const GET_BIDDINGS_COMPLETE = 'company/BiddingManagement/getBiddingsComplete'
export const GET_BIDDINGS_COMPLETE_SUCCESS = 'company/BiddingManagement/getBiddingsCompleteSuccess'
export const GET_ENTITIES = 'company/BiddingManagement/getEntities'
export const GET_ENTITIES_SUCCESS = 'company/BiddingManagement/getEntitiesSuccess'

export const getBiddings = (query) => ({
  type: GET_BIDDINGS,
  query
})

export const getBiddingsSuccess = (biddingsData) => ({
  type: GET_BIDDINGS_SUCCESS,
  biddingsData
})

export const getEntities = (query) => ({
  type: GET_ENTITIES,
  query
})

export const getEntitiesSuccess = (entities) => ({
  type: GET_ENTITIES_SUCCESS,
  entities
})

export const getBiddingsComplete = (query) => ({
  type: GET_BIDDINGS_COMPLETE,
  query
})

export const getBiddingsCompleteSuccess = (biddingsCompleteData) => ({
  type: GET_BIDDINGS_COMPLETE_SUCCESS,
  biddingsCompleteData
})

export const initialState = {
  biddingsData: {
    page: 1,
    totalPages: 1,
    docs: []
  },
  biddingsCompleteData: {
    page: 1,
    totalPages: 1,
    docs: []
  },
  entities: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BIDDINGS_SUCCESS:
      return {
        ...state,
        biddingsData: action.biddingsData
      }
    case GET_BIDDINGS_COMPLETE_SUCCESS:
      return {
        ...state,
        biddingsCompleteData: action.biddingsCompleteData
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
