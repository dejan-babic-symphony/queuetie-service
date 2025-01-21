import { Module } from '@nestjs/common';
import { DispatcherController } from './dispatcher.controller';
import { QueueDispatcherService } from './queue-dispatcher.service';
import { BullModule } from '@nestjs/bullmq';
import { EventDispatcherService } from './event-dispatcher.service';

@Module({
  imports: [
    BullModule.registerQueue(
      { name: process.env.SRV_EVENTS_QUEUE },
      { name: process.env.SRV_FIRST_QUEUE },
      { name: process.env.SRV_SECOND_QUEUE }
    ),
  ],
  exports: [QueueDispatcherService, EventDispatcherService],
  controllers: [DispatcherController],
  providers: [QueueDispatcherService, EventDispatcherService],
})
export class DispatcherModule {}
