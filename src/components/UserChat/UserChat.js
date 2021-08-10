import React, { useState, useEffect } from 'react'
import commentIcon from 'images/steering-wheel.svg'
import io from 'socket.io-client'
import { CHAT_SOCKET, SOCKET_PATH } from 'utils/config'
import * as Api from 'api/api'
import ChatBox from './ChatBox'
import classes from './UserChat.module.scss'

let socket = null

let hasNext = false

let currentPage = 1

const UserChat = () => {
  const [conversationId, setConversationId] = useState('')
  const [numberMessages, setNumberMessages] = useState(0)
  const [showChatBox, setShowChatBox] = useState(false)
  const [messages, setMessages] = useState([])
  const [lastMessageId, setLastMessageId] = useState('')
  const [userRole] = useState(localStorage.getItem('roles'))
  const [accessToken] = useState(localStorage.getItem('accessToken'))
  const [idCustomer] = useState(localStorage.getItem('idCustomer'))
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    setNumberMessages(0)
  }, [showChatBox])

  // connect socket
  useEffect(() => {
    if (accessToken) {
      socket = io(CHAT_SOCKET, {
        query: {
          token: accessToken,
          guid: idCustomer
        },
        path: SOCKET_PATH
      })
    }

    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [accessToken])

  // add conversation
  useEffect(async () => {
    if (accessToken) {
      const result = await Api.post({
        url: '/chat/private/customer-add-conversation',
        data: {
          guid: idCustomer
        }
      })

      const conversationId = result.data?._id

      setConversationId(conversationId)

      socket.emit('requestJoinRoom', { conversationId })

      socket.emit('requestGetMessages', { conversationId })
    }
  }, [accessToken])

  useEffect(() => {
    if (socket) {
      socket.on('responseGetMessages', async (objData) => {
        // console.log('responseGetMessages', objData)
        hasNext = objData.data.hasNextPage
        currentPage = objData.data.page
        setMessages(objData.data.docs.reverse())
      })

      // listen new message
      socket.on('responseNewMessage', (objData) => {
        setMessages((prevMessages) => [...prevMessages, objData.data])
        setLastMessageId(objData.data._id)
        if (!showChatBox) {
          setNumberMessages((prevNumber) => prevNumber + 1)
        }
      })
    }
  }, [])

  const chatAction = (message, messageType = 'TEXT') => {
    socket.emit('requestSendMessage', {
      conversationId,
      message,
      messageType
    })
  }

  const handleLoadMoreMessages = async (pageSize = 50) => {
    try {
      console.log('test handleLoadMoreMessages', hasNext)
      if (hasNext && !loadingMore) {
        setLoadingMore(true)
        const result = await Api.get({
          url: '/chat/private/find-messages',
          params: {
            conversationId,
            page: currentPage + 1,
            pageSize
          },
        })
        hasNext = result.data.hasNextPage
        currentPage = result.data.page
        setMessages((prevMessages) => ([...result.data.docs.reverse(), ...prevMessages]))
        setLoadingMore(false)
      }
    } catch (e) {
      console.log(e)
      setLoadingMore(false)
    }
  }

  // console.log('messages', messages)

  return (
    <div className={classes.container}>
      { userRole === 'CUSTOMER'
        && (
        <div
          className={classes.iconWrapper}
          onClick={() => {
            console.log('test')
            setShowChatBox(true)
          }}
        >
          <img src={commentIcon} alt="comment" className={classes.commentIcon} />
          { numberMessages > 0
              && (
              <div className={classes.numberMessages}>
                { numberMessages }
              </div>
              )}
        </div>
        )}

      { showChatBox
        && (
        <div className={classes.chatBox}>
          <ChatBox
            handleCloseChatBox={() => setShowChatBox(false)}
            messages={messages}
            chatAction={chatAction}
            handleLoadMoreMessages={handleLoadMoreMessages}
            lastMessageId={lastMessageId}
            loadingMore={loadingMore}
          />
        </div>
        )}

    </div>
  )
}

export default UserChat
