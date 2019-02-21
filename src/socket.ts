import * as socketIo from 'socket.io-client'

import { store } from './config'
import * as messages from './constants/Messenger'

class Socket {
  private socket: SocketIOClient.Socket | undefined = undefined

  public init(token: string) {
    this.socket = socketIo('API_URL', { query: `token=${token}` })
    this.initListeners()
  }

  public emit = (type: string, payload?: any) => {
    if (this.socket) {
      this.socket.emit(type, payload)
    }
  }

  private initListeners() {
    Object.keys(messages).forEach(type => {
      if (this.socket) {
        this.socket.on(type, (payload: any) => {
          store.dispatch({ type, payload })
        })
      }
    })
  }
}

export const socket = new Socket()
