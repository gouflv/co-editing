import { Editor } from 'slate'
import { io, Socket } from 'socket.io-client'
import { ManagerOptions } from 'socket.io-client/build/manager'
import { SocketOptions } from 'socket.io-client/build/socket'

export interface SocketIOPluginOptions {
  url: string
  connectOpts?: Partial<ManagerOptions | SocketOptions>

  onConnect?: () => void
  onDisconnect?: () => void
  onError?: (message: string) => void
}

export interface WithSocketIOEditor {
  socket: Socket

  connect: () => void
  disconnect: () => void

  send: (op) => void
  receive: (op) => void
  destroy: (op) => void
}

const log = require('debug')('withSocketIO')

export const withSocketIO = <T extends Editor>(
  editor: T,
  options: SocketIOPluginOptions
) => {
  const e = editor as T & WithSocketIOEditor
  const { url, connectOpts, onConnect, onDisconnect, onError } = options

  e.connect = () => {
    if (!e.socket) {
      e.socket = io(url, connectOpts)
      e.socket.on('connect', () => {
        log(`socket connect: id:${e.socket.id}`)
        onConnect && onConnect()
      })
    }

    e.socket.on('error', (message) => {
      onError && onError(message)
    })

    e.socket.on('message', (data) => {
      e.receive(data)
    })

    e.socket.on('disconnect', () => {
      //
      onDisconnect && onDisconnect()
    })

    e.socket.connect()

    return e
  }

  e.disconnect = () => {
    log(`disconnect`)
  }

  e.receive = (op) => {
    log(`receive`, op)
  }

  e.send = (op) => {
    e.socket.emit('message', op)
  }

  e.destroy = () => {
    e.socket.close()
  }

  e.connect()

  return e
}
