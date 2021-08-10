import io from 'socket.io-client'

class SocketApi {
  socket = null

  connectChat = () => {
    const accessToken = localStorage.getItem('accessToken')
    this.socket = io(process.env.REACT_APP_SOCKET_URL, {
      query: {
        token: accessToken,
      },
      path: '/bidSocket'
    })
  }

  disconnect = () => {
    if (this.socket) {
      this.socket.disconnect()
    }
  }

  on = (key, callback) => {
    this.socket.on(key, (data) => {
      callback(data)
    })
  }

  emit = (key, data) => {
    this.socket.emit(key, data)
  }
}

export default new SocketApi()
