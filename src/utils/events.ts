import { UUID } from 'crypto';
import { BroadcastEvent, Channel } from '../dispatcher/types';

export const makeServiceInfoEvent = (userId: UUID): BroadcastEvent => {
  return {
    scope: 'user',
    target: userId,
    event: Channel.SERVICE_INFO,
    message: 'QT Jobs dispatched',
  };
};

export const makeServiceErrorEvent = (userId: UUID): BroadcastEvent => {
  return {
    scope: 'user',
    target: userId,
    event: Channel.SERVICE_ERROR,
    message: 'QT Jobs dispatch failed',
  };
};
