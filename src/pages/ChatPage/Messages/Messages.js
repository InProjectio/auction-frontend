import React, { Component } from 'react'
import classNames from 'classnames'
import { text2HTML } from 'utils/utils'
import defaultAvatar from 'images/defaultAvatar.svg'
import moment from 'moment'
import Loader from 'react-loader-spinner'
import Lightbox from 'react-image-lightbox';
import FileType, { isImage } from 'components/DropzoneUploader/FileType/FileType';
import classes from './Messages.module.scss'

let timeout = null

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURLShow: '',
      currentDate: moment().format('YYYY-MM-DD'),
      useInfo: JSON.parse(localStorage.getItem('userInfo'))
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.scrollToBottom()
    }, 100)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedConversation?.conversationId !== this.props.selectedConversation?.conversationId
      || prevProps.lastMessageId !== this.props.lastMessageId
      || (prevProps.messages.length === 0 && this.props.messages.length > 0)
    ) {
      this.scrollToBottom()
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({});
  }

  isPhoto = (input) => {
    const text = input.toLowerCase()
    if (text.startsWith('http') && (text.endsWith('.png') || text.endsWith('.jpg') || text.endsWith('.jpeg'))) {
      return true;
    }
    return false;
  }

  handleScroll = () => {
    // console.log(this.messageRef.scrollTop)

    clearTimeout(timeout)

    timeout = setTimeout(() => {
      if (this.messageRef.scrollTop <= 500) {
        console.log('loadmore')
        const { handleLoadMoreMessages } = this.props
        handleLoadMoreMessages()
      }
    }, 100)
  }

  render() {
    const { messages, fromUserChat,
      loadingMore
    } = this.props;
    const { imageURLShow, currentDate, useInfo } = this.state;
    return (
      <div
        className={classNames(classes.messages, fromUserChat && classes.fromUserChat)}
        ref={(ref) => this.messageRef = ref}
        onScroll={this.handleScroll}
      >
        { loadingMore && (
        <div className={classes.loader}>
          <Loader type="Oval" color="#999999" height={20} width={20} />
        </div>
        )}
        { messages && messages.map((message, i) => (
          <div
            className={classes.message}
            key={message._id || message.tempId}
          >
            { (useInfo._id !== message.user._id)
              ? (
                <div className={classes.owner}>
                  {(i === 0
                  || messages[i - 1].user._id !== message.user._id
                  || moment(message.messageTime).diff(moment(messages[i - 1].messageTime), 'minutes') > 5
                  )
                    ? <img src={message.user?.avatar_url || defaultAvatar} className={classes.defaultAvatar} alt="logo" />
                    : <div className={classes.emptyLogoOther} />}
                  <div className={classes.messageContent}>
                    {(i === 0 || messages[i - 1].user._id !== message.user._id
                    || moment(message.messageTime).diff(moment(messages[i - 1].messageTime), 'minutes') > 5
                    )
                    && (
                    <div className={classes.ownerTime}>
                      <b>{message.user?.fullname}</b>
                      ,
                      {' '}
                      { currentDate === moment(message.messageTime).format('YYYY-MM-DD') ? moment(message.messageTime).format('HH:mm') : moment(message.messageTime).format('DD/MM/YYYY HH:mm')}
                    </div>
                    )}
                    <div className={classNames(message.messageType === 'TEXT' && classes.ownerText)}>
                      {message.messageType === 'TEXT'
                      && (
                      <p
                        className={classes.text}
                        dangerouslySetInnerHTML={{ __html: text2HTML(message.message) }}
                      />
                      )}
                      {
                      message.messageType === 'FILE'
                      && (
                        <a
                          className={classes.btnPhoto}
                          onClick={() => {
                            if (isImage(message.message)) {
                              this.setState({ imageURLShow: message.message })
                            } else {
                              window.open(message.message)
                            }
                          }}
                        >
                          { isImage(message.message)
                            ? (
                              <div className={classes.photoWrapper}>
                                <img
                                  src={message.message}
                                  className={classNames(classes.photo, fromUserChat && classes.photoUser)}
                                  alt="upload"
                                  resize="contain"
                                />
                              </div>

                            )
                            : (
                              <div className={classes.file}>
                                <FileType item={{ url: message.message }} />
                                <span>
                                  { message.message.split('/').pop().split('---').pop() }
                                </span>
                              </div>
                            )}

                        </a>
                      )

                    }

                    </div>
                  </div>
                </div>
              )
              : (
                <div className={classes.admin}>
                  <div className={classNames(classes.messageContent, classes.messageContentRight)}>
                    {(i === 0 || messages[i - 1].userType !== message.userType
                      || moment(message.messageTime).diff(moment(messages[i - 1].messageTime), 'minutes') > 5
                    )
                    && <div className={classes.adminTime}>{moment(message.messageTime).format('HH:mm')}</div>}

                    <div className={classNames(message.messageType === 'TEXT' && classes.adminText)}>
                      {message.messageType === 'FILE'
                      && (
                      <a
                        className={classes.btnPhoto}
                        onClick={() => {
                          if (isImage(message.message)) {
                            this.setState({ imageURLShow: message.message })
                          } else {
                            window.open(message.message)
                          }
                        }}
                      >
                        { isImage(message.message)
                          ? (
                            <div className={classes.photoWrapper}>
                              <img
                                src={message.message}
                                className={classNames(classes.photo, fromUserChat && classes.photoUser)}
                                alt="upload"
                                resize="contain"
                              />
                            </div>

                          )
                          : (
                            <div className={classes.file}>
                              <FileType item={{ url: message.message }} />
                              <span>
                                { message.message.split('/').pop().split('---').pop() }
                              </span>
                            </div>
                          )}

                      </a>
                      )}
                      {message.messageType === 'TEXT'
                      && (
                      <p
                        className={classes.text}
                        dangerouslySetInnerHTML={{ __html: text2HTML(message.message) }}
                      />
                      )}
                      {
                        !message._id
                        && (
                        <div className={classes.loadingMessage}>
                          <Loader type="Oval" color="#999999" height={20} width={20} />
                        </div>
                        )
                      }

                    </div>
                  </div>

                </div>
              )}
          </div>
        ))}
        <div ref={(el) => { this.messagesEnd = el; }} />

        {imageURLShow && imageURLShow.length > 0 && (
          <Lightbox
            mainSrc={imageURLShow}
            onCloseRequest={() => this.setState({ imageURLShow: '' })}
          />
        )}
      </div>
    )
  }
}
