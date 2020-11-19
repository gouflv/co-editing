import { Logger } from '@nestjs/common'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { OnGatewayInit } from '@nestjs/websockets/interfaces/hooks/on-gateway-init.interface'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({})
export class SocketIoGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('SocketIoGateway')

  @WebSocketServer()
  server: Server

  afterInit(server: Server) {
    this.logger.log('Init')
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Client connected', client.id)
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected', client.id)
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {
    this.logger.log('Client message', JSON.stringify(payload))
    client.emit('message', payload)
  }
}
