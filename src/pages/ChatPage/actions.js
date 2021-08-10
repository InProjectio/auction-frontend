import {
  GET_MESSAGES,
  GET_MESSAGES_SUCCESS,
  CONNECT_CHAT,
  SEND_CHAT,
  GET_CONVERSATIONS_SUCCESS,
  SELECT_CONVERSATION,
  ADD_MESSAGE,
  LOAD_MORE_MESSAGES,
  LOAD_MORE_MESSAGES_FAILURE,
  LOAD_MORE_MESSAGES_SUCCESS,
  NEW_CONVERSATION,
  UPDATE_CONVERSATIONS,
  UPDATE_MESSAGE,
  LOAD_MORE_CONVERSATIONS,
  LOAD_MORE_CONVERSATIONS_FAILURE,
  LOAD_MORE_CONVERSATIONS_SUCCESS
} from './constants'

export const handleNewConversation = (conversation) => ({
  type: NEW_CONVERSATION,
  conversation
})

export const handleUpdateConversations = (conversations) => ({
  type: UPDATE_CONVERSATIONS,
  conversations
})

export const handleLoadMoreMessages = () => ({
  type: LOAD_MORE_MESSAGES,
})

export const loadmoreMessagesSuccess = (messages, page, hasNext) => ({
  type: LOAD_MORE_MESSAGES_SUCCESS,
  messages,
  page,
  hasNext
})

export const loadmoreMessagesFailure = () => ({
  type: LOAD_MORE_MESSAGES_FAILURE,
})

export const handleLoadmoreConversations = () => ({
  type: LOAD_MORE_CONVERSATIONS,
})

export const handleLoadmoreConversationsSuccess = (conversations, page, hasNext) => ({
  type: LOAD_MORE_CONVERSATIONS_SUCCESS,
  conversations,
  page,
  hasNext
})

export const handleLoadmoreConversationsFailure = () => ({
  type: LOAD_MORE_CONVERSATIONS_FAILURE,
})

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message
})

export const updateMessage = (message) => ({
  type: UPDATE_MESSAGE,
  message
})

export const handleSelectConversation = (conversation) => ({
  type: SELECT_CONVERSATION,
  conversation
})

export const connectChat = () => ({
  type: CONNECT_CHAT
})

export const getConversationsSuccess = (conversations) => ({
  type: GET_CONVERSATIONS_SUCCESS,
  conversations
})

export const getMessages = ({ selectedConversation, page }) => ({
  type: GET_MESSAGES,
  selectedConversation,
  page
})

export const getMessagesSuccess = (messages, page, hasNext) => ({
  type: GET_MESSAGES_SUCCESS,
  messages,
  page,
  hasNext
})

export const sendChat = (message, messageType = 'TEXT') => ({
  type: SEND_CHAT,
  message,
  messageType
})
