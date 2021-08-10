/* eslint-disable no-duplicate-case */
import {
  GET_CONVERSATIONS_SUCCESS,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES,
  SELECT_CONVERSATION,
  ADD_MESSAGE,
  LOAD_MORE_MESSAGES,
  LOAD_MORE_MESSAGES_FAILURE,
  LOAD_MORE_MESSAGES_SUCCESS,
  UPDATE_CONVERSATIONS,
  UPDATE_MESSAGE,
  LOAD_MORE_CONVERSATIONS_SUCCESS,
  LOAD_MORE_CONVERSATIONS,
  LOAD_MORE_CONVERSATIONS_FAILURE
} from './constants'

export const initialState = {
  conversations: [],
  messages: [],
  selectedConversation: {},
  lastMessageId: '',
  page: 1,
  hasNext: false,
  loadingMore: false,
  conversationPage: 1,
  conversationHasNext: false,
  loadingMoreConversations: false
}

export default function conversationReducer(state = initialState, action) {
  let newMessages = []
  switch (action.type) {
    case GET_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        conversations: action.conversations.docs,
        conversationPage: action.conversations.page,
        conversationHasNext: action.conversations.hasNextPage
      }
    case UPDATE_CONVERSATIONS:
      return {
        ...state,
        conversations: action.conversations,
      }
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.messages,
        page: action.page,
        hasNext: action.hasNext
      }
    case LOAD_MORE_MESSAGES:
      return {
        ...state,
        loadingMore: true
      }
    case LOAD_MORE_MESSAGES_FAILURE:
      return {
        ...state,
        loadingMore: false
      }
    case LOAD_MORE_MESSAGES_SUCCESS:
      return {
        ...state,
        loadingMore: false,
        messages: [...action.messages, ...state.messages],
        page: action.page,
        hasNext: action.hasNext
      }
    case LOAD_MORE_CONVERSATIONS:
      return {
        ...state,
        loadingMoreConversations: true
      }
    case LOAD_MORE_CONVERSATIONS_FAILURE:
      return {
        ...state,
        loadingMoreConversations: false
      }
    case LOAD_MORE_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        loadingMore: false,
        conversations: [...state.conversations, ...action.conversations],
        conversationPage: action.page,
        conversationHasNext: action.hasNext
      }
    case UPDATE_MESSAGE:
      newMessages = state.messages
      if ((state.lastMessageId !== action.message.data._id && action.message.conversationId === state.selectedConversation._id)) {
        // console.log('test')
        if (action.message.data.tempId) {
          newMessages = state.messages.map((item) => {
            if (item.tempId === action.message.data.tempId) {
              return action.message.data
            }
            return item
          })
        } else {
          newMessages = [...state.messages, action.message.data]
        }
      }
      return {
        ...state,
        messages: newMessages,
        lastMessageId: action.message.conversationId === state.selectedConversation._id ? action.message.data._id : state.lastMessageId
      }
    case ADD_MESSAGE:
      return {
        ...state,
        messages: (action.message.conversationId === state.selectedConversation._id)
          ? [...state.messages, action.message.data] : state.messages,
        lastMessageId: action.message.conversationId === state.selectedConversation._id ? action.message.data.tempId : state.lastMessageId
      }
    case GET_MESSAGES:
      return {
        ...state,
        selectedConversation: action.selectedConversation,
        messages: []
      }
    case SELECT_CONVERSATION:
      return {
        ...state,
        conversations: state.conversations.map((conv) => {
          if (conv._id === action.conversation?._id) {
            return {
              ...conv,
              numberOfUnreadMessages: 0
            }
          }
          return conv
        }),
        selectedConversation: action.conversation,
        messages: []
      }
    default:
      return state
  }
}
