import { Body, Controller, Logger, Post } from '@nestjs/common';
import { QueueDispatcherService } from './queue-dispatcher.service';
import { SimulateRequest } from './dto/simulate.request.dto';
import { SimulateResponse } from './dto/simulate.response.dto';
import { DispatcherSimulateDocs } from './docs/dispatcher.simulate.docs';
import { EventDispatcherService } from './event-dispatcher.service';
import { makeServiceInfoEvent } from '../utils/events';
import { makeServiceErrorEvent } from '../utils/events';

@Controller('dispatcher')
export class DispatcherController {
  private readonly logger = new Logger(DispatcherController.name);

  constructor(
    private readonly eventsDispatcherService: EventDispatcherService,
    private readonly queueDispatcherService: QueueDispatcherService
  ) {}

  @Post('/simulate')
  @DispatcherSimulateDocs()
  async simulate(@Body() payload: SimulateRequest): Promise<SimulateResponse> {
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
