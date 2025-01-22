import { Test, TestingModule } from '@nestjs/testing';
import { QueueDispatcherService } from './queue-dispatcher.service';
import { BullQueueFirstMock, BullQueueSecondMock, JobRequestMock } from './test.mocks';
import { BullModule, getQueueToken } from '@nestjs/bullmq';

describe('QueueDispatcherService', () => {
  let service: QueueDispatcherService;

  const bullQueueFirstMock = { ...BullQueueFirstMock };
  const bullQueueSecondMock = { ...BullQueueSecondMock };

  const firstQueueName = process.env.SRV_FIRST_QUEUE;
  const secondQueueName = process.env.SRV_SECOND_QUEUE;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BullModule.registerQueue({ name: firstQueueName }, { name: secondQueueName })],
      providers: [QueueDispatcherService],
    })
      .overrideProvider(getQueueToken(firstQueueName))
      .useValue(bullQueueFirstMock)
      .overrideProvider(getQueueToken(secondQueueName))
      .useValue(bullQueueSecondMock)
      .compile();

    service = module.get<QueueDispatcherService>(QueueDispatcherService);
  });

  it('should add jobs to the queue based on the payload', async () => {
    const payload = { ...JobRequestMock };

    const result = await service.simulate(payload);

    expect(bullQueueFirstMock.add).toHaveBeenCalledTimes(500);
    expect(result).toEqual(payload.echo);
  });

  it('should throw a BadRequestException if the wrong queue is provided', async () => {
    const payload = { ...JobRequestMock };
    payload.queue = 'test-queue';

    await expect(service.simulate(payload)).rejects.toThrow(
      'Queue name [test-queue] is not configured'
    );
  });

  it('should throw a BadRequestException if the wrong type is provided', async () => {
    const payload: any = { ...JobRequestMock };
    payload.type = 'test-type';

    await expect(service.simulate(payload)).rejects.toThrow(
      'Job type [test-type] is not configured'
    );
  });
});
