import React, { useCallback } from 'react'
import PerfectScrollBar from 'react-perfect-scrollbar'
import classes from './Conversations.module.scss'
import ConversationItem from './ConversationItem'

let timeout = null

const Conversations = ({
  conversations,
  selectedConversation,
  handleSelectConversation,
  handleLoadmoreConversations
}) => {
  const handleScroll = useCallback((e) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
      if (bottom) {
        console.log('loadmore conversations')
        handleLoadmoreConversations()
      }
    }, 100)
  }, [])

  return (
    <PerfectScrollBar
      className={classes.container}
      onScroll={handleScroll}
    >
      {conversations && conversations.map((conversation) => (
        <ConversationItem
          conversation={conversation}
          key={conversation._id}
          selectedConversation={selectedConversation}
          handleSelectConversation={handleSelectConversation}
          active={selectedConversation && conversation._id === selectedConversation._id}
        />
      ))}
    </PerfectScrollBar>
  )
}

export default Conversations
