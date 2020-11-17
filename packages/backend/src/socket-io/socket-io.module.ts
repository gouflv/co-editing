import { Module } from '@nestjs/common'
import { SocketIoGateway } from './socket-io.gateway'

@Module({
  providers: [SocketIoGateway]
})
export class SocketIoModule {}
