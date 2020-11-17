import { Test, TestingModule } from '@nestjs/testing';
import { SocketIoGateway } from './socket-io.gateway';

describe('SocketIoGateway', () => {
  let gateway: SocketIoGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketIoGateway],
    }).compile();

    gateway = module.get<SocketIoGateway>(SocketIoGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
