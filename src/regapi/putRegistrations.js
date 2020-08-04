/*
 * regapi/putRegistrations.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import type { Config } from '../config';

export type Body = {
  PersonalMessage: ?{ Value: string },
  Goal: ?{ Value: number },
};

export default (
  { baseURL, fetch, headers }: Config,
  registrationId: number | string,
  registrant: Body,
): Promise<string> =>
  fetch(`${baseURL}/Registrations/${registrationId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(registrant),
  })
    .then(handleFetchErrors)
    .then(response => response.text());
