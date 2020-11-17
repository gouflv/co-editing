import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway(80, {
  namespace: '/demo'
})
export class SocketIoGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!'
  }
}
