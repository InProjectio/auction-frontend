import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import GA from 'utils/GoogleAnalytics'
// import * as Api from 'api/api'
import { injectSaga } from 'utils/injectSaga'
import CompanyPrivateRoute from 'routes/CompanyPrivateRoute'
import AuthLayout from 'layout/AuthLayout'
import MainLayout from 'layout/MainLayout'
import MobilePage from 'pages/MobilePage'
import { getMobileOperatingSystem } from 'utils/utils'
import history from 'utils/history'
import socketApi from 'api/SocketApi'
import {
  getMessagesSuccess,
  getConversationsSuccess,
  updateMessage,
  handleNewConversation
} from 'pages/ChatPage/actions'
import EventEmitter from 'utils/EventEmitter'
import chatSaga from 'pages/ChatPage/saga'
import * as storage from 'utils/storage'
import {
  makeSelectConfirm,
  makeSelectNotification,
  makeSelectShowConfirm
} from './selectors'
import {
  handleHideConfirm,
  hideNotification,
  getToken,
} from './actions'
import classes from './CommonLayout.module.scss'
import Notification from '../../components/Notification'
import Confirm from '../../components/Confirm'
import CompanyLayout from '../CompanyLayout'

import saga from './saga'

const CommonLayout = ({
  notification,
  showConfirm,
  handleHideConfirm,
  confirm,
  hideNotification,
  getMessagesSuccess,
  getConversationsSuccess,
  handleNewConversation,
  updateMessage,
}) => {
  useEffect(() => {
    const connectSocket = () => {
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        console.log('connect socket')
        socketApi.connectChat()
        socketApi.on('connect', () => {
          // console.log('admin connect chat')
          socketApi.emit('requestGetConversations')
          socketApi.on('responseGetMessages', (objData) => {
            console.log('responseGetMessages', objData)
            getMessagesSuccess(objData.data.docs.reverse(), objData.data.page, objData.data.hasNextPage)
          })

          socketApi.on('responseGetConversations', (conversations) => {
            console.log('responseGetConversation', conversations)
            getConversationsSuccess(conversations.data)
          })

          socketApi.on('responseNewConversation', (conversation) => {
            console.log('responseNewConversation', conversation)
            handleNewConversation(conversation.data)
          })

          socketApi.on('responseNewMessage', (objData) => {
            console.log('responseNewMessage', objData)
            updateMessage(objData)
          })
        })
      }
    }

    connectSocket()

    EventEmitter.on('connectSocket', connectSocket)

    return () => {
      socketApi.disconnect()
      EventEmitter.on('removeSocket', connectSocket)
    }
  }, [])

  /**
   * listen when storage change and sync
   */

  useEffect(() => {
    window.addEventListener('storage', (e) => {
      if ((e.key === 'accessToken' && e.oldValue !== e.newValue)
      ) {
        location.reload()
      }

      if ((e.key === 'walletAddress' && e.oldValue !== e.newValue)
      ) {
        location.reload()
      }
    });
  }, [])

  /**
   * listen initial storage when open
   */
  useEffect(() => {
    storage.getAllStorage()
    window.addEventListener('message', messageHandler, false);
    function messageHandler(event) {
      const { action, key, value } = event.data
      if (action === 'returnData') {
        const oldAccessToken = localStorage.getItem('accessToken')
        if (key === 'getAllStorage') {
          localStorage.setItem('userInfo', value.userInfo)
          localStorage.setItem('accessToken', value.accessToken)
          if (value.companyId) {
            localStorage.setItem('companyId', value.companyId)
          }
          if (oldAccessToken !== value.accessToken) {
            location.reload()
          }
        }
      }
    }
  }, [])

  useEffect(() => {
    const os = getMobileOperatingSystem()
    if (os !== 'unknown' && location.pathname !== '/mobile') {
      history.replace('/mobile')
    }
    if (notification) {
      setTimeout(() => {
        hideNotification()
      }, 8000)
    }

    const handleClickOutside = () => {
      if (notification) {
        hideNotification()
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [notification])

  return (
    <div className={classes.container}>
      {
        notification
        && (
        <Fade
          top
          duration={500}
        >
          <div className={classes.notification}>
            <Notification notification={notification} />
          </div>
        </Fade>
        )
      }
      { GA.init() && <GA.RouteTracker /> }
      <Switch>
        <Route path="/mobile" component={MobilePage} />
        <Route path="/auth" component={AuthLayout} />
        <CompanyPrivateRoute path="/company" component={CompanyLayout} />
        <Route path="/" component={MainLayout} />
      </Switch>
      <Modal
        show={showConfirm}
        onHide={handleHideConfirm}
      >
        <Confirm
          handleClose={handleHideConfirm}
          confirmData={confirm}
        />
      </Modal>
    </div>
  )
}

const withSaga = injectSaga({ key: 'global', saga });

const withChatSaga = injectSaga({ key: 'chat', saga: chatSaga });

const ComposeCommonLayout = compose(withSaga, withChatSaga)(CommonLayout)

const mapStateToProps = createStructuredSelector({
  showConfirm: makeSelectShowConfirm(),
  notification: makeSelectNotification(),
  confirm: makeSelectConfirm()
})

const mapDispatchToProps = {
  handleHideConfirm,
  hideNotification,
  getToken,
  getMessagesSuccess,
  getConversationsSuccess,
  updateMessage,
  handleNewConversation
}

export default connect(mapStateToProps, mapDispatchToProps)(ComposeCommonLayout)
