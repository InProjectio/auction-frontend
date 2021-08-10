import {
  put,
  select,
  takeLatest,
  call
} from 'redux-saga/effects'
import * as Api from 'api/api'
import SocketApi from 'api/SocketApi'
import moment from 'moment'
import {
  SELECT_CONVERSATION,
  SEND_CHAT,
  GET_CONVERSATIONS_SUCCESS,
  LOAD_MORE_MESSAGES,
  NEW_CONVERSATION,
  LOAD_MORE_CONVERSATIONS
} from './constants'
import {
  selectSelectedConversation,
  selectCurrentPage,
  selectHasNext,
  selectConversations,
  selectConversationHasNext,
  selectCurrentConversationPage
} from './selectors'
import { handleSelectConversation,
  loadmoreMessagesFailure,
  loadmoreMessagesSuccess,
  handleUpdateConversations,
  addMessage,
  handleNewConversation,
  handleLoadmoreConversationsSuccess,
  handleLoadmoreConversationsFailure
} from './actions'

function* sendChat({ message, messageType }) {
  const selectedConversation = yield select(selectSelectedConversation())
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const tempId = new Date().valueOf()
  const newMessage = {
    conversationId: selectedConversation._id,
    message,
    messageTime: moment().toDate(),
    messageType: messageType || 'TEXT',
    user: { _id: userInfo._id },
    tempId
  }
  yield put(addMessage({ data: newMessage, conversationId: selectedConversation._id, }))
  yield put(handleNewConversation({
    ...selectedConversation,
    latestCustomerConveration: {
      ...selectedConversation.latestCustomerConveration,
      latestMessage: message
    },
    updatedAt: moment().toDate()
  }))
  SocketApi.emit('requestSendMessage', { conversationId: selectedConversation._id, message, messageType, tempId })
}

function* handleNewConversationSaga({ conversation }) {
  const conversations = yield select(selectConversations())

  const newConversations = conversations.filter((item) => item._id !== conversation._id)
  yield put(handleUpdateConversations([conversation, ...newConversations]))
}

function receiveMessage(conversationId) {
  SocketApi.emit('requestJoinRoom', { conversationId })

  SocketApi.emit('requestGetMessages', { conversationId })
}

function handleSelectConversationData({ conversation }) {
  receiveMessage(conversation._id)
}

function* handleGetConversationsSuccess({ conversations }) {
  const selectedConversation = yield select(selectSelectedConversation())
  console.log('test ===>', conversations, selectedConversation)
  if (conversations && conversations.docs.length > 0 && !selectedConversation._id) {
    yield put(handleSelectConversation(conversations.docs[0]))
  }
}

function* handleLoadMoreMessages() {
  try {
    const selectedConversation = yield select(selectSelectedConversation())
    const currentPage = yield select(selectCurrentPage())
    const hasNext = yield select(selectHasNext())
    // console.log('handleLoadMoreMessages', currentPage+ 1, hasNext)
    if (hasNext) {
      const result = yield call(Api.auction.get, {
        url: '/api/chat/find-messages',
        params: {
          conversationId: selectedConversation._id,
          page: currentPage + 1,
        },
      })

      yield put(loadmoreMessagesSuccess(result.data.docs.reverse(), result.data.page, result.data.hasNextPage))
    } else {
      yield put(loadmoreMessagesFailure())
    }
  } catch (e) {
    console.log(e)
    yield put(loadmoreMessagesFailure())
  }
}

function* handleLoadMoreConversations() {
  try {
    const currentPage = yield select(selectCurrentConversationPage())
    const hasNext = yield select(selectConversationHasNext())
    console.log('handleLoadMoreConversations', currentPage + 1, hasNext)
    if (hasNext) {
      const result = yield call(Api.auction.get, {
        url: '/api/chat/find-conversations',
        params: {
          page: currentPage + 1,
        },
      })

      yield put(handleLoadmoreConversationsSuccess(result.data.docs, result.data.page, result.data.hasNextPage))
    } else {
      yield put(handleLoadmoreConversationsFailure())
    }
  } catch (e) {
    console.log(e)
    yield put(handleLoadmoreConversationsFailure())
  }
}

export default function* watchChatData() {
  yield takeLatest(SEND_CHAT, sendChat)
  yield takeLatest(SELECT_CONVERSATION, handleSelectConversationData)
  yield takeLatest(GET_CONVERSATIONS_SUCCESS, handleGetConversationsSuccess)
  yield takeLatest(LOAD_MORE_MESSAGES, handleLoadMoreMessages)
  yield takeLatest(LOAD_MORE_CONVERSATIONS, handleLoadMoreConversations)
  yield takeLatest(NEW_CONVERSATION, handleNewConversationSaga)
}
