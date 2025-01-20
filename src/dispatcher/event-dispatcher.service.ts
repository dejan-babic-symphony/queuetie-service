import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { BroadcastEvent } from './types';
import { ConfigService } from '@nestjs/config';
import { EmitterConfig, QueuetieServiceConfig } from 'src/config/configuration.types';

@Injectable()
export class EventDispatcherService {
  private readonly logger = new Logger(EventDispatcherService.name);
  private readonly eventsChannel: string;

  constructor(
    private readonly configService: ConfigService<QueuetieServiceConfig>,
    private readonly eventEmitter: EventEmitter2
  ) {
    this.eventsChannel = this.configService.get<EmitterConfig>('emitter').channel;
  }

  public broadcast(event: BroadcastEvent) {
    this.eventEmitter.emit(this.eventsChannel, event);
  }

  // TODO[dejan.babic] Move to listener
  @OnEvent(process.env.SRV_EMITTER_CHANNEL)
  handleBroadcast(event: BroadcastEvent) {
    this.logger.log('Broadcasting event', { event });
  }
}
