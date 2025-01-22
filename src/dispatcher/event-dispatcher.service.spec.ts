import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import configuration from '../config/configuration';
import { EmitterConfig, QueuetieServiceConfig } from '../config/configuration.types';
import { EventDispatcherService } from './event-dispatcher.service';
import { makeServiceErrorEvent } from '../utils';
import { EventEmitter2Mock } from './test.mocks';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { BroadcastEvent } from './types';

describe('EventDispatcherService', () => {
  let service: EventDispatcherService;
  let config: ConfigService<QueuetieServiceConfig>;

  const eventEmitter2Mock = { ...EventEmitter2Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
        EventEmitterModule.forRoot(),
      ],
      providers: [EventDispatcherService],
    })
      .overrideProvider(EventEmitter2)
      .useValue(eventEmitter2Mock)
      .compile();

    service = module.get<EventDispatcherService>(EventDispatcherService);
    config = module.get<ConfigService>(ConfigService);
  });

  it('should ...', async () => {
    const channel = config.get<EmitterConfig>('emitter').channel;
    const broadcastEvent: BroadcastEvent = makeServiceErrorEvent(randomUUID());

    service.broadcast(broadcastEvent);

    expect(eventEmitter2Mock.emit).toHaveBeenCalledWith(channel, broadcastEvent);
  });
});
