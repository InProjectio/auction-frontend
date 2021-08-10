import { createSelector } from 'reselect'
import { initialState } from './reducer'

export const selectChat = (state) => state.chat || initialState

export const selectConversations = () => createSelector(
  selectChat,
  (state) => state.conversations
)

export const selectMessages = () => createSelector(
  selectChat,
  (state) => state.messages
)

export const selectSelectedConversation = () => createSelector(
  selectChat,
  (state) => state.selectedConversation
)

export const selectLastMessageId = () => createSelector(
  selectChat,
  (state) => state.lastMessageId
)

export const selectLoadingMore = () => createSelector(
  selectChat,
  (state) => state.loadingMore
)

export const selectCurrentPage = () => createSelector(
  selectChat,
  (state) => state.page
)

export const selectHasNext = () => createSelector(
  selectChat,
  (state) => state.hasNext
)

export const selectLoadingMoreConversations = () => createSelector(
  selectChat,
  (state) => state.loadingMoreConversations
)

export const selectCurrentConversationPage = () => createSelector(
  selectChat,
  (state) => state.conversationPage
)

export const selectConversationHasNext = () => createSelector(
  selectChat,
  (state) => state.conversationHasNext
)
