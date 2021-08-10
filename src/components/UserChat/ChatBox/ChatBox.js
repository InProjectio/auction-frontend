import React, { useState, useEffect, useRef } from 'react'
// import PerfectScrollBar from 'react-perfect-scrollbar'
import Messages from 'pages/Admin/ChatPage/Messages'
import autosize from 'autosize';
import sendChatIcon from 'images/send-chat.svg'
// import attachmentIcon from 'images/attachment.svg'
import attachPhoto from 'images/attach-photo.svg'
import * as Api from 'api/api'
import closeIcon from 'images/close.svg'
import classes from './ChatBox.module.scss'
import ChatHeader from '../ChatHeader'

const ChatBox = ({ handleCloseChatBox,
  messages,
  chatAction,
  lastMessageId,
  loadingMore,
  handleLoadMoreMessages
}) => {
  const [text, setText] = useState('')
  const [uploadPhotoUrl, setUploadPhotoUrl] = useState('')
  const textAreaRef = useRef(null)

  useEffect(() => {
    autosize(textAreaRef.current);
  }, [])

  const handleSendMessage = () => {
    if (text && text.trim()) {
      // send chat
      chatAction(text)
      setText('')
      setTimeout(() => {
        autosize.update(textAreaRef.current);
      }, 200);
    }

    if (uploadPhotoUrl) {
      handleSendPhoto()
    }
  }

  const onKeyPress = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const onChangePhoto = async (e) => {
    const files = e.target.files
    const formData = new FormData()

    formData.append('files', files[0])
    const result = await Api.post({
      url: '/public/upload-images',
      data: formData,
    })
    if (result.data[0]) {
      const url = `${result.data[0].urlPrefix}${result.data[0].urlImage}`
      setUploadPhotoUrl(url)
    }
  }

  const handleSendPhoto = () => {
    // document.getElementById('send-photo-id').value = null;
    chatAction(uploadPhotoUrl, 'FILE')
    setUploadPhotoUrl('')
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <ChatHeader handleCloseChatBox={handleCloseChatBox} />
      </div>
      <div className={classes.messages}>
        <Messages
          messages={messages}
          fromUserChat
          lastMessageId={lastMessageId}
          loadingMore={loadingMore}
          handleLoadMoreMessages={handleLoadMoreMessages}
        />
      </div>

      <div className={classes.inputWrapper}>
        {uploadPhotoUrl
          && (
          <div className={classes.images}>
            <div className={classes.imageWrapper}>
              <img src={uploadPhotoUrl} className={classes.photo} alt="img" />
              <a className={classes.btnRemove}>
                <img src={closeIcon} className={classes.closeIcon} alt="closeIcon" />
              </a>
            </div>
          </div>
          )}
        <textarea
          className={classes.textarea}
          onChange={(e) => setText(e.target.value)}
          ref={textAreaRef}
          value={text}
          lines={1}
          onKeyDown={onKeyPress}
          placeholder="Nhập nội dung"
        />
        <div className={classes.actions}>
          {!text
            && (
            <>
              {!uploadPhotoUrl
                && (
                <a className={classes.btn}>
                  <input type="file" name="file" id="send-photo-id" className={classes.inputfile} onChange={onChangePhoto} />
                  <label htmlFor="send-photo-id" className={classes.sendPhotoLabel}>
                    <img src={attachPhoto} className={classes.icon} alt="icon" />
                  </label>
                </a>
                )}
              {/* <a className={classes.btn}>
                <input type="file" name="file" id="send-file-id" className={classes.inputfile} onChange={onChangePhoto} />
                <label htmlFor="send-file-id" className={classes.sendPhotoLabel}>
                  <img src={attachmentIcon} className={classes.icon} alt='icon' />
                </label>
              </a> */}
            </>
            )}

          <a
            className={classes.btnSend}
            onClick={handleSendMessage}
          >
            <img src={sendChatIcon} className={classes.sendIcon} alt="icon" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default ChatBox
