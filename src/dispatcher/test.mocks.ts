import { UUID } from 'crypto';
import { JobType } from './dto/simulate.request.dto';

export const JobRequestMock = {
  type: JobType.SINGLE,
  queue: 'queuetie.first',
  delay: 10,
  echo: {
    total: 500,
    context: '56d74e7e-f0ad-4841-af20-6ce9e5130b99' as UUID,
    user: {
      id: '84cb95cd-0de9-48c6-b702-917fba0594fb' as UUID,
      name: 'John Doe',
    },
    organization: {
      id: '7c97f753-9280-4fa8-8592-8c55a66dac1f' as UUID,
      name: 'Acme',
    },
  },
};

export const QueueDispatcherServiceMock = {
  simulate: jest.fn(),
};

export const EventDispatcherServiceMock = {
  broadcast: jest.fn(),
};
