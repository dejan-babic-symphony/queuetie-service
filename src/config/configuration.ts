import { Logger } from '@nestjs/common';
import { QueuetieServiceConfig } from './configuration.types';

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

  for (const key of Object.keys(configuration)) {
    if (typeof configuration[key] === 'object') {
      for (const nestedKey of Object.keys(configuration[key])) {
        if (configuration[key][nestedKey] === undefined || configuration[key][nestedKey] === null) {
          throw new Error(`Configuration ${key}.${nestedKey} is not set`);
        }
      }
    }

    if (configuration[key] === undefined || configuration[key] === null) {
      throw new Error(`Configuration ${key} is not set`);
    }
  }

  logger.log(`Queuetie Service configuration loaded`);

  return configuration;
};
