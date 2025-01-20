import { Logger } from '@nestjs/common';
import { QueuetieServiceConfig } from './configuration.types';
import { verify } from './utils';

export default () => {
  const logger = new Logger('Configuration');

  const configuration: QueuetieServiceConfig = {
    redis: {
      host: process.env.SRV_REDIS_HOST,
      port: Number(process.env.SRV_REDIS_PORT),
    },
    queue: {
      events: process.env.SRV_EVENTS_QUEUE,
      first: process.env.SRV_FIRST_QUEUE,
      second: process.env.SRV_SECOND_QUEUE,
    },
    emitter: {
      channel: process.env.SRV_EMITTER_CHANNEL,
    },
  };

  verify(configuration);

  logger.log(`Queuetie Service configuration loaded`);

  return configuration;
};
