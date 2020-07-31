// @flow

import { eventId } from '../constants';

export default (registrations: Array<{ EventID: number }>) =>
  registrations.find(
    registration => String(registration.EventID) === String(eventId),
  );
