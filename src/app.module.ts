import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueueFactory } from './queue/queue.factory';
import { DispatcherController } from './dispatcher/dispatcher.controller';
import { DispatcherModule } from './dispatcher/dispatcher.module';
import configuration from './config/configuration';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    BullModule.forRootAsync({
      useFactory: QueueFactory,
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    DispatcherModule,
  ],
  controllers: [DispatcherController],
  providers: [],
})
export class AppModule {}
