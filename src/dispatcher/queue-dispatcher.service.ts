import { InjectQueue } from '@nestjs/bullmq';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { SimulateRequest, JobType } from './dto';

@Injectable()
export class QueueDispatcherService {
  private readonly logger = new Logger(QueueDispatcherService.name);

  constructor(
    @InjectQueue(process.env.SRV_FIRST_QUEUE)
    private readonly firstQueue: Queue,
    @InjectQueue(process.env.SRV_SECOND_QUEUE)
    private readonly secondQueue: Queue
  ) {}

  public async simulate(payload: SimulateRequest): Promise<SimulateRequest['echo']> {
    const { type, delay, queue, echo } = payload;

    const queueHandler = this.resolveHandler(queue);
    const resolvedName = this.resolveName(type);

    Array.from({ length: echo.total }).forEach(() => {
      const randomDelay = Math.floor(Math.random() * delay) * 1000;

      queueHandler.add(resolvedName, echo, {
        delay: randomDelay,
      });
    });

    return echo;
  }

  private resolveHandler(name: string) {
    switch (name) {
      case process.env.SRV_FIRST_QUEUE:
        return this.firstQueue;
      case process.env.SRV_SECOND_QUEUE:
        return this.secondQueue;
      default:
        throw new BadRequestException(`Queue name [${name}] is not configured`);
    }
  }

  private resolveName(type: JobType) {
    switch (type) {
      case JobType.SINGLE:
        return 'QtSingle';
      default:
        throw new BadRequestException(`Job type [${type}] is not configured`);
    }
  }
}
