import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BroadcastEvent } from './types';
import { ConfigService } from '@nestjs/config';
import { EmitterConfig, QueuetieServiceConfig } from 'src/config/configuration.types';

@Injectable()
export class EventDispatcherService {
  private readonly logger = new Logger(EventDispatcherService.name);
  private readonly channel: string;

  constructor(
    private readonly configService: ConfigService<QueuetieServiceConfig>,
    private readonly eventEmitter: EventEmitter2
  ) {
    this.channel = this.configService.get<EmitterConfig>('emitter').channel;
  }

  public broadcast(event: BroadcastEvent) {
    this.eventEmitter.emit(this.channel, event);
  }
}
