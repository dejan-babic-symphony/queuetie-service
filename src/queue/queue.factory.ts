import { ConfigService } from '@nestjs/config';
import { QueueOptions } from 'bullmq';
import { QueuetieServiceConfig, RedisConfig } from 'src/config/configuration.types';

export const QueueFactory = (configService: ConfigService<QueuetieServiceConfig>): QueueOptions => {
  const redisConfiguration = configService.get<RedisConfig>('redis');
  const serviceConfig: QueueOptions = {
    connection: {
      host: redisConfiguration.host,
      port: redisConfiguration.port,
    },
    defaultJobOptions: {
      removeOnComplete: {
        age: 5 * 60,
      },
      removeOnFail: {
        age: 5 * 60,
      },
    },
  };

  return serviceConfig;
};
