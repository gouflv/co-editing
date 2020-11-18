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

  afterInit(server: Server): any {
    this.logger.log('Init')
  }

  handleConnection(client: Socket, ...args: any[]): any {
    this.logger.log('Client connected', client.id)
  }

  handleDisconnect(client: Socket): any {
    this.logger.log('Client disconnected', client.id)
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!'
  }
}
