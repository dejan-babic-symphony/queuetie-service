import { Body, Controller, Logger, Post } from '@nestjs/common';
import { QueueDispatcherService } from './queue-dispatcher.service';
import { JobRequest } from './dto/job.request.dto';
import { JobResponse } from './dto/job.response.dto';
import { SimulateDispatchDocs } from './docs/simulateDocs';
import { EventDispatcherService } from './event-dispatcher.service';
import { BroadcastEvent, Channel } from './types';
import { makeServiceErrorEvent, makeServiceInfoEvent } from './dispatcher.utils';

@Controller('dispatcher')
export class DispatcherController {
  private readonly logger = new Logger(DispatcherController.name);

  constructor(
    private readonly eventsDispatcherService: EventDispatcherService,
    private readonly queueDispatcherService: QueueDispatcherService
  ) {}

  @Post('/simulate')
  @SimulateDispatchDocs()
  async simulate(@Body() payload: JobRequest): Promise<JobResponse> {
    this.logger.log('Received request for simulating jobs', { payload });

    const userId = payload.echo.user.id;

    try {
      const echo = await this.queueDispatcherService.simulate(payload);
      this.logger.log('Dispatched jobs', { echo });
      this.eventsDispatcherService.broadcast(makeServiceInfoEvent(userId));

      return echo;
    } catch (error) {
      this.logger.log('Failed dispatching jobs', { error });
      this.eventsDispatcherService.broadcast(makeServiceErrorEvent(userId));

      throw error;
    }
  }
}
