export type EnvSchema = {
  NODE_ENV: string;
  SRV_EVENTS_QUEUE: string;
  SRV_FIRST_QUEUE: string;
  SRV_SECOND_QUEUE: string;
  SRV_REDIS_HOST: string;
  SRV_REDIS_PORT: string;
  SRV_EMITTER_CHANNEL: string;
};

export const EnvKeys: (keyof EnvSchema)[] = ['NODE_ENV'];

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends Record<keyof EnvSchema, string | undefined> {}
  }
}

export type RedisConfig = {
  host: string;
  port: number;
};

export type QueueConfig = {
  events: string;
  first: string;
  second: string;
};

export type EmitterConfig = {
  channel: string;
};

export type QueuetieServiceConfig = {
  redis: RedisConfig;
  queue: QueueConfig;
  emitter: EmitterConfig;
};
