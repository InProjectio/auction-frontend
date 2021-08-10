import React, { Component } from 'react'
import classNames from 'classnames'
import moment from 'moment'
import defaultCompanyLogo from 'images/defaultLogoCompany.jpg'
import classes from './Conversations.module.scss'

export default class ConversationItem extends Component {
  shouldComponentUpdate(nextProps) {
    const oldConversation = this.props.conversation
    const newConversation = nextProps.conversation
    if (oldConversation._id !== newConversation._id
        || oldConversation.updatedAt !== newConversation.updatedAt
        || oldConversation.latestMessage !== newConversation.latestMessage
        || oldConversation.numberOfUnreadMessages !== newConversation.numberOfUnreadMessages
        || nextProps.active !== this.props.active
    ) {
      return true
    }
    return false
  }

  render() {
    const { conversation,
      handleSelectConversation,
      active
    } = this.props
    return (
      <div
        key={conversation._id}
        className={classNames(classes.conversation,
          active && classes.active,
          conversation.numberOfUnreadMessages && classes.unreaded)}
        onClick={() => handleSelectConversation(conversation)}
      >
        <div className={classes.row}>
          <div className={classes.logoWrapper}>
            <img src={conversation.biddingEntity?.company?.logo || defaultCompanyLogo} className={classes.logo} alt="logo" />
            <img src={conversation.tendererEntity?.company?.logo || defaultCompanyLogo} className={classNames(classes.logo, classes.logo2)} alt="logo" />
          </div>
          <div className={classes.info}>
            <div className={classes.rowBetween}>
              <p
                className={classes.title}
                title={conversation.title}
              >
                {conversation.title}
              </p>
              <p className={classes.time}>
                {moment(conversation.updatedAt).lang('en').fromNow(true)}
              </p>
            </div>

            <p className={classes.subTitle}>
              {conversation.subTitle}
            </p>
            <div className={classNames(classes.row, classes.mb0)}>
              <p className={classes.lastMessage}>
                {conversation?.latestCustomerConveration?.latestMessage}
              </p>
              {!!conversation?.numberOfUnreadMessages
              && (
              <div className={classes.unreadMessage}>
                {conversation?.numberOfUnreadMessages}
              </div>
              )}

            </div>
          </div>
          {/* < div className={classNames(classes.unread, conversation.numberOfUnreadMessages === 0 && classes.read)} /> */}
        </div>

      </div>
    )
  }
}
