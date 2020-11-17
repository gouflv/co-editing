import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SocketIoModule } from './socket-io/socket-io.module'

@Module({
  imports: [SocketIoModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
