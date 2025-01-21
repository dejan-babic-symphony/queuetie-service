import { Test, TestingModule } from '@nestjs/testing';
import { DispatcherController } from './dispatcher.controller';
import { EventDispatcherService } from './event-dispatcher.service';
import { QueueDispatcherService } from './queue-dispatcher.service';
import {
  EventDispatcherServiceMock,
  JobRequestMock,
  QueueDispatcherServiceMock,
} from './test.mocks';
import { makeServiceErrorEvent, makeServiceInfoEvent } from '../utils';

describe('DispatcherController', () => {
  let controller: DispatcherController;

  const queueDispatcherServiceMock = { ...QueueDispatcherServiceMock };
  const eventDispatcherServiceMock = { ...EventDispatcherServiceMock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueueDispatcherService, EventDispatcherService],
      controllers: [DispatcherController],
    })
      .overrideProvider(QueueDispatcherService)
      .useValue(queueDispatcherServiceMock)
      .overrideProvider(EventDispatcherService)
      .useValue(eventDispatcherServiceMock)
      .compile();

    controller = module.get<DispatcherController>(DispatcherController);
  });

  it('should call simulate, broadcast the service.info event, and return the echo', async () => {
    const payload = { ...JobRequestMock };
    const broadcastEvent = makeServiceInfoEvent(payload.echo.user.id);

    queueDispatcherServiceMock.simulate.mockResolvedValueOnce(payload.echo);
    const result = await controller.simulate(payload);

    expect(queueDispatcherServiceMock.simulate).toHaveBeenCalledWith(payload);
    expect(eventDispatcherServiceMock.broadcast).toHaveBeenCalledWith(broadcastEvent);

    expect(result).toBe(payload.echo);
  });

  it('should broadcast the service.error event, and re-throw the error on failure', async () => {
    const payload = { ...JobRequestMock };
    const broadcastEvent = makeServiceErrorEvent(payload.echo.user.id);

    queueDispatcherServiceMock.simulate.mockRejectedValueOnce(new Error('Test Error'));
    await expect(controller.simulate(payload)).rejects.toThrow('Test Error');

    expect(eventDispatcherServiceMock.broadcast).toHaveBeenCalledWith(broadcastEvent);
  });
});
