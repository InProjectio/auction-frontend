import React, { Component } from 'react'
import classNames from 'classnames'
import autosize from 'autosize';
import moment from 'moment'
// import { FileURL } from 'utils/config'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import closeIcon from 'images/close.svg'
import sendChatIcon from 'images/send-chat.svg'
// import attachmentIcon from 'images/attachment.svg'
import attachPhoto from 'images/attach-photo.svg'
// import socketApi from 'api/SocketApi';
import S3 from 'react-aws-s3'
import FileType from 'components/DropzoneUploader/FileType';
import Loader from 'react-loader-spinner'
import {
  getMessages,
  connectChat,
  sendChat,
  handleSelectConversation,
  handleLoadMoreMessages,
  handleLoadmoreConversations
} from './actions'
import {
  selectMessages,
  selectConversations,
  selectSelectedConversation,
  selectLastMessageId,
  selectLoadingMore
} from './selectors'
import Conversations from './Conversations'
import Messages from './Messages'
import classes from './ChatPage.module.scss'
import BiddingInformation from './BiddingInformation';

class ChatPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      loadingUpLoad: false
    }
  }

  componentDidMount() {
    this.textarea.focus();
    autosize(this.textarea);
    // socketApi.emit('requestGetConversations')
  }

  handleChangeText = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  handleSendMessage = () => {
    if (this.state.text && this.state.text.trim()) {
      this.props.sendChat(this.state.text)
      this.setState({
        text: ''
      })
      setTimeout(() => {
        this.setState({
          text: ''
        }, () => {
          autosize.update(this.textarea);
        })
      }, 200);
    }

    if (this.state.uploadPhotoUrl) {
      this.handleSendPhoto()
    }
  }

  handleSendPhoto() {
    // document.getElementById('send-photo-id').value = null;
    this.props.sendChat(this.state.uploadPhotoUrl, 'FILE')
    this.setState({ uploadPhotoUrl: '' })
  }

  onKeyPress = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault()
      this.handleSendMessage()
    }
  }

  onChangePhoto = async (e) => {
    this.setState({
      loadingUpLoad: true
    })
    const files = e.target.files
    const file = files[0]

    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      dirName: '', /* optional */
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    };
    const ReactS3Client = new S3(config)
    const result = await ReactS3Client.uploadFile(file, `${moment().unix()}---${file.name}`)
    this.setState({ uploadPhotoUrl: result.location, loadingUpLoad: false })
  }

  handleRemoveFile = () => {
    this.setState({
      uploadPhotoUrl: ''
    })
  }

  render() {
    const { conversations,
      messages,
      handleSelectConversation,
      selectedConversation,
      lastMessageId,
      handleLoadMoreMessages,
      loadingMore,
      handleLoadmoreConversations
    } = this.props

    const {
      text,
      uploadPhotoUrl,
      loadingUpLoad
    } = this.state
    return (
      <div className={classes.container}>

        <div className={classes.left}>
          <Conversations
            conversations={conversations}
            selectedConversation={selectedConversation}
            handleSelectConversation={handleSelectConversation}
            handleLoadmoreConversations={handleLoadmoreConversations}
          />
        </div>
        <div className={classNames(classes.between)}>
          <Messages
            selectedConversation={selectedConversation}
            messages={messages}
            lastMessageId={lastMessageId}
            handleLoadMoreMessages={handleLoadMoreMessages}
            loadingMore={loadingMore}
          />

          <div className={classes.inputWrapper}>
            {uploadPhotoUrl
              && (
              <div className={classes.images}>
                <div className={classes.imageWrapper}>
                  <FileType item={{ url: uploadPhotoUrl }} />
                  <span className={classes.filename}>
                    { uploadPhotoUrl.split('/').pop().split('---').pop() }
                  </span>
                  <a
                    className={classes.btnRemove}
                    onClick={this.handleRemoveFile}
                  >
                    <img src={closeIcon} className={classes.closeIcon} alt="closeIcon" />
                  </a>
                </div>
              </div>
              )}
            { loadingUpLoad
              && (
              <div className={classes.images}>
                <Loader type="Oval" color="#7B68EE" height={20} width={20} />
              </div>
              )}
            <div className={classes.inputFieldWrapper}>
              <textarea
                className={classes.textarea}
                onChange={this.handleChangeText}
                ref={(c) => this.textarea = c}
                value={text}
                lines={1}
                onKeyDown={this.onKeyPress}
                placeholder="Enter message"
              />

              <div className={classes.actions}>
                {!text
                  && (
                  <>
                    { !uploadPhotoUrl
                    && (
                    <a className={classes.btn}>
                      <input type="file" name="file" id="send-photo-id" className={classes.inputfile} onChange={this.onChangePhoto} />
                      <label htmlFor="send-photo-id" className={classes.sendPhotoLabel}>
                        <img src={attachPhoto} className={classes.icon} alt="icon" />
                      </label>
                    </a>
                    )}
                  </>
                  )}

                <a
                  className={classes.btnSend}
                  onClick={this.handleSendMessage}
                >
                  <img src={sendChatIcon} className={classes.sendIcon} alt="icon" />
                </a>
              </div>
            </div>

          </div>

        </div>

        <div className={classes.right}>
          <BiddingInformation selectedConversation={selectedConversation} />
        </div>

      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  messages: selectMessages(),
  conversations: selectConversations(),
  selectedConversation: selectSelectedConversation(),
  lastMessageId: selectLastMessageId(),
  loadingMore: selectLoadingMore()
})

const mapDispatchToProps = (dispatch) => ({
  getMessages: ({ selectedConversation, page }) => dispatch(getMessages({ selectedConversation, page })),
  connectChat: () => dispatch(connectChat()),
  sendChat: (message, messageType) => dispatch(sendChat(message, messageType)),
  handleSelectConversation: (conversation) => dispatch(handleSelectConversation(conversation)),
  handleLoadMoreMessages: () => dispatch(handleLoadMoreMessages()),
  handleLoadmoreConversations: () => dispatch(handleLoadmoreConversations())

})

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)
